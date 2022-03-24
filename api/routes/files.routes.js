var express = require('express');
const { getFileByKey, getAllFiles, deleteFileByKey, updateFileByKey, createFile } = require('../controllers/files');


const multer  = require('multer')
const upload = multer()

var filesRouter = express.Router();


filesRouter.get('/', getAllFiles);
filesRouter.post('/', upload.single('image'), createFile);
filesRouter.get('/:key', getFileByKey);
filesRouter.delete('/:key', deleteFileByKey);
filesRouter.put('/:key', upload.single('image'), updateFileByKey);

module.exports = filesRouter;