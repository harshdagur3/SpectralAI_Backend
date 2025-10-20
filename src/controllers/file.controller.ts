import { Request, Response, NextFunction } from "express";
import { File } from "../models/file.model";

export const uploadImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.file || !req.file.cloudinaryUrl) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const newFile = await File.create({
            filename: req.file.originalname,
            url: req.file.cloudinaryUrl,
            size: req.file.size,
            mimetype: req.file.mimetype,
        });

        res.status(200).json({
            message: "Image uploaded succussfully!",
            file: newFile,
        });
    } catch (error) {
        next(error);
    }
}

export const getAllFiles = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const files = await File.find().sort({ createdAt: -1 });
        return res.status(200).json(files);
    } catch (error) {
        next(error);
    }
}

export const downloadFile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const file = await File.findById(req.params.id);
        if (!file) return res.status(404).json({ error: "File not found" });

        const downloadUrl = file.url.replace("/upload/", "/upload/fl_attachment/");

        res.redirect(downloadUrl);
    } catch (error) {
        next(error);
    }
}