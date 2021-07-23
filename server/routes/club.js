const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

const { ClubInfo, ClubMember} = require("../models");
const { isLoggedIn } = require("./middlewares");

// -----------info------------

// club info
// read
router.get(
  "/read/:clubName",
  // isLoggedIn,
  // checkPermission,
  async (req, res, next) => {
    try {
      const club = await ClubInfo.findOne({
        where: { name: req.params.clubName },
      });
      res.json(club);
    } catch (error) {
      console.error(error);
      next(error);
    }
    // ClubInfo.findOne(
    //   { where: { name: req.params.clubName } },
    // function (err, get) {
    //   if (err) return res.json(err);
    //   return res.json(get);
    // }
    // );
  }
);

//create or update
router.post(
  "/createOrUpdate/:clubName",
  // isLoggedIn,
  // checkPermission,
  multer().none(),
  async (req, res, next) => {
    try {
      let clubInfo = await ClubInfo.findOne({
        where: { name: req.params.clubName },
      });
      if (clubInfo === null) {
        clubInfo = await ClubInfo.create({
          name: req.params.clubName,
          representation: req.body.representation,
          contact_number: req.body.contact_number,
          introduction: req.body.introduction,
          plan: req.body.plan,
          recruit: req.body.recruit,
          meeting: req.body.meeting,
          recruitment: req.body.recruitment,
        });
      } else {
        const targetId = clubInfo.id;
        clubInfo = await ClubInfo.update(
          {
            name: req.params.clubName,
            representation: req.body.representation,
            contact_number: req.body.contact_number,
            introduction: req.body.introduction,
            plan: req.body.plan,
            recruit: req.body.recruit,
            meeting: req.body.meeting,
            recruitment: req.body.recruitment,
          },
          { where: { id: targetId } }
        );
      }
      res.json(clubInfo);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
);

// delete
router.delete(
  "/delete/:clubName",
  // isLoggedIn,
  // checkPermission,
  async (req, res, next) => {
    try {
      let clubInfo = await ClubInfo.destroy({
        where: { name: req.params.clubName },
      });
      res.json(clubInfo);
    } catch (err) {
      console.error(err);
    }
  }
);

// member list
router.get(
  "/member/:clubName",
  // isLoggedIn,
  // checkPermission,
  async (req, res, next) => {
    try {
      const clubInfo = await ClubInfo.findOne({
        where: { name: req.params.clubName },
      });
      const clubId = clubInfo.id;
      const clubMembers = await ClubMember.findAll({
        where: { club_id: clubId },
      });
      res.json(clubMembers);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
);

// function checkPermission(req, res, next) {
//   ClubPost.findOne({ clubId: req.params.clubId }, function (err, user) {
//     if (err) return res.json(err);
//     if (club_posts.writer_id != req.user.id) return noPermission(req, res);
//     next();
//   });
// }

module.exports = router;
