const express = require("express");
const router = express.Router();
const multer = require("multer");
const mysql = require("mysql");
const fs = require("fs");
// const bodyParser = require('body-parser');

const { ClubPost } = require("../models/club_post");
const { ClubPostFile } = require("../models/club_post_file");
const { isLoggedIn } = require("./middlewares");

try {
  fs.readdirSync("uploads");
} catch (error) {
  console.error("uploads 폴더가 없어 uploads 폴더를 생성합니다.");
  fs.mkdirSync("uploads");
}

const upload = multer({
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

router.post("/img", isLoggedIn, upload.single("img"), (req, res) => {
  console.log(req.file);
  res.json({ url: `/img/${req.file.filename}` });
});

const upload2 = multer();
// new
router.post(
  "/create/:clubId",
  isLoggedIn,
  checkPermission, 
  upload2.none(),
  async (req, res, next) => {
    try {
      const post = await ClubPost.create({
        title: req.body.title,
        category: req.body.category,
        content: req.body.content || null,
        thumnail: req.body.thumnail || null,
        set_top: false,
        link: req.body.link || null,
        visit_count: 0,
        club_id: req.params.clubId,
        writer_id: req.user.id,
      });

      // file upload(수정 필요)
      // if (req.body.file_url) {
      // const postFile = await ClubPostFile.create({
      // file_name: req.body.file_name,
      // file_dir: req.body.file_dir,
      // file
      // })
      // }

      res.json(post);
      // res.redirect("/create");
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

// edit(update)
router.post(
  "/update/:id",
  isLoggedIn,
  checkPermission, 
  upload2.none(),
  async (req, res, next) => {
    try {
      const post = await ClubPost.update(
        {
          title: req.body.title,
          category: req.body.category,
          content: req.body.content || null,
          thumnail: req.body.thumnail || null,
          set_top: req.body.set_top,
          link: req.body.link || null,
          visit_count: req.body.visit_count,
        },
        { where: { id: req.params.id, writer_id: req.user.id } }
      );

      // file update(수정 필요)

      res.json(post);
      // res.redirect("/"); // 수정 필요
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

// post list
router.get("/:id", isLoggedIn, upload2.none(), async (req, res, next) => {
  try {
    let result = await ClubPost.findAll({});
    if (result) {
      res.json(result);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/:id", isLoggedIn, upload2.none(), async (req, res, next) => {
  let post;
  try {
    post = await ClubPost.update(
      {
        visit_count: cnt,
      },
      { where: { id: req.params.id, UserId: req.user.id } }
    );

    // res.redirect("/");
  } catch (error) {
    console.error(error);
    next(error);
  }

  let visit_count = parseInt(req.params.cnt) + 1;
  try {
    const post = await ClubPost.update(
      {
        visit_count: cnt,
      },
      { where: { id: req.params.id, UserId: req.user.id } }
    );

    res.json(post);
    // res.redirect("/");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// delete
router.get("/delete/:id", isLoggedIn, checkPermission, async (req, res, next) => {
  try {
    const post = await ClubPost.destroy({
      where: { id: req.params.id, UserId: req.user.id },
    });

    res.json(post);
    // res.redirect("/");
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// search
router.get("/:id", function (req, res, next) {
  try {
    const post = await ClubPost.findOne({
      where: { id: req.params.title },
    });

    req.json(get);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// page count
router.get("/", async function (req, res) {
  var page = Math.max(1, parseInt(req.query.page));
  var limit = Math.max(1, parseInt(req.query.limit));
  page = !isNaN(page) ? page : 1;
  limit = !isNaN(limit) ? limit : 10;

  var skip = (page - 1) * limit;
  var count = await ClubPost.countDocuments({});
  var maxPage = Math.ceil(count / limit);
  var posts = await ClubPost.find({})
    .populate("writer_id")
    .sort("-createdAt")
    .skip(skip)
    .limit(limit)
    .exec();

  res.render("/index", {
    posts: posts,
    currentPage: page,
    maxPage: maxPage,
    limit: limit,
  });
});

router.get("/paising/:cur", function (req, res) {
  var page_view_size = 15;
  var page_num_list_size = 10;
  var totalPostCount = 0;
  var queryString = "";
  getConnection().query(queryString, function (error, data) {
    if (error) {
      console.log(error, ": db에서 불러오는데 실패했습니다.");
      return;
    }
    totalPostCount = data[0].cnt;
    var curPage = req.params.cur;
    console.log("현재 페이지 : " + curPage, "전체 게시물 : " + totalPostCount);

    if ((totalPostCount < 0) | (totalPostCount == 0)) {
      totalPostCount = 0;
    }

    var totalPageCount = Math.ceil(totalPostCount / page_view_size);
    var totalSetCount = Math.ceil(totalPageCount / page_num_list_size);
    var curSet = Math.ceil(curPage / page_num_list_size);
    var firstPage = (curSet - 1) * 10 + 1;
    var lastPage = firstPage + page_num_list_size;

    var result = {
      curPage: curPage,
      page_num_list_size: page_num_list_size,
      page_view_size: page_view_size,
      totalPostCount: totalPageCount,
      totalPageCount: totalPageCount,
      totalSetCount: totalSetCount,
      curSet: curSet,
      firstPage: firstPage,
      lastPage: lastPage,
    };
  });
});

function checkPermission(req, res, next){
  User.findOne({userid: req.params.id}, function(err, user){
    if (err) return res.json(err);
    if (club_posts.writer_id != req.user.id) return noPermission(req, res);
    next();
  });
}

module.exports = router;
