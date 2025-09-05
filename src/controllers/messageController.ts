import { NextFunction, Request, Response } from "express";
import ChatMessage from "../models/ChatMessage";
import ChatSession from "../models/ChatSession";
import { logger } from "../utils/logger";
import { NotFoundError } from "../utils/errors/NotFoundError";

export const addMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { sender, content, context } = req.body;

    const sessionExists = await ChatSession.exists({ _id: id });
    if (!sessionExists) throw new NotFoundError("Session not found");

    const message = await ChatMessage.create({
      sessionId: id,
      sender,
      content,
      context,
    });

    logger.info(`Added message to session ${id}`);

    res.status(201).json(message);
  } catch (err) {
    logger.error("Error adding message:", err);
    next(err);
  }
};

export const getMessages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const page = parseInt(req.query.page as string) || 1; // default page 1
    const limit = parseInt(req.query.limit as string) || 10; // default 10 messages per page
    const skip = (page - 1) * limit;

    const messages = await ChatMessage.find({ sessionId: id })
      .sort({ createdAt: 1 })
      .skip(skip)
      .limit(limit);

    if (messages.length === 0) {
      throw new NotFoundError("No messages found");
    }

    const totalMessages = await ChatMessage.countDocuments({ sessionId: id });
    const totalPages = Math.ceil(totalMessages / limit);

    logger.info(
      `Fetched messages for session ${id}: page ${page}, limit ${limit}`
    );

    res.json({
      page,
      limit,
      totalPages,
      totalMessages,
      messages,
    });
  } catch (err) {
    logger.error("Error getting messages:", err);
    next(err);
  }
};
