import Mongoose, { Schema } from 'mongoose';
import { slugify } from './../utils/slugify';

const DepartmentMapSchema = new Schema(
  {
    zone: { type: String, required: true },
    center: { type: Array, required: true },
    maxbounds: { type: Array, required: true },
  },
  {
    timestamps: {
      createdAt: 'ctime',
      updatedAt: 'mtime',
    },
  },
);

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
    map: {
      nullable: true,
      required: true,
      type: DepartmentMapSchema,
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

DepartementSchema.virtual('name').get(function virtualslug () {
  return `${this.code} - ${this.label}`;
});

export const Departement = Mongoose.model('departments', DepartementSchema);

export default { Departement, DepartementSchema };
