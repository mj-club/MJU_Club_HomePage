var express = require('express');
const { isLoggedIn, noPermission } = require('./middlewares');
const { User } = require("../models/user");
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// view 
router.get("/:id", isLoggedIn, checkPermission, function(req, res){});

// update
router.get("/update/:id", isLoggedIn, checkPermission, function(req, res){});

// destroy

function checkPermission(req, res, next){
  User.findOne({userid: req.user.id}, function(err, user){
    if (err) return res.json(err);
    if (user.id != req.user.id) return noPermission(req, res);
    next();
  });
}
module.exports = router;
