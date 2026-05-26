import express from "express";
import protect from "../middleware/authMiddleware.js";
import {generateQuestions,getMyInterviews,getInterviewById,deleteInterview,generateResumeQuestions} from  "../controllers/aiController.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/generate", protect, generateQuestions);
router.get("/my-interviews",protect,getMyInterviews);
router.get("/interview/:id",protect,getInterviewById);
router.delete("/interview/:id",protect,deleteInterview);
router.post("/resume-generate",protect,upload.single("resume"),generateResumeQuestions);

export default router;