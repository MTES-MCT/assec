import Mongoose, { Schema } from 'mongoose';
import { slugify } from './../utils/slugify';

const SUOSchema = new Schema(
  {
    label: {
      type: String,
      required: true,
    },
    order: {
      default: 0,
      type: Number,
      required: false,
    },
    department: { type: Schema.Types.ObjectId, ref: 'departments' },
  },
  {
    timestamps: {
      createdAt: 'ctime',
      updatedAt: 'mtime',
    },
  },
);

SUOSchema.virtual('slug').get(function virtualslug () {
  return slugify(this.label);
});

export const SUOModel = Mongoose.model('suos', SUOSchema);

export default { SUOModel, SUOSchema };
