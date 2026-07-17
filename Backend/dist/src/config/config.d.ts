type CONFIG = {
    readonly GEMINI_API_KEY: string;
    readonly MISTRALAI_API_KEY: string;
    readonly COHERE_API_KEY: string;
};
type AppConfig = {
    readonly NODE_ENV: string;
    readonly PORT: number;
    readonly FRONTEND_URL: string;
    readonly RATE_LIMIT_WINDOW_MS: number;
    readonly RATE_LIMIT_MAX: number;
};
export declare const configValues: CONFIG;
export declare const appConfig: AppConfig;
export {};
//# sourceMappingURL=config.d.ts.map