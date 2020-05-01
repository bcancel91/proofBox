const ReceiptModel = require("../models/ReceiptModel");
const UserModel = require("./models/UserModel");

const createReceipt = async (body) => {
  const receipt = new ReceiptModel(body);
  await receipt.save();
  await UserModel.findOneAndUpdate(
    { _id: req.body.userid },
    { $push: { receipts: receipt._id } }
  );
  return receipt;
};

module.exports = {
  createReceipt,
};
