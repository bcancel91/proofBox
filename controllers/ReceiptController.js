const ReceiptModel = require("../models/ReceiptModel");

const createReceipt = async (name, category, total, subtotal, user_id) => {
  console.log("user_id in controller", user_id);
  const receipt = await ReceiptModel.create({
    name: name,
    category: category,
    subtotal: subtotal,
    total: total,
    user_id: user_id,
  });
  return receipt;
};

const getUserReceipts = async (user_id) => {
  const receipts = ReceiptModel.find({
    user_id: user_id,
  });
  return receipts;
};

const deleteReceipt = async (receipt_id) => {
  return ReceiptModel.deleteOne({
    _id: receipt_id,
  });
};
module.exports = {
  createReceipt,
  getUserReceipts,
  deleteReceipt,
};
