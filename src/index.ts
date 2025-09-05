import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import sessionRoutes from "./routes/sessionRoutes";
import { connectToDatabase } from "./config/db";
import { apiKeyAuth } from "./middleware/apiKeyAuth";
import { apiRateLimiter } from "./middleware/rateLimiter";
import { errorHandler } from "./middleware/errorHandler";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
import { requestLogger } from "./middleware/requestLogger";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = ["http://localhost:5000"];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like Postman or server-to-server)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true); // allow request
      } else {
        callback(new Error("Not allowed by CORS")); // block request
      }
    },
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true, // allow cookies/auth headers if needed
  })
);

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(apiRateLimiter);
app.use(requestLogger);
app.use(apiKeyAuth);
app.use("/api", sessionRoutes);
app.use(errorHandler);

connectToDatabase();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
