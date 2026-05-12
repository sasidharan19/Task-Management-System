import { Router } from "express";

import {
  createTask,
  getAllTasks,
  getMyTasks,
  updateTaskStatus,
} from "../controllers/task.controller";

import { authMiddleware } from "../middleware/auth.middleware";
import { roleMiddleware } from "../middleware/role.middleware";

const router = Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN"),
  createTask
);

router.get(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN"),
  getAllTasks
);

router.get(
  "/my-tasks",
  authMiddleware,
  roleMiddleware("USER"),
  getMyTasks
);

router.patch(
  "/:id/status",
  authMiddleware,
  roleMiddleware("USER"),
  updateTaskStatus
);

export default router;