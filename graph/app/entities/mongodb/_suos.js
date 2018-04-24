import Mongoose, { Schema } from 'mongoose';
import { slugify } from './../../utils/slugify';

const SUOSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: 'ctime',
      updatedAt: 'mtime',
    },
  },
);

SUOSchema.virtual('slug').get(function virtualslug () {
  return slugify(this.name);
});

export const SUOModel = Mongoose.model('suos', SUOSchema);

export default { SUOModel, SUOSchema };
