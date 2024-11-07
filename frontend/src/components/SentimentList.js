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
    <form onSubmit={handleSubmit} className="Sentiment-form">
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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/sentiments/${id}`);
      fetchSentiments(); // Fetch updated list of sentiments after deletion
    } catch (error) {
      console.error('Error deleting sentiment:', error);
    }
  };

  useEffect(() => {
    fetchSentiments();
  }, []);

  return (
    <div className="Sentiment-list">
      <SentimentForm fetchSentiments={fetchSentiments} />
      <ul>
        {sentiments.map((sentiment) => (
          <li key={sentiment._id} className="Sentiment-item">
            <div>
              <p><strong>Text:</strong> {sentiment.text}</p>
              <p><strong>Sentiment:</strong> {sentiment.sentiment}</p>
              <p><strong>Score:</strong> {sentiment.score}</p>
            </div>
            <button className="Delete-button" onClick={() => handleDelete(sentiment._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SentimentList;
