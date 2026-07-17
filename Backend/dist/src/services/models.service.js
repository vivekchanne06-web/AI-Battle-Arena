import { ChatGoogle } from "@langchain/google";
import { configValues } from "../config/config.js";
import { ChatMistralAI } from "@langchain/mistralai";
import { ChatCohere } from "@langchain/cohere";
export const geminiModel = new ChatGoogle({
    model: "gemini-3.5-flash",
    apiKey: configValues.GEMINI_API_KEY,
});
export const mistralAIModel = new ChatMistralAI({
    model: "mistral-medium-latest",
    apiKey: configValues.MISTRALAI_API_KEY,
});
export const cohereModel = new ChatCohere({
    model: "command-a-03-2025",
    apiKey: configValues.COHERE_API_KEY,
});
//# sourceMappingURL=models.service.js.map