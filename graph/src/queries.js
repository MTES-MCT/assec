import pick from 'lodash.pick';
// import omit from 'lodash.omit';
import {
  // SUOModel,
  ZoneModel,
  Departement,
  Restriction,
  SubscriberModel,
} from './drivers/mongodb';

export const Query = {
  /* -----------------------------------

SINGLES QUERIES

----------------------------------- */

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

  restriction: (_, { id }) =>
    (id &&
      Restriction.findById(id)
        .populate('usages')
        .populate('origines')
        .populate('situations')
        .exec()) ||
    null,

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

  departmentZones: (_, { department }) =>
    (department &&
      ZoneModel.find({ department })
        .populate('alerte.situation')
        .exec()) ||
    null,

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

  hydrateDepartment: (_, { department }) =>
    Promise.all([
      Departement.findById(department)
        .populate('usages')
        .populate('origines')
        .populate('situations')
        .exec(),
      ZoneModel.find({ department })
        .populate('alerte.situation')
        .exec(),
      Restriction.find({ department }),
    ])
      .then(([{ usages, origines, situations }, zones, restrictions]) =>
        Promise.resolve(Object.assign(
          {},
          {
            zones,
            usages,
            origines,
            situations,
            restrictions,
          },
        )))
      .then(result => result),
};

export default Query;
