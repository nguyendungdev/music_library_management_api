// src/configs/multer.config.ts
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import * as multer from 'multer';
import * as path from 'path';

export const multerConfig: MulterOptions = {
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './uploads');
        },
        filename: (req, file, cb) => {
            const ext = path.extname(file.originalname);
            const fileName = `${path.basename(file.originalname, ext)}-${Date.now()}${ext}`;
            cb(null, fileName);
        },
    }),
    fileFilter: (req, file, cb) => {
        if (file.mimetype.match(/\/(mp3)$/)) {
            cb(null, true);
        } else {
            cb(new Error('Unsupported file type. Only MP3 files are allowed.'), false);
        }
    },
};

export const imageMulterConfig: MulterOptions = {
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './uploads');
        },
        filename: (req, file, cb) => {
            const ext = path.extname(file.originalname);
            const fileName = `${path.basename(file.originalname, ext)}-${Date.now()}${ext}`;
            cb(null, fileName);
        },
    }),
    fileFilter: (req, file, cb) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
            cb(null, true);
        } else {
            cb(new Error('Unsupported file type. Only image files are allowed.'), false);
        }
    },
};