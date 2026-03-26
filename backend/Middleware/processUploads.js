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

export const processUploadedFile = asyncWraper(async (req, res, next) => {
    // 1. لو مفيش ملفات، عدي الميدل وير
    if (!req.files || Object.keys(req.files).length === 0) return next();

    // 2. هنعمل مصفوفة نشيل فيها كل وعود الرفع (Promises)
    const uploadPromises = [];

    // 3. نلف على كل الحقول اللي مبعوتة (avatar, documents, ...)
    for (const fieldName in req.files) {
        const fileArray = req.files[fieldName]; // دي مصفوفة الملفات اللي جوه الحقل

        // 4. نلف على كل ملف جوه الحقل ده
        for (const file of fileArray) {
            // هنعمل Promise لكل ملف عشان نرفعه
            const uploadPromise = new Promise(async (resolve, reject) => {
                try {
                    // مسار الصور
                    if (file.mimetype.startsWith("image/")) {
                        const bufferAfterSharp = await sharp(file.buffer)
                            .resize(500, 500)
                            .toFormat("jpeg")
                            .jpeg({ quality: 80 })
                            .toBuffer();

                        const uploadStream = cloudinary.uploader.upload_stream(
                            { folder: "hrms_uploads" },
                            (error, result) => {
                                if (error) return reject(error);
                                file.filename = result.secure_url; // حفظ اللينك
                                resolve(); // خلصنا رفع الملف ده بنجاح
                            }
                        );
                        streamifier
                            .createReadStream(bufferAfterSharp)
                            .pipe(uploadStream);
                    }
                    // مسار الـ PDF
                    else if (file.mimetype === "application/pdf") {
                        const uploadStream = cloudinary.uploader.upload_stream(
                            {
                                folder: "hrms_documents",
                                resource_type: "raw",
                            },
                            (error, result) => {
                                if (error) return reject(error);
                                file.filename = result.secure_url; // حفظ اللينك
                                resolve(); // خلصنا رفع الملف ده بنجاح
                            }
                        );
                        streamifier
                            .createReadStream(file.buffer)
                            .pipe(uploadStream);
                    } else {
                        resolve(); // ملف غريب، فوتناه
                    }
                } catch (err) {
                    reject(err); // لو حصل إيرور في Sharp مثلاً
                }
            });

            // نضيف الـ Promise ده للمصفوفة
            uploadPromises.push(uploadPromise);
        }
    }

    // 5. السطر السحري: استنى لحد ما كوووول الملفات تترفع للكلاود
    await Promise.all(uploadPromises);

    // 6. روح للميدل وير اللي بعده
    next();
});
