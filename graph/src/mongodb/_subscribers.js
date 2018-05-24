import Mongoose, { Schema } from 'mongoose';

const LatLngSchema = new Schema({
  lat: { type: String, required: true },
  lng: { type: String, required: true },
});

const PreferencesSchema = new Schema({
  department: {
    required: true,
    ref: 'departments',
    type: Schema.Types.ObjectId,
  },
  origines: {
    required: true,
    type: Schema.Types.ObjectId,
  },
  usages: {
    required: true,
    type: Schema.Types.ObjectId,
  },
  latlng: {
    required: true,
    type: LatLngSchema,
  },
});

const SubscriberSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    preferences: {
      required: false,
      type: [{ type: PreferencesSchema }],
    },
  },
  {
    timestamps: {
      createdAt: 'ctime',
      updatedAt: 'mtime',
    },
  },
);

export const SubscriberModel = Mongoose.model('subscribers', SubscriberSchema);

export default { SubscriberModel };
