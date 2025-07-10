const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: String,
  imageUrl: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  language: { type: String, default: 'en' }
});

module.exports = mongoose.model('Post', PostSchema); 