import { Departement, Restriction } from './../drivers/mongodb';

export const Query = {
  departements: () => Departement.find(),
  departement: (_, { id }) => (id && Departement.findById(id)) || [],
  restrictions: (_, { dpt }) => (dpt && Restriction.find({ dpt })) || [],
  suos: (_, { dpt }) =>
    new Promise((resolve, reject) =>
      Departement.findById(dpt, (err, doc) => {
        if (err) return reject(err);
        return resolve(doc.suos);
      })),
};

export default Query;
