import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";

import sequelize from "./db/sequelize.js";

import authRouter from "./routes/authRouter.js";
import moviesRouter from "./routes/moviesRouter.js";

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/auth", authRouter);
app.use("/api/movies", moviesRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

const {PORT = 3000} = process.env;
const port = Number(PORT);

let server = null;

try {
  await sequelize.authenticate();
  console.log("Success connect to database");
  // await sequelize.sync()
  server = app.listen(port, () => {
    console.log(`Server is running. Use our API on port: ${port}`);
  });
  
}
catch(error) {
  console.log(error);
}

export default server;