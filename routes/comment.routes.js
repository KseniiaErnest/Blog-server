const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Post = require('../models/Post.model');
const Comment = require('../models/Comment.model');

// Get all
router.get('/comment', async (req, res, next) => {
  try {
    const comments = await Comment.find();
    res.json({ success: true, comments });
  } catch (err) {
    res.json({ success: false, error: err });
  }
});

// Get one by Id
router.get('/comment/:commentId', async (req, res, next) => {
  try {
    const singleComment = await Comment.findOne({ _id: req.params.commentId });

    if (!singleComment) {
      return res.status(404).json({ message: 'No comment with that ID' });
    }
    res.json({ success: true, singleComment });
  } catch (err)  {
    res.json({ success: false, error: err });
  }
});

// Create
router.post('/comment', async (req, res, next) => {
  try {
    const commentData = {...req.body};
    const comment = await Comment.create(commentData);
    res.json({ success: true, comment });
  } catch (err) {
    res.json({ success: false, error: err });
  }
});

// Create for a specific post
router.post('/comment/:postId', async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const commentData = { ...req.body, postId }; // Include the postId in the comment data
    const comment = await Comment.create(commentData);
    
    // Update the associated post's comments array
    await Post.findByIdAndUpdate(postId, { $push: { comments: comment._id } });

    res.json({ success: true, comment });
  } catch (err) {
    res.json({ success: false, error: err });
  }
});

// Update
router.put('/comment/:commentId', async (req, res, next) => {
  try {
    const commentId = req.params.commentId;
    const updatedData = req.body;

    const commentToUpdate = await Comment.findByIdAndUpdate(
      commentId,
      updatedData,
      { new: true }
    );

    if (!commentToUpdate) {
      return res.status(404).json({ message: 'No comment found with that ID' });
    }

    res.json({ success: true, commentToUpdate });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err });
  }
});

// Delete 
router.delete('/comment/:commentId', async (req, res, next) => {
  try {
    const deletedComment = await Comment.findOneAndRemove({ _id: req.params.commentId });

    if (!deletedComment) {
      return res.status(404).json({ message: 'No comment with this id!' });
    }

    res.json({ success: true, deletedComment });
  } catch (err) {
    res.json({ success: false, error: err });
  }
});

module.exports = router;
