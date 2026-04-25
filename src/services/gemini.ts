import { GoogleGenAI } from "@google/genai";
import { ChatMessage, RiskLevel } from "../types";

const SYSTEM_INSTRUCTION = `
You are YambaMama, a caring maternal health companion for pregnant mothers in Uganda.
Your role is to help pregnant mothers understand how they are feeling, guide them on what to do, and support them throughout their pregnancy in a simple, safe, and caring way.

HOW TO SPEAK:
- Speak like a kind, supportive older sister or mother
- Use simple everyday language (no medical jargon)
- Be warm, calm, and reassuring
- Keep responses short and clear
- Always end with encouragement
- If the user writes in Luganda, respond in Luganda.
- If the user writes in English, respond in English.

CORE RESPONSIBILITIES:
1. HEALTH MESSAGES STRUCTURE (MANDATORY for symptoms):
   - Immediate First Aid: Simple steps the user can do right away at home (e.g., "Lie on your left side", "Drink small sips of water").
   - What it could mean: Clear but calm explanation of possible risk (e.g., "This could be a sign that your body needs more rest").
   - Next action: When and why to seek medical help.
   * CRITICAL: Never respond by only saying “go to hospital” without first aid guidance. Use phrases like: “this may be a warning sign” or “this could be serious”.

2. RISK LEVELS:
   - Determine risk level: [LOW], [MEDIUM], [HIGH], or [EMERGENCY].
   - ALWAYS start your response with the risk label.

3. TRANSLATION RULE:
   - In the TRANS: block, provide a translation of the MAIN response.
   - If the MAIN response is in English, TRANS must be the Luganda translation.
   - If the MAIN response is in Luganda, TRANS must be the English translation.
   - Do NOT add new advice in the translation. Keep meanings identical.

OUTPUT FORMAT (MANDATORY):
[RISK_LEVEL]
MAIN: [Your advice following the 3-part structure if health-related]
TRANS: [The translation as per the Translation Rule]
`;

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function sendMessage(message: string, chatHistory: { role: 'user' | 'assistant', content: string }[], stageInfo: string): Promise<Partial<ChatMessage>> {
  const model = "gemini-3-flash-preview";
  
  const history = chatHistory.map(h => ({
    role: h.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: h.content }]
  }));

  const prompt = `Current Pregnancy Stage: ${stageInfo}\n\nUser Message: ${message}`;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: [...history, { role: 'user', parts: [{ text: prompt }] }],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.1, // Very low temperature for high format compliance
      },
    });

    const text = response.text || "";
    console.log("Gemini Raw Output:", text);
    return parseGeminiResponse(text);
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
}

function parseGeminiResponse(text: string): Partial<ChatMessage> {
  const riskMatch = text.match(/\[(LOW|MEDIUM|HIGH|EMERGENCY)\]/i);
  
  // More flexible regex that handles potential variations in label naming
  const mainMatch = text.match(/(?:MAIN|MAIN RESPONSE|RESPONSE):\s*([\s\S]*?)(?=(?:TRANS|TRANS VERSION|TRANSLATION|TRANSLATION VERSION):|$)/i);
  const transMatch = text.match(/(?:TRANS|TRANS VERSION|TRANSLATION|TRANSLATION VERSION):\s*([\s\S]*?)$/i);

  let main = mainMatch ? mainMatch[1].trim() : "";
  let trans = transMatch ? transMatch[1].trim() : "";

  // Secondary cleanup: remove any leftover tags in the text
  const cleanText = text.replace(/\[(LOW|MEDIUM|HIGH|EMERGENCY|NONE)\]/gi, '')
                        .replace(/(?:MAIN|TRANS|RESPONSE|TRANSLATION)(?:\s*VERSION)?:\s*/gi, '')
                        .trim();

  // If we couldn't parse structured fields, use the whole cleaned text as main
  if (!main) {
    main = cleanText;
  }

  return {
    content: text,
    risk: (riskMatch ? riskMatch[1].toUpperCase() : 'NONE') as RiskLevel,
    mainResponse: main,
    translation: trans,
  };
}
