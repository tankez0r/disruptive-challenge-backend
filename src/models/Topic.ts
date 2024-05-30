import { Schema, model, Document, Types } from 'mongoose';

export interface ITopic extends Document {
  name: string;
  contents: Types.ObjectId[];
  fileName: string;
  fileType: string;
  fileContent: Buffer;
}

const topicSchema = new Schema<ITopic>({
  name: {
    type: String,
    required: true,
    unique: true
  },
  fileContent: {
    type: Buffer,
    required: true
  },
  fileType: {
    type: String,
    required: true
  },
  fileName: {
    type: String,
    required: true
  },
  contents: [{
    type: Schema.Types.ObjectId,
    ref: 'Content'
  }]
}, { collection: 'topics' });

export const Topic = model<ITopic>('Topic', topicSchema);