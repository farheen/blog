import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/books/')
      .then(response => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching books:', error);
        setError('Failed to fetch books. Please try again later.');
        setLoading(false);
      });
  }, []);

  const truncateText = (text, maxLength = 100) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Books List</h1>
      {loading && <p style={{ textAlign: 'center' }}>Loading books...</p>}
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
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
            {book.cover_pic ? (
              <img
                src={book.cover_pic}
                alt={book.title}
                style={{
                  width: '100%',
                  height: '250px',
                  objectFit: 'cover',
                }}
              />
            ) : (
              <div
                style={{
                  width: '100%',
                  height: '250px',
                  backgroundColor: '#f4f4f4',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.8rem',
                  color: '#999',
                }}
              >
                No Image Available
              </div>
            )}
            <div style={{ padding: '10px' }}>
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
                {truncateText(book.description || 'No description available.', 100)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BooksList;
