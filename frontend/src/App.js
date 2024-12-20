import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import BlogList from "./components/BlogList";
import Blog from "./components/Blog";
import PersonalBlogs from "./components/PersonalBlogs";
import TechBlogs from "./components/TechBlogs";
import ProjectPage from "./components/ProjectsPage";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/projects" element={<ProjectPage />} />
        {/* Home Page */}
        <Route path="/" element={<Home />} />
        {/* Blog Routes */}
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/blogs/personal" element={<PersonalBlogs />} />
        <Route path="/blogs/tech" element={<TechBlogs />} />
        {/* Project Page */}
        <Route path="/projects" element={<ProjectPage />} />
      </Routes>
    </Router>
  );
};

export default App;
