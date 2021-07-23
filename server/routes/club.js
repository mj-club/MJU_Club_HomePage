const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

const { ClubPost, ClubInfo } = require("../models");
const { ClubMember } = require("../models/club_member");
const { Comment } = require("../models/club_post_comment");
const { ClubPostFile } = require("../models/club_post_file");
const { isLoggedIn } = require("./middlewares");
const { noPermission } = require("./middlewares");

try {
  fs.readdirSync("uploads");
} catch (error) {
  console.error("uploads 폴더가 없어 uploads 폴더를 생성합니다.");
  fs.mkdirSync("uploads");
}

const storage = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "uploads/");
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

// router.post("/img", isLoggedIn, upload.single("img"), (req, res) => {
//   console.log(req.file);
//   res.json({ url: `/img/${req.file.filename}` });
// });

var upload = multer({ storage: storage });

router.get("/", function (req, res) {
  res.json(req);
});

router.post("/uploadFile", upload.single("attachment"), function (req, res) {
  res.json(req);
});

router.post("/uploadFiles", upload.array("attachments"), function (req, res) {
  res.json(req);
});

const upload2 = multer();

// -----------post------------

// Read
// 동아리별 전체 게시물
router.get(
  "/post/:clubName/:category", // category: announcement[공지사항],faq[문의게시판]
  // isLoggedIn,
  // upload.none(),
  async (req, res, next) => {
    try {
      const clubInfo = await ClubInfo.findOne({
        where: { name: req.params.clubName },
      });
      const clubId = clubInfo.id;

      let postList = await ClubPost.findAll({
        where: { club_id: ClubId, category: req.params.category },
        attributes: [
          "title",
          "thumbnail",
          "writer",
          "set_top",
          "visit_count",
          "comment_count",
          "thumb_count",
        ],
        order: [["createAt", "DESC"]],
      });
      res.json(postList);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

// 게시물 상세
router.get(
  "/post/:postId",
  // isLoggedIn,
  // upload.none(),
  async (req, res, next) => {
    try {
      let post = await ClubPost.findOne({
        where: { id: req.params.postId },
      });
      let visit_count = parseInt(post.visit_count) + 1;
      post = await post.update("visit_count", visit_count);
      res.json(post);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

// Create
router.post(
  "/post/:clubName/:category", // category: announcement[공지사항],faq[문의게시판]
  // isLoggedIn,
  // upload.none(),
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
      console.log("게시물 등록");
      res.json(clubPost);
    } catch (error) {
      console.error(error);
    }
  }
);

// Update
router.post(
  "/post/:postId",
  // isLoggedIn,
  // upload.none(),
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
      console.log("게시물 수정");
      res.json(post);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

// club post (delete)
router.get(
  "/delete/:postId",
  // isLoggedIn,
  // checkPermission,
  async (req, res, next) => {
    try {
      const post = await ClubPost.destroy({
        where: { id: req.params.postId, UserId: req.user.id },
      });
      console.log("게사물 삭제");
      res.json(post);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
);

// search
router.get("/:id", async (req, res, next) => {
  try {
    const post = await ClubPost.findOne({
      where: { id: req.params.title },
      order: [["createAt", "DESC"]],
    });

    req.json(post);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// page count
// router.get("/", async function (req, res) {
//   var page = Math.max(1, parseInt(req.query.page));
//   var limit = Math.max(1, parseInt(req.query.limit));
//   page = !isNaN(page) ? page : 1;
//   limit = !isNaN(limit) ? limit : 10;

//   var skip = (page - 1) * limit;
//   var count = await ClubPost.countDocuments({});
//   var maxPage = Math.ceil(count / limit);
//   var posts = await ClubPost.find({
//     offset: offset,
//     limit: 20
//   })

//   res.send("/index", {
//     posts: posts,
//     currentPage: page,
//     maxPage: maxPage,
//     limit: limit,
//   });
// });

// router.get("/paising/:cur", function (req, res) {
//   var page_view_size = 15;
//   var page_num_list_size = 10;
//   var totalPostCount = 0;
//   var queryString = "";
//   getConnection().query(queryString, function (error, data) {
//     if (error) {
//       console.log(error, ": db에서 불러오는데 실패했습니다.");
//       return;
//     }
//     totalPostCount = data[0].cnt;
//     var curPage = req.params.cur;
//     console.log("현재 페이지 : " + curPage, "전체 게시물 : " + totalPostCount);

//     if ((totalPostCount < 0) | (totalPostCount == 0)) {
//       totalPostCount = 0;
//     }

//     var totalPageCount = Math.ceil(totalPostCount / page_view_size);
//     var totalSetCount = Math.ceil(totalPageCount / page_num_list_size);
//     var curSet = Math.ceil(curPage / page_num_list_size);
//     var firstPage = (curSet - 1) * 10 + 1;
//     var lastPage = firstPage + page_num_list_size;

//     var result = {
//       curPage: curPage,
//       page_num_list_size: page_num_list_size,
//       page_view_size: page_view_size,
//       totalPostCount: totalPageCount,
//       totalPageCount: totalPageCount,
//       totalSetCount: totalSetCount,
//       curSet: curSet,
//       firstPage: firstPage,
//       lastPage: lastPage,
//     };
//   });
// });

// -----------comment------------
router.post("/create/:postId", isLoggedIn, async (req, res, next) => {
  try {
    const post = await ClubPost.create({
      content: req.body.content,
      post_id: req.params.postId,
      writer_id: req.user.id,
    });
    console.log("댓글 등록");
    res.json();
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/update/:postId", isLoggedIn, async (req, res, next) => {
  try {
    const post = await ClubPost.fineOne({
      where: { id: req.params.id, post_id: req.params.postId },
    });
    console.log("댓글 수정");
    res.json();
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// -----------info------------

// club info
// read
router.get(
  "/info/:clubName",
  // isLoggedIn,
  // checkPermission,
  async (req, res, next) => {
    try {
      const club = await ClubInfo.findOne({
        where: { name: req.params.clubName },
      });
      res.json(club);
    } catch (error) {
      console.error(error);
      next(error);
    }
    // ClubInfo.findOne(
    //   { where: { name: req.params.clubName } },
    // function (err, get) {
    //   if (err) return res.json(err);
    //   return res.json(get);
    // }
    // );
  }
);

//create or update
router.post(
  "/create/:clubName",
  // isLoggedIn,
  // checkPermission,
  multer().none(),
  async (req, res, next) => {
    try {
      let clubInfo = await ClubInfo.findOne({
        where: { name: req.params.clubName },
      });
      if (clubInfo === null) {
        clubInfo = await ClubInfo.create({
          name: req.params.clubName,
          representation: req.body.representation,
          contact_number: req.body.contact_number,
          introduction: req.body.introduction,
          plan: req.body.plan,
          recruit: req.body.recruit,
          meeting: req.body.meeting,
          recruitment: req.body.recruitment,
        });
      } else {
        const targetId = clubInfo.id;
        clubInfo = await ClubInfo.update(
          {
            name: req.params.clubName,
            representation: req.body.representation,
            contact_number: req.body.contact_number,
            introduction: req.body.introduction,
            plan: req.body.plan,
            recruit: req.body.recruit,
            meeting: req.body.meeting,
            recruitment: req.body.recruitment,
          },
          { where: { id: targetId } }
        );
      }
      res.json(clubInfo);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
);

// delete
router.get(
  "/delete/:clubName",
  // isLoggedIn,
  // checkPermission,
  async (req, res, next) => {
    try {
      let clubInfo = await ClubPost.destroy({
        where: { name: req.params.clubName },
      });
      res.json(clubInfo);
    } catch (err) {
      console.error(err);
    }
  }
);

// member list
router.get(
  "/member/:clubName",
  isLoggedIn,
  checkPermission,
  async (req, res, next) => {
    try {
      const clubInfo = await ClubInfo.findOne({
        where: { name: req.params.clubName },
      });
      const clubId = clubInfo.id;
      const clubMembers = await ClubMember.findAll({
        where: { club_id: clubId },
      });
      res.json(clubMembers);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
);

function checkPermission(req, res, next) {
  ClubPost.findOne({ clubId: req.params.clubId }, function (err, user) {
    if (err) return res.json(err);
    if (club_posts.writer_id != req.user.id) return noPermission(req, res);
    next();
  });
}

module.exports = router;
