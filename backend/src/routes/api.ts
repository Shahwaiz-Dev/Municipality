import { Router } from 'express';
import Post from '../models/Post';

const router = Router();

// Get all posts
router.get('/posts', async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
});

// Get single post
router.get('/posts/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.json(post);
});

export default router; 