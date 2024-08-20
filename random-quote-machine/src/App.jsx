import React, { useState, useEffect } from 'react';
import QuoteDisplay from './components/QuoteDisplay.jsx';
import QuoteButton from './components/QuoteButton.jsx';

const API_KEY = 'Td2AHmV3bbhQxP61BKzqqg==q4QXrkQfVteEKmyu';

const categories = [
  'age', 'alone', 'amazing', 'anger', 'architecture', 'art', 'attitude', 'beauty', 
  'best', 'birthday', 'business', 'car', 'change', 'communication', 'computers', 
  'cool', 'courage', 'dad', 'dating', 'death', 'design', 'dreams', 'education', 
  'environmental', 'equality', 'experience', 'failure', 'faith', 'family', 
  'famous', 'fear', 'fitness', 'food', 'forgiveness', 'freedom', 'friendship', 
  'funny', 'future', 'god', 'good', 'government', 'graduation', 'great', 
  'happiness', 'health', 'history', 'home', 'hope', 'humor', 'imagination', 
  'inspirational', 'intelligence', 'jealousy', 'knowledge', 'leadership', 
  'learning', 'legal', 'life', 'love', 'marriage', 'medical', 'men', 'mom', 
  'money', 'morning', 'movies', 'success'
];

const App = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState(null);
  const [category, setCategory] = useState(categories[0]);

  const fetchQuote = async () => {
    try {
      console.log('Fetching quote...');
      const response = await fetch(`https://api.api-ninjas.com/v1/quotes?category=${category}`, {
        headers: {
          'X-Api-Key': API_KEY
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Fetched data:', data);

      if (Array.isArray(data) && data.length > 0) {
        const randomQuote = data[0];
        setQuote(randomQuote.quote);
        setAuthor(randomQuote.author || 'Unknown');
        console.log('Quote and author set:', randomQuote.quote, randomQuote.author);
      } else {
        throw new Error('No quotes found in the data');
      }
    } catch (error) {
      console.error('Error fetching the quote:', error);
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
      <div id="quote-box" className="bg-white p-8 rounded shadow-md w-full max-w-lg text-center">
        <select
          className="mb-4 p-2 border rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
        <QuoteDisplay quote={quote} author={author} error={error} />
        <QuoteButton onClick={fetchQuote} quote={quote} author={author} />
      </div>
    </div>
  );
};

export default App;
