var express = require("express");
var router = express.Router();
const multer = require("multer");
var AWS = require("aws-sdk");
var Image = require("../models/ImageModel");
require("dotenv").config();

const upload = multer({ dest: "/uploads/" });

// upload

console.log("upload", upload);

// Post route

// router.post("/",  req, res, next) => {
//   const image = new
// }

module.exports = router;
