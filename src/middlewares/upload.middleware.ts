import multer from "multer";
import cloudinary from "../config/cloudinary";
import fs from "fs";

//multer temporary storage
const upload = multer({ dest: "uploads/" });

export const uploadToCloudinary = async (req: any, res: any, next: any) => {
    try {
        if (!req.file) {
            console.log("no file uploaded");

            return next();
        }
        //upload to cloudinary
        console.log("uploading to cloudinary...");

        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "spectral_uploads",
        });
            
        //attach URL to request
        req.file.cloudinaryUrl = result.secure_url;
        req.file.cloudinaryId = result.public_id;
        console.log("uploaded!");
        
        // delete temp files
        fs.unlinkSync(req.file.path);

        next();
    } catch (error) {
        console.error("cloudinary error", error);   
        res.status(500).json({ error: "upload failed" });
    }

}


export default upload;