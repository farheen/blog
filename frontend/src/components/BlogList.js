import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BlogList = () => {
  return (
    <div className="blog-list-container">
      <h1>Blog Categories</h1>

      {/* Blog Category Buttons */}
      <div className="blog-category-buttons">
        <Link to="/blogs/personal" className="blog-category-button">
          Personal Blogs
        </Link>
      </div>
      <div className="blog-category-buttons">
        <Link to="/blogs/tech" className="blog-category-button">
          Tech Blogs
        </Link>
      </div>
    </div>
  );
};

export default BlogList;

