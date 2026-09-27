import React, { useState } from "react";
import "./Writeups.css";
import writeupsIndex, { writeupUrl } from "./writeupsIndex";

const CATEGORY_META = [
  { key: "forensics", label: "Forensics", icon: "🧬" },
  { key: "web", label: "Web", icon: "🌐" },
  { key: "osint", label: "OSINT", icon: "🔍" },
  { key: "mobile", label: "Mobile App", icon: "📱" },
  { key: "reverse-engineering", label: "Reverse Engineering", icon: "⚙️" },
  { key: "cryptography", label: "Cryptography", icon: "🔐" },
];

const Writeups = () => {
  const [activeTab, setActiveTab] = useState("all");

  const allEntries = CATEGORY_META.flatMap((cat) =>
    (writeupsIndex[cat.key] || []).map((entry) => ({ ...entry, cat }))
  );

  const visibleEntries =
    activeTab === "all"
      ? allEntries
      : allEntries.filter((e) => e.cat.key === activeTab);

  const countFor = (key) =>
    key === "all" ? allEntries.length : (writeupsIndex[key] || []).length;

  return (
    <div className="writeups-page">
      <div className="writeups-header">
        <span className="prompt">root@ctf:~$</span> ls -la ./writeups
      </div>

      <div className="tabs">
        <button
          className={`tab ${activeTab === "all" ? "active" : ""}`}
          onClick={() => setActiveTab("all")}
        >
          All <span className="tab-count">[{countFor("all")}]</span>
        </button>
        {CATEGORY_META.map((cat) => (
          <button
            key={cat.key}
            className={`tab ${activeTab === cat.key ? "active" : ""}`}
            onClick={() => setActiveTab(cat.key)}
          >
            <span className="tab-icon">{cat.icon}</span> {cat.label}{" "}
            <span className="tab-count">[{countFor(cat.key)}]</span>
          </button>
        ))}
      </div>

      {visibleEntries.length === 0 ? (
        <div className="empty-state">
          <span className="dim">// no writeups posted yet in this category</span>
        </div>
      ) : (
        <div className="writeup-grid">
          {visibleEntries.map((entry) => (
            <a
              key={`${entry.cat.key}-${entry.file}`}
              className="writeup-card"
              href={writeupUrl(entry.file)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="card-top">
                <span className="card-icon">{entry.cat.icon}</span>
                <span className="card-cat">{entry.cat.label}</span>
              </div>
              <h3 className="card-title">{entry.title}</h3>
              {entry.tags?.length > 0 && (
                <div className="card-tags">
                  {entry.tags.map((t) => (
                    <span key={t} className="tag-chip">
                      #{t}
                    </span>
                  ))}
                </div>
              )}
              {entry.date && <div className="card-date">{entry.date}</div>}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default Writeups;