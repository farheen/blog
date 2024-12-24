import React from "react";
import myImage from "../images/farheen_pic.png";
import "../css/home.css";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="home-container container mt-5">
            <div className="row align-items-center">
                {/* Left Side: Description */}
                <div className="col-md-6 text-start">
                    <h1 className="home-title">
                        Hello, I’m <span className="highlight">Farheen 👋</span>! 
                    </h1>
                    <p className="home-description">
                        Welcome to my space where curiosity meets creativity. 🌟
                    </p>
                    <ul className="home-list">
                        <li>🚀 Aspiring Data Scientist</li>
                        <li>📚 Blogger and Author</li>
                        <li>🛠️ Project Enthusiast</li>
                    </ul>
                    <div className="mt-6">
                      <Link to="/certificates" className="inline-block bg-purple-600 text-black px-6 py-3 rounded-lg shadow-md hover:bg-purple-700 transition duration-300">
                        View My Certificates
                      </Link>
                    </div>
                    <p>
                        Join me in my journey as I learn, build, and share exciting
                        projects that make a difference. Check out my blogs, books, explore
                        my portfolio, and stay tuned for more!
                    </p>
                </div>

                {/* Right Side: Image */}
                <div className="col-md-6 text-center">
                    <div className="image-wrapper">
                        <img 
                            src={myImage} 
                            alt="Farheen" 
                            className="home-image img-fluid shadow rounded-circle" 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
