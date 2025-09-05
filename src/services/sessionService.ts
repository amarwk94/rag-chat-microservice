import ChatSession from "../models/ChatSession";
import ChatMessage from "../models/ChatMessage";
import { NotFoundError } from "../errors/NotFoundError";
import { BadRequestError } from "../errors/BadRequestError";
import { ERROR_MESSAGES } from "../constants";

export const createSession = async (userId: string, title: string) => {
  return await ChatSession.create({ userId, title });
};

export const renameSession = async (id: string, title: string) => {
  if (!title) {
    throw new BadRequestError(ERROR_MESSAGES.TITLE_REQUIRED);
  }
  const session = await ChatSession.findByIdAndUpdate(
    id,
    { title },
    { new: true }
  );
  if (!session) throw new NotFoundError(ERROR_MESSAGES.CHAT_SESSION_NOT_FOUND);
  return session;
};

export const toggleFavorite = async (id: string) => {
  const session = await ChatSession.findById(id);
  if (!session) throw new NotFoundError(ERROR_MESSAGES.CHAT_SESSION_NOT_FOUND);
  session.isFavorite = !session.isFavorite;
  await session.save();
  return session;
};

export const deleteSession = async (id: string) => {
  await ChatMessage.deleteMany({ sessionId: id });
  await ChatSession.findByIdAndDelete(id);
  return { message: "Session and messages deleted" };
};
