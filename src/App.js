import { useState } from "react";
import "./App.css";
import ParticleBackground from "./Particles";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="App">
      <ParticleBackground />

      <header className="top-bar">
        <div className="logo">⬡ ZYRVEX</div>

        <nav className="desktop-nav">
          <a href="/">HOME</a>
          <a href="/blog">BLOG</a>
          <a href="/projects">PROJECTS</a>
          <a href="/about">ABOUT</a>
          <a href="/contact">CONTACT</a>
        </nav>

        <button
          className="menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </header>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <a href="/">HEY</a>
        <a href="/blog">HI</a>
        <a href="/projects">WILL</a>
        <a href="/about">BE</a>
        <a href="/contact">BACK SOON</a>
      </div>
    </div>
  );
}

export default App;