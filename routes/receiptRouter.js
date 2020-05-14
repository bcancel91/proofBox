var express = require("express");
var router = express.Router();
var ReceiptController = require("../controllers/ReceiptController");

router.post("/add-receipt/:id", async function (req, res) {
  const user_id = req.params.id;
  console.log("req.params.id", req.params.id);
  const receipt = req.body;
  const result = await ReceiptController.createReceipt(
    receipt.name,
    receipt.category,
    receipt.subtotal,
    receipt.total,
    receipt.date,
    user_id
  );
  console.log("req.body", req.body);
  console.log("req.params.id", req.params.id);
  res.send(result);
});

//update name

router.post("/updateReceipt/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const body = req.body.name;
    console.log("body", body);
    const result = await ReceiptController.updateReceipt(_id, body);
    console.log("result", result);
    res.send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/get-user-receipts/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    console.log("receipt id", _id);
    const result = await ReceiptController.getUserReceipts(_id);
    res.send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
