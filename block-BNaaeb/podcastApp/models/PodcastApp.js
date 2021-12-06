var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var podcastSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  artist: { type: String },
  image: { type: String },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  catergory: { type: String, required: true },
});

var Podcast = mongoose.model("Podcast", podcastSchema);

module.exports = Podcast;
