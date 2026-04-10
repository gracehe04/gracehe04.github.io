import { useEffect, useRef } from "react";
import "./CustomCursor.css";

function CustomCursor() {
  const ref = useRef(null);

  useEffect(() => {
    const move = (e) => {
      if (ref.current) {
        ref.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };
    document.addEventListener("mousemove", move);
    return () => document.removeEventListener("mousemove", move);
  }, []);

  return (
    <div ref={ref} className="custom-cursor">
      <svg
        width="18"
        height="20"
        viewBox="0 0 18 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="shadow">
          <feDropShadow dx="1" dy="1" stdDeviation="1.2" floodColor="#00000066" />
        </filter>
        <path
          d="M 0 0 L 0 16 L 4.5 12 L 7 18.5 L 9.5 17.5 L 7 11 L 12.5 11 Z"
          fill="white"
          stroke="black"
          strokeWidth="1"
          strokeLinejoin="round"
          filter="url(#shadow)"
        />
      </svg>
    </div>
  );
}

export default CustomCursor;
