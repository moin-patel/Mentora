


import Groq from "groq-sdk";
import dotenv from "dotenv";
import Course from "../models/courseModel.js";

dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// -----------------------------
// MongoDB Search
// -----------------------------

const searchCourses = async (keyword) => {
  return await Course.find({
    isPublished: true,
    $or: [
      { title: { $regex: keyword, $options: "i" } },
      { subTitle: { $regex: keyword, $options: "i" } },
      { description: { $regex: keyword, $options: "i" } },
      { category: { $regex: keyword, $options: "i" } },
      { level: { $regex: keyword, $options: "i" } },
    ],
  });
};

// -----------------------------
// AI Search
// -----------------------------

export const searchWithAi = async (req, res) => {
  try {
    const { input } = req.body;

    if (!input || input.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Input Required",
      });
    }

    console.log("User Search :", input);

    //---------------------------------------
    // STEP-1
    //---------------------------------------

    let courses = await searchCourses(input);

    console.log("Mongo Search :", courses.length);

    if (courses.length > 0) {
      console.log("Course Found From Mongo");

      return res.status(200).json(courses);
    }

    //---------------------------------------
    // STEP-2
    //---------------------------------------

    console.log("Searching Using Groq...");

    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",

      temperature: 0,

      messages: [
        {
          role: "system",
          content: `
You are an LMS Search Assistant.

Convert the user's sentence into ONLY ONE keyword.

Choose ONLY from:

App Development
AI/ML
AI Tools
Data Science
Data Analytics
Ethical Hacking
UI UX Designing
Web Development
Others
Beginner
Intermediate
Advanced

Rules:

Return ONLY ONE keyword.

No explanation.

No punctuation.

No quotes.
`,
        },

        {
          role: "user",
          content: input,
        },
      ],
    });

    const keyword =
      completion.choices[0]?.message?.content?.trim() || input;

    console.log("AI Keyword :", keyword);

    //---------------------------------------
    // STEP-3
    //---------------------------------------

    courses = await searchCourses(keyword);

    console.log("AI Search :", courses.length);

    if (courses.length > 0) {
      console.log("Course Found Using AI");

      return res.status(200).json(courses);
    }

    //---------------------------------------
    // STEP-4
    //---------------------------------------

    console.log("No Course Found");

    return res.status(200).json([]);
  } catch (error) {
    console.log("Groq Error");

    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
