import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import apiRoutes from './routes/api';
import adminRoutes from './routes/admin';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI as string)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Public API routes
app.use('/api', apiRoutes);

// Admin (CMS) API routes
app.use('/admin', adminRoutes);

app.get('/', (_req, res) => res.send('API Running!'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 