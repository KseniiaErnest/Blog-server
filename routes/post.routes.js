const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Post = require('../models/Post.model');
const Comment = require('../models/Comment.model');

// Create
router.post('/post', async (req, res, next) => {
  try {
    const postData = {...req.body};
    const postToCreate = await Post.create(postData);
    res.json({ success: true, postToCreate });
  } catch(err) {
    res.json({ success: false, error: err });
  }
});

// Read all
router.get('/post', async (req, res, next) => {
  try {
    const postToReadAll = await Post.find();
    res.json({ success: true, postToReadAll });
  } catch(err) {
    res.json({ succes: false, error: err });
  }
});

// Read one
router.get('/post/:postId', async (req, res, next) => {
  try {
    const postToReadOne = await Post.findById(req.params.postId).populate('comments');
    res.json({ succes: true, postToReadOne });
  } catch(err) {
    res.json({ succes: false, error: err });
  }
})

// Update
router.put('/post/:postId', async (req, res, next) => {
  try {
    const postToUpdate = await Post.findByIdAndUpdate(req.params.postId, req.body, { new: true });
    res.json({ success: true, postToUpdate });
  } catch (err) {
    res.json({ success: false, error: err });
  }
});

// Delete
router.delete('/post/:postId', async (req, res, next) => {
  try {
    const postToDelete = await Post.findByIdAndRemove(req.params.postId);
    res.json({ succes: true, postToDelete });
  } catch (err) {
    res.json({ succes: false, error: err });
  }
})

module.exports = router;