import { GoogleGenAI } from "@google/genai";
import "dotenv/config";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

export async function generateResponse(userInput, messages) {
  const conversation = messages
    .map(
      (msg) =>
        `${msg.role === "user" ? "User" : "Assistant"}: ${
          msg.content
        }`
    )
    .join("\n");
  const prompt = `
You are a helpful, knowledgeable, and friendly AI assistant.

Instructions:
- Answer the user's question accurately.
- Be concise unless the user asks for a detailed explanation.
- If the user asks for code, provide code examples.
- If the user asks a technical question, explain step-by-step when appropriate.
- If you don't know something, say so rather than making up information.
- Use conversation history as a context.
Converstation History: ${conversation}
User Query:
${userInput}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    // config: {
    //   responseMimeType: "application/json",
    //   responseSchema: zodToJsonSchema(interviewReportSchema),
    // },
  });
  return response.text;
}

