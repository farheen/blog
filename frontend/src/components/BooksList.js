import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
const apiBaseUrl = process.env.REACT_APP_API_URL;

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("${apiBaseUrl}")
      .then((response) => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching books:', error);
        setError('Failed to fetch books. Please try again later.');
        setLoading(false);
      });
  }, []);

  const truncateText = (text, maxLength = 100) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  return (
    <Container maxWidth="lg" style={{ padding: '20px' }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Books List
      </Typography>

      {loading && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <CircularProgress />
        </div>
      )}
      {error && <Alert severity="error">{error}</Alert>}

      <Grid container spacing={4}>
        {books.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book.id}>
            <Card>
              {book.cover_pic ? (
                <CardMedia
                  component="img"
                  height="250"
                  image={book.cover_pic}
                  alt={book.title}
                />
              ) : (
                <div
                  style={{
                    height: '250px',
                    backgroundColor: '#f4f4f4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.9rem',
                    color: '#999',
                  }}
                >
                  No Image Available
                </div>
              )}
              <CardContent>
                <Typography
                  variant="h6"
                  component={Link}
                  to={`/books/${book.id}`}
                  style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}
                >
                  {book.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {truncateText(book.description || 'No description available.', 100)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BooksList;
