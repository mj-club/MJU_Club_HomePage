// exports.isLoggedIn = (req, res, next) => {
//   if (req.isAuthenticated()) {
//     next();
//   } else {
//     res.status(403).send("로그인 필요");
//     // res.redirect("/");
//     // res.json(req);
//   }
// };

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    const message = encodeURIComponent("로그인한 상태입니다.");
    // res.redirect(`/?error=${message}`);
    res.json(message);
  }
};

exports.noPermission = function (req, res) {
  req.flash("errors", { login: "권한이 없습니다." });
  const message = encodeURIComponent("권한이 없습니다.:");
  req.logout();
  res.json(req);
};

// permission (로그인)
exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).send("로그인 필요");
    // res.redirect("/");
    // res.json(req);
  }
};

// permission (관리자만)
exports.isManager = (req, res, next) => {
  if (req.user.auth_lv > 0) {
    next();
  } else {
    res.status(403).send("관리자 계정이 아님");
    // res.redirect("/");
    // res.json(req);
  }
};
// permission (동아리만)
exports.isManager = (req, res, next) => {
  if (req.user.auth_lv === 1) {
    next();
  } else {
    res.status(403).send("동아리 관리자 계정이 아님");
    // res.redirect("/");
    // res.json(req);
  }
};
// permission (총동연만)
exports.isManager = (req, res, next) => {
  if (req.user.auth_lv === 2) {
    next();
  } else {
    res.status(403).send("총동연 관리자 계정이 아님");
    // res.redirect("/");
    // res.json(req);
  }
};
exports.fileSize = function (bytes) {
  var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes == 0) return "0 Byte";
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
};
