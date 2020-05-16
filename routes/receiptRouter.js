const ReceiptModel = require("../models/ReceiptModel");
var express = require("express");
var router = express.Router();
const ReceiptController = require("../controllers/ReceiptController");

const AWS = require("aws-sdk");
const multer = require("multer");
require("dotenv").config();

var storage = multer.memoryStorage();

const upload = multer({ storage: storage });

console.log("s3 instance created");

router.post("/add-receipt/:id", upload.single("file"), async function (
  req,
  res
) {
  const user_id = req.params.id;
  console.log("req.params.id", req.params.id);
  console.log("req.body", req.body);

  const file = req.file;

  const s3FileURL = process.env.AWS_Uploaded_File_URL_LINK;
  console.log("file", file);

  // const receipt = new ReceiptModel({
  //   name: req.body.name,
  //   category: req.body.category,
  //   subtotal: req.body.subtotal,
  //   total: req.body.total,
  //   date: req.body.date,
  //   user_id: req.params.id,
  //   // productImage:
  // });
  // receipt.save().then((result) => {
  //   console.log(result);
  //   res.json({
  //     message: "Created product successfully",
  //     createdReceipt: {
  //       name: result.name,
  //       category: result.category,
  //       subtotal: result.subtotal,
  //       total: result.total,
  //       date: result.date,
  //       user_id: result.user_id,
  //     },
  //   });
  // });
  // console.log("req.body", req.body);

  // res.send(result);

  let s3bucket = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: "us-east-2",
  });

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
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
        name: req.body.name,
        subtotal: req.body.subtotal,
        total: req.body.total,
        date: req.body.date,
        category: req.body.category,
        receiptName: req.body.receiptName,
        user_id: user_id,
        fileLink: s3FileURL + file.originalname,
        s3_key: params.Key,
      };
      var document = new ReceiptModel(newFileUploaded);
      document.save(function (error, newFile) {
        if (error) {
          throw error;
        }
      });
    }
  });
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
