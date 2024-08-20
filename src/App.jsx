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

function App() {
  return (
    <div>
      <Navbar />
      <Home />
      <About />
      <Skill />
      <Services />
      <Qualification />
      <Portfolio />
      <Testimonials />
      <Achievements />
      <Contact />
      <Footer />

      <ScrollUp />
      <BrowserRouter>
        <Routes>{/* Define your routes here */}</Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
