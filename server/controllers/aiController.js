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

    const generatedQuestions = chatCompletion?.choices?.[0]?.message?.content || "";


    const interview = await Interview.create({

      user: req.user._id,

      role,

      topic,

      difficulty,

      questions: generatedQuestions,
    });

    res.json({
      questions: generatedQuestions,
      interview,
    });



  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: error.message,
    });
  }
};


export const getMyInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find({
      user: req.user._id,
    }).sort({ creaatedAt: -1 });
    res.json(interviews);
  } catch {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const getInterviewById = async (req, res) => {
  try {
    const interview = await Interview.findById(
      req.params.id
    );
    if (!interview) {
      return res.status(404).json({
        message: "Interview not found",
      });
    }
    if (
      interview.user.toString() !==
      req.user.id
    ) {

      return res.status(401).json({
        message: "Not authorized",
      });
    }
    res.json(interview);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: error.message,
    });
  }
};

export const deleteInterview = async (req,res) => {
  try {
    const interview = await Interview.findById(req.params.id);

    if (!interview) {
      return res.status(404).json({
        message: "Interview not found",
      });
    }
    if (
      interview.user.toString() !==
      req.user.id
    ) {

      return res.status(401).json({
        message: "Not authorized",
      });
    }
    await interview.deleteOne();

    res.json({
      message: "Interview deleted",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: error.message,
    });
  }
};