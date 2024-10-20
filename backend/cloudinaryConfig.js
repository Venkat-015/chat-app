import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params:async(req,file)=> {
    let resourceType='image';
    if(file.mimetype.startsWith('video')){
      resourceType='video';
    }
    else if(file.mimetype === 'application/pdf'){
      resourceType='raw';
    }
    else if(file.mimetype.startsWith('audio')|| file.mimetype === 'audio/mpeg' || file.mimetype === 'audio/mp3') {
      resourceType = 'raw'; // **Use video type for Cloudinary's audio support** 
      // The audio files are stored under `resource_type: video` in Cloudinary.
    } else {
      resourceType = 'raw'; // fallback for other types
    }
    return{
    folder: 'chat-app-uploads',
   // format: async (req, file) => ['jpg', 'jpeg', 'png', 'pdf', 'mp4', 'mp3'].includes(file.mimetype.split('/')[1]) ? file.mimetype.split('/')[1] : 'jpg',
    format: file.mimetype.split('/')[1],    
    public_id:Date.now().toString(),
    resource_type:resourceType,
    };
  },
});



/*export const generateSignedUrl = (publicId) => {
  const url = cloudinary.url(publicId, {
    sign_url: true, // Enable signing
    resource_type: 'raw', // Ensure 'raw' for documents like PDFs, Word docs, etc.
    type: 'authenticated', // Authenticated type for security
    secure: true, // Use secure HTTPS URLs
    expire_at: Math.floor(Date.now() / 1000) + 60 * 60, // URL expires in 1 hour
  });
  return url;
};*/

const upload = multer(
  { storage:storage,
    limits:{fileSize:1024*1024*50}
   });

export default upload; // Changed to default export
