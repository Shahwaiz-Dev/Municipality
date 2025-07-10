const mongoose = require('mongoose');

const PageSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  content: String,
  language: { type: String, default: 'en' }
});

module.exports = mongoose.model('Page', PageSchema); 