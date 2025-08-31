import multer from 'multer'
import {CloudinaryStorage} from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'chasseSousMarine',
        allowed_formats : ['jpeg', 'gif', 'jpg', 'webp', 'avif', 'png']
    }
})

const uploadCloudinary = multer({storage})
export default uploadCloudinary;