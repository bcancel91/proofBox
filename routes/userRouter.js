var express = require("express");
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

module.exports = router;
