import Mongoose, { Schema } from 'mongoose';
import { slugify } from './../../utils/slugify';

const RestrictionSchema = new Schema(
  {
    title: {
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
    usages: [String],
    origines: [String],
    situations: [String],
    dpt: Schema.Types.ObjectId,
  },
  {
    timestamps: {
      createdAt: 'ctime',
      updatedAt: 'mtime',
    },
  },
);

RestrictionSchema.virtual('slug').get(function virtualslug () {
  return slugify(this.name);
});

export const Restriction = Mongoose.model('restrictions', RestrictionSchema);

export default { Restriction, RestrictionSchema };
