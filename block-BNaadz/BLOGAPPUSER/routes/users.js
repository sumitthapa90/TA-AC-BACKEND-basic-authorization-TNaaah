var express = require("express");
var router = express.Router();
var User = require("../model/user");

/* GET home page. */
router.get("/", (req, res, next) => {
  console.log(req.session);
  res.render("users");
});

router.get("/register", (req, res, next) => {
  res.render("register");
});

router.post("/register", (req, res, next) => {
  User.create(req.body, (err, user) => {
    console.log(err, user);
    if (err) return next(err);
    res.redirect("/users/login");
  });
});

router.get("/login", (req, res, next) => {
  var error = req.flash("error")[0];
  res.render("login", { error });
});

router.post("/login", (req, res, next) => {
  var { email, password } = req.body;
  console.log(email, password);
  if (!email || !password) {
    req.flash("error", "Email/Password required!");
    return res.redirect("/users/login");
  }
  User.findOne({ email }, (err, user) => {
    if (err) return next(err);
    console.log(err, user);
    if (!user) {
      return res.redirect("/users/login");
    }

    user.verifyPassword(password, (err, result) => {
      console.log(err, result);
      if (err) return next(err);
      if (!result) {
        return res.redirect("/users/login");
      }

      req.session.userId = user.id;
      res.redirect("/articles");
    });
  });
});

router.get("/logout", (req, res) => {
  req.session.destroy;
  res.clearCookie("connect.sid");
  rea.redirect("/users/login");
});

module.exports = router;
