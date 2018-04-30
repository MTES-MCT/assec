import Mongoose, { Schema } from 'mongoose';
import { slugify } from './../../utils/slugify';

const DepartementSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    usages: [{ type: Schema.Types.ObjectId, ref: 'suos' }],
    origines: [{ type: Schema.Types.ObjectId, ref: 'suos' }],
    situations: [{ type: Schema.Types.ObjectId, ref: 'suos' }],
  },
  {
    timestamps: {
      createdAt: 'ctime',
      updatedAt: 'mtime',
    },
  },
);

DepartementSchema.virtual('slug').get(function virtualslug () {
  return slugify(this.label);
});

export const Departement = Mongoose.model('departments', DepartementSchema);

export default { Departement, DepartementSchema };
