const ReceiptModel = require("../models/ReceiptModel");

// const createReceipt = async (
//   name,
//   category,
//   total,
//   subtotal,
//   date,
//   user_id,

// ) => {
//   console.log("user_id in controller", user_id);
//   const receipt = await ReceiptModel.create({
//     name: name,
//     category: category,
//     subtotal: subtotal,
//     total: total,
//     date: date,
//     user_id: user_id,
//     productImage: file.path,
//   });
//   return receipt;
// };

const updateReceipt = async (receipt_id, body) => {
  console.log("receipt_id", receipt_id);
  return ReceiptModel.findByIdAndUpdate({ _id: receipt_id }, { name: body });
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
  // createReceipt,
  updateReceipt,
  getUserReceipts,
  deleteReceipt,
};
