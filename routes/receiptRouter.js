var express = require("express");
var router = express.Router();
var ReceiptController = require("../controllers/ReceiptController");

router.post("/create/:id", async function (req, res) {
  const result = await ReceiptController.createReceipt(req.body);
  console.log("req.body", req.body);
  console.log("req.params.id", req.params.id);
  res.json(result);
  console.log({ result });
});
