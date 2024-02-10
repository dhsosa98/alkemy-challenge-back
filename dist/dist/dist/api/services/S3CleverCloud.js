"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            }
        }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFile = exports.deleteFile = exports.searchFiles = exports.downloadFile = exports.uploadFile = void 0;
// Load the AWS SDK for Node.js
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const uuid_1 = require("uuid");
// Set up config
const bucketName = "s3-om-files";
// Create S3 service object
const s3 = new aws_sdk_1.default.S3({
    endpoint: "cellar-c2.services.clever-cloud.com",
    region: "eu-west-3",
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
});
const uploadFile = (file) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const key = uuid_1.v4.v4();
        const uploadParams = {
            Bucket: bucketName,
            Body: file.buffer,
            Key: key,
            ContentType: file.mimetype,
            ACL: "public-read"
        };
        const object = yield s3.upload(uploadParams).promise();
        return object;
    }
    catch (err) {
        next(err);
    }
});
exports.uploadFile = uploadFile;
const downloadFile = (key) => {
    const downloadParams = {
        Key: key,
        Bucket: bucketName
    };
    return s3.getObject(downloadParams).createReadStream();
};
exports.downloadFile = downloadFile;
const searchFiles = (next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Contents } = yield s3.listObjects({ Bucket: bucketName }).promise();
        return Contents;
    }
    catch (err) {
        next(err);
    }
});
exports.searchFiles = searchFiles;
const deleteFile = (key) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleteParams = {
            Key: key,
            Bucket: bucketName
        };
        const object = yield s3.getObject(deleteParams).promise();
        if (object) {
            return yield s3.deleteObject(deleteParams).promise();
        }
    }
    catch (err) {
        console.log(err);
    }
});
exports.deleteFile = deleteFile;
const updateFile = (file, key) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updateParams = {
            Key: key,
            Body: file.buffer,
            Bucket: bucketName,
            ContentType: file.mimetype,
            ACL: "public-read"
        };
        let object = yield s3.getObject({ Key: key, Bucket: bucketName }).promise();
        if (object) {
            yield s3.putObject(updateParams).promise();
            return `https://s3-om-files.cellar-c2.services.clever-cloud.com/${key}`;
        }
    }
    catch (err) {
        console.log(err);
    }
});
exports.updateFile = updateFile;
//# sourceMappingURL=S3CleverCloud.js.map