const express = require("express");
const multer = require("multer");

const { Post, Comment, ClubInfo, UnionInfo, User, File } = require("../models");
const { isLoggedIn } = require("./middlewares");

const router = express.Router();

const upload = multer();

// -----------post------------

// Read
// 게시물 상세
router.get(
  "/read/:postId",
  // isLoggedIn,
  async (req, res, next) => {
    try {
      let post = await Post.findOne({
        where: { id: req.params.postId },
        include: [Comment, File],
      });
      // const comments = await Comment.findAll({
      //   where: { post_id: req.params.postId },
      //   order: [["createdAt", "DESC"]],
      // });
      console.log(post);
      let visit_count = parseInt(post.visit_count) + 1;
      post = await post.update({ visit_count });
      res.json({ post });
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
    if (req.params.clubName === "union") {
      try {
        let postList = await Post.findAll({
          where: { union_id: 1 },
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
    } else {
      try {
        const clubInfo = await ClubInfo.findOne({
          where: { name: req.params.clubName },
        });
        const clubId = clubInfo.id;

        let postList = await Post.findAll({
          where: { club_id: clubId, category: req.params.category },
          attributes: [
            "id",
            "title",
            "thumbnail",
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
  }
);

// Create
router.post(
  "/create/:clubName/:category", // category: announcement[공지사항],faq[문의게시판]
  // isLoggedIn,
  upload.none(),
  async (req, res, next) => {
    if (req.params.clubName === "union") {
      try {
        const unionInfo = await UnionInfo.findByPk(1);

        let post = await Post.create({
          title: req.body.title,
          category: req.params.category,
          content: req.body.content || null,
          thumbnail: req.body.thumbnail || null,
          set_top: req.body.set_top || false,
          comment_count: 0,
          visit_count: 0,
          thumb_count: 0,
        });
        unionInfo.addPost(post);
        // const user = await User.findByPk(req.user.id);
        // user.addPost(user);
        console.log("게시물 등록");
        res.json(post);
      } catch (error) {}
    } else {
      try {
        const clubInfo = await ClubInfo.findOne({
          where: { name: req.params.clubName },
        });

        let post = await Post.create({
          title: req.body.title,
          category: req.params.category,
          content: req.body.content || null,
          thumbnail: req.body.thumbnail || null,
          set_top: req.body.set_top || false,
          comment_count: 0,
          visit_count: 0,
          thumb_count: 0,
          // writer_id: req.user.id,
          // writer: req.user.name,
          // writer_id: 1,
          // writer: "봉현수",
        });
        clubInfo.addPost(post);
        // const user = await User.findByPk(req.user.id);
        // user.addPost(user);
        console.log("게시물 등록");
        res.json(post);
      } catch (error) {
        console.error(error);
      }
    }
  }
);

// Update
router.post(
  "/update/:postId",
  // isLoggedIn,
  upload.none(),
  async (req, res, next) => {
    try {
      let post = await Post.update(
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
      const post = await Post.destroy({
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
