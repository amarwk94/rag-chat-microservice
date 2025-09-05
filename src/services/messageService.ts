import ChatMessage from "../models/ChatMessage";
import ChatSession from "../models/ChatSession";
import { NotFoundError } from "../errors/NotFoundError";

export const addMessageToSession = async (
  sessionId: string,
  sender: string,
  content: string,
  context?: any
) => {
  const sessionExists = await ChatSession.exists({ _id: sessionId });
  if (!sessionExists) throw new NotFoundError("Session not found");

  const message = await ChatMessage.create({
    sessionId,
    sender,
    content,
    context,
  });
  return message;
};

export const getSessionMessages = async (
  sessionId: string,
  page: number = 1,
  limit: number = 10
) => {
  const skip = (page - 1) * limit;
  const messages = await ChatMessage.find({ sessionId })
    .sort({ createdAt: 1 })
    .skip(skip)
    .limit(limit);

  if (messages.length === 0) {
    throw new NotFoundError("No messages found");
  }

  const totalMessages = await ChatMessage.countDocuments({ sessionId });
  const totalPages = Math.ceil(totalMessages / limit);

  return {
    page,
    limit,
    totalPages,
    totalMessages,
    messages,
  };
};
