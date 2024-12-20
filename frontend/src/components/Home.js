import React from "react";
import myImage from "../images/farheen_pic.png";
import "../css/home.css";

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
