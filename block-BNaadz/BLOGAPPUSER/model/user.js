var mongoose = require("mongoose");
var bcrypt = require("bcrypt");

var Schema = mongoose.Schema;

var userSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true },
    password: { type: String },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  if (this.password && this.isModified("password")) {
    bcrypt.hash(this.password, 10, (err, hashed) => {
      console.log(err, hashed);
      if (err) return next(err);
      this.password = hashed;
      next();
    });
  } else {
    next();
  }
});

userSchema.methods.verifyPassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, result) => {
    return cb(err, result);
  });
};

var User = mongoose.model("User", userSchema);

module.exports = User;
