const express = require("express");
const router = express.Router();
const multer = require("multer");
const mysql = require("mysql");
const fs = require("fs");
const e = require("express");

const storage = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      // image
      if (file.mimetype == "image/jpg" || file.mimetype == "image/png" || file.mimetype == "image/jpeg"){
        console.log("imageFile upload.")
        cd(null, 'uploads/images')
      }
      else if (file.mimetype == "application/txt" || file.mimetype == "application/pdf" || file.mimetype == "application/md") {
        console.log("txt,pdf etc... upload")
        cd(null, 'uploads/texts')
      }
      else if (file.mimetype == "excelFile/xlsx"){
        console.log("excelFile upload")
        cd(null, 'uploads/excel')
      }
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

var upload = multer({ storage: storage })
// db
router.post('/upload_images', upload.single('fileupload'), function (req, res) {
  console.log("post")
  console.log(req.file)
  console.log(req.file.path)
  console.log(upload)
  console.log(upload.storage.getFilename)

  // mysql
  getConnection().query('insert into myfile(name) values (?)', [req.file.path], function () {
    // res.redirect('/filepage');
  });
});

// download
router.get('/download/uploads/images/:name', function (req, res) {
  var filename = req.params.name;
  
  var file = __dirname + '/../uploads/images/' + filename
  console.log(__dirname)
  console.log(req.path)
  console.log(file)
  res.download(file);
});
  
  
var pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost:3030',
  user: 'root',
  database: 'sql',
  password: 'pw1234'
})
  
function getConnection() {
  return pool
}
  
module.exports = router
  