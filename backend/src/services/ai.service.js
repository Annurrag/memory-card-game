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
You are an AI game coach 🎮.

Review the Memory Card Game result below and generate feedback.

Game Data:
Grid: {${gridSize}}x{${gridSize}}
Moves: {${moves}}
Time: {${time}}s
Efficiency: {${efficiency}}

Rules:
- If performance is strong for the grid size → applaud 🎉👏
- If performance is average or weak → encourage improvement 💪🌱
- Write exactly 3 bullet points (each on a new line)
- Use emojis and symbols
- Add a conclusion under 40 words
- Be concise, positive, and clear

Format:
• Bullet 1
• Bullet 2
• Bullet 3
Conclusion: short summary



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

