
import { GoogleGenAI, Type } from "@google/genai";

// Helper to lazily initialize the Google GenAI client safely.
const getAIClient = () => {
  const key = process.env.API_KEY || process.env.GEMINI_API_KEY;
  if (!key) {
    throw new Error("Gemini API key is not configured. Please add GEMINI_API_KEY to your Vercel Environment Variables.");
  }
  return new GoogleGenAI({ apiKey: key });
};

export const factCheck = async (claim: string) => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Verify the following claim in the context of Ghana. Provide a verdict (True, False, or Misleading), a concise explanation, and potential reliable sources to check. Claim: "${claim}"`,
    config: {
      temperature: 0.1,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          verdict: { type: Type.STRING },
          explanation: { type: Type.STRING },
          sources: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["verdict", "explanation", "sources"]
      }
    }
  });
  // Access the text property directly from GenerateContentResponse.
  return JSON.parse(response.text || '{}');
};

export const getCivicLesson = async (topic: string) => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Explain "${topic}" in the context of the Ghanaian local government system. Use simple language suitable for a 15-year-old. Include a quiz with 3 multiple-choice questions.`,
    config: {
      temperature: 0.7,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          content: { type: Type.STRING },
          quiz: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                question: { type: Type.STRING },
                options: { type: Type.ARRAY, items: { type: Type.STRING } },
                correctAnswer: { type: Type.NUMBER }
              },
              required: ["question", "options", "correctAnswer"]
            }
          }
        },
        required: ["title", "content", "quiz"]
      }
    }
  });
  // Access the text property directly from GenerateContentResponse.
  return JSON.parse(response.text || '{}');
};
