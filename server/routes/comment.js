const express = require("express");
const router = express.Router();
const multer = require("multer");

const { Comment, Post } = require("../models");
const { isLoggedIn } = require("./middlewares");

// -----------permission------------
function checkPermissionForCreate() {
  // 총동연 문의사항: 일반, 동아리, 총동연
  // 동아리 문의사항: 일반, 해당 동아리
}
async function checkPermissionForUpdate() {}
async function checkPermissionForDelete() {}
// -----------comment------------

//Read
// 게시물별 전체 댓글
router.get(
  "/read/:postId", // category: announcement[공지사항],faq[문의게시판]
  async (req, res, next) => {
    try {
      const comments = await Comment.findAll({
        where: { post_id: req.params.postId },
        order: [["createdAt", "DESC"]],
      });

      res.json(comments);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

// Create
router.post(
  "/create/:postId",
  isLoggedIn,
  multer().none(),
  async (req, res, next) => {
    try {
      const post = await Post.findByPk(req.params.postId);
      const comment = await Comment.create({
        content: req.body.content,
        post_id: req.params.postId,
        // writer_id: req.user.id,
      });
      await post.addComment(comment);
      console.log("댓글 등록");
      res.json(comment);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

// Update
router.post(
  "/update/:commentId",
  isLoggedIn,
  multer().none(),
  async (req, res, next) => {
    try {
      const comment = await Comment.update(
        {
          content: req.body.content,
        },
        {
          where: { id: req.params.commentId },
        }
      );
      console.log("댓글 수정");
      res.json(comment);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

// Delete
router.delete("/delete/:commentId", isLoggedIn, async (req, res, next) => {
  try {
    const comment = await Comment.destroy({
      where: { id: req.params.commentId },
    });
    console.log("댓글 삭제");
    res.json(comment);
  } catch (err) {
    console.error(err);
    next(err);
  }
});
module.exports = router;
