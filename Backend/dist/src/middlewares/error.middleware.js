export default function errorHandler(err, req, res, next) {
    console.error("Unhandled error:", err);
    const status = Number(err?.statusCode || err?.status || 500);
    const message = status >= 500 ? "Internal Server Error" : err?.message || "Request failed";
    res.status(status).json({ error: message });
}
//# sourceMappingURL=error.middleware.js.map