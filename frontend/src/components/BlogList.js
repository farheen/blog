import React from "react";
import { Link } from "react-router-dom";

const BlogList = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4">
      {/* Content Wrapper */}
      <div className="text-center">
        {/* Title */}
        <h1 className="text-6xl font-extrabold text-white mb-12 drop-shadow-lg">
          Explore Blog Categories
        </h1>

        {/* Blog Categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Personal Blogs */}
          <Link
            to="/blogs/personal"
            className="relative group w-72 h-72 bg-white rounded-xl shadow-lg transform transition duration-500 hover:scale-105 mx-auto"
          >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-600 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 rounded-xl"></div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
              <h2 className="text-2xl font-bold text-gray-800 group-hover:text-white transition duration-500">
                Personal Blogs
              </h2>
              <p className="mt-4 text-gray-600 group-hover:text-gray-200 text-sm">
                Dive into inspiring personal stories and reflections.
              </p>
            </div>
          </Link>

          {/* Tech Blogs */}
          <Link
            to="/blogs/tech"
            className="relative group w-72 h-72 bg-white rounded-xl shadow-lg transform transition duration-500 hover:scale-105 mx-auto"
          >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-pink-600 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 rounded-xl"></div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
              <h2 className="text-2xl font-bold text-gray-800 group-hover:text-white transition duration-500">
                Tech Blogs
              </h2>
              <p className="mt-4 text-gray-600 group-hover:text-gray-200 text-sm">
                Stay updated with the latest tech trends and tips.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogList;
