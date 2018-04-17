import { Departement, Restriction } from './../drivers/mongodb';

export const Query = {
  departements: () => Departement.find(),
  departement: (_, { id }) => Departement.findById(id),
  restrictions: (_, { dpt }) => Restriction.find({ dpt }),
  departmentSUOS: (_, { id }) =>
    new Promise((resolve, reject) =>
      Departement.findById(id, (err, doc) => {
        if (err) return reject(err);
        return resolve(doc.suos);
      })),
};

export default Query;
