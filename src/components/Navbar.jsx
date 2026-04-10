import React from "react";

function Navbar({ theme, toggleTheme }) {
  return (
    <nav className="navbar">
      <img src="/favicon.ico" alt="Grace He" className="navbar-logo" />
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="mailto:gh2313@nyu.edu">Contact</a></li>
      </ul>
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === "light" ? "🌙" : "☀️"}
      </button>
    </nav>
  );
}

export default Navbar;
