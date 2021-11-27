var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var articleSchema = new Schema(
  {
    title: { type: String },
    description: { type: String },
    tags: [String],
    author: { type: String },
    likes: { type: Number, default: 0 },
    comments: [{type: Schema.Types.ObjectId, ref : "Comment"}]
   
  },
  { timestamps: true }
);

var Articles = mongoose.model("Articles", articleSchema);

module.exports = Articles;
