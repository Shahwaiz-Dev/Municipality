import { Schema, model, Document } from 'mongoose';

export interface IDirectory extends Document {
  type: string;
  entries: Record<string, any>[];
  language: string;
}

const DirectorySchema = new Schema<IDirectory>({
  type: { type: String, required: true },
  entries: [{ type: Schema.Types.Mixed }],
  language: { type: String, default: 'en' },
});

export default model<IDirectory>('Directory', DirectorySchema); 