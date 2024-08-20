import React from 'react';

const QuoteDisplay = ({ quote, author, error }) => {
  return (
    <div>
      {error ? (
        <p className="text-red-500 mb-4">{error}</p>
      ) : (
        <>
          <p id="text" className="text-xl font-semibold mb-4">{quote}</p>
          <p id="author" className="text-gray-500 mb-6">- {author}</p>
        </>
      )}
    </div>
  );
};

export default QuoteDisplay;
