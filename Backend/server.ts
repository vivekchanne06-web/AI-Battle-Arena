import Express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import app from "./src/app.js";

const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDistPath = path.resolve(__dirname, "../Frontend/dist");

if (fs.existsSync(frontendDistPath)) {
  app.use(Express.static(frontendDistPath));

  app.use((req, res, next) => {
    if (req.method !== "GET") {
      return next();
    }

    return res.sendFile(path.join(frontendDistPath, "index.html"));
  });
}

try {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
} catch (err) {
  console.error("Failed to start server:", err);
  process.exit(1);
}


