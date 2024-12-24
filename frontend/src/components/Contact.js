import React from "react";
import { AiOutlineMail, AiFillLinkedin } from "react-icons/ai";

const Contact = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-6">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Contact Me</h1>
        <p className="text-gray-600 mb-6">
          Feel free to reach out via email or connect with me on LinkedIn!
        </p>

        {/* Email */}
        <div className="flex items-center justify-center space-x-4 mb-6">
          <AiOutlineMail className="text-indigo-500 text-3xl" />
          <a
            href="mailto:farheenzahara@gmail.com"
            className="text-gray-800 font-medium hover:text-indigo-500 transition"
          >
            farheenzahara@gmail.com
          </a>
        </div>

        {/* LinkedIn */}
        <div className="flex items-center justify-center space-x-4">
          <AiFillLinkedin className="text-blue-700 text-3xl" />
          <a
            href="https://www.linkedin.com/in/farheen-zahara/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 font-medium hover:text-blue-700 transition"
          >
            linkedin.com/in/farheen-zahara
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
