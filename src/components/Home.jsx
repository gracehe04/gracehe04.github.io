import { useState, useEffect, useMemo } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineDocumentText } from "react-icons/hi";
import "./Home.css";
import headshot from "../assets/He_Grace2025.JPG";

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
        setDynamicText((prev) => prev + dynamicTexts[dynamicIndex].charAt(textIndex));
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
      <img src={headshot} alt="Grace He" className="header-photo" />
      <h2 className="header-title">Hi! I'm Grace :)</h2>
      <p className="header-tagline">CS + Applied Psych @ NYU &nbsp;·&nbsp; Incoming @ Adobe</p>
      <h3 className="header-text">
        {dynamicText}
        <span className="cursor"></span>
      </h3>

      <div className="header-cta">
        <a href="https://github.com/gracehe04" target="_blank" rel="noopener noreferrer" className="cta-btn">
          <FaGithub size={17} />
          GitHub
        </a>
        <a href="https://www.linkedin.com/in/gracehe04/" target="_blank" rel="noopener noreferrer" className="cta-btn">
          <FaLinkedin size={17} />
          LinkedIn
        </a>
        <a href={`${process.env.PUBLIC_URL}/Grace_He_Resume.pdf`} target="_blank" rel="noopener noreferrer" className="cta-btn cta-btn--primary">
          <HiOutlineDocumentText size={18} />
          Resume
        </a>
      </div>

      <a href="#about" className="scroll-indicator" aria-label="Scroll down">
        <span className="scroll-arrow"></span>
      </a>
    </section>
  );
};

export default Header;
