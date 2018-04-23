import Mongoose, { Schema } from 'mongoose';
import { slugify } from './../../utils/slugify';

const ZoneSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    order: {
      type: String,
      required: true,
    },
    help: {
      type: String,
      required: true,
    },
    geojson: {
      type: String,
      required: true,
    },
    department: Schema.Types.ObjectId,
  },
  { strict: true },
);

ZoneSchema.virtual('slug').get(function virtualslug () {
  return slugify(this.name);
});

export const ZoneModel = Mongoose.model('zones', ZoneSchema);

export default { ZoneModel };
