import React, { useState } from "react";
import "./Writeups.css";

// Fill each category's `entries` array with your real writeups.
// { title, tags: [], date, link }
const CATEGORIES = [
  {
    key: "forensics",
    label: "Forensics",
    icon: "🧬",
    entries: [
      // { title: "Memory Dump Mayhem", tags: ["volatility", "memory"], date: "2026-04", link: "#" },
    ],
  },
  {
    key: "web",
    label: "Web",
    icon: "🌐",
    entries: [
      // { title: "SQLi in the Login Form", tags: ["sqli", "auth-bypass"], date: "2026-03", link: "#" },
    ],
  },
  {
    key: "osint",
    label: "OSINT",
    icon: "🔍",
    entries: [
      // { title: "Tracing the Anon Poster", tags: ["osint", "geolocation"], date: "2026-02", link: "#" },
    ],
  },
  {
    key: "mobile",
    label: "Mobile App",
    icon: "📱",
    entries: [
      // { title: "Reversing an Android APK", tags: ["android", "apk"], date: "2026-01", link: "#" },
    ],
  },
  {
    key: "reverse-engineering",
    label: "Reverse Engineering",
    icon: "⚙️",
    entries: [
      // { title: "Cracking a Simple Crackme", tags: ["ghidra", "x86"], date: "2025-12", link: "#" },
    ],
  },
  {
    key: "cryptography",
    label: "Cryptography",
    icon: "🔐",
    entries: [
      // { title: "Breaking a Weak RSA Key", tags: ["rsa", "factordb"], date: "2025-11", link: "#" },
    ],
  },
];

const Writeups = () => {
  const [openKey, setOpenKey] = useState(CATEGORIES[0].key);

  const toggle = (key) => {
    setOpenKey((prev) => (prev === key ? null : key));
  };

  return (
    <div className="writeups-page">
      <div className="writeups-header">
        <span className="prompt">root@ctf:~$</span> ls -la ./writeups
      </div>

      <div className="writeups-list">
        {CATEGORIES.map((cat) => {
          const isOpen = openKey === cat.key;
          return (
            <div
              key={cat.key}
              className={`writeup-section ${isOpen ? "open" : ""}`}
            >
              <button
                className="writeup-section-header"
                onClick={() => toggle(cat.key)}
                aria-expanded={isOpen}
              >
                <span className="section-caret">{isOpen ? "▼" : "▶"}</span>
                <span className="section-icon">{cat.icon}</span>
                <span className="section-label">{cat.label}</span>
                <span className="section-count">
                  [{cat.entries.length.toString().padStart(2, "0")}]
                </span>
              </button>

              {isOpen && (
                <div className="writeup-section-body">
                  {cat.entries.length === 0 ? (
                    <div className="empty-entry">
                      <span className="dim">// no writeups posted yet</span>
                    </div>
                  ) : (
                    cat.entries.map((entry, i) => (
                      <a
                        key={i}
                        href={entry.link || "#"}
                        className="writeup-entry"
                      >
                        <span className="entry-title">{entry.title}</span>
                        {entry.tags?.length > 0 && (
                          <span className="entry-tags">
                            {entry.tags.map((t) => `#${t}`).join(" ")}
                          </span>
                        )}
                        {entry.date && (
                          <span className="entry-date">{entry.date}</span>
                        )}
                      </a>
                    ))
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Writeups;
