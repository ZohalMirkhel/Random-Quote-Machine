import React from 'react';

const QuoteButton = ({ onClick, quote, author }) => {
  return (
    <div className="flex justify-center space-x-4">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={onClick}
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
  );
};

export default QuoteButton;
