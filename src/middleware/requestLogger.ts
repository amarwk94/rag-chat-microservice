import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { logger } from "../utils/logger";

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const traceId = uuidv4();
  req.traceId = traceId;
  res.setHeader("X-Trace-Id", traceId);
  const start = process.hrtime();

  res.on("finish", () => {
    const diff = process.hrtime(start);
    const responseTimeMs = (diff[0] * 1e3 + diff[1] / 1e6).toFixed(2);

    logger.info("Request completed", {
      traceId,
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      responseTimeMs: Number(responseTimeMs),
    });
  });

  next();
};
