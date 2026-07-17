export default function notFoundHandler(req, res) {
    res.status(404).json({ error: `Route not found: ${req.method} ${req.originalUrl}` });
}
//# sourceMappingURL=not-found.middleware.js.map