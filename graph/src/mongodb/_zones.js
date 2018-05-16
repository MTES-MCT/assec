import Mongoose, { Schema } from 'mongoose';
import { slugify } from './../utils/slugify';

const ZoneSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    shortname: {
      type: String,
      required: true,
    },
    order: {
      default: '0',
      type: String,
    },
    geojson: {
      type: String,
      required: true,
    },
    description: {
      default: '',
      type: String,
      nullable: true,
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

ZoneSchema.virtual('label').get(function virtualslug () {
  return `${this.shortname} - ${this.name}`;
});

export const ZoneModel = Mongoose.model('zones', ZoneSchema);

export default { ZoneModel };
