import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

const Blog = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/blog/${id}/`)
            .then((response) => response.json())
            .then((data) => setBlog(data))
            .catch((error) => console.error("Error fetching blog:", error));
    }, [id]);

    if (!blog) {
        return <p>Loading...</p>;
    }

    return (
        <div className="blog-detail">
            <h1>{blog.title}</h1>
            {blog.image_url && (
                <img src={blog.image_url} alt={blog.title} className="blog-image" />
            )}
            <ReactMarkdown>{blog.content}</ReactMarkdown>
        </div>
    );
};

export default Blog;
