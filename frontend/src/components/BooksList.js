import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BooksList = () => {
  const [books, setBooks] = useState([]);

  // Fetch books from the API
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/books/') // Replace with your API endpoint
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.error('Error fetching books:', error);
      });
  }, []);

  // Helper function to truncate text for the abstract
  const truncateText = (text, maxLength = 100) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Books List</h1>
      <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {books.map(book => (
          <li
            key={book.id}
            style={{
              width: '200px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            }}
          >
            {/* Cover Image */}
            {book.cover_pic && (
              <img
                src={book.cover_pic}
                alt={book.title}
                style={{
                  width: '100%',
                  height: '250px',
                  objectFit: 'cover',
                }}
              />
            )}

            {/* Book Details */}
            <div style={{ padding: '10px' }}>
              {/* Book Title as a Link */}
              <Link
                to={`/books/${book.id}`}
                style={{
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  color: '#333',
                  display: 'block',
                  marginBottom: '8px',
                }}
              >
                {book.title}
              </Link>
              <p style={{ fontSize: '0.9rem', color: '#555', lineHeight: '1.4' }}>
                {truncateText(book.description, 100)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BooksList;
