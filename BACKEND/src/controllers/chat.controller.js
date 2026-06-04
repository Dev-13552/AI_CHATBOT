import { generateResponse } from "../services/ai.service.js";

export async function getResponseController(req, res) {
  try {
    const { text, messages } = req.body;
    const recentMessages = messages.slice(-15);

    if (!text?.trim()) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const response = await generateResponse(text.trim(), recentMessages);

    return res.status(200).json({
      success: true,
      aiResponse: response,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong, Failed to generate AI response"
    });
  }
}
