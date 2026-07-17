import useGraph from "../services/graph.ai.service.js";

export async function handleUseGraph(req: any, res: any, next: any) {
  try {
    const question = req.body?.question;
    console.log("Incoming /api/use-graph question:", question);
    if (!question) {
      console.log("/api/use-graph missing question in request body");
      return res.status(400).json({ error: "Question is required" });
    }
    const result = await useGraph(question);
    console.log("/api/use-graph result:", result);
    res.status(200).json({ messages: result });
  } catch (err) {
    console.error("/api/use-graph error:", err);
    next(err);
  }
}
