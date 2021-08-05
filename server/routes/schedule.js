const express = require("express");
const router = express.Router();
const multer = require("multer");
// const dateUtil = require("date-utils");

const { ClubInfo, Schedule } = require("../models");
const { Op } = Sequelize = require('sequelize');


// -----------동아리, 개인 일정 모두 불러오기------------------
router.get("/readAll", async(req, res, next) => {
  try {
    
    // 동아리 id
    // const clubInfo = await ClubInfo.findOne({
      //   where: { name: req.params.clubName },
      // });
      // const clubId = clubInfo.id;
      
      // 일정 불러오기 
      const paramDate = req.params.date;
      let startDate = paramDate.substr(0,4) + "-" + paramDate.substr(4,2) + "-01";
      let uptoMonth = parseInt(paramDate.substr(4,2))
      if (uptoMonth >= 10 && uptoMonth < 12){
        uptoMonth += 1
      } else if (uptoMonth == 12){
        uptoMonth == "01"
      } else {
        uptoMonth += 1
        uptoMonth.toString()
        uptoMonth = "0" + uptoMonth
      }
      let endDate = paramDate.substr(0,4) + "-" + String(uptoMonth) + "-01";;
      
      console.log("조회날짜 >> ", startDate, " ~ ", endDate);

      // 개인 일정
      const userSchedule = Schedule.findAll({
        attributes: ["title", "description", "start", "end", "allDayLong"], 
        where: {
          id: req.user.id,
          start: {
            [Op.gte]: Date.parse(startDate),
            [Op.lt]: Date.parse(endDate)
          }
        },
        order: [["start", "DESC"]],
      });

      // 동아리 일정
      const schedule = await Schedule.findAll({
        attributes: ["title", "description", "start", "end", "allDayLong"], 
        where: {
          club_id: clubId,
          start: {
            [Op.gte]: Date.parse(startDate),
            [Op.lt]: Date.parse(endDate)
          }
        },
        order: [["start", "DESC"]],
      });
      res.json({schedule, userSchedule});
    } catch (error) {
      console.error(error);
    next(error);
  }
});

// -----------동아리 일정------------------
// Read
// 동아리별 + 월별 일정 ( date param 에는 20210101 형식으로 접근)
router.get("/read/:clubName/:date", async (req, res, next) => {
    try {
      const clubInfo = await ClubInfo.findOne({
        where: { name: req.params.clubName },
      });
      const clubId = clubInfo.id;

      const paramDate = req.params.date;
      let startDate = paramDate.substr(0,4) + "-" + paramDate.substr(4,2) + "-01";
      let uptoMonth = parseInt(paramDate.substr(4,2))
      if (uptoMonth >= 10 && uptoMonth < 12){
        uptoMonth += 1
      } else if (uptoMonth == 12){
        uptoMonth == "01"
      } else {
        uptoMonth += 1
        uptoMonth.toString()
        uptoMonth = "0" + uptoMonth
      }
      let endDate = paramDate.substr(0,4) + "-" + String(uptoMonth) + "-01";;
      
      console.log("조회날짜 >> ", startDate, " ~ ", endDate);
      const schedule = await Schedule.findAll({
        attributes: ["title", "description", "start", "end", "allDayLong"], 
        where: {
          club_id: clubId,
          start: {
            [Op.gte]: Date.parse(startDate),
            [Op.lt]: Date.parse(endDate)
          }
        },
        order: [["start", "DESC"]],
      });
      res.json(schedule);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

// Create
router.post("/create/:clubName", multer().none(), async (req, res, next) => {
    try {
      const clubInfo = await ClubInfo.findOne({
        where: { name: req.params.clubName },
      });
      const clubId = clubInfo.id;

      // allDayLong >> 0 : 시간지정, 1 : 하루종일
      let schedule = await Schedule.create({
        title: req.body.title,
        description: req.body.description,
        start: req.body.start,
        end: req.body.end,
        allDayLong: req.body.allDayLong,
        // user_id: req.user.id,
        club_id: clubId,
      });
      console.log("일정 등록");
      res.json(schedule);
    } catch (error) {
      console.error(error);
    }
  }
);

// Update
router.post("/update/:eventId", multer().none(), async (req, res, next) => {
    try {
      let schedule = await Schedule.update(
        {
          title: req.body.title,
          description: req.body.description,
          start: req.body.start,
          end: req.body.end,
        },
        { where: { id: req.params.eventId } }
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
router.delete("/delete/:eventId", async (req, res, next) => {
    try {
      const schedule = await Schedule.destroy({
        where: { id: req.params.eventId },
      });
      console.log("일정 삭제");
      res.json(schedule);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
);

// -----------개인 일정------------------
// Read
// 월별 일정 ( date param 에는 20210101 형식으로 접근)
router.get("/read/my/:date", async (req, res, next) => {
  try {
    const paramDate = req.params.date;
    let startDate = paramDate.substr(0,4) + "-" + paramDate.substr(4,2) + "-01";
    let uptoMonth = parseInt(paramDate.substr(4,2))
    if (uptoMonth >= 10 && uptoMonth < 12){
      uptoMonth += 1
    } else if (uptoMonth == 12){
      uptoMonth == "01"
    } else {
      uptoMonth += 1
      uptoMonth.toString()
      uptoMonth = "0" + uptoMonth
    }
    let endDate = paramDate.substr(0,4) + "-" + String(uptoMonth) + "-01";;
    
    console.log("조회날짜 >> ", startDate, " ~ ", endDate);
    const schedule = await Schedule.findAll({
      attributes: ["title", "description", "start", "end", "allDayLong"], 
      where: {
        user_id: req.user.id,
        start: {
          [Op.gte]: Date.parse(startDate),
          [Op.lt]: Date.parse(endDate)
        }
      },
      order: [["start", "DESC"]],
    });
    res.json(schedule);
  } catch (error) {
    console.error(error);
    next(error);
  }
}
);

// Create
router.post("/create/my", multer().none(), async (req, res, next) => {
  try {
    // allDayLong >> 0 : 시간지정, 1 : 하루종일
    let schedule = await Schedule.create({
      title: req.body.title,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end,
      allDayLong: req.body.allDayLong,
      user_id: req.user.id,
    });
    console.log("일정 등록");
    res.json(schedule);
  } catch (error) {
    console.error(error);
  }
}
);

// Update
router.post("/update/my/:eventId", multer().none(), async (req, res, next) => {
  try {
    let schedule = await Schedule.update(
      {
        title: req.body.title,
        description: req.body.description,
        start: req.body.start,
        end: req.body.end,
      },
      { where: { id: req.params.eventId } }
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
router.delete("/delete/my/:eventId", async (req, res, next) => {
  try {
    const schedule = await Schedule.destroy({
      where: { id: req.params.eventId },
    });
    console.log("일정 삭제");
    res.json(schedule);
  } catch (err) {
    console.error(err);
    next(err);
  }
}
);
module.exports = router;
