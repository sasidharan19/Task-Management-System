import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import taskRoutes from "./routes/task.routes";

const app = express();

app.use(
  cors({
    origin: '*',
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "API Running"
  });
});

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);

export default app;