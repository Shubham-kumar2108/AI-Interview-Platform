import express from "express";
import protect from "../middleware/authMiddleware.js";
import {generateQuestions,getMyInterviews} from  "../controllers/aiController.js";

const router = express.Router();

router.post("/generate", protect, generateQuestions);
router.get("/my-interviews",protect,getMyInterviews);

export default router;