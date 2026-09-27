import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const typedRef = useRef(null);
  const [terminalLines, setTerminalLines] = useState([]);

  // ── TERMINAL BOOT SEQUENCE ──
  useEffect(() => {
  const lines = [
    { text: "$ whoami", type: "cmd" },
    { text: "[REDACTED]", type: "output" },
    { text: "$ cat interests.txt", type: "cmd" },
    { text: "Playing CTFs and Gaming", type: "output" }
  ];

  let lineIndex = 0;
  let charIndex = 0;
  let currentLines = [];
  let timer;

  function typeChar() {
    if (lineIndex >= lines.length) return;

    const currentLine = lines[lineIndex];

    if (charIndex === 0) {
      currentLines = [...currentLines, { text: "", type: currentLine.type }];
    }

    currentLines[currentLines.length - 1] = {
      ...currentLines[currentLines.length - 1],
      text: currentLine.text.slice(0, ++charIndex),
    };

    setTerminalLines([...currentLines]);

    if (charIndex < currentLine.text.length) {
      // typing speed — commands slower, output faster
      const speed = currentLine.type === "cmd" ? 65 : 25;
      timer = setTimeout(typeChar, speed);
    } else {
      // pause between lines
      charIndex = 0;
      lineIndex++;
      const pause = currentLine.type === "cmd" ? 180 : 400;
      timer = setTimeout(typeChar, pause);
    }
  }

  timer = setTimeout(typeChar, 400);
  return () => clearTimeout(timer);
}, []);

  // ── TYPING ANIMATION ──
  /*
  useEffect(() => {
    const words = ["Just Existing"];
    let wi = 0, ci = 0, deleting = false;
    let timer;

    function type() {
      if (!typedRef.current) return;
      const word = words[wi];
      if (!deleting) {
        typedRef.current.textContent = word.slice(0, ++ci);
        if (ci === word.length) { deleting = true; timer = setTimeout(type, 1800); return; }
        timer = setTimeout(type, 80);
      } else {
        typedRef.current.textContent = word.slice(0, --ci);
        if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; timer = setTimeout(type, 300); return; }
        timer = setTimeout(type, 40);
      }
    }

    // start after terminal finishes
    timer = setTimeout(type, 4800);
    return () => clearTimeout(timer);
  }, []);
  */

  // ── TYPING ANIMATION ──
useEffect(() => {
  const word = "Just Existing";
  let ci = 0;
  let timer;

  function type() {
    if (!typedRef.current) return;
    typedRef.current.textContent = word.slice(0, ++ci);
    if (ci < word.length) {
      timer = setTimeout(type, 80);
    }
    // stops here once fully typed — no delete, no loop
  }

  // start after terminal finishes
  timer = setTimeout(type, 4800);
  return () => clearTimeout(timer);
}, []);

  return (
    <div className="home">
      <section className="hero">

        {/* ── TERMINAL BLOCK ── */}
        <div className="terminal">
          <div className="terminal-bar">
            <span className="t-dot red" />
            <span className="t-dot yellow" />
            <span className="t-dot green" />
            <span className="t-title">zyrvex@kali ~ $</span>
          </div>
          <div className="terminal-body">
  {terminalLines.map((line, i) => (
    <div key={i} className={`t-line ${line.type === "cmd" ? "t-cmd" : "t-output"}`}>
      {line.text}
      {i === terminalLines.length - 1 && <span className="t-blink">▋</span>}
    </div>
  ))}
</div>

        </div>

        {/* ── TYPING ROW ── */}
        <div className="hero-typing-row" style={{ marginTop: '32px' }}>
          <span className="bracket">[</span>
          <span className="typed-text" ref={typedRef}></span>
          <span className="cursor"></span>
          <span className="bracket">]</span>
        </div>

        <p className="hero-tagline">
          Security researcher, written down as I go.<br />
          <span>To track my progress.</span><br />
          One writeup at a time.
        </p>

        <div className="cta-row">
          <Link className="btn-primary" to="/writeups">VIEW WRITEUPS</Link>
          <Link className="btn-secondary" to="/bugbounty">BUG BOUNTY JOURNEY →</Link>
        </div>
        
      </section>

      <div className="divider" />

      
    </div>
  );
};

export default Home;