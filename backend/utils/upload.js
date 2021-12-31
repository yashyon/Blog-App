import { GridFsStorage } from 'multer-gridfs-storage';
import multer from 'multer'
import dotenv from 'dotenv';

dotenv.config();

const storage = new GridFsStorage({
    url: process.env.MONGO_URL,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        const match = ["image/png", "image/jpg", "image/jpeg"];
        if (match.indexOf(file.mimeType) === -1) {
            return `${Date.now()}-blog-${file.originalname}`;
        }
        return {
            bucketName: "photos",
            filename: `${Date.now()}-blog-${file.originalname}`,
        }
    }
});

export default multer({ storage });