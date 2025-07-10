import { Router } from 'express';
import Directory from '../models/Directory';
import auth from '../middleware/auth';

const router = Router();

// Get directory by type
router.get('/:type', async (req, res) => {
  const { type } = req.params;
  const { language } = req.query;
  const filter: any = { type };
  if (language) filter.language = language;
  const directory = await Directory.findOne(filter);
  if (!directory) return res.status(404).json({ msg: 'Directory not found' });
  res.json(directory);
});

// Create or update a directory (admin)
router.post('/:type', auth, async (req, res) => {
  try {
    const { type } = req.params;
    const { entries, language } = req.body;
    let directory = await Directory.findOne({ type, language });
    if (directory) {
      directory.entries = entries;
      await directory.save();
    } else {
      directory = new Directory({ type, entries, language });
      await directory.save();
    }
    res.status(201).json(directory);
  } catch (err) {
    res.status(400).json({ msg: 'Error saving directory', error: err });
  }
});
// Delete a directory (admin)
router.delete('/:type', auth, async (req, res) => {
  try {
    const { type } = req.params;
    const { language } = req.body;
    const directory = await Directory.findOneAndDelete({ type, language });
    if (!directory) return res.status(404).json({ msg: 'Directory not found' });
    res.json({ msg: 'Directory deleted' });
  } catch (err) {
    res.status(400).json({ msg: 'Error deleting directory', error: err });
  }
});

export default router; 