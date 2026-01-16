// Make sure to include the following import:
const { GoogleGenerativeAI } = require("@google/generative-ai");


if (!process.env.GOOGLE_GEMINI_API) {
  throw new Error("Missing GOOGLE_GEMINI_API");
}

let model;
try {
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API);
  model = genAI.getGenerativeModel({
    model: "gemini-3-flash-preview",
  });
  console.log("✓ Gemini AI initialized successfully");
} catch (error) {
  console.error("✗ Error initializing Gemini AI:", error.message);
  throw error;
}

async function generateReview({gridSize, moves, time, efficiency}) {
   const prompt = `
You are an AI game coach.

Based on the player's performance below, write a short motivational review
(2–3 bullet sentences, max 50 words).

Grid size: ${gridSize}x${gridSize}
Moves: ${moves}
Time: ${time} seconds
Efficiency score: ${efficiency}

Rules:
- Be encouraging
- Mention one strength
- Suggest one improvement
- Do not use emojis
`;

  try {
    console.log("📝 Generating review with prompt...");
    const result = await model.generateContent(prompt);
    console.log("✓ Response received:", result);
    const text = result.response.text();
    console.log("✓ Text extracted:", text);
    return text;
  } catch (error) {
    console.error("✗ Error in generateReview:", error.message);
    throw error;
  }
}


module.exports =  generateReview;

