import { Router } from "express";
import {
  createSession,
  deleteSession,
  renameSession,
  toggleFavorite,
} from "../controllers/sessionController";
import { addMessage, getMessages } from "../controllers/messageController";
import { logger } from "../utils/logger";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Sessions
 *     description: Manage chat sessions
 *   - name: Messages
 *     description: Manage messages in chat sessions
 *   - name: Health
 *     description: Health check endpoint
 */

/**
 * @swagger
 * /api/sessions:
 *   post:
 *     summary: Create a new chat session
 *     tags: [Sessions]
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *             properties:
 *               userId:
 *                 type: string
 *               title:
 *                 type: string
 *     responses:
 *       201:
 *         description: Session created successfully
 */
router.post("/sessions", createSession);

/**
 * @swagger
 * /api/sessions/{id}/rename:
 *   patch:
 *     summary: Rename a chat session
 *     tags: [Sessions]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       200:
 *         description: Session renamed
 */
router.patch("/sessions/:id/rename", renameSession);

/**
 * @swagger
 * /api/sessions/{id}/favorite:
 *   patch:
 *     summary: Toggle favorite status of a session
 *     tags: [Sessions]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Favorite status updated
 */
router.patch("/sessions/:id/favorite", toggleFavorite);

/**
 * @swagger
 * /api/sessions/{id}:
 *   delete:
 *     summary: Delete a session and its messages
 *     tags: [Sessions]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Session and messages deleted
 */
router.delete("/sessions/:id", deleteSession);

/**
 * @swagger
 * /api/sessions/{id}/messages:
 *   post:
 *     summary: Add a message to a session
 *     tags: [Messages]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - sender
 *               - content
 *             properties:
 *               sender:
 *                 type: string
 *                 enum: [user, assistant]
 *               content:
 *                 type: string
 *               context:
 *                 type: string
 *     responses:
 *       201:
 *         description: Message added
 */
router.post("/sessions/:id/messages", addMessage);

/**
 * @swagger
 * /api/sessions/{id}/messages:
 *   get:
 *     summary: Get paginated messages of a session
 *     tags: [Messages]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: page
 *         in: query
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: limit
 *         in: query
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Paginated messages returned
 */
router.get("/sessions/:id/messages", getMessages);

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Health check
 *     tags: [Health]
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Service is healthy
 */
router.get("/health", (req, res) => {
  logger.info("Health check endpoint called");
  res.status(200).json({ status: "ok" });
});

export default router;
