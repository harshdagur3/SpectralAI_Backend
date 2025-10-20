import { Router } from "express";
import upload, { uploadToCloudinary } from "../middlewares/upload.middleware";
import { downloadFile, getAllFiles, uploadImage } from "../controllers/file.controller";
const router = Router();

router.post("/upload", upload.single("image"), uploadToCloudinary, uploadImage);
router.get("/", getAllFiles);
router.get("/:id/download", downloadFile);

export default router;