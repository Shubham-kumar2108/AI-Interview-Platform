import Groq from "groq-sdk";
import Interview from "../models/interviewModel.js";

export const generateQuestions = async (req, res) => {

  try {

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const { role, difficulty, topic } = req.body;

    const prompt = `
Generate 10 interview questions.

Role: ${role}
Difficulty: ${difficulty}
Topic: ${topic}

Return only questions.
`;

    const chatCompletion =
      await groq.chat.completions.create({

        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],

        model: "llama-3.1-8b-instant",
      });

      const generatedQuestions = chatCompletion.choices[0].message.content;

    const interview = await Interview.create({

      user: req.user._id,

      role,

      topic,

      difficulty,

      questions: generatedQuestions,
    });

    res.json({
      questions:generatedQuestions,
      interview,
    });

    

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "AI generation failed",
    });
  }
};