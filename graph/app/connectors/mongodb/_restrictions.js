import Mongoose, { Schema } from 'mongoose';
import { slugify } from './../../utils/slugify';

const slugType = { set: slugify, type: String };

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
    slug: slugType,
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

function saveMiddleware (next) {
  this.slug = this.title;
  next();
}

RestrictionSchema.pre('save', saveMiddleware);
RestrictionSchema.pre('update', saveMiddleware);
RestrictionSchema.pre('findOneAndUpdate', saveMiddleware);

export const Restriction = Mongoose.model('restrictions', RestrictionSchema);

export default { Restriction };
