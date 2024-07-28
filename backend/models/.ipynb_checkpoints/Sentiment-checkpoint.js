const mongoose = require('mongoose');

const SentimentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  sentiment: { type: String, required: true },
  score: { type: Number, required: true },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Sentiment', SentimentSchema);
