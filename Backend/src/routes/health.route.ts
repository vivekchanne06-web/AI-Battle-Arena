import Express from "express";

export const router = Express.Router();

router.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});
      