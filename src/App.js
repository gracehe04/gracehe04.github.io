import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
//import Contact from "./components/Contact";
import "./App.css";

function App() {
  const [theme, setTheme] = useState("light");

  // Persist theme in localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setTheme(savedTheme);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Home />
      <About />
      <Projects />
      {/* <Contact /> */}
      <Footer />
    </div>
  );
}

export default App;
