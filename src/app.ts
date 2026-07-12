import  Express  from "express";
import useGraph from "./services/graph.ai.service.js";

const app = Express();


app.get("/health", (req, res) => {
    res.status(200).json({ status: "OK" });
});

app.post("/use-graph", async (req, res) => {
        const result = await useGraph("write a factorial function in javascript");

        res.status(200).json({ messages: result });
    
});

export default app;

