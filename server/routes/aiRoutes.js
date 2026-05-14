import express from "express";
import protect from "../middleware/authMiddleware.js";
import {generateQuestions,getMyInterviews,getInterviewById,deleteInterview} from  "../controllers/aiController.js";

const router = express.Router();

router.post("/generate", protect, generateQuestions);
router.get("/my-interviews",protect,getMyInterviews);
router.get("/interview/:id",protect,getInterviewById);
router.delete("/interview/:id",protect,deleteInterview);

export default router;