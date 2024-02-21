import express from "express";
import "dotenv/config";
import { healthRouter, userRouter } from "./route";
import { cookie } from "express-validator";

const app = express();

app.use(cookie())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ルーティング
app.use("/v1/health", healthRouter)
app.use("/v1/users", userRouter)

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server is running at localhost:${PORT}`));
