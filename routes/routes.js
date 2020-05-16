var express = require("express");
var router = express.Router();

var userRouter = require("./userRouter");
var receiptRouter = require("./receiptRouter");
// var imageRouter = require("./imageRouter");

router.use("/api/user", userRouter);
router.use("/api/receipt", receiptRouter);

// multer

// router.use("/uploadmulter", imageRouter);

module.exports = router;
