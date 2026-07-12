// // // import { GoogleGenAI } from "@google/genai";
// // // import Course from "../models/courseModel.js";
// // // import dotenv from "dotenv";
// // // dotenv.config();

// // // // Naye SDK ke hisab se initialization
// // // const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// // // export const searchWithAi = async (req, res) => {
// // //   try {
// // //     const { input } = req.body;
// // //     if (!input) return res.status(400).json({ message: "Input required" });

// // //     // AI se category nikalna
// // //     const prompt = `Classify this query: "${input}" into one of these categories: App Development, AI/ML, Data Science, Web Development, Others. Return ONLY the category name.`;

// // //     const interaction = await ai.interactions.create({
// // //       model: "gemini-3.5-flash",
// // //       input: prompt,
// // //     });

// // //     const keyword = interaction.output_text.trim()|| input;
// // //     console.log("AI Detected Keyword:", keyword);

// // //     // Database Search
// // //     let courses = await Course.find({
// // //       isPublished: true,
// // //       $or: [
// // //         { title: { $regex: input, $options: 'i' } },
// // //         { category: { $regex: keyword, $options: 'i' } }
// // //       ]
// // //     });

// // //     res.status(200).json(courses);
// // //   } catch (error) {
// // //     console.error("AI Error:", error);
// // //     res.status(500).json({ message: "Server error", error: error.message });
// // //   }
// // // };

// // import { GoogleGenAI } from "@google/genai";
// // import dotenv from "dotenv";
// // import Course from "../models/courseModel.js";
// // dotenv.config();

// // // Naye SDK ke hisab se initialization
// // const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// // export const searchWithAi = async (req, res) => {
// //   try {
// //     const { input } = req.body;
// //     if (!input) return res.status(400).json({ message: "Input required" });

// //     // AI se category nikalna
// //    const prompt=`You are an intelligent assistant for an LMS platform. A user will type any query about what they want to learn. Your task is to understand the intent and return one **most relevant keyword** from the following list of course categories and levels:

// // - App Development  
// // - AI/ML  
// // - AI Tools  
// // - Data Science  
// // - Data Analytics  
// // - Ethical Hacking  
// // - UI UX Designing  
// // - Web Development  
// // - Others  
// // - Beginner  
// // - Intermediate  
// // - Advanced  

// // Only reply with one single keyword from the list above that best matches the query. Do not explain anything. No extra text.

// // Query: ${input}`

// //     const interaction = await ai.interactions.create({
// //       model: "gemini-3.5-flash",
// //       input: prompt,
// //     });

// //     const keyword = interaction.output_text || input;
// //     console.log("AI Detected Keyword:", keyword);

// //     // Database Search
  

// //     const courses = await Course.find({
// //       isPublished: true,
// //      $or: [
// //     { title: { $regex: input, $options: 'i' } },
// //     { subTitle: { $regex: input, $options: 'i' } },
// //     { description: { $regex: input, $options: 'i' } },
// //     { category: { $regex: input, $options: 'i' } },
// //     { level: { $regex: input, $options: 'i' } }
// //   ]
// //     });

// //     if(courses.length>0){
// //     return res.status(200).json(courses);
// //     }else{
// //        const courses = await Course.find({
// //       isPublished: true,
// //      $or: [
// //     { title: { $regex: keyword, $options: 'i' } },
// //     { subTitle: { $regex: keyword, $options: 'i' } },
// //     { description: { $regex: keyword, $options: 'i' } },
// //     { category: { $regex: keyword, $options: 'i' } },
// //     { level: { $regex: keyword, $options: 'i' } }
// //   ]
// //     });
// //        return res.status(200).json(courses);
// //     }


// //     } catch (error) {
// //         console.log(error)
// //     }
// // }

// import { GoogleGenAI } from "@google/genai";
// import dotenv from "dotenv";
// import Course from "../models/courseModel.js";

// dotenv.config();

// const ai = new GoogleGenAI({
//   apiKey: process.env.GEMINI_API_KEY,
// });

// // Database Search Helper
// const searchCourses = async (keyword) => {
//   return await Course.find({
//     isPublished: true,
//     $or: [
//       { title: { $regex: keyword, $options: "i" } },
//       { subTitle: { $regex: keyword, $options: "i" } },
//       { description: { $regex: keyword, $options: "i" } },
//       { category: { $regex: keyword, $options: "i" } },
//       { level: { $regex: keyword, $options: "i" } },
//     ],
//   });
// };

// export const searchWithAi = async (req, res) => {
//   console.log("======================================");
//   console.log("AI Search API Called");

//   try {
//     const { input } = req.body;

//     console.log("Request Body :", req.body);

//     if (!input || input.trim() === "") {
//       console.log("Input Missing");

//       return res.status(400).json({
//         success: false,
//         message: "Input Required",
//       });
//     }

//     console.log("User Input :", input);

//     //-------------------------------------------------------
//     // STEP-1 : Search with Original Input
//     //-------------------------------------------------------

//     console.log("Searching with Original Input...");

//     let courses = await searchCourses(input);

//     console.log("Original Search Result :", courses.length);

//     if (courses.length > 0) {
//       console.log("Courses Found Using Original Input");

//       return res.status(200).json(courses);
//     }

//     //-------------------------------------------------------
//     // STEP-2 : Ask Gemini
//     //-------------------------------------------------------

//     console.log("No Result Found.");
//     console.log("Sending Query To Gemini...");

//     const prompt = `
// You are an AI assistant for an LMS platform.

// Convert the user's sentence into ONLY ONE keyword from this list.

// App Development
// AI/ML
// AI Tools
// Data Science
// Data Analytics
// Ethical Hacking
// UI UX Designing
// Web Development
// Others
// Beginner
// Intermediate
// Advanced

// Rules:

// Return ONLY one keyword.
// No explanation.
// No punctuation.
// No quotes.
// No markdown.

// User Query:
// ${input}
// `;

//     const interaction = await ai.interactions.create({
//       model: "gemini-3.5-flash",
//       input: prompt,
//     });

//     console.log("Gemini Response Received");

//     let keyword =
//       interaction.output_text?.trim().replace(/["'.]/g, "") || input;

//     console.log("AI Keyword :", keyword);

//     //-------------------------------------------------------
//     // STEP-3 : Search with AI Keyword
//     //-------------------------------------------------------

//     console.log("Searching Using AI Keyword...");

//     courses = await searchCourses(keyword);

//     console.log("AI Search Result :", courses.length);

//     if (courses.length > 0) {
//       console.log("Courses Found Using AI");

//       return res.status(200).json(courses);
//     }

//     //-------------------------------------------------------
//     // STEP-4 : No Result
//     //-------------------------------------------------------

//     console.log("No Courses Found");

//     return res.status(200).json([]);
//   } catch (error) {
//     console.log("======================================");
//     console.log("Controller Error");
//     console.log(error);

//     if (error.response) {
//       console.log(error.response.data);
//     }

//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };


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