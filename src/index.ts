import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { DbSource } from "./config/dbSource";
import userRouter from "./routes/user";
import authRouter from "./routes/auth";

const app: Express = express();

dotenv.config();

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, this is Express + TypeScript");
});

DbSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

const port = 8080;
app.listen(port, () => {
  console.log(`[Server]: I am running at https://localhost:${port}`);
});
