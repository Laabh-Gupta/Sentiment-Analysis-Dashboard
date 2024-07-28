const express = require('express');
const router = express.Router();
const Sentiment = require('../models/Sentiment');
const { spawn } = require('child_process');

const pythonPath = 'C:\\Users\\Reach\\AppData\\Local\\Programs\\Python\\Python312\\python.exe';

router.post('/analyze', async (req, res) => {
  const { text } = req.body;

  const pythonProcess = spawn(pythonPath, ['./sentiment_analysis/sentiment.py', text]);

  pythonProcess.stdout.on('data', async (data) => {
    try {
      const result = JSON.parse(data.toString());
      const newSentiment = new Sentiment({ text, sentiment: result.sentiment, score: result.score });
      await newSentiment.save();
      res.json(newSentiment); // Respond with the new sentiment immediately
    } catch (error) {
      console.error('Error parsing JSON or saving to DB:', error);
      res.status(500).send('Error processing sentiment analysis.');
    }
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  pythonProcess.on('error', (error) => {
    console.error(`Error spawning Python process: ${error}`);
    res.status(500).send(`Error spawning Python process: ${error.message}`);
  });

  pythonProcess.on('close', (code) => {
    if (code !== 0) {
      console.error(`Python process exited with code ${code}`);
      res.status(500).send('Error executing sentiment analysis script.');
    }
  });
});

router.get('/', async (req, res) => {
  try {
    const sentiments = await Sentiment.find().sort({ createdAt: -1 });
    res.json(sentiments);
  } catch (error) {
    console.error('Error fetching sentiments:', error);
    res.status(500).send('Error fetching sentiments.');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Sentiment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Sentiment record deleted' });
  } catch (error) {
    console.error('Error deleting sentiment:', error);
    res.status(500).send('Error deleting sentiment.');
  }
});

module.exports = router;
