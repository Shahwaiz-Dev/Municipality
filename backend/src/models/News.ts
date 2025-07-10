import { Schema, model, Document } from 'mongoose';

export interface INews extends Document {
  title: string;
  content: string;
  date: Date;
  language: string;
  slug: string;
}

const NewsSchema = new Schema<INews>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
  language: { type: String, default: 'en' },
  slug: { type: String, required: true, unique: true },
});

export default model<INews>('News', NewsSchema); 