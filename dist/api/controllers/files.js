"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const S3CleverCloud_js_1 = require("../services/S3CleverCloud.js");
const getFileByKey = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const key = req.params.key;
            const readStream = (0, S3CleverCloud_js_1.downloadFile)(key);
            readStream === null || readStream === void 0 ? void 0 : readStream.pipe(res);
        }
        catch (err) {
            next(err);
        }
    });
};
const getAllFiles = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const files = yield (0, S3CleverCloud_js_1.searchFiles)(next);
            return res.send({
                keys: (files === null || files === void 0 ? void 0 : files.map((e) => e.Key)) || "There are no files in the Amazon Bucket",
            });
        }
        catch (err) {
            next(err);
        }
    });
};
const deleteFileByKey = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { key } = req.params;
            const file = yield (0, S3CleverCloud_js_1.deleteFile)(key, next);
            if (file) {
                return res.send({ msg: "File deleted successfully" });
            }
        }
        catch (err) {
            next(err);
        }
    });
};
const updateFileByKey = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { key } = req.params;
            if (req.file) {
                yield (0, S3CleverCloud_js_1.updateFile)(req.file, key);
                return res.send({ msg: "File updated successfully" });
            }
        }
        catch (err) {
            next(err);
        }
    });
};
const createFile = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (req.file) {
                const { Location, Key } = yield (0, S3CleverCloud_js_1.uploadFile)(req.file, next);
                if (Location) {
                    return res.send({ msg: "File uploaded successfully", url: Location, key: Key });
                }
            }
        }
        catch (err) {
            next(err);
        }
    });
};
const filesController = {
    getFileByKey,
    getAllFiles,
    deleteFileByKey,
    updateFileByKey,
    createFile
};
exports.default = filesController;
//# sourceMappingURL=files.js.map