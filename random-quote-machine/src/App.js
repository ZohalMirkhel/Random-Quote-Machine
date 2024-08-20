import React, { useState, useEffect } from 'react';

const API_KEY = 'Td2AHmV3bbhQxP61BKzqqg==q4QXrkQfVteEKmyu';
const CATEGORY = 'happiness';

const App = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState(null);

  const fetchQuote = async () => {
    try {
      console.log('Fetching new quote...');
      const response = await fetch(`https://api.api-ninjas.com/v1/quotes?category=${CATEGORY}`, {
        headers: {
          'X-Api-Key': API_KEY
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Fetched quote:', data);
      
      if (Array.isArray(data) && data.length > 0) {
        const randomQuote = data[0];
        setQuote(randomQuote.quote);
        setAuthor(randomQuote.author || 'Unknown');
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
    console.log('Component mounted, fetching initial quote...');
    fetchQuote();
  }, []);

  const handleNewQuote = () => {
    fetchQuote();
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-lg text-center">
        {error ? (
          <p className="text-red-500 mb-4">{error}</p>
        ) : (
          <>
            <p className="text-xl font-semibold mb-4">{quote}</p>
            <p className="text-gray-500 mb-6">- {author}</p>
          </>
        )}
        <div className="flex justify-center space-x-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={handleNewQuote}
          >
            New Quote
          </button>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              `"${quote}" - ${author}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Tweet
          </a>
        </div>
      </div>
    </div>
  );
};

export default App;
