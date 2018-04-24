import omit from 'lodash.omit';
import Mongoose from 'mongoose';
import {
  SUOModel,
  ZoneModel,
  Departement,
  Restriction,
} from './drivers/mongodb';

const suoskeys = ['situations', 'origines', 'usages'];

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

const hydrateNewSUO = (obj, id) => ({
  // cree un nouveau SUO
  // en definissant son departement de rattachement
  department: id,
  label: obj.label,
});

export const Mutation = {
  /* -----------------------------------

  DEPARTEMENTS

  ----------------------------------- */
  createDepartement: (_, args) => {
    const base = omit(args, suoskeys);
    const id = new Mongoose.Types.ObjectId();
    return Promise.all([
      SUOModel.create(args.usages.map(o => hydrateNewSUO(o, id))),
      SUOModel.create(args.origines.map(o => hydrateNewSUO(o, id))),
      SUOModel.create(args.situations.map(o => hydrateNewSUO(o, id))),
    ]).then(([usages, origines, situations]) => {
      const doc = new Departement({ ...base, _id: id });
      doc.set('usages', usages);
      doc.set('origines', origines);
      doc.set('situations', situations);
      return doc.save();
    });
  },

  deleteDepartment: (_, args) =>
    Departement.findByIdAndRemove(args.id).then(doc =>
      Promise.all([
        SUOModel.deleteMany({ department: doc.id }),
        ZoneModel.deleteMany({ department: doc.id }),
        Restriction.deleteMany({ department: doc.id }),
      ]).then(() => doc)),

  /* -----------------------------------

  RESTRICTIONS

  ----------------------------------- */

  createRestriction: (_, args) => Restriction.create(args),
  deleteRestriction: (_, args) =>
    // FIXME -> remove restriction sur une zone
    Departement.findByIdAndRemove(args.id),

  /* ----------------------------------- */

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
  // DELETES
  deleteZone: (_, args) => deleteEntity(args.id, ZoneModel),
};

export default Mutation;
