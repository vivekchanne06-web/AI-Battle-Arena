import { StateSchema, MessagesValue, StateGraph, START, END } from "@langchain/langgraph";
import { HumanMessage } from "@langchain/core/messages";
import { z } from "zod";
import { ReducedValue } from "@langchain/langgraph";
import { geminiModel, mistralAIModel, cohereModel } from "./models.service.js";
import { createAgent, providerStrategy } from "langchain";
const State = new StateSchema({
    messages: MessagesValue,
    solution_1: new ReducedValue(z.string().default(""), {
        reducer: (current, next) => {
            return next;
        }
    }),
    solution_2: new ReducedValue(z.string().default(""), {
        reducer: (current, next) => {
            return next;
        }
    }),
    judge_recommendation: new ReducedValue(z.object({
        solution_1_score: z.number(),
        solution_2_score: z.number(),
    }).default({
        solution_1_score: 0,
        solution_2_score: 0
    }), {
        reducer: (current, next) => {
            return next;
        }
    })
});
const solutionNode = async (state) => {
    const prompt = String(state.messages.at(-1).content);
    try {
        const [mistral_solution, cohere_solution] = await Promise.all([
            mistralAIModel.invoke(prompt),
            cohereModel.invoke(prompt),
        ]);
        return {
            solution_1: String(mistral_solution.content),
            solution_2: String(cohere_solution.content),
        };
    }
    catch (err) {
        console.error("Error generating solutions:", err);
        throw new Error("Failed to generate solutions from models");
    }
};
const judgeNode = async (state) => {
    const { solution_1, solution_2 } = state;
    const prompt = String(state.messages.at(-1).content);
    const judge = createAgent({
        model: geminiModel,
        tools: [],
        responseFormat: providerStrategy(z.object({
            solution_1_score: z.number().min(0).max(10),
            solution_2_score: z.number().min(0).max(10),
        })),
    });
    try {
        const judgeRespose = await judge.invoke({
            messages: [
                new HumanMessage(`You are a judge tasked with evaluating the quality of two solutions to a problem.
                    the  problem is: ${prompt}. the firqst solution is: ${solution_1}. the second solution is: ${solution_2}.
                    Please provide a score for each solution on a scale of 0 to 10, where 0 indicates a incorrect solution and 10 indicates an excellent solution.
                    `),
            ],
        });
        const result = judgeRespose.structuredResponse;
        return {
            judge_recommendation: result,
        };
    }
    catch (err) {
        console.error("Error running judge agent:", err);
        throw new Error("Failed to evaluate solutions");
    }
};
const graph = new StateGraph(State)
    .addNode("solution", solutionNode)
    .addNode("judge", judgeNode)
    .addEdge(START, "solution")
    .addEdge("solution", "judge")
    .addEdge("judge", END)
    .compile();
export default async function (userMessage) {
    try {
        const result = await graph.invoke({
            messages: [new HumanMessage(userMessage)],
        });
        console.log("Graph result:", result);
        return {
            solution_1: result.solution_1,
            solution_2: result.solution_2,
            judge: result.judge_recommendation,
        };
    }
    catch (err) {
        console.error("Graph invocation failed:", err);
        throw err;
    }
}
//# sourceMappingURL=graph.ai.service.js.map