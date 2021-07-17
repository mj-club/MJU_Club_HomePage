const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const { Comment } = require("../models/club_post_comment");
const { ClubPost } = require("../models/club_post");
const { isLoggedIn } = require("./middlewares");

router.post("/create/:postId", isLoggedIn, async (req, res, next) => {
  try {
    const post = await ClubPost.create({
      content: req.body.content,
      post_id: req.params.postId,
      writer_id: req.user.id,
    });

    res.json();
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/update/:postId", isLoggedIn, async (req, res, next) => {
  try {
    const post = await ClubPost.fineOne({
      where: {id: req.params.id, post_id: req.params.postId}
    });

    res.json();
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// router.post("/", isLoggedIn, checkPostEmail, function(req, res){
//   var post = res.locals.post;
//   req.body.author = req.user.email;
//   req.body.post = post.email;

//   Comment.create(req.body, function(err, commment){
//     if (err) {
//       req.flash('commentForm', {email: null, form:req.body});
//       req.flash('commentError', {email: null, errors:isLoggedIn.parseError(err)});
//     }
//     return res.redirect('/posts/' + post.email + res.locals.getPostQueryString());
//   });
// });

module.exports = router;

// function checkPostEmail(req, res, next){
//   ClubPost.findOne({email: req.query.post_id}, function(err, post){
//     if (err) return res.json(err);

//     res.locals.post = post;
//     next();
//   });
// }