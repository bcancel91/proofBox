var mongoose = require("mongoose");

const Schema = mongoose.Schema;
const receiptSchema = new Schema({
  category: {
    type: String,
    trim: true,
  },
  total: {
    type: String,
    trim: true,
  },
  subtotal: {
    type: String,
  },
});

var Receipt = mongoose.model("Receipt", receiptSchema);

module.exports = Receipt;
