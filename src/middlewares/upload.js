const multer = require("multer");

const uploadDir = process.cwd() + "/upload";
const uploadDocDir = process.cwd() + "/doc";
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadDir);
  },
  filename(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploadProfile = multer({ storage: storage });
const uploadDoc = multer({ dest: uploadDocDir });

module.exports = {
  uploadProfile,
  uploadDoc,
};
