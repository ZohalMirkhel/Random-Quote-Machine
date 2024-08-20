import React, { useState, useEffect } from 'react';
import QuoteDisplay from './components/QuoteDisplay.jsx';
import QuoteButton from './components/QuoteButton.jsx';

const API_KEY = 'Td2AHmV3bbhQxP61BKzqqg==q4QXrkQfVteEKmyu';
const CATEGORY = 'happiness';

const App = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState(null);

  const fetchQuote = async () => {
    try {
      const response = await fetch(`https://api.api-ninjas.com/v1/quotes?category=${CATEGORY}`, {
        headers: {
          'X-Api-Key': API_KEY
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        const randomQuote = data[0];
        setQuote(randomQuote.quote);
        setAuthor(randomQuote.author || 'Unknown');
      } else {
        throw new Error('No quotes found in the data');
      }
    } catch (error) {
      setError(`Error: ${error.message}`);
      setQuote('Oops! Something went wrong.');
      setAuthor('');
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-lg text-center">
        <QuoteDisplay quote={quote} author={author} error={error} />
        <QuoteButton onClick={fetchQuote} quote={quote} author={author} />
      </div>
    </div>
  );
};

export default App;
