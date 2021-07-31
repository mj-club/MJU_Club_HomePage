const express = require("express");
const multer = require("multer");

const { RentalInfo, RentalApply } = require("../models");
const { isLoggedIn } = require("./middlewares");

const router = express.Router();

const upload = multer();

//--------사용자----------

// Read
// 개인 신청 내역 조회 (상세)
router.get(
  "/my-application/read/:itemId",
  // isLoggedIn,
  async (req, res, next) => {
    try {
      const myRental = await RentaApply.findOne({
        where: { id: req.params.itemId, user_id: req.user.id },
      });
      res.json(myRental);
    } catch (error) {
      console.error(error);
    }
  }
);
// 개인 신청 내역 조회
router.get(
  "/my-application/readAll",
  // isLoggedIn,
  async (req, res, next) => {
    try {
      const myRental = await RentalApply.findAll({
        where: { id: req.params.itemId, user_id: req.user.id },
      });
      res.json(myRental);
    } catch (error) {
      console.error(error);
    }
  }
);

// Read
// 대여 공간 및 물품 조회 (게시판에서)
router.get(
  "/read/:itemId",
  // isLoggedIn,
  async (req, res, next) => {
    try {
      const rental = await RentalInfo.findOne({
        where: { id: req.params.itemId },
      });
      res.json(rental);
    } catch (error) {
      console.error(error);
    }
  }
);

router.get(
  "/readAll",
  // isLoggedIn,
  // upload.none(),
  async (req, res, next) => {
    try {
      const rental = await rental.findAll({
        attributes: [
          "room_name",
          "rental_state",
          "room_img",
        ],
        order: [["room_name", "DESC"]],
      });
      res.json(rental);
    } catch (error) {
      console.error(error);
    }
  }
);

//--------사용자(대여 신청)----------
// Create
// 신청
router.post(
  "/application/:itemId",
  // isLoggedIn,
  upload.none(),
  async (req, res, next) => {
    try {
      const rentalItem = await RentalInfo.findOne({
        where: { id: req.params.itemId },
      });
      if (rentalItem.rental_state != 1) {
        const rental = await RentalApply.create({
        room_name: rentalItem.room_name,
        rental_date: req.body.rental_date,
        rental_time: req.body.rental_time,
        rep_member_name: req.body.rep_member_name,
        member_count: req.body.member_count,
        apply_state: req.body.apply_state,
        // user_id: req.user.id,
        });
        console.log("대여 신청(사용자)");
        res.json(rental);
      }
      else {
        const message = encodeURIComponent("잔여 수량이 부족하여 신청할 수 없습니다.");
        res.json(message);
      }
    } catch (error) {
      console.error(error);
    }
  }
);

// Update
// 신청 수정 
router.post(
  "/application/update/:itemId",
  // isLoggedIn,
  upload.none(),
  async (req, res, next) => {
    try {
      const rentalItem = await RentalInfo.findOne({
        where: { id: req.params.itemId },
      });
      const rental = await RentalApply.create({
        room_name: req.body.room_name,
        rental_date: req.body.rental_date,
        rental_time: req.body.rental_time,
        rep_member_name: req.body.rep_member_name,
        member_count: req.body.member_count,
        apply_state: req.body.apply_state,
      },
      { 
        where: { id: rentalItem.id }
      });
      console.log("신청 수정");
      res.json(rental);
    } catch (error) {
      console.error(error);
    }
  }
);

// Delete
// 신청 취소(사용자)
router.delete(
  "/application/delete/:itemId",
  // isLoggedIn,
  // checkPermission,
  async (req, res, next) => {
    try {
      const rental = await RentalApply.destroy({
        where: { id: req.params.itemId },
      });
      console.log("신청 취소");
      res.json(rental);
    } catch (err) {
      console.error(err);
    }
  }
);

//--------관리자----------

// 대여서비스 공간 또는 물품 추가(관리자)
// Create
router.post(
  "/create",
  // isLoggedIn,
  upload.none(),
  async (req, res, next) => {
    try {
      const rental = await RentalInfo.create({
        room_name: req.body.room_name,
        rental_state: req.body.rental_state,
        room_img: req.body.room_img,
      });
      console.log("대여 공간/물품 등록");
      res.json(rental);
    } catch (error) {
      console.error(error);
    }
  }
);

// Update
// 대여서비스 공간 또는 물품 수정(관리자)
router.post(
  "/update/:itemId",
  // isLoggedIn,
  upload.none(),
  async (req, res, next) => {
    try {
      const rental = await RentalInfo.update({
        room_name: req.body.room_name,
        rental_state: req.body.rental_state,
        room_img: req.body.room_img,
      },
      {
        where: { id: req.body.itemId }
      });
      console.log("대여 공간/물품 수정");
      res.json(rental);
    } catch (error) {
      console.error(error);
    }
  }
);

// Delete
// 대여서비스 공간 또는 물품 삭제(관리자)
router.delete(
  "/delete/:itemId",
  // isLoggedIn,
  // checkPermission,
  async (req, res, next) => {
    try {
      const rental = await RentalInfo.destroy({
        where: { id: req.params.itemId },
      });
      console.log("대여 공간/물품 삭제");
      res.json(rental);
    } catch (err) {
      console.error(err);
    }
  }
);

module.exports = router;
