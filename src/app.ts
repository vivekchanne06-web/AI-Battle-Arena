import  Express  from "express";
 
const app = Express();


app.get("/health", (req, res) => {
    res.status(200).json({ status: "OK" });
});


export default app;

