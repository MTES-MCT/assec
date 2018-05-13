import Mongoose, { Schema } from 'mongoose';

const QuestionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      required: true,
    },
    display: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
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

export const QuestionModel = Mongoose.model('questions', QuestionSchema);

export default { QuestionModel, QuestionSchema };
