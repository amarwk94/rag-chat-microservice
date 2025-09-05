import { NextFunction, Request, Response } from "express";
import ChatSession from "../models/ChatSession";
import ChatMessage from "../models/ChatMessage";
import { logger } from "../utils/logger";
import { NotFoundError } from "../utils/errors/NotFoundError";
import { BadRequestError } from "../utils/errors/BadRequestError";

export const createSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, title } = req.body;
    const session = await ChatSession.create({ userId, title });
    res.status(201).json(session);
  } catch (err) {
    logger.error("Error creating session:", err);
    next(err);
  }
};

export const renameSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    if (!title) {
      throw new BadRequestError("Title is required");
    }

    const session = await ChatSession.findByIdAndUpdate(
      id,
      { title },
      { new: true }
    );
    if (!session) throw new NotFoundError("Chat session not found");
    res.json(session);
  } catch (err) {
    logger.error("Error renaming session:", err);
    next(err);
  }
};

export const toggleFavorite = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const session = await ChatSession.findById(id);
    if (!session) throw new NotFoundError("Chat session not found");

    session.isFavorite = !session.isFavorite;
    await session.save();
    res.json(session);
  } catch (err) {
    logger.error("Error toggling favorite status:", err);
    next(err);
  }
};

export const deleteSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await ChatMessage.deleteMany({ sessionId: id });
    await ChatSession.findByIdAndDelete(id);
    res.json({ message: "Session and messages deleted" });
  } catch (err) {
    logger.error("Error deleting session:", err);
    next(err);
  }
};
