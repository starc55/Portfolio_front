import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import Testimonials from "./pages/Testimonials";
import Contact from "./pages/Contact";
import { Footer } from "./pages/Footer";
import Achievements from "./pages/Achievements";
import Coding from "./pages/Coding";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingOverlay from "./components/LoadingOverlay";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingOverlay />;
  }
  return (
    <BrowserRouter>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <About />
              <Services />
              <Portfolio />
              <Testimonials />
              <Achievements />
              <Contact />
              <Footer />
            </>
          }
        />
        <Route path="/coding" element={<Coding />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
