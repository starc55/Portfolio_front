import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import { Skill } from "./pages/Skill";
import Services from "./pages/Services";
import Qualification from "./pages/Qualification";
import Portfolio from "./pages/Portfolio";
import Testimonials from "./pages/Testimonials";
import Contact from "./pages/Contact";
import { Footer } from "./pages/Footer";
import ScrollUp from "./components/ScrollUp";
import Achievements from "./pages/Achievements";
import CustomCursor from "./CustomCursor";
import LoadingSpinner from "./Loader/LoadingSpinner";// Import your LoadingSpinner component

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    setTimeout(() => {
      setLoading(false);
    }, 3200); // Adjust the time as needed
  }, []);

  if (loading) {
    return <LoadingSpinner />; // Show the spinner while loading
  }

  return (
    <div>
      <CustomCursor />
      <Navbar className="hovered-element" />
      <Home className="hovered-element" />
      <About className="hovered-element" />
      <Skill className="hovered-element" />
      <Services className="hovered-element" />
      <Qualification className="hovered-element" />
      <Portfolio className="hovered-element" />
      <Testimonials className="hovered-element" />
      <Achievements className="hovered-element" />
      <Contact className="hovered-element" />
      <Footer className="hovered-element" />

      <ScrollUp />
      <BrowserRouter>
        <Routes>{/* Define your routes here */}</Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
