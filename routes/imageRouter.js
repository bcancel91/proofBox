var express = require("express");
var router = express.Router();
const multer = require("multer");
var Image = require("../models/ImageModel");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
console.log("storage", storage);

// file filter

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    // rejects storing a file
    cb(null, false);
  }
};

// upload

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

console.log("upload", upload);

// Post route

router.route("/").post(upload.single("imageData"), (req, res, next) => {
  console.log("req body", req.body);
  const newImage = new Image(req.file.path);

  newImage
    .save()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        success: true,
        document: result,
      });
    })
    .catch((err) => next(err));
});

module.exports = router;
