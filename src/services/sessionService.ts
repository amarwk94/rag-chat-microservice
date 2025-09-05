import ChatSession from "../models/ChatSession";
import ChatMessage from "../models/ChatMessage";
import { NotFoundError } from "../errors/NotFoundError";
import { BadRequestError } from "../errors/BadRequestError";

export const createSession = async (userId: string, title: string) => {
  return await ChatSession.create({ userId, title });
};

export const renameSession = async (id: string, title: string) => {
  if (!title) {
    throw new BadRequestError("Title is required");
  }
  const session = await ChatSession.findByIdAndUpdate(
    id,
    { title },
    { new: true }
  );
  if (!session) throw new NotFoundError("Chat session not found");
  return session;
};

export const toggleFavorite = async (id: string) => {
  const session = await ChatSession.findById(id);
  if (!session) throw new NotFoundError("Chat session not found");
  session.isFavorite = !session.isFavorite;
  await session.save();
  return session;
};

export const deleteSession = async (id: string) => {
  await ChatMessage.deleteMany({ sessionId: id });
  await ChatSession.findByIdAndDelete(id);
  return { message: "Session and messages deleted" };
};
