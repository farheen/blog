import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const [status, setStatus] = useState('idle'); // Manage API fetch status
    const [error, setError] = useState(null);

    useEffect(() => {
        if (status === 'idle') {
            setStatus('loading'); // Set loading status before fetching
            fetch('http://127.0.0.1:8000/api/blog/')
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then((data) => {
                    setBlogs(data);
                    setStatus('success'); // Set status to success after fetching
                })
                .catch((err) => {
                    console.error('Error fetching blogs:', err);
                    setError(err.message);
                    setStatus('failed'); // Set status to failed on error
                });
        }
    }, [status]); // Trigger fetch only when status is 'idle'

    if (status === 'loading') {
        return <div>Loading blogs...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    if (blogs.length === 0) {
        return <div>No blogs available</div>;
    }

    return (
        <div>
            <h1>Blogs</h1>
            <ul>
                {blogs.map((blog) => (
                    <li key={blog.id}>
                        {/* Make Title and Abstract Clickable */}
                        <Link to={`/blog/${blog.id}`}>
                            <h2>{blog.title}</h2>
                            <p>{blog.content.substring(0, 100)}...</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BlogList;
