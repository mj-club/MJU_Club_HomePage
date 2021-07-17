const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const { Comment } = require("../models/club_post_comment");
const { ClubPost } = require("../models/club_post");
const { isLoggedIn } = require("./middlewares");

outer.post("/", isLoggedIn, checkPostEmail, function(req, res){
  var post = res.locals.post;
  req.body.author = req.user.email;
  req.body.post = post.email;

  Comment.create(req.body, function(err, commment){
    if (err) {
      req.flash('commentForm', {email: null, form:req.body});
      req.flash('commentError', {email: null, errors:isLoggedIn.parseError(err)});
    }
    return res.redirect('/posts/' + post.email + res.locals.getPostQueryString());
  });
});

module.exports = router;

function checkPostEmail(req, res, next){
  ClubPost.findOne({email: req.query.post_id}, function(err, post){
    if (err) return res.json(err);

    res.locals.post = post;
    next();
  });
}