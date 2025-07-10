import { Schema, model, Document } from 'mongoose';

export interface IPost extends Document {
  title: string;
  content?: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  language: string;
}

const PostSchema = new Schema<IPost>({
  title: { type: String, required: true },
  content: String,
  imageUrl: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  language: { type: String, default: 'en' }
});

export default model<IPost>('Post', PostSchema); 