const { default: mongoose } = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    age: { type: Number, required: true },
  })
);
module.exports = User;
