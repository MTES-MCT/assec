import Mongoose, { Schema } from 'mongoose';

const SubscriberSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    department: {
      required: true,
      ref: 'departments',
      type: Schema.Types.ObjectId,
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
