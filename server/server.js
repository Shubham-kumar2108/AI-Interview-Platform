import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";


dotenv.config();

connectDB();

const app = express();

app.use(cors({
    origin: [
      "http://localhost:5173",
      "https://your-frontend-name.onrender.com",
    ],
    credentials: true,
  }));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API Running");
});

app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);
console.log(process.env.GEMINI_API_KEY);

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});

