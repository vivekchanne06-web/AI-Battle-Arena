import { config } from "dotenv";
config();
export const configValues = {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY || "",
    MISTRALAI_API_KEY: process.env.MISTRALAI_API_KEY || "",
    COHERE_API_KEY: process.env.COHERE_API_KEY || "",
};
export const appConfig = {
    NODE_ENV: process.env.NODE_ENV || "development",
    PORT: Number(process.env.PORT || 3000),
    FRONTEND_URL: process.env.FRONTEND_URL || "",
    RATE_LIMIT_WINDOW_MS: Number(process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000),
    RATE_LIMIT_MAX: Number(process.env.RATE_LIMIT_MAX || 100),
};
//# sourceMappingURL=config.js.map