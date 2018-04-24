import pick from 'lodash.pick';
// import omit from 'lodash.omit';
import {
  SUOModel,
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
  restrictions: (_, { id }) => {
    if (!id) return [];
    return Restriction.find({ department: id })
      .populate('usages')
      .populate('origines')
      .populate('situations')
      .exec();
  },
  departmenSUOs: (_, { id }) =>
    Departement.findById(id)
      .populate('usages')
      .populate('origines')
      .populate('situations')
      .exec()
      .then(doc => pick(doc, ['usages', 'origines', 'situations'])),
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
  zones: (_, { dpt }) => (dpt && ZoneModel.find({ dpt })) || null,
  department: (_, { id }) => (id && Departement.findById(id)) || null,
  restriction: (_, { id }) => (id && Restriction.findById(id)) || null,
  // Queries pour le Frontend
  findRestictionByCriteria: (_, { zones, usages, origines }) =>
    ZoneModel.findById(zones).then((found) => {
      const { situation: situations } = found.alerte;
      return Restriction.find({
        usages: { $in: [usages] },
        origines: { $in: [origines] },
        situations: { $in: [situations] },
      });
    }),
  hydrateDepartment: (_, { dpt }) =>
    Promise.all([
      Departement.findById(dpt),
      ZoneModel.find({ dpt }),
      Restriction.find({ dpt }),
    ])
      .then(([doc, zones, restrictions]) =>
        Promise.resolve(Object.assign(
          {},
          {
            zones,
            restrictions,
            usages: doc.suos.usages,
            origines: doc.suos.origines,
            situations: doc.suos.situations,
          },
        )))
      .then(result => result),
};

export default Query;
