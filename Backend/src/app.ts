import Express from "express";
import cors from "cors";
import graphRoutes from "./routes/graph.route.js";
import { router as healthRouter } from "./routes/health.route.js";
import errorHandler from "./middlewares/error.middleware.js";

const app = Express();

const allowedOrigins = new Set([
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:4173",
    "http://127.0.0.1:4173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]);

app.use(cors({
    origin: (origin: string | undefined, callback: (error: Error | null, allow?: boolean) => void) => {
        if (!origin || allowedOrigins.has(origin)) {
            callback(null, true);
            return;
        }

        callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}));

app.use(Express.json());

app.use("/api", graphRoutes);
app.use("/api/health", healthRouter);

app.use(errorHandler);

export default app;

