import Express from "express";
export const router = Express.Router();
router.get("/", (req, res) => {
    res.status(200).json({ status: "OK" });
});
//# sourceMappingURL=health.route.js.map