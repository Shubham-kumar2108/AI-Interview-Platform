import Groq from "groq-sdk";

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

    res.json({
      questions:
        chatCompletion.choices[0].message.content,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "AI generation failed",
    });
  }
};