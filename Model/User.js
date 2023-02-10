const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      match: /^\S+@\S+\.\S+$/,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 128,
    },
    name: {
      type: String,
      maxlength: 128,
      index: true,
      trim: true,
    },
    services: {
      facebook: String,
      google: String,
    },
    role: {
      type: String,
      enum: roles,
      default: "user",
    },
    picture: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);
User.methods.setPassword = async function (password) {
  this.password = bcrypt.hashSync(password, 10);
};
module.exports = mongoose.model("User", userSchema);
