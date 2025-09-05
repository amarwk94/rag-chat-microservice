import { Request, Response, NextFunction } from "express";
import { ApiError } from "../errors/ApiError";
import { logger } from "../utils/logger";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // fallback for unexpected error types
  const statusCode =
    err instanceof ApiError && err.statusCode ? err.statusCode : 500;
  const errorType =
    err instanceof ApiError ? err.error : "Internal Server Error";
  const message = err.message || "Unexpected error occurred";

  // Include traceId if available
  const trace = req.traceId ? `[traceId=${req.traceId}]` : "";
  logger.error(`${trace} [${req.method}] ${req.originalUrl} - ${message}`);

  // Avoid crashing if headers already sent
  if (res.headersSent) {
    return next(err);
  }

  res.status(statusCode).json({
    status: statusCode,
    error: errorType,
    message,
  });
};
