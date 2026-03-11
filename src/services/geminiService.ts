import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const geminiService = {
  async getCanvasSuggestions(section: string, currentContent: string, ventureName: string) {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are an expert startup coach. The startup is called "${ventureName}". 
      The user is working on the "${section}" section of their Venture Canvas.
      Current content: "${currentContent}"
      Provide 3-5 concise, actionable suggestions to improve this section. 
      Focus on clarity, proof, and market validation.`,
    });
    return response.text;
  },

  async getCoachResponse(message: string, context: any) {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are Seedproof AI Coach, a helpful assistant for early-stage founders.
      Context about the founder's venture: ${JSON.stringify(context)}
      User message: "${message}"
      Provide strategic advice, suggest next steps, or answer questions about building a startup.
      Keep it encouraging but realistic.`,
    });
    return response.text;
  },

  async generatePitchContent(canvas: any) {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a professional investor pitch outline based on this Venture Canvas:
      ${JSON.stringify(canvas)}
      Include sections for: Problem, Solution, Market, Traction, Business Model, Team, and Ask.
      Format it as a structured outline with key bullet points for each slide.`,
    });
    return response.text;
  }
};
