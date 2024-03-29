var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var commentSchema = new Schema(
  {
    content: { type: String },
    articlesId: {
      type: Schema.Types.ObjectId,
      ref: "Articles",
      required: true,
    },
  },
  { timestamps: true }
);

var Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
