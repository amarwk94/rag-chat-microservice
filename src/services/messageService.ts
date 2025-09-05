import ChatMessage from "../models/ChatMessage";
import ChatSession from "../models/ChatSession";
import { NotFoundError } from "../errors/NotFoundError";
import { ERROR_MESSAGES, PAGINATION } from "../constants";

export const addMessageToSession = async (
  sessionId: string,
  sender: string,
  content: string,
  context?: any
) => {
  const sessionExists = await ChatSession.exists({ _id: sessionId });
  if (!sessionExists) throw new NotFoundError(ERROR_MESSAGES.SESSION_NOT_FOUND);

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
  page: number = PAGINATION.DEFAULT_PAGE,
  limit: number = PAGINATION.DEFAULT_LIMIT
) => {
  const skip = (page - 1) * limit;
  const messages = await ChatMessage.find({ sessionId })
    .sort({ createdAt: 1 })
    .skip(skip)
    .limit(limit);

  if (messages.length === 0) {
    throw new NotFoundError(ERROR_MESSAGES.NO_MESSAGES_FOUND);
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
