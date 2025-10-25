import { v2 as cloudinary } from "cloudinary";

export const deleteFromCloudinary = async (publicId: string) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        if (result.result === "ok") {
            console.log("Deleted from cloudinary");
        } else {
            console.log("Could not delete from cloudinary!")
        }
    } catch (error) {
        console.log(`Deletion failed for ${publicId}`);
    }
}