var express = require("express");
var router = express.Router();
var Articles = require("../model/article");
var Comment = require("../model/comment");
var auth = require("../middlewere/auth");

/* GET home page. */

router.use(auth.loggedInUser);

router.get("/:id/edit", (req, res, next) => {
  var id = req.params.id;
  Comment.findById(id, (err, comment) => {
    if (err) return next(err);
    res.render("updateComment", { comment });
  });
});

router.post("/:id", (req, res, next) => {
  var id = req.params.id;
  Comment.findByIdAndUpdate(id, req.body, (err, updatecomment) => {
    if (err) return next(err);
    res.redirect("/articles/" + updatecomment.articlesId);
  });
});

router.get("/:id/delete", (req, res, next) => {
  var commentId = req.params.id;
  Comment.findByIdAndRemove(commentId, (err, comment) => {
    if (err) return next(err);
    Articles.findByIdAndUpdate(
      comment.articlesId,
      { $pull: { comments: comment.id } },
      (err, article) => {
        res.redirect("/articles/" + comment.articlesId);
      }
    );
  });
});
module.exports = router;
