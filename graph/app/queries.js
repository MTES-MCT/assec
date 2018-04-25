import pick from 'lodash.pick';
// import omit from 'lodash.omit';
import {
  // SUOModel,
  ZoneModel,
  Departement,
  Restriction,
} from './drivers/mongodb';

export const Query = {
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
  /*
  departments: () =>
    new Promise((resolve, reject) => {
      Departement.find((err, docs) => {
        if (err) return reject(err);
        const parsed = docs.map((dpt) => {
          const source = omit(dpt, ['suos']);
          return Object.assign({}, source, dpt.suos);
        });
        return resolve(parsed);
      });
    }),
  department: (_, { id }) => {
    if (!id) return null;
    return new Promise((resolve, reject) => {
      Departement.findById(id, (err, doc) => {
        if (err) return reject(err);
        const source = omit(doc, ['suos']);
        const parsed = Object.assign({}, source, doc.suos);
        return resolve(parsed);
      });
    });
  },
  */

  department: (_, { id }) => (id && Departement.findById(id)) || null,
  restriction: (_, { id }) => (id && Restriction.findById(id)) || null,

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
