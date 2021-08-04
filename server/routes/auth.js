const express = require("express");
const multer = require("multer");
const passport = require("passport");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
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
    school_year,
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
      where: { email: req.params.email },
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

router.post("findPW", multer.none(), async (req, res) => {
  // email 입력 확인
  if (req.body.email === "") {
    res.status(400).send("email required");
  }
  const crypto = require("crypto");
  // 유저 데이터베이스에 존재하는 이메일인지 확인
  try {
    const user = await User.findOne({
      where: {
        email: {
          like: req.body.email,
        },
      },
    });
  } catch {
    let error = new Error("");
  }
  const token = crypto.randomBytes(20).toString("hex"); // token 생성
  const data = {
    // 데이터 정리
    token,
    userId: user.id,
    ttl: 300, // ttl 값 설정 (5분)
  };
  await Auth.create(data);
  const nodemailer = require("nodemailer");
  // nodemailer Transport 생성
  // email example: dsfsa@naver.com
  const host = user.email.split("@")[1];
  const transporter = nodemailer.createTransport({
    host,
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      // 이메일을 보낼 계정 데이터 입력
      user: user.email,
      pass: user.password,
    },
  });
  const resetPWLink =
    process.env.NODE_ENV === "production"
      ? `http://13.209.214.244:8080/reset/${token}`
      : `http://localhost/reset/${token}`;
  const emailOptions = {
    // 옵션값 설정
    from: "명지대학교 인문캠퍼스 총동아리연합회",
    to: user.email,
    subject: "비밀번호 초기화 이메일입니다.",
    html:
      "비밀번호 초기화를 위해서는 아래의 URL을 클릭하여 주세요." + resetPWLink,
  };
  transporter.sendMail(emailOptions, res); //전송
  // 데이터베이스 Auth 테이블에 데이터 입력
});

router.post("resetPW", multer.none(), (req, res) => {
  // 입력받은 token 값이 Auth 테이블에 존재하며 아직 유효한지 확인
  const auth = await Auth.findOne({
    where: {
      token: {
        like: req.body.token,
      },
      created: {
        greater: new Date.now() - ttl,
      },
    },
  });
  await User.update(
    { password: req.body.password },
    { where: { id: auth.user_id } }
  );
});
module.exports = router;
