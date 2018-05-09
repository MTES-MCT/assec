import Mongoose, { Schema } from 'mongoose';
import { slugify } from './../../utils/slugify';

const RestrictionSchema = new Schema(
  {
    label: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    information: {
      type: String,
    },
    usages: [{ type: Schema.Types.ObjectId, ref: 'suos' }],
    origines: [{ type: Schema.Types.ObjectId, ref: 'suos' }],
    situations: [{ type: Schema.Types.ObjectId, ref: 'suos' }],
    department: { type: Schema.Types.ObjectId, ref: 'departments' },
  },
  {
    timestamps: {
      createdAt: 'ctime',
      updatedAt: 'mtime',
    },
  },
);

RestrictionSchema.virtual('slug').get(function virtualslug () {
  return slugify(this.label);
});

RestrictionSchema.virtual('name').get(function virtualslug () {
  return this.label;
});

export const Restriction = Mongoose.model('restrictions', RestrictionSchema);

export default { Restriction, RestrictionSchema };
