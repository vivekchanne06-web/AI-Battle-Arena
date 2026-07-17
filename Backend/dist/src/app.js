import Express from "express";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { appConfig } from "./config/config.js";
import graphRoutes from "./routes/graph.route.js";
import { router as healthRouter } from "./routes/health.route.js";
import notFoundHandler from "./middlewares/not-found.middleware.js";
import errorHandler from "./middlewares/error.middleware.js";
const app = Express();
const allowedOrigins = appConfig.FRONTEND_URL.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
const corsOptions = {
    origin(origin, callback) {
        if (!origin) {
            return callback(null, true);
        }
        if (appConfig.NODE_ENV !== "production" && allowedOrigins.length === 0) {
            return callback(null, true);
        }
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    methods: ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 204,
};
app.use(helmet());
app.use(compression());
app.use(morgan(appConfig.NODE_ENV === "production" ? "combined" : "dev"));
app.use(rateLimit({
    windowMs: appConfig.RATE_LIMIT_WINDOW_MS,
    limit: appConfig.RATE_LIMIT_MAX,
    standardHeaders: true,
    legacyHeaders: false,
}));
app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));
app.use(Express.json());
app.use("/api", graphRoutes);
app.use("/api/health", healthRouter);
app.use(notFoundHandler);
app.use(errorHandler);
export default app;
//# sourceMappingURL=app.js.map