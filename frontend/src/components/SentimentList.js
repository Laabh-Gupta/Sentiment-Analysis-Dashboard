import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SentimentForm = ({ fetchSentiments }) => {
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/sentiments/analyze', { text });
      setText('');
      fetchSentiments();  // Fetch the updated list of sentiments
    } catch (error) {
      console.error('Error submitting sentiment analysis:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text for sentiment analysis"
        required
      />
      <button type="submit">Analyze Sentiment</button>
    </form>
  );
};

const SentimentList = () => {
  const [sentiments, setSentiments] = useState([]);

  const fetchSentiments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/sentiments');
      setSentiments(response.data);
    } catch (error) {
      console.error('Error fetching sentiments:', error);
    }
  };

  useEffect(() => {
    fetchSentiments();
  }, []);

  return (
    <div>
      <SentimentForm fetchSentiments={fetchSentiments} />
      <ul>
        {sentiments.map((sentiment) => (
          <li key={sentiment._id}>
            {sentiment.text} - {sentiment.sentiment} ({sentiment.score})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SentimentList;
