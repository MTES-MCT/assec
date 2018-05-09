import Mongoose, { Schema } from 'mongoose';

const BlockSchema = new Schema(
  {
    label: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: 'ctime',
      updatedAt: 'mtime',
    },
  },
);

export const BlockModel = Mongoose.model('blocks', BlockSchema);

export default { BlockModel, BlockSchema };
