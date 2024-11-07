import React from 'react';
import SentimentList from './components/SentimentList';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Sentiment Analysis Dashboard</h1>
        <p className="App-description">
          Analyze sentiments and track results using natural language processing.
        </p>
      </header>
      <main className="App-main">
        <SentimentList />
      </main>
      <footer className="App-footer">
        <p>&copy; 2024 Sentiment Analysis Dashboard. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
