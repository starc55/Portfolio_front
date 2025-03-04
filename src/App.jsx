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
import Achievements from "./pages/Achievements";
import LoadingSpinner from "./Loader/LoadingSpinner";
import TidioChat from "./components/Tidiochat";

function App() {
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // LocalStorage'dan holatni olish
    const savedMode = localStorage.getItem("theme");
    return savedMode === "dark";
  });

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000); //4000
  }, []);

  useEffect(() => {
    // Tizim modeni yangilash
    document.body.className = isDarkMode ? "dark-mode" : "";
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  return (
    <div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <Navbar className="hovered-element" />
          <Home className="hovered-element" />
          <About className="hovered-element" />
          <Skill className="hovered-element" />
          <Services className="hovered-element" />
          <Qualification className="hovered-element" />
          <Portfolio className="hovered-element"/>
          <Testimonials className="hovered-element" />
          <Achievements className="hovered-element" />
          <Contact className="hovered-element" />
          <Footer className="hovered-element" />
          <TidioChat /> 
          <BrowserRouter>
            <Routes></Routes>
          </BrowserRouter>
        </div>
      )}
    </div>
  );
}

export default App;
