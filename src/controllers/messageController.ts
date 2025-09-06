import { NextFunction, Request, Response } from "express";
import * as messageService from "../services/messageService";
import { logger } from "../utils/logger";

export const addMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { sender, content, context } = req.body;
    const message = await messageService.addMessageToSession(
      id,
      sender,
      content,
      context
    );
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
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const result = await messageService.getSessionMessages(id, page, limit);
    logger.info(
      `Fetched messages for session ${id}: page ${page}, limit ${limit}`
    );
    res.json(result);
  } catch (err) {
    logger.error("Error getting messages:", err);
    next(err);
  }
};
