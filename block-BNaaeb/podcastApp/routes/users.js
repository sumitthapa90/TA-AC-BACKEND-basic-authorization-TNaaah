var express = require("express");
var router = express.Router();
var User = require("../models/User");

/* GET users listing. */
router.get("/register", function (req, res, next) {
  console.log(req.session);
  res.render("usersRegister");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res, next) => {
  User.create(req.body, (err, user) => {
    console.log(err, user);
    res.redirect("/users/login");
  });
});

router.get("/login", (req, res) => {
  var error = req.flash("error")[0];
  res.render("login", { error });
});

router.post("/login", (req, res, next) => {
  var { email, password } = req.body;
  if (!email || !password) {
    req.flash("error", "email / password required");
    return res.redirect("/users/login");
  }
  User.findOne({ email }, (err, user) => {
    if (err) return next(err);
    if (!user) {
      return res.redirect("/users/login");
    }

    user.verifyPassword(password, (err, result) => {
      console.log(err, result);
      if (!result) {
        return res.redirect("/users/login");
      }
      req.session.userId = user.id;
      res.redirect("/users");
    });
  });
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.clearCookie("connect-sid");
  res.redirect("/users/login");
});

module.exports = router;
