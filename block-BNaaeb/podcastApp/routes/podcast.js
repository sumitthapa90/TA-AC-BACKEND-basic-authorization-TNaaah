var express = require("express");
var router = express.Router();
var Podcast = require("../models/PodcastApp");

router.get("/newEntry", (req, res) => {
  res.render("podcastEntryForm");
});

module.exports = router;
