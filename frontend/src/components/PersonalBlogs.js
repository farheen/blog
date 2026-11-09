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
const apiBaseUrl = process.env.REACT_APP_API_URL;

const PersonalBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    fetch(`${apiBaseUrl}/api/blog/`)
      .then((response) => response.json())
      .then((data) => setBlogs(data))
      .catch((error) => console.error("Error fetching blogs:", error));
  }, []);

  // Ensure blogs is defined before filtering
  const personalBlogs = blogs ? blogs.filter((blog) => blog.category === "Personal") : [];
  
  // Plain-text preview: drop Markdown/HTML markup and collapse whitespace
  const preview = (content) => {
    const text = content
      .replace(/<[^>]*>/g, "")
      .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
      .replace(/[*_#>`]/g, "")
      .replace(/\s+/g, " ")
      .trim();
    return text.length > 140 ? text.substring(0, 140).trim() + "…" : text;
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

  return (
    <Container maxWidth="lg" style={{ marginTop: "30px", marginBottom: "40px" }}>
      <Grid container spacing={isMobile ? 2 : 4}>
        {blogs.length > 0 ? (
          personalBlogs.map((blog) => (
            <Grid item xs={12} sm={6} md={4} key={blog.id} style={{ display: "flex" }}>
              <Card
                style={{
                  backgroundColor: "#f9f9f9",
                  transition: "transform 0.3s",
                  boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                  borderRadius: "12px",
                  width: "100%",
                }}
                elevation={3}
                className="hover:shadow-lg"
              >
                <CardActionArea component={Link} to={`/blogs/${blog.id}`} style={{ height: "100%" }}>
                  <CardMedia
                    component="img"
                    height={isMobile ? "160" : "200"}
                    image={`https://blog-backend-n1tx.onrender.com${blog.image}`} // Append base URL to the relative path
                    alt={blog.title}
                    style={{ objectFit: "cover" }}
                  />
                  <CardContent>
                    <Typography variant="caption" color="textSecondary" style={{ letterSpacing: "0.05em" }}>
                      {formatDate(blog.published_date)}
                    </Typography>
                    <Typography variant="h6" gutterBottom color="primary" style={{ lineHeight: 1.3 }}>
                      {blog.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      style={{ fontSize: isMobile ? "0.9rem" : "1rem", lineHeight: 1.6 }}
                    >
                      {preview(blog.content)}
                    </Typography>
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

export default PersonalBlogs;
