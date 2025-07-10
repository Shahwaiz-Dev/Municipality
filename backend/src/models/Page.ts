import { Schema, model, Document } from 'mongoose';

export interface IPage extends Document {
  slug: string;
  title: string;
  content: string;
  parent?: string;
  language: string;
  order: number;
  meta?: Record<string, any>;
}

const PageSchema = new Schema<IPage>({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  parent: { type: Schema.Types.ObjectId, ref: 'Page', default: null },
  language: { type: String, default: 'en' },
  order: { type: Number, default: 0 },
  meta: { type: Schema.Types.Mixed },
});

export default model<IPage>('Page', PageSchema); 