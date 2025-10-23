import { Router } from "express";
import upload, { uploadToCloudinary } from "../middlewares/upload.middleware";
import { downloadFile, getAllFiles, uploadImage } from "../controllers/file.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { authorizeRoles } from "../middlewares/roles.middleware";

const router = Router();

router.post("/upload", authMiddleware, authorizeRoles("admin", "user"), upload.single("image"), uploadToCloudinary, uploadImage);
router.get("/allfiles", authMiddleware, authorizeRoles("admin", "user"), getAllFiles);
router.get("/:id/download",authMiddleware,authorizeRoles("admin","user"), downloadFile);

export default router;