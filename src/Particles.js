import React, { useMemo, useRef } from "react";
import { Particles, ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const particlesInit = async (engine) => {
  await loadSlim(engine);
};

const ParticleBackground = () => {
  const containerRef = useRef(null);

  const options = useMemo(() => ({
    background: {
      color: { value: "#0a0f0d" },
    },
    fpsLimit: 60,
    interactivity: {
      events: {
        onClick: { enable: false }, // disabled — handled manually via ref
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
        speed: 1.5,
        straight: false,
      },
      number: {
        density: { enable: true },
        value: 300,
        limit: { mode: "delete", value: 400 },
      },
      opacity: {
        value: { min: 0.3, max: 0.9 },
        animation: {
          enable: true,
          speed: 0.6,
          minimumValue: 0.2,
        },
      },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 2.5 } },
    },
    detectRetina: true,
  }), []);

  const handleParticlesLoaded = (container) => {
    containerRef.current = container;
  };

const handleClick = async (e) => {
  const container = containerRef.current;
  if (!container) return;

  const dpr = window.devicePixelRatio || 1;

  const x = e.clientX * dpr;
  const y = e.clientY * dpr;

  await container.particles.push(10, { x, y });
};
  return (
    <ParticlesProvider init={particlesInit}>
      <div
        onClick={handleClick}
        style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0 }}
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