var express = require("express");
var router = express.Router();

var userRouter = require("./userRouter")

router.use("/api/user", userRouter)

module.exports = router;