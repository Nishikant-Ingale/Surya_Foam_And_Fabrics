import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import AboutContact from "./pages/AboutContact";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import Gallery from "./pages/Gallery";
import Testimonials from "./pages/Testimonials";
import FloatingButton from "./components/FloatingButton";
import Footer from "./components/Footer";
import "./App.css"; // Import your main CSS file for global styles
const App = () => {
  return (
    <div className="app-wrapper">
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ui/about" element={<AboutContact />} />
          <Route path="/ui/products" element={<Products />} />
          <Route path="/ui/contact" element={<Contact />} />
          <Route path="/ui/gallery" element={<Gallery />} />
          <Route path="/ui/testimonials" element={<Testimonials />} />
        </Routes>
      </div>
      <FloatingButton />
      <Footer />
    </div>
  );
};

export default App;
