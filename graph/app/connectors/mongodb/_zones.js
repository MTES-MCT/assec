import Mongoose, { Schema } from 'mongoose';
import { slugify } from './../../utils/slugify';

const ZoneSchema = new Schema(
  {
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
      situation: { type: Schema.Types.ObjectId },
      end_date: {
        type: Date,
        nullable: true,
        required: true,
        default: Date.now,
      },
      start_date: {
        type: Date,
        nullable: true,
        required: true,
        default: Date.now,
      },
    },
    dpt: Schema.Types.ObjectId,
  },
  {
    timestamps: {
      createdAt: 'ctime',
      updatedAt: 'mtime',
    },
  },
);

ZoneSchema.virtual('slug').get(function virtualslug () {
  return slugify(this.name);
});

export const ZoneModel = Mongoose.model('zones', ZoneSchema);

export default { ZoneModel };
