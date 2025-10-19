import { Router } from "express";
import { getAllFiles } from "../controllers/upload.controller";

const router = Router();

router.get("/", getAllFiles);

export default router;