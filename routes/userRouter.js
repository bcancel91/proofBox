var express = require("express");
const passport = require("../passport");
var router = express.Router();
var UserController = require("../controllers/UserController");

router.post("/signup", async function (req, res) {
  const result = await UserController.signup(req.body);
  console.log("req.body", req.body);

  res.json(result);
  console.log({ result });
});

router.post("/login", async function (req, res) {
  const result = await UserController.login(req.body);
  console.log("result", result);
  res.json(result);
});

router.get("/auth", (req, res) => {
  if (req.user) res.json(true);
  else res.json(false);
});

  console.log({ result });
  res.json(result);
});

router.post("/login", passport.authenticate("local"), function (req, res) {
  // If this function gets called, authentication was successful.
  // `req.user` contains the authenticated user.
  res.send("success");
});


module.exports = router;
