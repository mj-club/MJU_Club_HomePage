const express = require("express");
const router = express.Router();
const multer = require("multer");

const { ClubUnionInfo } = require("../models");
const { isLoggedIn } = require("./middlewares");
const { Op } = Sequelize = require('sequelize');
const upload = multer();

// Read
router.get(
  "/read",
  // isLoggedIn,
  async (req, res, next) => {
    try {
      const clubUnionInfo = await ClubUnionInfo.findAll();
      res.json(clubUnionInfo);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
);

// Create
router.post(
  "/create",
  // isLoggedIn,
  upload.none(),
  async (req, res, next) => {
    try {
      let clubUnionInfo = await ClubUnionInfo.create({
        name: req.body.name,
        slogan: req.body.slogan,
        representative: req.body.slogan,
        deputy_representative: req.body.deputy_representative,
        organization_chart: req.body.organization_chart,
        logo: req.body.logo,
        th: req.body.th,
      });
      console.log("총동연 초기 정보 등록");
      res.json(clubUnionInfo);
    } catch (error) {
      console.error(error);
    }
  }
);

// Update
router.post(
  "/update",
  // isLoggedIn,
  upload.none(),
  async (req, res, next) => {
    try {
      let ClubUnionInfo = await ClubUnionInfo.update(
        {
          name: req.body.name,
          slogan: req.body.slogan,
          representative: req.body.slogan,
          deputy_representative: req.body.deputy_representative,
          organization_chart: req.body.organization_chart,
          logo: req.body.logo,
          th: req.body.th,
        },
        { 
          where: { id : 1 } 
      });
      console.log("총동연 데이터 수정");
      res.json(clubUnionInfo);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

// Delete
router.delete(
  "/delete",
  // isLoggedIn,
  // checkPermission,
  async (req, res, next) => {
    try {
      const clubUnionInfoData = await ClubUnionInfo.findAll();
      const unionId = clubUnionInfoData.id;
      const clubUnionInfo = await ClubUnionInfo.destroy({
        where: { id: unionId },
      });
      console.log("총동연 정보 삭제");
      res.json(clubUnionInfo);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
);

module.exports = router;
