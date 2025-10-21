import mongoose, {Document,Schema } from "mongoose";

export interface IFile extends Document{
    filename: string;
    url: string;
    size?: number;
    mimetype?: string;
    uploadedAt: Date;
}

const fileSchema = new Schema<IFile>({
    filename: { type: String, required: true },
    url: { type: String, required: true },
    size: { type: Number },
    mimetype: { type: String },
    uploadedAt: { type: Date, default: Date.now },
});

export const File = mongoose.model<IFile>("File", fileSchema);
