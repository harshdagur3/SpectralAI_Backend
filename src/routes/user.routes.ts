import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { authorizeRoles } from "../middlewares/roles.middleware";
import { getAllUsers } from "../controllers/user.controller";

const router = Router();

router.get("/users", authMiddleware, authorizeRoles("admin"), getAllUsers);

export default router;