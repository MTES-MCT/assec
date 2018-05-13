import pick from 'lodash.pick';
import orderby from 'lodash.orderby';
import {
  // SUOModel,
  ZoneModel,
  BlockModel,
  Departement,
  Restriction,
  QuestionModel,
  SubscriberModel,
} from './drivers/mongodb';

const toObjectOpts = { virtuals: true };

const transformZoneToSituation = (zones) => {
  const parsed = zones.map((obj) => {
    const zone = obj.toObject(toObjectOpts);
    const extras = pick(zone, [
      'name',
      'order',
      'geojson',
      'shortname',
      'description',
    ]);
    const base = pick(zone.alerte.situation, ['id', 'label']);
    return Object.assign({}, base, extras);
  });
  return parsed;
};

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

  departmentSubscribers: (_, { department }) =>
    (department && SubscriberModel.find({ department }).exec()) || null,

  /* -----------------------------------

  FRONTEND QUERIES

  ----------------------------------- */

  findRestictionByCriteria: (_, { zones, usages, origines }) =>
    ZoneModel.findById(zones).then((found) => {
      const { situation: situations } = found.alerte;
      return Restriction.find({
        usages: { $in: [usages] },
        origines: { $in: [origines] },
        situations: { $in: [situations] },
      });
    }),

  retrieveBlocks: () => BlockModel.find(),

  widget: (_, { code }) =>
    Departement.findOne({ code })
      .populate('usages')
      .populate('origines')
      .populate('situations')
      .exec()
      .then(doc =>
        Promise.all([
          Promise.resolve(doc),
          ZoneModel.find({ department: doc.id })
            .populate('alerte.situation', ['label', 'id'])
            .exec(),
          QuestionModel.find({ department: doc.id }),
        ]))
      .then(([doc, zones, questions]) => {
        const parsedQuestions = questions.map((entity) => {
          const question = entity.toObject(toObjectOpts);
          const result = {
            ...question,
            zones:
              question.type !== 'zones'
                ? null
                : transformZoneToSituation(zones),
            values:
              question.type === 'zones'
                ? null
                : doc[question.type].toObject(toObjectOpts),
          };
          return result;
        });

        return orderby(parsedQuestions, ['order']);
      }),
};

export default Query;
