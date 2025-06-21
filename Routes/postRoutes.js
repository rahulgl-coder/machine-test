const express = require('express');
const router = express.Router();
const Post = require('../Models/Post');
const { authenticateUser } = require('../middleware/middleware');


router.post('/add', authenticateUser, async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }

    const newPost = await Post.create({
      content,
      author: req.user._id
    });

    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
