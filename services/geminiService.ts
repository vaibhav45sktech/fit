import { GoogleGenAI, Type } from "@google/genai";

// WARNING: In a real production app, never expose API keys on the client side.
// This is a simulation where we assume process.env.API_KEY is available.
const apiKey = process.env.API_KEY || ''; 
const ai = new GoogleGenAI({ apiKey });

export const generateStylingAdvice = async (query: string, useThinking = false) => {
  if (!apiKey) throw new Error("API Key missing");

  const modelName = useThinking ? 'gemini-3-pro-preview' : 'gemini-3-flash-preview';
  
  const config: any = {
    systemInstruction: "You are FITTARA's expert fashion stylist. You provide sophisticated, personalized advice on ethnic and modern men's fashion. Keep answers concise, stylish, and helpful.",
  };

  if (useThinking) {
    config.thinkingConfig = { thinkingBudget: 1024 }; // Lower budget for demo responsiveness
  }

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: query,
      config
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Text Error:", error);
    throw error;
  }
};

export const generateDesignPattern = async (prompt: string, resolution: "1K" | "2K" | "4K" = "1K") => {
  if (!apiKey) throw new Error("API Key missing");
  
  // Mapping resolution to imageSize if using pro model, but usually 1K is default
  // Using flash image for speed/demo unless high res requested
  const modelName = resolution === '1K' ? 'gemini-2.5-flash-image' : 'gemini-3-pro-image-preview';

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: {
        parts: [{ text: `A high quality fabric pattern design for men's ethnic wear. Style: ${prompt}` }]
      },
      config: {
        // @ts-ignore - types might not be fully updated in mock environment for specific config fields
        imageConfig: {
            aspectRatio: "1:1",
            imageSize: resolution
        }
      }
    });

    // Extract image
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Gemini Image Error:", error);
    throw error;
  }
};

export const generateRunwayVideo = async (imageBase64: string, prompt: string) => {
  if (!apiKey) throw new Error("API Key missing");

  // Mocking the video generation wait time because Veo requests can take minutes
  // In a real app, we would poll the operation.
  // Here we will start the request but for the UX demo, we might need to be careful about timeout.
  
  // Note: This environment might not support the full long-polling loop efficiently in one go.
  // We will implement the standard call.
  
  try {
    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: prompt || "A cinematic fashion runway shot of a model wearing this outfit, slow motion, 4k lighting",
      image: {
        imageBytes: imageBase64,
        mimeType: 'image/png',
      },
      config: {
        numberOfVideos: 1,
        resolution: '720p', // Fast preview supports 720p
        aspectRatio: '9:16'
      }
    });

    // Simple polling
    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 5000));
      operation = await ai.operations.getVideosOperation({operation: operation});
    }

    const videoUri = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (videoUri) {
        return `${videoUri}&key=${apiKey}`;
    }
    return null;

  } catch (error) {
    console.error("Gemini Video Error:", error);
    throw error;
  }
};
