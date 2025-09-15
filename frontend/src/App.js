import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header"; // Replace with the actual path to your Header component
import Footer from "./components/Footer"; // Replace with the actual path to your Footer component
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import BlogList from "./components/BlogList";
import Blog from "./components/Blog";
import PersonalBlogs from "./components/PersonalBlogs";
import TechBlogs from "./components/TechBlogs";
import ProjectTile from "./components/ProjectTile";
import ProjectPage from "./components/ProjectsPage";
import BooksList from "./components/BooksList";
import BooksDetail from "./components/BooksDetail";
import Contact from "./components/Contact"; // Replace with the actual path to your Contact component
import Certificates from "./components/Certificates";

const App = () => {
  return (
    <>
      <Header />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/projects" element={<ProjectPage />} />
          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="/blogs/personal" element={<PersonalBlogs />} />
          <Route path="/blogs/tech" element={<TechBlogs />} />
          <Route path="/books" element={<BooksList />} />
          <Route path="/books/:id" element={<BooksDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/certificates" element={<Certificates />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
};

export default App;
