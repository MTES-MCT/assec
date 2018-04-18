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

const deleteEntities = (where, Model) =>
  new Promise((resolve, reject) => {
    Model.deleteMany(where, (err, doc) => {
      if (err) {
        reject(err);
      } else if (!doc) {
        const msg = `unable to find document with id: ${where}`;
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
  deleteRestriction: (_, args) => deleteEntity(args.id, Restriction),
  deleteDepartment: (_, args) => {
    deleteEntity(args.id, Departement)
      .then(doc => deleteEntities({ dpt: doc.id }, Restriction).then(() => doc))
      .catch(err => err);
  },
};

export default Mutation;
