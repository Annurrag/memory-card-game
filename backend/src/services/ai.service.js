// Make sure to include the following import:
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API);
const model = genAI.getGenerativeModel({model : "gemini-1.5-flash"});

async function generateContent(prompt) {
  const result = await model.generateContent(prompt);

  return result.response.text();
}

module.exports =  generateContent;