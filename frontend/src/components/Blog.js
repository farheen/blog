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
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-gray-600 text-lg">Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                {/* Blog Image */}
                {blog.image_url && (
                    <div className="w-full h-64 bg-gray-200">
                        <img
                            src={blog.image_url}
                            alt={blog.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                {/* Blog Content */}
                <div className="p-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">
                        {blog.title}
                    </h1>
                    <div className="text-gray-600">
                        <ReactMarkdown>{blog.content}</ReactMarkdown>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blog;
