var express = require("express");
var router = express.Router();

var userRouter = require("./userRouter");
var receiptRouter = require("./receiptRouter");

router.use("/api/user", userRouter);
router.use("/api/receipt", receiptRouter);

module.exports = router;
