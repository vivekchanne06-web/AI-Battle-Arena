import Express from "express";
import { handleUseGraph } from "../controllers/graph.controller.js";
const router = Express.Router();
router.post("/use-graph", handleUseGraph);
export default router;
//# sourceMappingURL=graph.route.js.map