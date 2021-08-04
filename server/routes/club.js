const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

const { ClubInfo, ClubMember, User, Sns, Join } = require("../models");
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
        include: [Sns, Join],
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

        //sns
        if (req.body.sns) {
          sns = req.body.sns;
          sns.map(async (data) => {
            try {
              let sns = await Sns.create({
                sns_type: data.sns_type,
                sns_link: data.sns_link,
              });
              await clubInfo.addSns(sns);
            } catch (error) {
              console.error(error);
            }
          });
        }
        //join
        if (req.body.join) {
          join = req.body.join;
          join.map(async (data) => {
            try {
              let join = await Join.create({
                join_type: data.join_type,
                join_path: data.join_path,
              });
              await clubInfo.addJoin(join);
            } catch (error) {
              console.error(error);
            }
          });
        }
      } else {
        clubInfo.update({
          name: req.params.clubName,
          representation: req.body.representation,
          contact_number: req.body.contact_number,
          introduction: req.body.introduction,
          plan: req.body.plan,
          recruit: req.body.recruit,
          meeting: req.body.meeting,
          recruitment: req.body.recruitment,
        });

        //sns
        if (req.body.sns) {
          await Sns.destroy({ where: { club_id: clubInfo.id } });
          sns = req.body.sns;
          sns.map(async (data) => {
            try {
              let sns = await Sns.create({
                sns_type: data.sns_type,
                sns_link: data.sns_link,
              });
              await clubInfo.addSns(sns);
            } catch (error) {
              console.error(error);
            }
          });
        }
        //join
        if (req.body.join) {
          await Join.destroy({ where: { club_id: clubInfo.id } });
          join = req.body.join;
          join.map(async (data) => {
            try {
              let join = await Join.create({
                join_type: data.join_type,
                join_path: data.join_path,
              });
              await clubInfo.addJoin(join);
            } catch (error) {
              console.error(error);
            }
          });
        }
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

// -----------members------------

// read (member list)
router.get(
  "/readMembers/:clubId",
  // isLoggedIn,
  // checkPermission,
  async (req, res, next) => {
    try {
      const clubMembers = await ClubMember.findAll({
        where: { club_info_id: req.params.clubId },
      });
      res.json(clubMembers);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
);

// add (member)
router.post(
  "/addMember/:clubId",
  multer().none(),
  // isLoggedIn,
  // checkPermission,
  async (req, res, next) => {
    try {
      const clubInfo = await ClubInfo.findByPk(req.params.clubId);
      const user = await User.findByPk(req.body.user_id);
      await clubInfo.addUser(user, {
        through: { position: req.body.member_position },
      });
      const result = await ClubInfo.findOne({
        where: { id: req.params.clubId },
        include: User,
      });
      res.json(result);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
);

// delete (member)
router.delete(
  "/deleteMember/:clubId",
  // isLoggedIn,
  // checkPermission,
  multer().none(),
  async (req, res, next) => {
    try {
      ClubMember.destroy({
        where: { club_info_id: req.params.clubId, user_id: req.body.user_id },
      });
      const result = await ClubInfo.findOne({
        where: { id: req.params.clubId },
        include: User,
      });

      res.json(result);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
);

function checkPermission(req, res, next) {
  ClubPost.findOne({ clubId: req.params.clubId }, function (err, post) {
    if (err) return res.json(err);
    if (post.writer_id != req.user.id) return noPermission(req, res);
    next();
  });
}

module.exports = router;
