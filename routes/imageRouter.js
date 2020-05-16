var express = require("express");
var router = express.Router();
const multer = require("multer");
var AWS = require("aws-sdk");
var Image = require("../models/ImageModel");
require("dotenv").config();

const storage = multer.memoryStorage();
var upload = multer({ storage: storage });
console.log("s3 instance created");

// upload

console.log("upload", upload);

// Post route

router.route("/").post(upload.single("imageData"), (req, res, next) => {
  console.log("req body", req.body);
  console.log("req body", req.body.event_id);

  const eventId = req.body.event_id;
  const file = req.file;
  console.log("In UploadRoutes.js - File!");
  console.log(file);

  let s3bucket = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: "us-east-2",
  });

  const filename = "Event_" + eventId;

  const urlPrefix =
    "https://proofbox-bucket-2.s3.us-east-2.amazonaws.com/" + filename + "/";

  var params = {
    Bucket: "proofbox-bucket-2",
    Key: file.originalname,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: "public-read",
  };

  s3bucket.upload(params, function (err, data) {
    if (err) {
      console.log("UPLOAD ERROR", err);
      res.status(501).json(err);
    } else {
      res.send({ data });

      var newFileUploaded = {
        description: req.body.description,
        fileLink: s3FileURL + "/" + file.originalname,
        s3_key: params.Key,
      };

      var fileUrl = urlPrefix + file.originalname;
      const response = savePictureToDB({
        title: file.originalname,
        picture_url: fileUrl,
        event_id: eventId,
      });
      console.log("file link", fileUrl);
    }
  });
});

function savePictureToDB(request) {
  Image.create(request)
    .then(function (picture) {
      console.log("picture row created picture"); // - ',picture);
      return { picture: picture, error: null };
    })
    .catch((err) => {
      console.log("cannot create a row in the pictures table error- ", err);
      return { picture: null, error: err };
    });
}

module.exports = router;
