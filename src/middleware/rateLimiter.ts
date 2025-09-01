import rateLimit from "express-rate-limit";

export const apiRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 60, // limit each IP to 100 requests per window
  message: "Too many requests, please try again later.",
  skip: (req) => {
    // Skip rate limiting for health endpoint
    return req.path === "/api/health";
  },
});
