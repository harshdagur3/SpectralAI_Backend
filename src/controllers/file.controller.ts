import { Request, Response, NextFunction } from "express";
import { File } from "../models/file.model";
import { AuthRequest } from "../middlewares/auth.middleware";
import cloudinary from "../config/cloudinary";

export const uploadImage = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        if (!req.file || !req.file.cloudinaryUrl) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const newFile = await File.create({
            filename: req.file.originalname,
            url: req.file.cloudinaryUrl,
            publicId: req.file.cloudinaryId,
            size: req.file.size,
            mimetype: req.file.mimetype,
            uploadedBy: req.user?.id,
        });

        res.status(200).json({
            message: "Image uploaded succussfully!",
            file: newFile,
        });
    } catch (error) {
        next(error);
    }
}

export const getAllFiles = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        let files;
        if (req.user?.role === "admin") {
            files = await File.find().populate("uploadedBy", "username");
        } else {
            files = await File.find({ uploadedBy: req.user?.id });
        }
        return res.status(200).json(files);
    } catch (error) {
        next(error);
    }
}

export const downloadFile = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const file = await File.findById(req.params.id);
        if (!file) return res.status(404).json({ error: "File not found" });
       
        const userId = req.user?.id;
        const role = req.user?.role;
        const ownerId = String(file.uploadedBy);

        if (role !== "admin" && userId !== ownerId) {
            return res.status(403).json({ error: "Access Denied!" });
        }
        
        if (!file.url) return res.status(400).json({ error: "No file URL available!" });

        const downloadUrl = file.url.replace("/upload/", "/upload/fl_attachment/");

        return res.redirect(downloadUrl);
    } catch (error) {
        next(error);
    }
}

export const deleteFile = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const file = await File.findById(req.params.id);
        if (!file) return res.status(404).json({ error: "file not found" });

        if (req.user?.role !== "admin" && req.user?.id !== file.uploadedBy.toString()) {
            return res.status(403).json({ error: "Forbiddden!" });
        }
        await cloudinary.uploader.destroy(file.publicId);
        await file.deleteOne();
        return res.status(200).json({ message: "File deleted succussfully!" });
    } catch (error) {
        next(error);
    }
}