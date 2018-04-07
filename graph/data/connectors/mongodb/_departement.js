import Mongoose, { Schema } from 'mongoose';
import { slugify } from './../../../lib/slugify';

const slugType = { set: slugify, type: String };

const DepartementSchema = new Schema({
  code: String,
  name: String,
  slug: slugType,
  suos: {
    zones: [new Schema({ name: String, slug: slugType })],
    usages: [new Schema({ name: String, slug: slugType })],
    origines: [new Schema({ name: String, slug: slugType })],
  },
});

const Departement = Mongoose.model('departements', DepartementSchema);

export default Departement;