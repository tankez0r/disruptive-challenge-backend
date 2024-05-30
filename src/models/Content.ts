import { Schema, model, Document, Types } from 'mongoose';

export interface IContent extends Document {
  topic: Types.ObjectId;
  fileName: string;
  fileType: string;
  fileContent: Buffer;
  author: Types.ObjectId;
  mediaType: string;
  title: string;
  authorName: string;
  createdAt: Date;
  updatedAt: Date;
}

const contentSchema = new Schema<IContent>({
  title: {
    type: String,
    required: true
  },
  mediaType: {
    type: String,
    required: true
  },
  topic: {
    type: Schema.Types.ObjectId,
    ref: 'Topic',
    required: true
  },
  fileName: {
    type: String,
    required: true
  },
  fileType: {
    type: String,
    required: true
  },
  fileContent: {
    type: Buffer,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  authorName: {
    type: String,
    required: true
  }
}, {
  collection: 'contents',
  timestamps: true
});

export const Content = model<IContent>('Content', contentSchema);