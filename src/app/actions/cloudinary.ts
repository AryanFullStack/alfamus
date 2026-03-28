"use server";

import { v2 as cloudinary } from "cloudinary";

// Cloudinary will automatically use CLOUDINARY_URL from process.env if available.
// However, for explicit configuration or debugging:
if (!process.env.CLOUDINARY_URL) {
  console.warn("CLOUDINARY_URL is not set in environment variables.");
}

/**
 * Uploads a file to Cloudinary using the server-side SDK.
 * This is "signed" and secure.
 */
export async function uploadImage(formData: FormData) {
  const file = formData.get("file") as File;
  if (!file) throw new Error("No file provided");

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "alfamus",
        resource_type: "auto",
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          return reject(error);
        }
        resolve(result?.secure_url);
      }
    );
    
    uploadStream.end(buffer);
  });
}
