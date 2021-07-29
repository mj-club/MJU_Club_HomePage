const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");

const { Post, File } = require("../models");

const router = express.Router();

// -----------file------------

// try {
//   fs.readFileSync("uploads");
// } catch (error) {
//   console.log("uploads 폴더가 없어 uploads 폴더를 생성합니다.");
//   fs.mkdirSync("uploads");
// }

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: "ap-northeast-2",
});

var upload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: "mju-club",
    key(req, file, cb) {
      const fileType =
        file.mimetype.split("/")[file.mimetype.split("/").length - 1];
      if (fileType == "image") {
        console.log("imageFile upload.");
        cb(null, `images/${Date.now()}${path.basename(file.originalname)}`);
      } else if (fileType == "video") {
        console.log("videoFile upload.");
        cb(null, `videos/${Date.now()}${path.basename(file.originalname)}`);
      } else {
        console.log("documentFile upload.");
        cb(null, `documents/${Date.now()}${path.basename(file.originalname)}`);
      }
    },
  }),
});

router.post(
  "/upload/:postId",
  // isLoggedIn,
  upload.array("files"),
  (req, res) => {
    console.log(req.files);

    // const urls = [];
    let fileType, url, originalUrl;
    // req.files.map((file) => {
    //   fileType = file.mimetype.split("/")[file.mimetype.split("/").length - 1];
    //   if (fileType == "image") {
    //     originalUrl = file.location;
    //     url = originalUrl.replace(/\/images\//, "/thumb/");
    //     urls.push({ fileType, url, originalUrl });
    //   } else {
    //     urls.push({ fileType, url: file.location });
    //   }
    // });
    req.files.map(async (file) => {
      fileType = file.mimetype.split("/")[file.mimetype.split("/").length - 1];
      if (fileType == "image") {
        originalUrl = file.location;
        url = originalUrl.replace(/\/images\//, "/thumb/");
      } else {
        url = file.location;
        originalUrl = file.location;
      }

      const uploaded = await File.create({
        file_type: fileType,
        original_url: originalUrl,
        url: url,
      });
      const post = await Post.findByPk(req.params.postId);
      post.addFile(uploaded);
    });
    res.json(post);
  }
);

// download
router.get("/download/uploads/images/:name", function (req, res) {
  var filename = req.params.name;

  var file = __dirname + "/../uploads/images/" + filename;
  console.log(__dirname);
  console.log(req.path);
  console.log(file);
  res.download(file);
});

module.exports = router;
