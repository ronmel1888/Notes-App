export type GPTAction = "improve" | "summarize" | "translate";

export interface Note {
  _id: string;
  text: string;
  analysis: Partial<Record<GPTAction, string>>;
  createdAt: string; // or Date if you parse it
  updatedAt: string; // or Date
}
