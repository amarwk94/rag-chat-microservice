import { NextFunction, Request, Response } from "express";
import * as sessionService from "../services/sessionService";
import { logger } from "../utils/logger";

export const createSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, title } = req.body;
    const session = await sessionService.createSession(userId, title);
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
    const session = await sessionService.renameSession(id, title);
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
    const session = await sessionService.toggleFavorite(id);
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
    const result = await sessionService.deleteSession(id);
    res.json(result);
  } catch (err) {
    logger.error("Error deleting session:", err);
    next(err);
  }
};
