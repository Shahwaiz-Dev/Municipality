import { Router } from 'express';
import Page from '../models/Page';
import auth from '../middleware/auth';

const router = Router();

// Get all pages (optionally by parent or language)
router.get('/', async (req, res) => {
  const { parent, language } = req.query;
  const filter: any = {};
  if (parent) filter.parent = parent;
  if (language) filter.language = language;
  const pages = await Page.find(filter).sort({ order: 1 });
  res.json(pages);
});

// Get a single page by slug
router.get('/:slug', async (req, res) => {
  const { slug } = req.params;
  const page = await Page.findOne({ slug });
  if (!page) return res.status(404).json({ msg: 'Page not found' });
  res.json(page);
});

// Create a new page (admin)
router.post('/', auth, async (req, res) => {
  try {
    const page = new Page(req.body);
    await page.save();
    res.status(201).json(page);
  } catch (err) {
    res.status(400).json({ msg: 'Error creating page', error: err });
  }
});
// Update a page (admin)
router.put('/:id', auth, async (req, res) => {
  try {
    const page = await Page.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!page) return res.status(404).json({ msg: 'Page not found' });
    res.json(page);
  } catch (err) {
    res.status(400).json({ msg: 'Error updating page', error: err });
  }
});
// Delete a page (admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    const page = await Page.findByIdAndDelete(req.params.id);
    if (!page) return res.status(404).json({ msg: 'Page not found' });
    res.json({ msg: 'Page deleted' });
  } catch (err) {
    res.status(400).json({ msg: 'Error deleting page', error: err });
  }
});

export default router; 