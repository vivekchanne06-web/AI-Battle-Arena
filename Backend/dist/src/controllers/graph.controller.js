import useGraph from "../services/graph.ai.service.js";
import { z } from "zod";
const useGraphRequestSchema = z.object({
    question: z.string().trim().min(1, "Question is required").max(4000, "Question is too long"),
});
export async function handleUseGraph(req, res, next) {
    try {
        const parsedRequest = useGraphRequestSchema.safeParse(req.body);
        if (!parsedRequest.success) {
            return res.status(400).json({
                error: parsedRequest.error.issues[0]?.message || "Question is required",
            });
        }
        const { question } = parsedRequest.data;
        console.log("Incoming /api/use-graph question:", question);
        const result = await useGraph(question);
        res.status(200).json({ messages: result });
    }
    catch (err) {
        console.error("/api/use-graph error:", err);
        next(err);
    }
}
//# sourceMappingURL=graph.controller.js.map