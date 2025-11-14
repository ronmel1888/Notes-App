// lib/models/Note.ts
import mongoose, { Document, Model } from "mongoose";

// 1️⃣ Define the TypeScript interface for a Note
export interface INote extends Document {
  text: string;
  analysis: {
    improve?: string;
    summarize?: string;
    translate?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

// 2️⃣ Sub-schema for analysis
const AnalysisSchema = new mongoose.Schema(
  {
    improve: String,
    summarize: String,
    translate: String,
  },
  { _id: false } // analysis won't have its own _id
);

// 3️⃣ Main Note schema
const NoteSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    analysis: { type: AnalysisSchema, default: () => ({}) },
  },
  { timestamps: true } // ✅ adds createdAt and updatedAt automatically
);

// 4️⃣ Export the model
export const Note: Model<INote> =
  mongoose.models.Note || mongoose.model<INote>("Note", NoteSchema);
