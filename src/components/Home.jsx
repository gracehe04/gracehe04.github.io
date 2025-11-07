import React, { useState, useEffect, useMemo } from "react";
import "./Home.css";

const Header = () => {
  const [dynamicText, setDynamicText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [dynamicIndex, setDynamicIndex] = useState(0);

const dynamicTexts = useMemo(() => [
  "It's great to see you here 😊",
  "I'm a full-stack developer 💻",
  "I'm an undergraduate student @ NYU 🧠",
  "I love trying new restaurants and matcha places 🍵",
  "Stay tuned for more updates 🌀"
], []);

  const typingSpeed = 85;

  useEffect(() => {
    let timer;
    if (textIndex < dynamicTexts[dynamicIndex].length) {
      timer = setTimeout(() => {
        setDynamicText(
          (prev) => prev + dynamicTexts[dynamicIndex].charAt(textIndex)
        );
        setTextIndex((prev) => prev + 1);
      }, typingSpeed);
    } else {
      timer = setTimeout(() => {
        setDynamicText("");
        setTextIndex(0);
        setDynamicIndex((prev) => (prev + 1) % dynamicTexts.length);
      }, 1500);
    }

    return () => clearTimeout(timer);
  }, [textIndex, dynamicTexts, dynamicIndex]);

  return (
    <section id="home" className="header-container">
      <img
        src="https://gracehe04.github.io/personal-portfolio/image.jpg"
        alt="Grace He"
        className="header-photo"
      />
      <h2 className="header-title">Hi! I'm Grace :)</h2>
      <h3 className="header-text">
        {dynamicText}
        <span className="cursor">|</span>
      </h3>
    </section>
  );
};

export default Header;
