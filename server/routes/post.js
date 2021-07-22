const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

const { ClubPost, ClubPostComment, ClubInfo, ClubMember} = require("../models");
const { ClubUnionPost, ClubUnionComment, ClubUnionInfo, ClubUnionMember } = require("../models");
const { ClubPostFile } = require("../models/club_post_file");
const { isLoggedIn } = require("./middlewares");
const { noPermission } = require("./middlewares");


// -----------post------------

// Read
// 동아리별 전체 게시물
router.get("/:clubName/:category",   // category: announcement[공지사항],faq[문의게시판]
// isLoggedIn, 
// upload.none(), 
async (req, res, next) => {
  try {
    const clubInfo = await ClubInfo.findOne({
      where: { name: req.params.clubName },
    });
    const clubId = clubInfo.id;
    
    let postList = await ClubPost.findAll({
      where: { club_id: ClubId, category: req.params.category},
      attributes: ['title', 'thumbnail','writer', 'set_top', 'visit_count', 'comment_count', 'thumb_count'],
      order: [['createAt', 'DESC']]
    })
    res.json(postList);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 게시물 상세
router.get("/:postId", 
// isLoggedIn, 
// upload.none(), 
async (req, res, next) => {
  try {
    let post = await ClubPost.findOne({
      where: { id: req.params.postId},
    })
    let visit_count = parseInt(post.visit_count) + 1;
    post = await post.update("visit_count", visit_count);
    res.json(post);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// Create
router.post("/:clubName/:category",  // category: announcement[공지사항],faq[문의게시판]
// isLoggedIn, 
multer().none(), 
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
      club_id: req.params.clubId,
      writer_id: req.user.id,
      writer: req.user.name,
    });
    console.log("게시물 등록")
    res.json(clubPost);
  } catch (error) {
    console.error(error);
  }
});

// Update
router.post("update/:postId", 
// isLoggedIn, 
multer().none(), 
async (req, res, next) => {
  try {
    const post = await ClubPost.update(
      {
        title: req.body.title,
        content: req.body.content || null,
        thumbnail: req.body.thumbnail || null,
        set_top: req.body.set_top || false,
      },
      { where: { id: req.params.postId, writer_id: req.user.id } }
    );
    console.log("게시물 수정")
    res.json(post);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// Delete
router.get("delete/:postId", 
// isLoggedIn, 
// checkPermission, 
async (req, res, next) => {
  try {
    const post = await ClubPost.destroy({
      where: { id: req.params.postId, UserId: req.user.id },
    });
    console.log("게사물 삭제")
    res.json(post);
  } catch (err) {
    console.error(err);
    next(err);
  }
});


// -----------comment------------

//Read
// 게시물별 전체 댓글 
router.get("/comment/:postId",   // category: announcement[공지사항],faq[문의게시판]
// isLoggedIn, 
// upload.none(), 
async (req, res, next) => {
  try {
    const comments = await ClubPostComment.findAll({
      where: { post_id: postId},
      order: [['createAt', 'DESC']]
    });
    
    res.json(comments);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// Create
router.post("/comment/create/:postId", isLoggedIn, async (req, res, next) => {
  try {
    const comment = await ClubPostComment.create({
      content: req.body.content,
      post_id: req.params.postId,
      writer_id: req.user.id,
    });
    console.log("댓글 등록");
    res.json(comment);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
// Update
router.post("/comment/update/:commentId", isLoggedIn, async (req, res, next) => {
  try {
    const comment = await ClubPostComment.fineOne({
      content: req.body.content,
    },{
      where: {id: req.params.commentId}
    });
    console.log("댓글 수정");
    res.json(comment);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// Delete
router.get("/comment/delete/:commentId", 
// isLoggedIn, 
// checkPermission, 
async (req, res, next) => {
  try {
    const post = await ClubPostComment.destroy({
      where: { id: req.params.commentId },
    });
    console.log("댓글 삭제")
    res.json(post);
  } catch (err) {
    console.error(err);
    next(err);
  }
});