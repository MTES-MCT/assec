import omit from 'lodash.omit';
import {
  SUOModel,
  ZoneModel,
  Departement,
  Restriction,
} from './drivers/mongodb';

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
  // UPDATES
  updateZoneAlerte: (_, args) => {
    const { id } = args;
    const rest = omit(args, ['id']);
    const returnsnewdoc = { new: true };
    return ZoneModel.findByIdAndUpdate(id, rest, returnsnewdoc);
  },
  updateDepartement: (_, args) => {
    const { id } = args;
    const rest = omit(args, ['id']);
    const returnsnewdoc = { new: true };
    return Departement.findByIdAndUpdate(id, rest, returnsnewdoc);
  },
  // CREATES
  createZone: (_, args) => ZoneModel.create(args),
  createDepartement: (_, args) => {
    const base = omit(args, ['situations', 'origines', 'usages']);
    return Promise.all([
      SUOModel.create(args.usages),
      SUOModel.create(args.origines),
      SUOModel.create(args.situations),
    ]).then(([usages, origines, situations]) => {
      const doc = new Departement(base);
      doc.set('usages', usages);
      doc.set('origines', origines);
      doc.set('situations', situations);
      return doc.save();
    });
  },
  createRestriction: (_, args) => Restriction.create(args),
  // DELETES
  deleteZone: (_, args) => deleteEntity(args.id, ZoneModel),
  deleteRestriction: (_, args) => deleteEntity(args.id, Restriction),
  deleteDepartment: (_, args) =>
    new Promise((resolve, reject) => {
      deleteEntity(args.id, Departement)
        .then(doc =>
          deleteEntities({ dpt: doc.id }, Restriction)
            .then(() => resolve(doc))
            .catch(err => reject(err)))
        .catch(err => reject(err));
    }),
};

export default Mutation;
