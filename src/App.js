import React from "react";
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
  return (
    <>
      <DesignShell sections={sections} />
    </>
  );
}

export default App;
