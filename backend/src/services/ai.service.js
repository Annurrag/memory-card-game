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
You are an AI game coach 🎮🧠.

Analyze the player’s Memory Card Game performance and generate a review based on BOTH
the grid difficulty and the final result.

Game Data:
- Grid Size: {${gridSize}}x{${gridSize}}
- Moves Taken: {${moves}}
- Time Spent: {${time}} seconds
- Efficiency Score: {${efficiency}}

Performance Rules:
- If the grid is **4x4 or higher** AND the performance is **good or excellent** (low moves, good efficiency):
  → Respond with an **applauding, celebratory, and confident tone** 🎉👏⭐
  → Highlight strong memory, fast recall, and smart strategy

- If the performance is **average or below average** (higher moves, lower efficiency):
  → Respond with an **encouraging and motivational tone** 💪🌱✨
  → Emphasize learning, improvement, and future potential
  → Reassure the player that practice will lead to better results

Output Instructions:
- Write **exactly 3 bullet points** using emojis and special symbols
- Bullet points can be detailed and expressive
- After the bullets, add a **Conclusion section**
- The **Conclusion must be under 30 words**
- Be positive, supportive, and professional
- Do not sound robotic or critical

Format strictly as this every bullet point in different line:
• Bullet point 1  
• Bullet point 2  
• Bullet point 3  

Format rules:
- Each bullet must start on a new line
- Leave one blank line before the conclusion


Conclusion: <short concluding paragraph> also with new paragraph


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

