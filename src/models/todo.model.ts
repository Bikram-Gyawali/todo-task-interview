import mongoose, { Schema, Document } from "mongoose";

export interface ITodo extends Document {
  name: string;
  description: string;
  date: Date;
  isDone: boolean;
}

const TodoSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  isDone: { type: Boolean, default: false },
});

export default mongoose.model<ITodo>("Todo", TodoSchema);
