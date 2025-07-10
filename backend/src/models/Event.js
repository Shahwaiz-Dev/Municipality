const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  date: Date,
  imageUrl: String,
  language: { type: String, default: 'en' }
});

module.exports = mongoose.model('Event', EventSchema); 