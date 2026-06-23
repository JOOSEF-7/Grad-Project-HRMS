import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import sharp from "sharp";
import { asyncWraper } from "../Middleware/asyncWraper.js";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const processUploadedFile2 = asyncWraper(async (req, res, next) => {
    if (!req.files || (Array.isArray(req.files) && req.files.length === 0)) return next();

    const fileArray = Array.isArray(req.files) 
        ? req.files 
        : Object.values(req.files).flat();

    const uploadPromises = fileArray.map((file) => {
        return new Promise(async (resolve, reject) => {
            try {
                if (file.mimetype.startsWith("image/")) {
                    const bufferAfterSharp = await sharp(file.buffer)
                        .resize({ width: 800, withoutEnlargement: true })
                        .toFormat("jpeg")
                        .toBuffer();

                    const uploadStream = cloudinary.uploader.upload_stream(
                        { folder: "hrms_uploads" },
                        (error, result) => {
                            if (error) return reject(error);
                            file.path = result.secure_url; 
                            resolve();
                        }
                    );
                    streamifier.createReadStream(bufferAfterSharp).pipe(uploadStream);
                } 
                else if (
                    file.mimetype === "application/pdf" || 
                    file.mimetype === "application/msword" || 
                    file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                ) {
                    let fileFormat = "pdf";
                    if (file.mimetype === "application/msword") fileFormat = "doc";
                    if (file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") fileFormat = "docx";

                    const uploadStream = cloudinary.uploader.upload_stream(
                        { 
                            folder: "hrms_documents", 
                            resource_type: "raw",
                            format: fileFormat
                        },
                        (error, result) => {
                            if (error) return reject(error);
                            file.path = result.secure_url;
                            resolve();
                        }
                    );
                    streamifier.createReadStream(file.buffer).pipe(uploadStream);
                } else {
                    resolve();
                }
            } catch (err) { reject(err); }
        });
    });

    await Promise.all(uploadPromises);

    next();
});