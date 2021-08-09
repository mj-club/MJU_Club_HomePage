const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  Post,
  Comment,
  ClubInfo,
  UnionInfo,
  User,
  File,
  sequelize,
} = require("../models");
const { isLoggedIn, isClubManager, isUnionManager } = require("./middlewares");
const upload = multer();
const { Op } = (Sequelize = require("sequelize"));

// -----------permission------------

function checkPermissionForCreate(user, clubName, category) {
  // user: req.user
  // clubName: req.params
  // category: req.params
  // 총동연 - 공지사항
  if (clubName === "union" && category === "announcement") {
    if (!isUnionManager(user)) {
      const err = new Error("총동연 관리자 계정이 아닙니다.");
      err.name = "IsNotAdminAccount";
      throw err;
    }
  } else if (clubName === "union" && category === "monthlyKeyum") {
    if (!isUnionManager(user)) {
      const err = new Error("총동연 관리자 계정이 아닙니다.");
      err.name = "IsNotAdminAccount";
      throw err;
    }
  } else if (clubName !== "union" && category === "announcement") {
    if (!isClubManager(user)) {
      const err = new Error("동아리 관리자 계정이 아닙니다.");
      err.name = "IsNotAdminAccount";
      throw err;
    }
    if (user.accessible_club !== clubName) {
      const err = new Error("해당 동아리에 대한 관리자 계정이 아닙니다.");
      err.name = "IsNotAccessibleAdminAccount";
      throw err;
    }
  }
}
async function checkPermissionForUpdate(user, post) {
  // user: sequelize model,
  // post: sequelize model

  if (!(await user.hasPost(post))) {
    const err = new Error("해당 게시물에 대한 작성자 계정이 아닙니다.");
    err.name = "IsNotPostOwner";
    throw err;
  }
}
async function checkPermissionForDelete(user, post, clubName) {
  // user: sequelize model,
  // post: sequelize model
  if (isUnionManager(user)) {
    return true;
  } else if (isClubManager(user) && user.accessible_club === clubName) {
    return true;
  } else if (!(await user.hasPost(post))) {
    const err = new Error("해당 게시물에 대한 작성자 계정이 아닙니다.");
    err.name = "IsNotPostOwner";
    throw err;
  }
}
// -----------post------------

// Read
// 게시물 상세
router.get("/read/:postId", async (req, res, next) => {
  try {
    let post = await Post.findOne({
      where: { id: req.params.postId },
      include: [Comment, File, { model: User, attributes: ["name"] }],
    });
    // console.log(post);
    let visit_count = parseInt(post.visit_count) + 1;
    post = await post.update({ visit_count });
    res.json(post);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
// 동아리별 전체 게시물
router.get(
  "/readAll/:clubName/:category", // category: announcement[공지사항],faq[문의게시판]
  // upload.none(),
  async (req, res, next) => {
    if (req.params.clubName === "union") {
      console.log("~!@~!");
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
  // isClubManager,
  upload.none(),
  async (req, res, next) => {
    try {
      checkPermissionForCreate(
        req.user,
        req.params.clubName,
        req.params.category
      );
    } catch (error) {
      console.error(error);
      res.status(403).send(error);
    }
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
  upload.none(),
  async (req, res, next) => {
    let user, post;
    try {
      user = await User.findByPk(req.user.id);
      post = await Post.findByPk(req.params.postId);
      await checkPermissionForUpdate(user, post);
    } catch (error) {
      console.error(error);
      res.status(403).send(error);
    }
    try {
      post = await post.update({
        title: req.body.title,
        content: req.body.content || null,
        thumbnail: req.body.thumbnail || null,
        set_top: req.body.set_top || false,
      });
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
    let user, post, club;
    try {
      user = await User.findByPk(req.user.id);
      post = await Post.findByPk(req.params.postId);
      club = await post.getClubInfo();
      await checkPermissionForDelete(user, post, club.name);
    } catch (error) {
      console.error(error);
      res.status(403).send(error);
    }
    try {
      console.log("게시물 삭제 전");
      post = await post.destroy();
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
router.post("/search/:clubName/:category/:keyword", async (req, res, next) => {
  try {
    const clubName = req.params.clubName;
    const categoryName = req.params.category;
    const keyword = req.params.keyword;
    const searchOption = req.body.searchOption;
    let fetchCount = req.body.page;
    let limit = 15;
    let skip = 0;
    let post;
    let clubId = null;

    console.log("시작");
    if (fetchCount > 1) {
      skip = limit * (fetchCount - 1);
    }
    if (clubName) {
      const club = await ClubInfo.findOne({
        where: { name: clubName },
      });
      clubId = club.id;
    }
    if (searchOption == "title") {
      post = await Post.findAll({
        where: {
          title: {
            [Op.like]: "%" + keyword + "%",
          },
          club_id: clubId,
          category: categoryName,
        },
        order: [["createdAt", "DESC"]],
        offset: skip,
        limit: limit,
      });
      console.log("post >> ", post);
    } else if (searchOption == "both") {
      post = await Post.findAll({
        where: {
          [Op.or]: [
            {
              title: {
                [Op.like]: "%" + keyword + "%",
              },
              content: {
                [Op.like]: "%" + keyword + "%",
              },
            },
          ],
          club_id: club.id,
          category: categoryName,
        },
        order: [["createdAt", "DESC"]],
        offset: skip,
        limit: limit,
      });
    } else if (searchOption == "writer") {
      const user = await User.findOne({
        where: { name: keyword },
      });
      post = await Post.findAll({
        where: { id: user.id, club_id: clubId, category: categoryName },
        order: [["createdAt", "DESC"]],
        offset: skip,
        limit: limit,
      });
    }
    res.json(post);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
