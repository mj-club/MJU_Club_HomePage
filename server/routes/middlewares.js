exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    // res.status(403).send("로그인 필요");
    // res.redirect("/");
    res.json(req);
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    const message = encodeURIComponent("로그인한 상태입니다.");
    // res.redirect(`/?error=${message}`);
    res.json(message);
  }
};

exports.noPermission = function(req, res){
  req.flash('errors', {login: "권한이 없습니다."});
  const message = encodeURIComponent("권한이 없습니다.:");
  req.logout();
  res.json(req);
}

exports.fileSize = function(bytes){
  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes == 0) return '0 Byte';
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}