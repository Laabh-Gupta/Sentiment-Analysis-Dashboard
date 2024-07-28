import React from 'react';
import axios from 'axios';

const SentimentItem = ({ sentiment, fetchSentiments }) => {
  const handleDelete = async () => {
    await axios.delete(`http://localhost:5000/api/sentiments/${sentiment._id}`);
    fetchSentiments();
  };

  return (
    <div>
      <p>Text: {sentiment.text}</p>
      <p>Sentiment: {sentiment.sentiment}</p>
      <p>Score: {sentiment.score}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default SentimentItem;
