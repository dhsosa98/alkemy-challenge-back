const {
    searchFiles,
    deleteFile,
    updateFile,
    uploadFile,
    downloadFile,
  } = require("../services/S3CleverCloud");
  
  const getFileByKey = async function (req, res, next) {
    try {
      const key = req.params.key;
      const readStream = downloadFile(key);
      readStream?.pipe(res);
    } catch (err) {
      next(err);
    }
  };
  
  const getAllFiles = async function (req, res, next) {
    try {
      const files = await searchFiles(next);
      return res.send({
        keys:
          files?.map((e) => e.Key) || "There are no files in the Amazon Bucket",
      });
    } catch (err) {
      next(err);
    }
  };
  
  const deleteFileByKey = async function (req, res, next) {
    try {
      const { key } = req.params;
      const file = await deleteFile(key, next);
      if (file) {
        return res.send({ msg: "File deleted successfully" });
      }
    } catch (err) {
      next(err);
    }
  };
  
  const updateFileByKey = async function (req, res, next) {
    try {
      const { key } = req.params;
      if (req.file) {
        await updateFile(req.file, key);
        return res.send({ msg: "File updated successfully" });
      }
    } catch (err) {
      next(err);
    }
  };
  
  const createFile = async function (req, res, next) {
    try {
      if (req.file) {
        const { Location, Key } = await uploadFile(req.file, next);
        if (Location) {
          return res.send({ msg: "File uploaded successfully", url: Location, key: Key });
        }
      }
    } catch (err) {
      next(err);
    }
  };
  
  const filesController = {
    getFileByKey,
    getAllFiles,
    deleteFileByKey,
    updateFileByKey,
    createFile
  };
  
  module.exports = filesController;