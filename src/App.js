import React, { useState, useEffect } from "react";
import DesignShell from "./components/DesignShell";
import Home from "./components/Home";
import About from "./components/About";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import "./App.css";

const sections = [
  { id: "home",     Component: Home     },
  { id: "about",    Component: About    },
  { id: "projects", Component: Projects },
  { id: "footer",   Component: Footer   },
];

function App() {
  const [theme, setTheme] = useState("light");

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
    <>
      <DesignShell sections={sections} theme={theme} toggleTheme={toggleTheme} />
    </>
  );
}

export default App;
