const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");

const { ClubPost, ClubPostComment, ClubInfo } = require("../models");
const { isLoggedIn } = require("./middlewares");

const router = express.Router();

try {
  fs.readFileSync("uploads");
} catch (error) {
  console.log("uploads 폴더가 없어 uploads 폴더를 생성합니다.");
  fs.mkdirSync("uploads");
}

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: "ap-northeast-2",
});

const upload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: "mju-club",
    key(req, file, cb) {
      cb(null, `images/${Date.now()}${path.basename(file.originalname)}`);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});
const upload2 = multer();

// -----------file------------

router.post("/upload", isLoggedIn, upload.array("files"), (req, res) => {
  console.log(req.files);
  const urls = [];
  req.files.map((file) => {
    urls.push(file.location);
  });
  res.json(urls);
});

// -----------post------------

// Read
// 게시물 상세
router.get(
  "/read/:postId",
  // isLoggedIn,
  async (req, res, next) => {
    try {
      let post = await ClubPost.findOne({
        where: { id: req.params.postId },
      });
      const comments = await ClubPostComment.findAll({
        where: { post_id: req.params.postId },
        order: [["createdAt", "DESC"]],
      });
      console.log(post);
      let visit_count = parseInt(post.visit_count) + 1;
      post = await post.update({ visit_count });
      res.json({ post, comments });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);
// 동아리별 전체 게시물
router.get(
  "/readAll/:clubName/:category", // category: announcement[공지사항],faq[문의게시판]
  // isLoggedIn,
  // upload.none(),
  async (req, res, next) => {
    try {
      const clubInfo = await ClubInfo.findOne({
        where: { name: req.params.clubName },
      });
      const clubId = clubInfo.id;

      let postList = await ClubPost.findAll({
        where: { club_id: clubId, category: req.params.category },
        attributes: [
          "id",
          "title",
          "thumbnail",
          "writer",
          "set_top",
          "visit_count",
          "comment_count",
          "thumb_count",
        ],
        order: [["createdAt", "DESC"]],
      });
      res.json(postList);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

// Create
router.post(
  "/create/:clubName/:category", // category: announcement[공지사항],faq[문의게시판]
  // isLoggedIn,
  upload2.none(),
  async (req, res, next) => {
    try {
      const clubInfo = await ClubInfo.findOne({
        where: { name: req.params.clubName },
      });
      const clubId = clubInfo.id;

      let clubPost = await ClubPost.create({
        title: req.body.title,
        category: req.params.category,
        content: req.body.content || null,
        thumbnail: req.body.thumbnail || null,
        set_top: req.body.set_top || false,
        comment_count: 0,
        visit_count: 0,
        thumb_count: 0,
        club_id: clubId,
        // writer_id: req.user.id,
        // writer: req.user.name,
        // writer_id: 1,
        writer: "봉현수",
      });
      console.log("게시물 등록");
      res.json(clubPost);
    } catch (error) {
      console.error(error);
    }
  }
);

// Update
router.post(
  "/update/:postId",
  // isLoggedIn,
  upload2.none(),
  async (req, res, next) => {
    try {
      let post = await ClubPost.update(
        {
          title: req.body.title,
          content: req.body.content || null,
          thumbnail: req.body.thumbnail || null,
          set_top: req.body.set_top || false,
        },
        { where: { id: req.params.postId } }
        // { where: { id: req.params.postId, writer_id: req.user.id } }
      );
      console.log("게시물 수정");
      res.json(post);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

// Delete
router.delete(
  "/delete/:postId",
  // isLoggedIn,
  // checkPermission,
  async (req, res, next) => {
    try {
      console.log("게시물 삭제 전");
      const post = await ClubPost.destroy({
        where: { id: req.params.postId },
      });
      console.log("게시물 삭제");
      res.json(post);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
);

module.exports = router;
