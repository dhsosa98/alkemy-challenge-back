const {
  uploadFile,
  updateFile,
  deleteFile,
} = require("../services/S3CleverCloud");

async function handleFiles(req, res, next) {
  try {
    const { file } = req;
    const { key } = req.body;
    console.log(req.body);
    let avatar = "";
    if (file) {
      if (key) {
        const url = await updateFile(file, key);
        avatar = url;
      } else {
        const { Location }  = await uploadFile(file);
        avatar = Location;
      }
    } else {
      if (key) {
        await deleteFile(key);
      }
    }
    req.body.avatar = avatar || null;
    console.log(req.body);
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = { handleFiles };
