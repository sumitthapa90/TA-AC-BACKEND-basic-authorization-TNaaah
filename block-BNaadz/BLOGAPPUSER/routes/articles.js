var express = require("express");
var router = express.Router();

var Articles = require("../model/article");
var Comment = require("../model/comment");
var auth = require("../middlewere/auth");

/* GET users listing. */
router.get("/", function (req, res, next) {
  Articles.find({}, (err, articles) => {
    if (err) return next(err);
    res.render("articles", { articles });
  });
});

router.get("/new", auth.loggedInUser, (req, res, next) => {
  res.render("articleForm");
});

//single
router.get("/:id", (req, res, next) => {
  var id = req.params.id;
  Articles.findById(id)
    .populate("comments")
    .exec((err, articles) => {
      console.log(err, articles);
      if (err) return next(err);
      res.render("articleDetails", { articles: articles });
    });
});

router.use(auth.loggedInUser);

//create form

// //single article
// router.get("/:id", (req, res, next) => {
//   var id = req.params.id;
//   Articles.findById(id, (err, articles) => {
//     if (err) return next(err);
//     res.render("articleDetails", { articles });
//   });
// });

// single article
// router.get("/:id", (req, res, next) => {
//   var id = req.params.id;
//   Articles.findById(id, (err, articles) => {
//     if (err) return next(err);
//     Comment.find({ articlesId: id }, (err, comments) => {
//       if (err) return next(err);
//       res.render("articleDetails", { articles, comments });
//     });
//   });
// });

//create article
router.post("/", (req, res, next) => {
  req.body.tags = req.body.tags.trim().split("");
  Articles.create(req.body, (err, articles) => {
    console.log(err, articles);
    if (err) return next(err);
    res.redirect("/articles");
  });
});

//edit form
router.get("/:id/edit", (req, res, next) => {
  var id = req.params.id;
  Articles.findById(id, (err, articles) => {
    articles.tag = articles.tags.join(" ");
    if (err) return next(err);
    res.render("editArticlesForm", { articles });
  });
});

// update edit fprm
router.post("/:id", (req, res, next) => {
  var id = req.params.id;
  req.body.tags = req.body.tags.split(" ");
  Articles.findByIdAndUpdate(id, req.body, (err, articles) => {
    if (err) return next(err);
    res.redirect("/articles/" + id);
  });
});

// delete
router.get("/:id/delete", (req, res, next) => {
  var id = req.params.id;
  Articles.findByIdAndDelete(id, (err, articles) => {
    if (err) return next(err);
    Comment.deleteMany({ articlesId: articles.id }, (err, info) => {
      res.redirect("/articles");
    });
  });
});

// likes
router.get("/:id/likes", (req, res, next) => {
  var id = req.params.id;
  Articles.findByIdAndUpdate(id, { $inc: { likes: 1 } }, (err, atricles) => {
    if (err) return next(err);
    res.redirect("/articles/" + id);
  });
});

// add comment
router.post("/:id/comments", (req, res, next) => {
  var id = req.params.id;
  req.body.articlesId = id;
  Comment.create(req.body, (err, comment) => {
    console.log(err, comment);
    if (err) return next(err);
    Articles.findByIdAndUpdate(
      id,
      { $push: { comments: comment._id } },
      (err, updateArticle) => {
        res.redirect("/articles/" + id);
      }
    );
  });
});

module.exports = router;
