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

router.post("/checkDuplicate", isNotLoggedIn, multer().none(), async (req, res, next) => {
  try {
    let message = "";
    const userEmail = req.body.email;
    const userPH = req.body.ph_number;
    const userId = req.body.student_id;

    const infoEmail = await User.findOne({
      attributes: [ "email" ],
      where: { email: userEmail }
    });
    const infoPH = await User.findOne({
      attributes: [ "ph_number" ],
      where: { ph_number: userPH }
    });
    const infoId = await User.findOne({
      attributes: [ "student_id" ],
      where: { student_id: userId }
    });

    if (!infoEmail) {
      if (!infoPH) {
        if (!infoId) {
          console.log("모두 사용가능해요!");
          message = encodeURIComponent("모두 사용가능해요!");
        }
        else if (infoId && infoId.student_id == userId) {
          console.log("이미 사용중인 학번이에요!");
          message = encodeURIComponent("이미 사용중인 학번이에요!");
        }
      }
      else if (infoPH && infoPH.ph_number == userPH) {
        console.log("이미 사용중인 번호에요!");
        message = encodeURIComponent("이미 사용중인 번호에요!");
      }
    }
    else if (infoEmail && infoEmail.email == userEmail) {
      console.log("이미 사용중인 이메일이에요!");
      message = encodeURIComponent("이미 사용중인 이메일이에요!");
    }

    res.json(message);
  } catch {
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

router.post("findPW", multer().none(), async (req, res) => {
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
        name: req.body.name,
        ph_number: req.body.ph_number,
      },
    });
    if (!user) {
      const err = new Error("가입되지 않은 회원입니다.");
      err.name = "NoUserError";
      done(null, false, { message: "가입되지 않은 회원입니다." });
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
        "비밀번호 초기화를 위해서는 아래의 URL을 클릭하여 주세요." +
        resetPWLink,
    };
    transporter.sendMail(emailOptions, res); //전송
    // 데이터베이스 Auth 테이블에 데이터 입력
  } catch (error) {
    res.send(error);
  }
});

router.post("resetPW", multer().none(), async (req, res) => {
  // 입력받은 token 값이 Auth 테이블에 존재하며 아직 유효한지 확인
  try {
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
    res.json("complete");
  } catch (error) {
    res.send(error);
  }
});
module.exports = router;
