import omit from 'lodash.omit';
import { Departement, Restriction } from './../drivers/mongodb';

const deleteEntity = (id, Model) =>
  new Promise((resolve, reject) => {
    Model.findByIdAndRemove(id, (err, doc) => {
      if (err) {
        reject(err);
      } else if (!doc) {
        const msg = `unable to find document with id: ${id}`;
        reject(new Error(msg));
      } else {
        resolve(doc);
      }
    });
  });

export const Mutation = {
  updateDepartement: (_, args) => {
    const { id } = args;
    let rest = omit(args, ['id']);
    const returnsnewdoc = { new: true };
    if (rest && rest.name) rest = Object.assign({}, rest, { slug: rest.name });
    return Departement.findByIdAndUpdate(id, rest, returnsnewdoc);
  },
  createDepartement: (_, args) => Departement.create(args),
  createRestriction: (_, args) => Restriction.create(args),
  deleteDepartment: (_, args) => deleteEntity(args.id, Departement),
  deleteRestriction: (_, args) => deleteEntity(args.id, Restriction),
};

export default Mutation;
