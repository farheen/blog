import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CardActionArea,
  CardMedia,
  useMediaQuery,
} from "@mui/material";
import ReactMarkdown from "react-markdown"; // Import react-markdown
const apiBaseUrl = process.env.REACT_APP_API_URL;

const TechBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    fetch(`${apiBaseUrl}/api/blog/`)
      .then((response) => response.json())
      .then((data) => setBlogs(data))
      .catch((error) => console.error("Error fetching blogs:", error));
  }, []);

  // Filter blogs with the category "Tech"
  const techBlogs = blogs ? blogs.filter((blog) => blog.category === "Tech") : [];

  return (
    <Container maxWidth="lg" style={{ marginTop: "30px" }}>
     

      <Grid container spacing={isMobile ? 2 : 4}>
        {blogs.length > 0 ? (
          techBlogs.map((blog) => (
            <Grid item xs={12} sm={6} md={4} key={blog.id}>
              <Card
                style={{
                  backgroundColor: "#f9f9f9",
                  transition: "transform 0.3s",
                  boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                }}
                elevation={3}
                className="hover:shadow-lg"
              >
                <CardActionArea component={Link} to={`/blogs/${blog.id}`}>
                  <CardMedia
                    component="img"
                    height={isMobile ? "100" : "140"}
                    image={blog.image}// Append base URL to the relative path
                    alt={blog.title}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom color="primary">
                      {blog.title}
                    </Typography>
                    <ReactMarkdown
                      children={blog.content.substring(0, 100) + "..."}
                      components={{
                        p: ({ node, ...props }) => (
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            style={{ fontSize: isMobile ? "0.9rem" : "1rem" }}
                            {...props}
                          />
                        ),
                      }}
                    />
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" align="center" color="textSecondary" style={{ width: "100%" }}>
            Loading blogs...
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default TechBlogs;
