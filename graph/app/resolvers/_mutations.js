import omit from 'lodash.omit';
import { Departement } from './../drivers/mongodb';

export const Mutation = {
  deleteDepartment: (_, args) => {
    const { id } = args;
    return new Promise((resolve, reject) => {
      Departement.findByIdAndRemove(id, (err, doc) => {
        if (err) reject(err);
        else if (!doc) reject(new Error('unable to find document'));
        else resolve(id);
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
};

export default Mutation;
