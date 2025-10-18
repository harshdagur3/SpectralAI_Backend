import { Router } from "express";
import upload,{uploadToCloudinary} from "../middlewares/upload.middleware";
import { uploadImage } from "../controllers/upload.controller";
const router = Router();

router.post("/upload", upload.single("image"), uploadToCloudinary, uploadImage);

export default router;