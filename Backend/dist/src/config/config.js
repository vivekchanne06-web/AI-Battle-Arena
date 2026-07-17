import { config } from "dotenv";
config();
export const configValues = {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY || "",
    MISTRALAI_API_KEY: process.env.MISTRALAI_API_KEY || "",
    COHERE_API_KEY: process.env.COHERE_API_KEY || "",
};
//# sourceMappingURL=config.js.map