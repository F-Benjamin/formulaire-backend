const mongoose = require("mongoose");

const User = mongoose.model("User", {
  firstname: String,
  lastname: String,
  password: String,
  email: String,
  description: String,
});

module.exports = User;
