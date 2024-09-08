import { Schema, model, Document, Types } from 'mongoose';

interface IProject extends Document {
  title: string;
  description: string;
  tags: Types.Array<string>;
  clientId: Types.ObjectId;
}

const projectSchema = new Schema<IProject>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: [{ type: String }],
  clientId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

export const Project = model<IProject>('Project', projectSchema);
