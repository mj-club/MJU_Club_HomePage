const express = require("express");
const multer = require("multer");

const { EventInfo } = require("../models");
const { isLoggedIn, isUnionManager } = require("./middlewares");

const router = express.Router();

const upload = multer();

// Read
// 개별 이벤트 상세
router.get(
  "/read/:eventId",
  async (req, res, next) => {
    try {
      let eventInfo = await EventInfo.findOne({
        where: { id: req.params.eventId },
      });
      res.json(eventInfo);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

// 전체 이벤트 목록
router.get(
  "/readAll",
  async (req, res, next) => {
    try {
      let eventInfo = await EventInfo.findAll({
        attributes: [
          "title",
          "event_term",
          "event_start",
          "event_end",
        ],
        order: [["event_Start", "ASC"]],
      });
      res.json(eventInfo);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

// Create
router.post(
  "/create",
  isLoggedIn,
  isUnionManager,
  upload.none(),
  async (req, res, next) => {
    try {
      let eventInfo = await EventInfo.create({
        event_name: req.body.event_name,
        event_target: req.body.event_target,
        title: req.body.title,
        content: req.body.content,
        event_term: req.body.event_term,
        event_start: req.body.event_start,
        event_end: req.body.event_end,
        event_link: req.body.event_link,
        event_img: req.body.event_img,
      });
      console.log("이벤트 등록");
      res.json(eventInfo);
    } catch (error) {
      console.error(error);
    }
  }
);

// Update
router.post(
  "/update/:eventId",
  isLoggedIn,
  isUnionManager,
  upload.none(),
  async (req, res, next) => {
    try {
      let eventInfo = await EventInfo.update(
        {
          event_name: req.body.event_name,
          event_target: req.body.event_target,
          title: req.body.title,
          content: req.body.content,
          event_term: req.body.event_term,
          event_start: req.body.event_start,
          event_end: req.body.event_end,
          event_link: req.body.event_link,
          event_img: req.body.event_img,
        },
        { where: { id: req.params.eventId } }
      );
      console.log("이벤트 수정");
      res.json(eventInfo);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

// Delete
router.delete(
  "/delete/:eventId",
  isLoggedIn,
  isUnionManager,
  async (req, res, next) => {
    try {
      const eventInfo = await EventInfo.destroy({
        where: { id: req.params.eventId },
      });
      console.log("이벤트 삭제");
      res.json(eventInfo);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
);

module.exports = router;
