import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PEXELS_API_KEY = 'fSYzmP2T8BtzMMXnQsRm2zwqE2RB2LNBoJ4BIjgY5rWu18hamm2AzWwo';
const API_NINJAS_KEY = 'Td2AHmV3bbhQxP61BKzqqg==q4QXrkQfVteEKmyu';

const categories = [
  'age', 'alone', 'amazing', 'anger', 'architecture', 'art', 'attitude', 'beauty', 'best', 'birthday',
  'business', 'car', 'change', 'communication', 'computers', 'cool', 'courage', 'dad', 'dating', 'death',
  'design', 'dreams', 'education', 'environmental', 'equality', 'experience', 'failure', 'faith', 'family',
  'famous', 'fear', 'fitness', 'food', 'forgiveness', 'freedom', 'friendship', 'funny', 'future', 'god',
  'good', 'government', 'graduation', 'great', 'happiness', 'health', 'history', 'home', 'hope', 'humor',
  'imagination', 'inspirational', 'intelligence', 'jealousy', 'knowledge', 'leadership', 'learning', 'legal',
  'life', 'love', 'marriage', 'medical', 'men', 'mom', 'money', 'morning', 'movies', 'success'
];

const colors = [
  '#FFEBEE',
  '#FCE4EC',
  '#F3E5F5', 
  '#EDE7F6',
  '#E1F5FE',
  '#E0F2F1',
  '#E8F5E9',
  '#F9FBE7',
  '#FFF9C4',
];

const App = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('inspirational');
  const [bgColor, setBgColor] = useState('#FFFFFF');

  const fetchQuote = async () => {
    try {
      const response = await fetch(`https://api.api-ninjas.com/v1/quotes?category=${category}`, {
        headers: {
          'X-Api-Key': API_NINJAS_KEY,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        const randomQuote = data[0];
        setQuote(randomQuote.quote);
        setAuthor(randomQuote.author || 'Unknown');
        setBgColor(colors[Math.floor(Math.random() * colors.length)]);
      }
    } catch (error) {
      console.error('Error fetching the quote:', error);
      setQuote('Oops! Something went wrong.');
      setAuthor('');
      setBgColor('#FFFFFF');
    }
  };

  const fetchImage = async () => {
    try {
      const response = await axios.get('https://api.pexels.com/v1/search', {
        params: { query: category, per_page: 1 },
        headers: {
          Authorization: PEXELS_API_KEY,
        },
      });
      if (response.data.photos.length > 0) {
        setImage(response.data.photos[0].src.large2x);
      }
    } catch (error) {
      console.error('Error fetching the image:', error);
    }
  };

  useEffect(() => {
    fetchQuote();
    fetchImage();
  }, [category]);

  const handleNewQuote = () => {
    fetchQuote();
    fetchImage();
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${image})`,
        transition: 'background-image 0.5s ease-in-out',
      }}
    >
      <div
        id="quote-box"
        className="bg-white p-10 rounded shadow-md w-full max-w-lg text-center"
        style={{
          maxWidth: '600px',
          margin: '0 auto',
          padding: '40px',
          boxShadow: '0px 0px 20px rgba(0, 0, 0, 3)',
          backgroundColor: `${bgColor}80`,
        }}
      >
        <p id="text" className="text-xl font-semibold mb-4">{quote}</p>
        <p id="author" className="mb-6">- {author}</p>
        <div className="flex justify-center space-x-4">
          <select
            value={category}
            onChange={handleCategoryChange}
            className="bg-gray-200 px-4 py-2 rounded"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
            }}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
          <button
            id="new-quote"
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
            onClick={handleNewQuote}
          >
            New Quote
          </button>
          <a
            id="tweet-quote"
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${quote}" - ${author}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-200 text-balck px-4 py-2 rounded hover:bg-gray-600"
          >
            Tweet
          </a>
        </div>
      </div>
    </div>
  );
};

export default App;
