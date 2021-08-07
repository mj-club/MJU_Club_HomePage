const express = require("express");
const router = express.Router();
const multer = require("multer");
const { Post, Comment, ClubInfo, UnionInfo, User, File, sequelize } = require("../models");
const { isLoggedIn, isClubManager, isUnionManager } = require("./middlewares");
const upload = multer();
const { Op } = Sequelize = require('sequelize');

// -----------post------------

// Read
// 게시물 상세
router.get(
  "/read/:postId",
  async (req, res, next) => {
    try {
      let post = await Post.findOne({
        where: { id: req.params.postId },
        include: [Comment, File, { model: User, attributes: ["name"]}]
      });
      // console.log(post);
      let visit_count = parseInt(post.visit_count) + 1;
      post = await post.update({ visit_count });
      res.json( post );
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);
// 동아리별 전체 게시물
router.get(
  "/readAll/:clubName/:category", // category: announcement[공지사항],faq[문의게시판]
  // upload.none(),
  async (req, res, next) => {
    if (req.params.clubName === "union") {
      console.log("~!@~!")
      try {
        let postList = await Post.findAll({
          where: { union_id: 1, category: req.params.category },
          attributes: [
            "id",
            "title",
            "thumbnail",
            "content",
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
  "/create/:clubName/:category", // category: announcement[공지사항], questions[문의게시판], freeBoard[자유게시판]
  isLoggedIn,
  isClubManager,
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
        const user = await User.findByPk(req.user.id);
        await user.addPost(post);
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
        const user = await User.findByPk(req.user.id);
        user.addPost(post);
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
  isLoggedIn,
  isClubManager,
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
  isLoggedIn,
  isUnionManager,
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

// search
// 키워드가 포함되는 게시물 모두 검색 (게시판 별) - 페이지당 15개 표시 설정 중 
// (/search/:clubName/:category/:keyword?searchOption=?page=)
// (/search/:clubName/announcement/:keyword)
// (/search/:clubName/questions/:keyword)
// (/search/petitions/:keyword)
// (/search/keyum/freeBoard/:keyword)
// (/search/keyum/event/:keyword)
// (/search/keyum/monthly/:keyword)

// keyword (검색 키워드)
// => 키워드 포함 (키워드로 시작, 끝, 중간에 위치 모두)
// => 작성자 이름으로 검색할 경우 키워드에 작성자 이름 기입
// searchOption (검색 옵션) - 쿼리
// => 제목 : title, 제목 + 내용 : both , 작성자 : writer
// fetchCount (페이지수) - 쿼리
// => 검색 페이지 기입 
router.get(
  "/search/:clubName/:category/:keyword",
  async (req, res, next) => {
    try {
      const clubName = req.params.clubName;
      const categoryName = req.params.category;
      const keyword = req.params.keyword;
      const searchOption = req.query.searchOption;
      let fetchCount = req.query.page;
      let skip = 0;
      let post;
      let clubId = null;
      
      if (fetchCount > 1) {
        skip = 15 * (fetchCount-1);
      }
      if (clubName) {
        const club = await ClubInfo.findOne({
          where: { name: clubName }
        });
        clubId = club.id;
      }
      if (searchOption == "title") {
        post = Post.findAll({
          where: {
            [Op.or]: [{
              title: {
                [Op.like]: "%" + keyword + "%"
              }
            }],
            club_id: clubId,
            category: categoryName
          },
          order: [["createAt", "DESC"]],
          offset: skip,
          limit: fetchCount
        });
      }
      else if (searchOption == "both") {
        post = Post.findAll({
          where: {
            [Op.or]: [{
              title: {
                [Op.like]: "%" + keyword + "%"
              },
              content: {
                [Op.like]: "%" + keyword + "%"
              }
            }],
            club_id: club.id,
            category: categoryName
          },
          order: [["createAt", "DESC"]],
          offset: skip,
          limit: fetchCount
        });
      }
      else if (searchOption == "writer") {
        const user = User.findOne({
          where: { name: keyword }
        });
        post = Post.findAll({
          where: { id: user.id, club_id: clubId, category: categoryName },
          order: [["createAt", "DESC"]],
          offset: skip,
          limit: fetchCount
        });
      }
      res.json(post)
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

module.exports = router;
