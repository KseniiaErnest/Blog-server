const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Post = require('../models/Post.model');
const Comment = require('../models/Comment.model');

// Create
router.post('/post', (req, res, next) => {
  // const { title, content, author, publicationDate, comments, likes, images } = req.body;
  const postData = {...req.body};

  Post.create(postData)
  .then((post) => {
    res.json({ success: true, post});
  })
  .catch((err) => {
    res.json({ success: false, error: err});
  })


});

module.exports = router;