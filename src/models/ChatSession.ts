import mongoose, { Document, Schema } from "mongoose";

export interface IChatSession extends Document {
  userId: string;
  title: string;
  isFavorite: boolean;
  createdAt: Date;
}

const ChatSessionSchema = new Schema<IChatSession>({
  userId: { type: String, required: true, unique: true },
  title: { type: String, default: "Untitled Session" },
  isFavorite: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

ChatSessionSchema.index({ userId: 1 });

export default mongoose.model<IChatSession>("ChatSession", ChatSessionSchema);
