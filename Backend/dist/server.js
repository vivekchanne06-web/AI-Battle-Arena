import "dotenv/config";
import { appConfig } from "./src/config/config.js";
import app from "./src/app.js";
const PORT = appConfig.PORT;
try {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
}
//# sourceMappingURL=server.js.map