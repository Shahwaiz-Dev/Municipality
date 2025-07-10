import { Schema, model, Document } from 'mongoose';

export interface IFormSubmission extends Document {
  formType: string;
  data: Record<string, any>;
  date: Date;
}

const FormSubmissionSchema = new Schema<IFormSubmission>({
  formType: { type: String, required: true },
  data: { type: Schema.Types.Mixed, required: true },
  date: { type: Date, default: Date.now },
});

export default model<IFormSubmission>('FormSubmission', FormSubmissionSchema); 