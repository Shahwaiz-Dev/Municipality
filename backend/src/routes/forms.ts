import { Router } from 'express';
import FormSubmission from '../models/FormSubmission';
import auth from '../middleware/auth';

const router = Router();

// Submit a form
router.post('/:formType', async (req, res) => {
  const { formType } = req.params;
  const data = req.body;
  const submission = new FormSubmission({ formType, data });
  await submission.save();
  res.status(201).json(submission);
});

// List submissions (admin)
router.get('/:formType', auth, async (req, res) => {
  try {
    const { formType } = req.params;
    const submissions = await FormSubmission.find({ formType });
    res.json(submissions);
  } catch (err) {
    res.status(400).json({ msg: 'Error fetching submissions', error: err });
  }
});

export default router; 