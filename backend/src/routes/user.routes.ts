import { Router } from "express";

import {
  createUser,
  getUsers,
} from "../controllers/user.controller";

import { authMiddleware } from "../middleware/auth.middleware";
import { roleMiddleware } from "../middleware/role.middleware";

const router = Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN"),
  createUser
);

router.get(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN"),
  getUsers
);

export default router;