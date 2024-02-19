const { PROFILE_PHOTO_DIR, AADHAR_PHOTO_DIR } = require("../config");
const { existsSync, mkdirSync } = require("fs");
const multer = require("multer");
const path = require("path");

const profilePhotoDir = PROFILE_PHOTO_DIR;
const aadharPhotoDir = AADHAR_PHOTO_DIR;

const rootDir = path.dirname(path.dirname(__dirname)) + "/Backend";

if (!existsSync(rootDir)) {
  mkdirSync(rootDir);
}

// Ensure the photo directory exists
const photoPath = path.join(rootDir, "PROFILEPHOTO");
if (!existsSync(photoPath)) {
  mkdirSync(photoPath);
}

// Ensure the file directory exists
const filePath = path.join(rootDir, "AADHAR");
if (!existsSync(filePath)) {
  mkdirSync(filePath);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "profilePhoto") {
      cb(null, path.join(__dirname, "./../", process.env.PROFILE_PHOTO_DIR));
    }
    if (file.fieldname === "aadharPhoto") {
      cb(null, path.join(__dirname, "./../", process.env.AADHAR_PHOTO_DIR));
    }
  },

  filename: (req, file, cb) => {
    // const timestamp = new Date().getTime();
    // const uniqueFilename = `${timestamp}_${file.originalname}`;
    if (file.fieldname === "profilePhoto") {
      cb(null, file.originalname.split(" ").join("-"));
    }

    if (file.fieldname === "aadharPhoto") {
      cb(null, file.originalname.split(" ").join("-"));
    }
  },
});
const upload = multer({ storage });

module.exports = { upload, rootDir };
