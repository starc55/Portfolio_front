import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import LoadingOverlay from "./components/common/LoadingOverlay";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Portfolio from "./pages/Projects";
import Testimonials from "./pages/Testimonials";
import Achievements from "./pages/Achievements";
import Contact from "./pages/Contact";
import Coding from "./pages/Coding";
import { Footer } from "./components/layout/Footer";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import FloatingCodingButton from "components/common/FloatingCodingButton";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingOverlay />;

  return (
    <BrowserRouter>
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
              <FloatingCodingButton />
            </>
          }
        />
        <Route path="/coding" element={<Coding />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
