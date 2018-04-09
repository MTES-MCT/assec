import Mongoose, { Schema } from 'mongoose';
import { slugify } from './../../lib/slugify';

// application
const slugType = { set: slugify, type: String };

const SUOSchema = new Schema({
  name: String,
});

const DepartementSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    suos: {
      usages: [SUOSchema],
      origines: [SUOSchema],
      situations: [SUOSchema],
    },
    slug: slugType,
  },
  { strict: true },
);

function saveMiddleware (next) {
  this.slug = this.name;
  next();
}

DepartementSchema.pre('save', saveMiddleware);
DepartementSchema.pre('update', saveMiddleware);
DepartementSchema.pre('findOneAndUpdate', saveMiddleware);

export const Departement = Mongoose.model('departments', DepartementSchema);

export default { Departement };
