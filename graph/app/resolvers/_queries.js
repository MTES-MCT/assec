// import omit from 'lodash.omit';
import { Departement, Restriction } from './../drivers/mongodb';

export const Query = {
  departments: () => Departement.find(),
  department: (_, { id }) => (id && Departement.findById(id)) || null,
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
  restriction: (_, { id }) => (id && Restriction.findById(id)) || null,
  restrictions: (_, { dpt }) => (dpt && Restriction.find({ dpt })) || [],
  suos: (_, { dpt }) =>
    new Promise((resolve, reject) =>
      Departement.findById(dpt, (err, doc) => {
        if (err) return reject(err);
        return resolve(doc.suos);
      })),
};

export default Query;
