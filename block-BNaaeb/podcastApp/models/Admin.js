var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var adminSchema = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    city: { type: String, required: true },
  },
  { timestamps: true }
);

var Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
