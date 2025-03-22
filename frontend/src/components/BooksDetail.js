import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BookDetail = () => {
  const { id } = useParams(); // Get the book ID from the URL
  const [book, setBook] = useState(null); // State to store book details

  // Fetch book details
  useEffect(() => {
    axios.get("${REACT_APP_API_URL}/api/books/${id}/`) // Replace with your API endpoint
      .then(response => {
        setBook(response.data);
      })
      .catch(error => {
        console.error('Error fetching book details:', error);
      });
  }, [id]);

  if (!book) {
    return <p>Loading book details...</p>; // Show loading message while fetching
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>{book.title}</h1>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Genre:</strong> {book.genre}</p>
      <p><strong>Description:</strong> {book.description}</p>

      {/* Cover Image */}
      {book.cover_pic && (
        <img
          src={book.cover_pic}
          alt={book.title}
          style={{ width: '200px', marginTop: '20px', borderRadius: '8px' }}
        />
      )}

      {/* Purchase Links */}
      <div style={{ marginTop: '20px' }}>
        {book.purchase_link_india && (
          <a
            href={book.purchase_link_india}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'block', marginBottom: '10px', color: '#007bff', textDecoration: 'none' }}
          >
            Buy in India
          </a>
        )}
        {book.purchase_link_international && (
          <a
            href={book.purchase_link_international}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'block', color: '#007bff', textDecoration: 'none' }}
          >
            Buy Internationally
          </a>
        )}
      </div>
    </div>
  );
};

export default BookDetail;
