import { Request, Response, NextFunction } from "express";

export const uploadImage = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.file || !req.file.cloudinaryUrl) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        res.status(200).json({
            message: "Image uploaded succussfully!",
            imageUrl: req.file.cloudinaryUrl,
        });
    } catch (error) {
        next(error);
    }
}