var express = require("express");
var router = express.Router();
var UserController = require("../controllers/UserController");

router.post("/signup", async function (req, res) {
  const result = await UserController.signup(req.body);
  console.log("req.body", req.body);
  res.json(result);
  console.log({ result });
});

router.post("/login", passport.authenticate("local"), function (req, res) {
  // If this function gets called, authentication was successful.
  // `req.user` contains the authenticated user.
  res.send("success");
});

module.exports = router;
