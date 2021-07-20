const express = require("express");
const router = express.Router();
const multer = require("multer");
const mysql = require("mysql");
const fs = require("fs");

const { ClubInfo } = require("../models/club_info");
const { isLoggedIn } = require("./middlewares");
const { noPermission } = require("./middlewares");

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
router.post("/create/:clubId", isLoggedIn, checkPermission, upload2.none(), async (req, res, next) => {
    try {
      const addClub = await ClubInfo.create({
        name: req.body.name,
        introdution: req.body.introdution || null,
        representation: req.body.representation,
        contact_number: req.body.contact_number || null,
        sns: req.body.sns || null,
        information: req.body.information || null,
        member_count: 0,
      });

      res.json(addClub);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

// edit(update)
router.post( "/update/:clubId:", isLoggedIn, checkPermission,  upload2.none(), async (req, res, next) => {
    try {
      const addClub = await ClubInfo.create({
        name: req.body.name,
        introdution: req.body.introdution || null,
        representation: req.body.representation,
        contact_number: req.body.contact_number || null,
        sns: req.body.sns || null,
        information: req.body.information || null,
        member_count: 0,
        },
        { where: { id: req.params.clubId} }
      );

      res.json(addClub);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

// delete
router.get("/delete/:clubId", isLoggedIn, checkPermission, async (req, res, next) => {
  try {
    const addClub = await ClubInfo.destroy({
      where: { id: req.params.clubId},
    });

    res.json(addClub);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

function checkPermission(req, res, next){
  ClubInfo.findOne({clubId: req.params.clubId}, function(err, user){
    if (err) return res.json(err);
    if (req.user.auth_lv != 2) return noPermission(req, res);
    next();
  });
}

module.exports = router;