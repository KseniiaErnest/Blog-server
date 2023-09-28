const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Post = require('../models/Post.model');
const Comment = require('../models/Comment.model');

// Create
router.post('/comment', async (req, res, next) => {
  try {
    const commentData = {...req.body};
    const comment = await Comment.create(commentData);
    res.json({ succes: true, comment });
  } catch (err) {
    res.json({ success: false, error: err });
  }
});

module.exports = router;