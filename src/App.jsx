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
// import CustomCursor from "./CustomCursor";
import LoadingSpinner from "./Loader/LoadingSpinner";
import snowflake from './new year version img/snowflake.png'

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 9200);
  }, []);

  // Create snowflakes dynamically
  const createSnowflakes = () => {
    let snowflakes = [];
    for (let i = 0; i < 50; i++) {
      snowflakes.push(
        <div
          key={i}
          className="snowflake"
          style={{
            left: `${Math.random() * 100}vw`,
            animationDuration: `${Math.random() * 5 + 3}s`,
            animationDelay: `${Math.random() * 3}s`,
            backgroundImage: `url(${snowflake})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
          }}
        />
      );
    }
    return snowflakes;
  };

  return (
    <div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <div className="snow">{createSnowflakes()}</div>
          {/* <CustomCursor /> */}
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
            <Routes></Routes>
          </BrowserRouter>
        </div>
      )}
    </div>
  );
}

export default App;
