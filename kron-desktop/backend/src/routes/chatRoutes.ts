import { Router } from "express";
import { ChatController } from "../controllers/chatController";
import { TestcaseController } from "../controllers/testcaseController";

const router = Router();

// Health check route
router.get("/health", ChatController.healthCheck);

// Chat message route
router.post("/chat", ChatController.handleChatMessage);

router.post("/download/testcases", TestcaseController.downloadTestcaseFile);

export default router;
