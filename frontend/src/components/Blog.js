import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

const apiBaseUrl = process.env.REACT_APP_API_URL;

// Adjust these to the exact window size you want
const IMAGE_WINDOW = { width: 320, height: 240 }; // 320x240px fixed viewport

const Blog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    fetch(`${apiBaseUrl}/api/blog/${id}/`)
      .then((response) => response.json())
      .then((data) => setBlog(data))
      .catch((error) => console.error("Error fetching blog:", error));
  }, [id]);

  if (!blog) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <p style={{ color: "#4B5563", fontSize: "1.125rem" }}>Loading...</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#F3F4F6", padding: "1rem" }}>
      <div
        style={{
          maxWidth: "64rem", // ~max-w-4xl
          margin: "0 auto",
          backgroundColor: "#FFFFFF",
          borderRadius: "0.5rem",
          boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
          overflow: "hidden",
        }}
      >
        {/* Fixed-window Blog Image */}
        <div style={{ display: "flex", justifyContent: "center", margin: "1.5rem 0" }}>
          <div
            style={{
              width: IMAGE_WINDOW.width,
              height: IMAGE_WINDOW.height,
              overflow: "hidden",           // <- crops anything outside
              borderRadius: "0.5rem",
              boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
              backgroundColor: "#F3F4F6",
            }}
          >
            <img
              src={`https://blog-backend-n1tx.onrender.com${blog.image}`}
              alt={blog.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",         // <- fills the window, crops excess
                display: "block",
              }}
            />
          </div>
        </div>

        {/* Blog Content */}
        <div style={{ padding: "1.5rem" }}>
          <h1 style={{ fontSize: "1.875rem", fontWeight: 700, color: "#1F2937", marginBottom: "1rem", textAlign: "center" }}>
            {blog.title}
          </h1>
          <div style={{ color: "#4B5563", lineHeight: 1.75 }}>
            <ReactMarkdown>{blog.content}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
