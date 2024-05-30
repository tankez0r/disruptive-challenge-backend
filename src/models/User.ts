import { Schema, model, Document, Types } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  contents: Types.ObjectId[];
  role: 'admin' | 'lector' | 'creador';
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, 'is invalid']
  },
  password: {
    type: String,
    required: true
  },
  contents: [{
    type: Schema.Types.ObjectId,
    ref: 'Content'
  }],
  role: {
    type: String,
    required: true,
    enum: ['admin', 'lector', 'creador']
  }
}, { collection: 'users' });

export const User = model<IUser>('User', userSchema);