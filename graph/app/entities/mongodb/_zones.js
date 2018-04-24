import Mongoose, { Schema } from 'mongoose';
import { slugify } from './../../utils/slugify';

const ZoneSchema = new Schema(
  {
    label: {
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
      situation: { type: Schema.Types.ObjectId, ref: 'suos' },
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
    department: { type: Schema.Types.ObjectId, ref: 'departments' },
  },
  {
    timestamps: {
      createdAt: 'ctime',
      updatedAt: 'mtime',
    },
  },
);

ZoneSchema.virtual('slug').get(function virtualslug () {
  return slugify(this.label);
});

export const ZoneModel = Mongoose.model('zones', ZoneSchema);

export default { ZoneModel };
