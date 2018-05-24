import pick from 'lodash.pick';

// application
import { generateMapFromZones } from './helpers/generateMapFromZones';
import { findZoneParentForPoint } from './helpers/findZoneParentForPoint';
import { transformZoneToSituation } from './helpers/transformZoneToSituation';
import {
  // SUOModel,
  ZoneModel,
  BlockModel,
  Departement,
  Restriction,
  QuestionModel,
  SubscriberModel,
} from './drivers/mongodb';

export const Query = {
  /* -----------------------------------

  SINGLES QUERIES

  ----------------------------------- */

  block: (_, { id }) => (id && BlockModel.findById(id).exec()) || null,

  department: (_, { id }) =>
    (id &&
      Departement.findById(id)
        .populate('usages')
        .populate('origines')
        .populate('situations')
        .exec()) ||
    null,

  zone: (_, { id }) =>
    (id &&
      ZoneModel.findById(id)
        .populate('alerte.situation')
        .exec()) ||
    null,

  question: (_, { id }) => (id && QuestionModel.findById(id).exec()) || null,

  restriction: (_, { id }) => (id && Restriction.findById(id).exec()) || null,

  /* -----------------------------------

  BULKS QUERIES

  ----------------------------------- */

  departments: () =>
    Departement.find()
      .populate('usages')
      .populate('origines')
      .populate('situations')
      .exec(),

  subscribers: (_, { department }) => {
    if (!department) return SubscriberModel.find().exec();
    return SubscriberModel.find({
      preferences: { $elemMatch: { department } },
    }).exec();
  },

  departmentRestrictions: (_, { department }) => {
    if (!department) return [];
    return Restriction.find({ department })
      .populate('usages')
      .populate('origines')
      .populate('situations')
      .exec();
  },

  departmentSUOs: (_, { department }) =>
    Departement.findById(department)
      .populate('usages')
      .populate('origines')
      .populate('situations')
      .exec()
      .then(doc => pick(doc, ['usages', 'origines', 'situations'])),

  departmentSituations: (_, { department }) =>
    Departement.findById(department)
      .populate('situations')
      .exec()
      .then(doc => doc.situations),

  departmentZones: (_, { department }) =>
    (department &&
      ZoneModel.find({ department })
        .populate('alerte.situation')
        .exec()) ||
    null,

  departmentQuestions: (_, { department }) =>
    QuestionModel.find({ department }).exec() || null,

  blocks: () => BlockModel.find().exec() || null,

  /* -----------------------------------

  FRONTEND QUERIES

  ----------------------------------- */

  findRestriction: (_, {
    department, situations, usages, origines,
  }) =>
    ZoneModel.find({ department })
      .populate('alerte.situation')
      .exec()
      .then((zones) => {
        const zone = findZoneParentForPoint(situations, zones);
        if (!zone) return null;
        const { situation } = zone.alerte;
        return Restriction.find({
          usages: { $in: [usages] },
          origines: { $in: [origines] },
          situations: { $in: [situation.id] },
        }).then(docs =>
          Object.assign({}, { zone, situation, restrictions: docs }));
      }) || null,

  widget: (_, { code }) =>
    Departement.findOne({ code })
      .populate('usages')
      .populate('origines')
      .exec()
      .then(doc =>
        Promise.all([
          Promise.resolve(doc),
          ZoneModel.find({ department: doc.id })
            .populate('alerte.situation', ['label', 'id', 'slug'])
            .sort({ order: 1 })
            .exec(),
          QuestionModel.find({ department: doc.id })
            .sort({ order: 1 })
            .exec(),
        ]))
      .then(([doc, zones, questions]) => ({
        department: doc.id,
        questions: questions.map((entity) => {
          const question = entity.toObject({ virtuals: true });
          const result = {
            ...question,
            map:
              question.type !== 'situations'
                ? null
                : generateMapFromZones(zones),
            zones:
              question.type !== 'situations'
                ? null
                : transformZoneToSituation(zones),
            values:
              question.type === 'situations'
                ? null
                : doc[question.type].toObject({ virtuals: true }),
          };
          return result;
        }),
      })),
};

export default Query;
