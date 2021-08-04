const express = require("express");
const multer = require("multer");
const passport = require("passport");
const bcrypt = require("bcrypt");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const User = require("../models/user");

const router = express.Router();

router.post("/join", isNotLoggedIn, multer().none(), async (req, res, next) => {
  const {
    email,
    name,
    password,
    ph_number,
    sex,
    department,
    school_year, //학년
    student_id,
    major,
    snsId,
  } = req.body;
  let auth_lv = student_id ? 1 : 0;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      return res.redirect("/join?error=exist");
    }
    const hash = await bcrypt.hash(password, 12);
    const user = await User.create({
      email,
      name,
      password: hash,
      ph_number,
      sex,
      department,
      school_year,
      student_id,
      auth_lv,
      major,
      snsId,
    });
    return res.json(user);
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.post("/login", isNotLoggedIn, (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.json(info.message);
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }

      return res.json(user);
    });
  })(req, res, next);
});

router.get("/logout", isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.json({ status: "logout" });
});

router.get("/duplicate/:email", isNotLoggedIn, async (req, res, next) => {
  try {
    let userEmail = await User.findOne({
      attributes: ["email"],
      where: { email: req.params.email }
    });
    if (userEmail.email == req.params.email) {
      console.log("이미 있는 이메일이에요!");
      let message = encodeURIComponent("이미 있는 이메일이에요!");
      res.json(message);
    }
  } catch {
    console.log("사용가능한 이메일이에요");
    let message = encodeURIComponent("사용가능한 이메일이에요");
    res.json(message);
  }
});


router.post("/findEmail", isNotLoggedIn, multer().none(), async (req, res, next) => {
  try {
    const userEmail = await User.findOne({
      attributes: ["email"],
      where: { name: req.body.name, student_id: req.body.student_id }
    });
    const finded = JSON.stringify(userEmail.email);
    const loc = finded.indexOf("@");
    const processed = finded.substring(1,loc-3) + "***" + finded.substring(loc,finded.length-1);

    console.log("이메일을 찾았어요!");
    res.json(processed);
  } catch (error) {
    console.log("이메일을 찾지 못했어요...");
    console.error(error);
    res.send(error);
  }
});

router.get("/kakao", passport.authenticate("kakao"));

router.get(
  "/kakao/callback",
  passport.authenticate("kakao", {
    failureRedirect: "/",
  }),
  (req, res) => {
    console.log(req.user);
    res.json(req.user);
  }
);

module.exports = router;
