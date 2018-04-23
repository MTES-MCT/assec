import Mongoose, { Schema } from 'mongoose';
import { slugify } from './../../utils/slugify';

const ZoneSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  order: {
    default: '0',
    type: String,
  },
  help: {
    default: '',
    type: String,
    nullable: true,
  },
  geojson: {
    type: String,
    required: true,
  },
  alerte: {
    end_date: { type: String },
    start_date: { type: String },
    situation: { type: Schema.Types.ObjectId },
  },
  dpt: Schema.Types.ObjectId,
});

ZoneSchema.virtual('slug').get(function virtualslug () {
  return slugify(this.name);
});

export const ZoneModel = Mongoose.model('zones', ZoneSchema);

export default { ZoneModel };
