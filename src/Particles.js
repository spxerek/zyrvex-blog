import React, { useMemo, useRef, useEffect } from "react";
import { Particles, ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const particlesInit = async (engine) => {
  await loadSlim(engine);
};

const ParticleBackground = () => {
  const containerRef = useRef(null);

  // ── BURST ON CLICK via window ──
  useEffect(() => {
  const handleClick = async (e) => {
    // skip if clicking a link, button, or nav element
    if (e.target.closest('a, button, nav, input, textarea, select')) return;

    const container = containerRef.current;
    if (!container) return;
    const dpr = window.devicePixelRatio || 1;
    await container.particles.push(25, {
      x: e.clientX * dpr,
      y: e.clientY * dpr,
    });
  };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  const options = useMemo(() => ({
    background: { color: { value: "transparent" } },
    fpsLimit: 60,
    interactivity: {
      events: {
        onClick: { enable: false },
        onHover: { enable: true, mode: "grab" },
      },
      modes: {
        grab: { distance: 180 },
      },
    },
    particles: {
      color: { value: ["#00ff41", "#00b4d8", "#ffffff"] },
      links: {
        color: "#00ff41",
        distance: 130,
        enable: true,
        opacity: 0.25,
        width: 1,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: { default: "bounce" },
        random: true,
        speed: 0.8,
        straight: false,
      },
      number: {
        density: { enable: true },
        value: 300,
        limit: { mode: "delete", value: 400 },
      },
      opacity: {
        value: { min: 0.3, max: 0.9 },
        animation: { enable: true, speed: 0.6, minimumValue: 0.2 },
      },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 2.5 } },
    },
    detectRetina: true,
  }), []);

  const handleParticlesLoaded = (container) => {
    containerRef.current = container;
  };

  return (
    <ParticlesProvider init={particlesInit}>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <Particles
          id="tsparticles"
          particlesLoaded={handleParticlesLoaded}
          options={options}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </ParticlesProvider>
  );
};

export default ParticleBackground;