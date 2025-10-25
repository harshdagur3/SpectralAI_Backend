import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { authorizeRoles } from "../middlewares/roles.middleware";
import { deleteUser, getAllUsers, getUserProfile, updateUserProfile } from "../controllers/user.controller";

const router = Router();

router.get("/allusers", authMiddleware, authorizeRoles("admin"), getAllUsers);
router.get("/profile", authMiddleware, getUserProfile);
router.patch("/profile/update", authMiddleware, updateUserProfile);
router.delete("/:id/deleteuser", authMiddleware, authorizeRoles("admin"), deleteUser);

export default router;