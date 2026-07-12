import { config } from "dotenv";
config();

type CONFIG = {
  readonly GEMINI_API_KEY: string;
  readonly MISTRALAI_API_KEY: string;
  readonly COHERE_API_KEY: string;
};

export const configValues: CONFIG = {
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || "",
  MISTRALAI_API_KEY: process.env.MISTRALAI_API_KEY || "",
  COHERE_API_KEY: process.env.COHERE_API_KEY || "",
};