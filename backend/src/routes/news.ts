import { Router } from 'express';
import News from '../models/News';
import auth from '../middleware/auth';

const router = Router();

// Get all news
router.get('/', async (req, res) => {
  const { language } = req.query;
  const filter: any = {};
  if (language) filter.language = language;
  const news = await News.find(filter).sort({ date: -1 });
  res.json(news);
});

// Get a single news item by slug
router.get('/:slug', async (req, res) => {
  const { slug } = req.params;
  const newsItem = await News.findOne({ slug });
  if (!newsItem) return res.status(404).json({ msg: 'News not found' });
  res.json(newsItem);
});

// Create news (admin)
router.post('/', auth, async (req, res) => {
  try {
    const news = new News(req.body);
    await news.save();
    res.status(201).json(news);
  } catch (err) {
    res.status(400).json({ msg: 'Error creating news', error: err });
  }
});
// Update news (admin)
router.put('/:id', auth, async (req, res) => {
  try {
    const news = await News.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!news) return res.status(404).json({ msg: 'News not found' });
    res.json(news);
  } catch (err) {
    res.status(400).json({ msg: 'Error updating news', error: err });
  }
});
// Delete news (admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);
    if (!news) return res.status(404).json({ msg: 'News not found' });
    res.json({ msg: 'News deleted' });
  } catch (err) {
    res.status(400).json({ msg: 'Error deleting news', error: err });
  }
});

export default router; 