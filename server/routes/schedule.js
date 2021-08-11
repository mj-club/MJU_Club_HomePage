const express = require("express");
const router = express.Router();
const multer = require("multer");
// const dateUtil = require("date-utils");

const { ClubInfo, Schedule, User } = require("../models");
const { Op } = (Sequelize = require("sequelize"));
const { isLoggedIn, isClubManager } = require("./middlewares");

// -----------동아리, 개인 일정 모두 불러오기------------------
router.get("/readAll/:date", isLoggedIn, async (req, res, next) => {
  try {
    // 일정 불러오기
    const paramDate = req.params.date;
    let startDate =
      paramDate.substr(0, 4) + "-" + paramDate.substr(4, 2) + "-01";
    let uptoMonth = parseInt(paramDate.substr(4, 2));
    if (uptoMonth >= 10 && uptoMonth < 12) {
      uptoMonth += 1;
    } else if (uptoMonth == 12) {
      uptoMonth == "01";
    } else {
      uptoMonth += 1;
      uptoMonth.toString();
      uptoMonth = "0" + uptoMonth;
    }
    let endDate = paramDate.substr(0, 4) + "-" + String(uptoMonth) + "-01";
    console.log("조회날짜 >> ", startDate, " ~ ", endDate);

    // 가입한 동아리명 불러오기
    /* 
    "ClubInfos": [
        {
            "name": "blue",
            "ClubMember": {}
        }
      ]
    */
   // 와 같이 name만 불러오지 않는 문제 해결 필요
    
    const user = await User.findByPk(req.user.id , {include: [{ model: ClubInfo, attributes: ["name"] }] });
    let data = [];
    try {
      user.ClubInfos.map( async (club) => {
        let clubSchedule = await ClubInfo.findOne({
          where: {name: club.name}
        }).getSchedule();
        data.push({clubName: club.name, clubSchedule})
      })
      res.json(data);
    } catch(error) {
      res.send(error);
    }
    

    

    // // 개인 일정
    // const userSchedule = Schedule.findAll({
    //   attributes: ["title", "description", "start", "end", "allDayLong"],
    //   where: {
    //     id: req.user.id,
    //     start: {
    //       [Op.gte]: Date.parse(startDate),
    //       [Op.lt]: Date.parse(endDate),
    //     },
    //   },
    //   order: [["start", "DESC"]],
    // });

    // // 동아리 일정
    // const schedule = await Schedule.findAll({
    //   attributes: ["title", "description", "start", "end", "allDayLong"],
    //   where: {
    //     club_id: clubId,
    //     start: {
    //       [Op.gte]: Date.parse(startDate),
    //       [Op.lt]: Date.parse(endDate),
    //     },
    //   },
    //   order: [["start", "DESC"]],
    // });
    // res.json({ schedule, userSchedule });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// -----------동아리 일정------------------
// Read
// 동아리별 + 월별 일정 ( date param 에는 20210101 형식으로 접근)
router.get("/read/:clubName/:date", isLoggedIn, async (req, res, next) => {
  try {
    const clubInfo = await ClubInfo.findOne({
      where: { name: req.params.clubName },
    });
    const clubId = clubInfo.id;

    // 월별 조회 
    const paramDate = req.params.date; // 20210101이면 올해 1월
    let startDate =
      paramDate.substr(0, 4) + "-" + paramDate.substr(4, 2) + "-01";
    let uptoMonth = parseInt(paramDate.substr(4, 2));
    if (uptoMonth >= 10 && uptoMonth < 12) {
      uptoMonth += 1;
    } else if (uptoMonth == 12) {
      uptoMonth == "01";
    } else {
      uptoMonth += 1;
      uptoMonth.toString();
      uptoMonth = "0" + uptoMonth;
    }
    let endDate = paramDate.substr(0, 4) + "-" + String(uptoMonth) + "-01";

    // 기간별 조회 조회 시작 날짜 ~ 조회 종료 날짜
    console.log("조회날짜 >> ", startDate, " ~ ", endDate);
    const schedule = await Schedule.findAll({
      attributes: ["title", "description", "start", "end", "allDayLong"],
      where: {
        club_id: clubId,
        start: {
          [Op.gte]: Date.parse(startDate),
          [Op.lt]: Date.parse(endDate),
        },
      },
      order: [["start", "DESC"]],
    });
    res.json(schedule);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// Create
router.post(
  "/create/:clubName",
  isLoggedIn,
  multer().none(),
  async (req, res, next) => {
    try {
      let club = await ClubInfo.findOne({
        where: { name: req.params.clubName },
      });
      let user = await User.findByPk(req.user.id)
      // false : 시간지정, true : 하루종일
      let schedule = await Schedule.create({
        title: req.body.title,
        description: req.body.description,
        start: req.body.start, // 날짜 시간포함
        end: req.body.end, // 날짜 시간포함
        allDayLong: req.body.allDayLong, // false : 시간지정, true : 하루종일
      });
      await club.addSchedules(schedule);
      await user.addSchedules(schedule);
      console.log("일정 등록");
      res.json(schedule);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

// Update
router.post(
  "/update/:scheduleId",
  isLoggedIn,
  multer().none(),
  async (req, res, next) => {
    try {
      let schedule = await Schedule.update(
        {
          title: req.body.title,
          description: req.body.description,
          start: req.body.start,
          end: req.body.end,
          allDayLong: req.body.allDayLong
        },
        { where: { id: req.params.scheduleId } }
      );
      console.log("일정 수정");
      res.json(schedule);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

// Delete
router.delete(
  "/delete/:scheduleId",
  isLoggedIn,
  async (req, res, next) => {
    try {
      const schedule = await Schedule.destroy({
        where: { id: req.params.scheduleId },
      });
      console.log("일정 삭제");
      res.json(schedule);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

// -----------개인 일정------------------
// Read
// 월별 일정 ( date param 에는 20210101 형식으로 접근)
router.get("/read/my/:date", isLoggedIn, async (req, res, next) => {
  try {
    // 월별 - 20210808이면 8월
    // req.params.date; -> 20210808
    const paramDate = req.params.date;
    let startDate =
      paramDate.substr(0, 4) + "-" + paramDate.substr(4, 2) + "-01"; // 시작일
    let uptoMonth = parseInt(paramDate.substr(4, 2));
    if (uptoMonth >= 10 && uptoMonth < 12) {
      uptoMonth += 1;
    } else if (uptoMonth == 12) {
      uptoMonth == "01";
    } else {
      uptoMonth += 1;
      uptoMonth.toString();
      uptoMonth = "0" + uptoMonth;
    }
    let endDate = paramDate.substr(0, 4) + "-" + String(uptoMonth) + "-01"; // 종료일

    console.log("조회날짜 >> ", startDate, " ~ ", endDate);
    const schedule = await Schedule.findAll({
      attributes: ["title", "description", "start", "end", "allDayLong"],
      where: {
        user_id: req.user.id,
        start: {
          [Op.gte]: Date.parse(startDate),
          [Op.lt]: Date.parse(endDate),
        },
      },
      order: [["start", "DESC"]],
    });
    res.json(schedule);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// Create
router.post(
  "/create/my",
  isLoggedIn,
  multer().none(),
  async (req, res, next) => {
    try {
      let user = await User.findByPk(req.user.id)

      // false : 시간지정, true : 하루종일
      let schedule = await Schedule.create({
        title: req.body.title,
        description: req.body.description,
        start: req.body.start,
        end: req.body.end,
        allDayLong: req.body.allDayLong
      });
      await user.addSchedule(schedule);
      console.log("일정 등록");
      res.json(schedule);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

// Update
router.post(
  "/update/my/:scheduleId",
  isLoggedIn,
  multer().none(),
  async (req, res, next) => {
    try {
      let schedule = await Schedule.update(
        {
          title: req.body.title,
          description: req.body.description,
          start: req.body.start,
          end: req.body.end,
          allDayLong: req.body.allDayLong
        },
        { where: { id: req.params.scheduleId } }
      );
      console.log("일정 수정");
      res.json(schedule);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

// Delete
router.delete("/delete/my/:scheduleId", isLoggedIn, async (req, res, next) => {
  try {
    const schedule = await Schedule.destroy({
      where: { id: req.params.scheduleId },
    });
    console.log("일정 삭제");
    res.json(schedule);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
module.exports = router;
