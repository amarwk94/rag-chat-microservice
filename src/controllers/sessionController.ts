import { Request, Response } from "express";
import ChatSession from "../models/ChatSession";
import ChatMessage from "../models/ChatMessage";
import { logger } from "../utils/logger";

export const createSession = async (req: Request, res: Response) => {
  try {
    const { userId, title } = req.body;
    const session = await ChatSession.create({ userId, title });
    res.status(201).json(session);
  } catch (err) {
    logger.error("Error creating session:", err);
    res.status(500).json({ error: "Failed to create session" });
  }
};

export const renameSession = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const session = await ChatSession.findByIdAndUpdate(
      id,
      { title },
      { new: true }
    );
    if (!session) return res.status(404).json({ error: "Session not found" });
    res.json(session);
  } catch (err) {
    logger.error("Error renaming session:", err);
    res.status(500).json({ error: "Failed to rename session" });
  }
};

export const toggleFavorite = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const session = await ChatSession.findById(id);
    if (!session) return res.status(404).json({ error: "Session not found" });

    session.isFavorite = !session.isFavorite;
    await session.save();
    res.json(session);
  } catch (err) {
    logger.error("Error toggling favorite status:", err);
    res.status(500).json({ error: "Failed to update favorite status" });
  }
};

export const deleteSession = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await ChatMessage.deleteMany({ sessionId: id });
    await ChatSession.findByIdAndDelete(id);
    res.json({ message: "Session and messages deleted" });
  } catch (err) {
    logger.error("Error deleting session:", err);
    res.status(500).json({ error: "Failed to delete session" });
  }
};
