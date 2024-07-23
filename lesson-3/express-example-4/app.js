import express from "express";
import cors from "cors";

import moviesRouter from "./routes/moviesRouter.js";

const app = express();

app.use(cors());

app.use("/api/movies", moviesRouter);

app.use((req, res)=> {
    res.status(404).json({
        message: `${req.url} not found`
    })
})

app.listen(3000, ()=> console.log("Server running on 3000 PORT"));