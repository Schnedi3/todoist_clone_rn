import express from "express";
import cors from "cors";

import { FRONTEND_URL, PORT } from "./config/config";
import userRoutes from "./routes/userRoute";
import projectRoutes from "./routes/projectRoute";

export const app = express();

app.use(
  cors({
    origin: FRONTEND_URL,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoutes);
app.use("/api/project", projectRoutes);

app.listen(PORT);
console.log("Server running on port", PORT);
