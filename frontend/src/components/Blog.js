import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Blog = () => {
    const { id } = useParams(); // Extract blog ID from the URL
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            fetch(`http://127.0.0.1:8000/api/blog/${id}/`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`Error fetching blog: ${response.statusText}`);
                    }
                    return response.json();
                })
                .then((data) => {
                    setBlog(data); // Set the blog data
                    setLoading(false);
                })
                .catch((err) => {
                    setError(err.message);
                    setLoading(false);
                });
        }
    }, [id]);

    if (loading) return <div>Loading blog...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>{blog.title}</h1>
            {blog.image && <img src={blog.image} alt={blog.title} />}
            <p>By: {blog.author}</p>
            <p>{blog.content}</p>
        </div>
    );
};

export default Blog;
