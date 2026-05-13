import express from "express";
import protect from "../middleware/authMiddleware.js";
import {generateQuestions} from  "../controllers/aiController.js";

const router = express.Router();

router.post("/generate", protect, generateQuestions);

export default router;