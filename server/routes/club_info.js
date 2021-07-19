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
router.post("/:clubId", isLoggedIn, checkPermission, async (req, res, next) => {
  ClubInfo.findOne({clubId: req.params.clubId}, function(err, post){
    if (err) return res.json(err);
    return res.json(post);
  });
});

// member list
router.post("/member/:clubId", isLoggedIn, checkPermission, async (req, res, next) => {
  ClubMember.findAll( {where: {__} }.sort('-createAt').exec(function(err, members){
    if (err) return res.json(err);
    return res.json(members)
  }));
});

function checkPermission(req, res, next){
  ClubInfo.findOne({clubId: req.params.clubId}, function(err, user){
    if (err) return res.json(err);
    if (req.user.auth_lv != 2) return noPermission(req, res);
    next();
  });
}



