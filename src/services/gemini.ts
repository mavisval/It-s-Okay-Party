console.log('环境变量VITE_GEMINI_API_KEY:', import.meta.env.VITE_GEMINI_API_KEY);
import { GoogleGenAI, Type } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("API Key is missing! Please set VITE_GEMINI_API_KEY in .env");
}
const ai = new GoogleGenAI({ apiKey });

export async function generateEncouragement(troubleText: string, userReply?: string) {
  try {
    const prompt = userReply 
      ? `你是一个温暖治愈的小伙伴。一个小朋友分享了他的烦恼：\"${troubleText}\"。
         他自己写了一句鼓励的话：\"${userReply}\"。
         现在我们要把这个烦恼变成一场绚丽的烟花。请根据他的鼓励，生成一句更具共鸣、温暖、充满力量的补充鼓励（不超过20字），并配上一个合适的表情符号。`
      : `你是一个温暖治愈的小伙伴。一个小朋友分享了他的烦恼：\"${troubleText}\"。现在我们要把这个烦恼变成一场绚丽的烟花。请生成一句简短、温暖、充满力量的鼓励话语（不超过20字），并配上一个合适的表情符号。`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            text: { type: Type.STRING },
            emoji: { type: Type.STRING }
          },
          required: ["text", "emoji"]
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini generation failed:", error);
    return { text: "没关系，一切都会好起来的！", emoji: "✨" };
  }
}
