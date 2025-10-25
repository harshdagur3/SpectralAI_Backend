import "express";

declare module "express" {
    export interface Request {
        // Extend req.file to include cloudinaryUrl
        file?: Express.Multer.File & { cloudinaryUrl?: string; cloudinaryId?:string };
    }
}
