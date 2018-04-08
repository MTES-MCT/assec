import omit from 'lodash.omit';
import { Departement } from './../drivers/mongodb';

// import { Person, Restriction } from './../drivers/sqlite';

export const Mutation = {
  // createPerson: (_, { firstname, lastname, email }) =>
  //   Person.create({ firstname, lastname, email }),
  deleteDepartement: (_, args) => {
    const { id } = args;
    const fieldstoreturns = { select: ['_id'] };
    return new Promise((resolve, reject) => {
      Departement.findByIdAndRemove(id, fieldstoreturns, (err, doc) => {
        if (err) reject(err);
        else if (!doc) reject(new Error('unable to find document'));
        else resolve(doc._id);
      });
    });
  },
  updateDepartement: (_, args) => {
    const { id } = args;
    let rest = omit(args, ['id']);
    const returnsnewdoc = { new: true };
    if (rest && rest.name) rest = Object.assign({}, rest, { slug: rest.name });
    return Departement.findByIdAndUpdate(id, rest, returnsnewdoc);
  },
  createDepartement: (_, args) => Departement.create(args),
  // createRestriction: (_, { description, informations, departement }) =>
  //   Restriction.create({ description, informations, departement }),
};

export default Mutation;
