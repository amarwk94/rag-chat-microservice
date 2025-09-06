import mongoose, { Document, Schema } from "mongoose";

export interface IChatMessage extends Document {
  sessionId: mongoose.Types.ObjectId;
  sender: "user" | "assistant";
  content: string;
  context?: string;
  createdAt: Date;
}

const ChatMessageSchema = new Schema<IChatMessage>({
  sessionId: {
    type: Schema.Types.ObjectId,
    ref: "ChatSession",
    required: true,
  },
  sender: { type: String, enum: ["user", "assistant"], required: true },
  content: { type: String, required: true },
  context: { type: String },
  createdAt: { type: Date, default: Date.now },
});

ChatMessageSchema.index({ sessionId: 1, createdAt: 1 });
ChatMessageSchema.index({ sessionId: 1 });

export default mongoose.model<IChatMessage>("ChatMessage", ChatMessageSchema);
