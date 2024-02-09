import express from 'express';
import { files } from '../controllers/index.js';

const { getFileByKey, getAllFiles, deleteFileByKey, updateFileByKey, createFile } = files;

import multer from 'multer';
const upload = multer();

const filesRouter = express.Router();

filesRouter.get('/', getAllFiles);
filesRouter.post('/', upload.single('image'), createFile);
filesRouter.get('/:key', getFileByKey);
filesRouter.delete('/:key', deleteFileByKey);
filesRouter.put('/:key', upload.single('image'), updateFileByKey);

export default filesRouter;