const express = require("express");
const router = express.Router();
const multer = require("multer");
const mysql = require("mysql");
const fs = require("fs");

const { ClubInfo } = require("../models/club_info");
const { ClubMember } = require("../models/club_member");
const { ClubPostFile } = require("../models/club_post_file");
const { isLoggedIn } = require("./middlewares");
const { noPermission } = require("./middlewares");

// club info
// read
router.get("/:clubName", isLoggedIn, checkPermission, async (req, res, next) => {
  ClubInfo.findOne({where:{name: req.params.clubName}}, function(err, get){
    if (err) return res.json(err);
    return res.json(post);
  });
});

//create or update
router.post("/:clubName", isLoggedIn, checkPermission, async(req, res, next)=>{
  try {
    let clubInfo = await ClubInfo.findOne({where:{name: req.params.clubName}})
    if (clubInfo === null) {
      clubInfo = await ClubInfo.create({
        name: req.params.clubName, 
        representation: req.params.representation,
        contact_number: req.params.contact_number,
        introduction: req.params.introduction,
        plan: req.params.plan,
        recruit: req.params.recruit,
        meeting: req.params.meeting,
        recruitment: req.params.recruitment,
      })
    }else {
      const targetId = clubInfo.id
      clubInfo = await ClubInfo.update({
        name: req.params.clubName, 
        representation: req.params.representation,
        contact_number: req.params.contact_number,
        introduction: req.params.introduction,
        plan: req.params.plan,
        recruit: req.params.recruit,
        meeting: req.params.meeting,
        recruitment: req.params.recruitment,
      }, {where: { id: targetId }})
    }
    res.json(clubInfo)
  } catch (error) {
    console.log(error)
    res.send(error)
  }
});

// delete
router.get("/:clubName", isLoggedIn, checkPermission, async (req, res, next) => {
  try {
    let clubInfo = await ClubPost.destroy({
      where: {name: req.params.clubName}
    });
    res.json(clubInfo);
  } catch (err) {
    console.error(err);
  }
});

// member list
router.get("/member/:clubName", isLoggedIn, checkPermission, async (req, res, next) => {
  try {
    const clubInfo = await ClubInfo.findOne({where:{name: req.params.clubName}})
    const clubId = clubInfo.id
    const clubMembers = await ClubMember.findAll({where: {club_id: clubId}})
    res.json(clubMembers)
  } catch (error) {
    console.log(error)
    res.send(error)
  }
});

function checkPermission(req, res, next){
  ClubInfo.findOne({clubId: req.params.clubId}, function(err, user){
    if (err) return res.json(err);
    if (req.user.auth_lv != 2) return noPermission(req, res);
    next();
  });
}

