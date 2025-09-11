import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Grid, Card, CardContent, Typography, CardActionArea } from "@mui/material";
const apiBaseUrl = process.env.REACT_APP_API_URL;

const PersonalBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch(`${apiBaseUrl}/api/blog/`)
      .then((response) => response.json())
      .then((data) => setBlogs(data))
      .catch((error) => console.error("Error fetching blogs:", error));
  }, []);

  // Ensure blogs is defined before filtering
  const personalBlogs = blogs ? blogs.filter((blog) => blog.category === "Personal") : [];

  return (
    <Container maxWidth="lg" style={{ marginTop: "30px" }}>
   

      <Grid container spacing={4}>
        {blogs.length > 0 ? (
          personalBlogs.map((blog) => (
            <Grid item xs={12} sm={6} md={4} key={blog.id}>
              <Card style={{ backgroundColor: "#f9f9f9" }} elevation={3}>
                <CardActionArea component={Link} to={`/blogs/${blog.id}`}>
                  <CardContent>
                    <CardMedia
                      component="img"
                      height={isMobile ? "100" : "140"}
                      image={`http://127.0.0.1:8000${blog.image}`} // Append base URL to the relative path
                    />
                    <Typography variant="h5" gutterBottom color="primary">
                      {blog.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {blog.abstract || blog.content.substring(0, 150) + "..."}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" align="center" color="textSecondary">
            Loading blogs...
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default PersonalBlogs;
