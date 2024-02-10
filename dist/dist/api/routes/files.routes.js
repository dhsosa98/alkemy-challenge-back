"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_js_1 = require("../controllers/index.js");
const { getFileByKey, getAllFiles, deleteFileByKey, updateFileByKey, createFile } = index_js_1.files;
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)();
const filesRouter = express_1.default.Router();
filesRouter.get('/', getAllFiles);
filesRouter.post('/', upload.single('image'), createFile);
filesRouter.get('/:key', getFileByKey);
filesRouter.delete('/:key', deleteFileByKey);
filesRouter.put('/:key', upload.single('image'), updateFileByKey);
exports.default = filesRouter;
//# sourceMappingURL=files.routes.js.map