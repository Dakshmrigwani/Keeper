import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET,
})


const uploadOnCloudinary = async (localFile) => {
    try {
        console.log("Local File:", localFile); // Log the local file path

        // Upload the image to Cloudinary using the file path
        const uploadResult = await cloudinary.uploader.upload(localFile, {
            resource_type: "auto"
        });

        console.log("Cloudinary Upload Result:", uploadResult); // Log the Cloudinary upload result

        // Delete the local file after successful upload
        fs.unlinkSync(localFile);

        // Return the Cloudinary upload result
        return uploadResult;
    } catch (error) {
        // If an error occurs during upload, delete the local file and return null
        console.error("Upload Error:", error);
        fs.unlinkSync(localFile);
        return null;
    }
};


export {uploadOnCloudinary}