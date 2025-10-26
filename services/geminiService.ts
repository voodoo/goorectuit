
import { GoogleGenAI, Type } from "@google/genai";
import type { RecruitmentAssets } from '../types';

const generatePrompt = (notes: string): string => `
Based on the following raw notes for a job role, please generate two outputs in a single JSON object:
1. A professionally written, polished, and correctly formatted Job Description suitable for posting on LinkedIn. The description should be a single string, incorporating markdown for formatting (e.g., headings like '## Responsibilities', bullet points using '*').
2. An Interview Guide containing exactly 10 behavioral questions designed to assess the key soft and hard skills outlined in the generated Job Description. This should be an array of strings.

The JSON object must strictly adhere to the provided schema.

Here are the raw notes:
---
${notes}
---
`;

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    jobDescription: {
      type: Type.STRING,
      description: "A polished, markdown-formatted job description for LinkedIn. Use markdown for headings and lists.",
    },
    interviewGuide: {
      type: Type.ARRAY,
      description: "An array of exactly 10 behavioral interview questions.",
      items: {
        type: Type.STRING,
      },
    },
  },
  required: ["jobDescription", "interviewGuide"],
};

export const generateRecruitmentAssets = async (notes: string, thinkingMode: boolean): Promise<RecruitmentAssets> => {
  try {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY environment variable not set");
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const model = thinkingMode ? 'gemini-2.5-pro' : 'gemini-2.5-flash';
    const config = {
      responseMimeType: "application/json",
      responseSchema: responseSchema,
      ...(thinkingMode && { thinkingConfig: { thinkingBudget: 32768 } }),
    };

    const response = await ai.models.generateContent({
      model: model,
      contents: generatePrompt(notes),
      config: config,
    });
    
    const responseText = response.text.trim();
    const parsedResponse: RecruitmentAssets = JSON.parse(responseText);

    if (!parsedResponse.jobDescription || !parsedResponse.interviewGuide) {
        throw new Error("Invalid response format from API.");
    }

    return parsedResponse;

  } catch (error) {
    console.error("Error generating recruitment assets:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate content: ${error.message}`);
    }
    throw new Error("An unknown error occurred while contacting the Gemini API.");
  }
};
