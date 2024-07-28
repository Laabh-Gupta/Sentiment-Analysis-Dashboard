import React, { useState } from 'react';
import axios from 'axios';

const SentimentForm = ({ fetchSentiments }) => {
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/sentiments/analyze', { text });
    setText('');
    fetchSentiments();
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

export default SentimentForm;
