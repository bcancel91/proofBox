var mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 7,
  },
  receipts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Receipt",
    },
  ],
});

var User = mongoose.model("User", userSchema);

module.exports = User;
