import { useState } from "react";
import { Link } from "react-router-dom";

const EagleLogo = () => (
  <svg viewBox="0 0 310 75" xmlns="http://www.w3.org/2000/svg" style={{ height: '28px', width: 'auto' }}>
    <defs>
      <filter id="g">
        <feGaussianBlur stdDeviation="1.2" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>
    <g filter="url(#g)" transform="translate(4,4)">
      <polygon points="40,18 28,36 38,48" fill="#003310" stroke="#00ff41" strokeWidth="0.4" strokeOpacity="0.5"/>
      <polygon points="28,36 25,58 38,48" fill="#002a0d" stroke="#00ff41" strokeWidth="0.35" strokeOpacity="0.45"/>
      <polygon points="40,18 52,10 58,24" fill="#002208" stroke="#00ff41" strokeWidth="0.35" strokeOpacity="0.5"/>
      <polygon points="52,10 68,6 58,24" fill="#004d1a" stroke="#00ff41" strokeWidth="0.45" strokeOpacity="0.7"/>
      <polygon points="58,24 68,6 76,18" fill="#005c1f" stroke="#00ff41" strokeWidth="0.45" strokeOpacity="0.7"/>
      <polygon points="58,24 76,18 74,36" fill="#004f1c" stroke="#00ff41" strokeWidth="0.45" strokeOpacity="0.65"/>
      <polygon points="40,18 58,24 48,34" fill="#003d15" stroke="#00ff41" strokeWidth="0.4" strokeOpacity="0.6"/>
      <polygon points="48,34 58,24 74,36" fill="#004218" stroke="#00ff41" strokeWidth="0.45" strokeOpacity="0.65"/>
      <polygon points="74,36 76,18 88,30" fill="#00cc35" stroke="#00ff41" strokeWidth="0.55" strokeOpacity="0.9"/>
      <polygon points="74,36 88,30 84,46" fill="#00dd3a" stroke="#00ff41" strokeWidth="0.6" strokeOpacity="0.95"/>
      <polygon points="84,46 88,30 98,40" fill="#00ff41" stroke="#66ffaa" strokeWidth="0.7" strokeOpacity="1"/>
      <polygon points="84,46 98,40 92,54" fill="#00ee3d" stroke="#44ff88" strokeWidth="0.65" strokeOpacity="0.95"/>
      <polygon points="92,54 98,40 102,50" fill="#00ff41" stroke="#88ffbb" strokeWidth="0.75" strokeOpacity="1"/>
      <polygon points="92,54 102,50 96,60" fill="#006622" stroke="#00ff41" strokeWidth="0.5" strokeOpacity="0.75"/>
      <polygon points="74,36 84,46 72,52" fill="#005018" stroke="#00ff41" strokeWidth="0.45" strokeOpacity="0.65"/>
      <polygon points="72,52 84,46 92,54" fill="#004a16" stroke="#00ff41" strokeWidth="0.4" strokeOpacity="0.6"/>
      <polygon points="58,24 74,36 63,38" fill="#001a08" stroke="#00ff41" strokeWidth="0.35" strokeOpacity="0.55"/>
      <polygon points="60,28 66,25 70,32 64,35" fill="#00ff41" stroke="#aaffcc" strokeWidth="0.7" opacity="0.95"/>
      <polygon points="62,29 66,27 69,32 65,34" fill="#88ffbb" stroke="#ccffdd" strokeWidth="0.4" opacity="0.85"/>
      <polygon points="62,28 65,26 67,29" fill="#ffffff" opacity="0.9"/>
      <polygon points="38,48 25,58 32,70" fill="#002d0f" stroke="#00ff41" strokeWidth="0.4" strokeOpacity="0.5"/>
      <polygon points="38,48 32,70 48,72" fill="#003812" stroke="#00ff41" strokeWidth="0.4" strokeOpacity="0.55"/>
      <polygon points="48,72 38,48 72,52" fill="#004218" stroke="#00ff41" strokeWidth="0.45" strokeOpacity="0.6"/>
      <polygon points="48,72 72,52 66,68" fill="#003814" stroke="#00ff41" strokeWidth="0.4" strokeOpacity="0.55"/>
      <polyline points="40,18 52,10 68,6 76,18 88,30 98,40 102,50 96,60 92,54" fill="none" stroke="#00ff41" strokeWidth="1.0" strokeLinejoin="round" strokeOpacity="0.95"/>
      <polyline points="92,54 96,60 102,50" fill="none" stroke="#44ff88" strokeWidth="1.1" strokeLinejoin="round"/>
      <polyline points="40,18 28,36 25,58 32,70 48,72 66,68" fill="none" stroke="#00cc35" strokeWidth="0.85" strokeLinejoin="round" strokeOpacity="0.8"/>
    </g>
    <line x1="116" y1="8" x2="116" y2="68" stroke="#00ff41" strokeWidth="1" strokeOpacity="0.5"/>
    <text x="126" y="50" fontFamily="monospace" fontSize="35" fontWeight="bold" fill="#00ff41" letterSpacing="2" opacity="0.95">ZYRVEX</text>
  </svg>
);

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="top-bar">
        <Link to="/"><EagleLogo /></Link>
        <nav className="desktop-nav">
          <Link to="/">HOME</Link>
          <Link to="/blog">BLOG</Link>
          <Link to="/writeups">WRITEUPS</Link>
          <Link to="/bugbounty">BUG BOUNTY</Link>
          <Link to="/about">ABOUT</Link>
        </nav>
        <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
      </header>
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>HOME</Link>
        <Link to="/blog" onClick={() => setMenuOpen(false)}>BLOG</Link>
        <Link to="/writeups" onClick={() => setMenuOpen(false)}>WRITEUPS</Link>
        <Link to="/bugbounty" onClick={() => setMenuOpen(false)}>BUG BOUNTY</Link>
        <Link to="/about" onClick={() => setMenuOpen(false)}>ABOUT</Link>
      </div>
    </>
  );
};

export default Navbar;