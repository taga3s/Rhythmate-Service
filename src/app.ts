import express from "express";
import "dotenv/config";
import { healthRouter } from "./route/health";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ルーティング
app.use("/health", healthRouter)

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server is running at localhost:${PORT}`));
