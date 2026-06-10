import { useEffect, useRef } from "react";

const TopBarCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let animationId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = 50; // only need enough height for the bar
    };

    resize();
    window.addEventListener("resize", resize);

    const drawTopBar = () => {
      const w = canvas.width;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background bar
      ctx.save();
      ctx.globalAlpha = 0.85;
      ctx.fillStyle = "#0a0f0d";
      ctx.fillRect(0, 0, w, 36);

      // Bottom border
      ctx.strokeStyle = "#00ff41";
      ctx.lineWidth = 0.8;
      ctx.globalAlpha = 0.4;

      ctx.beginPath();
      ctx.moveTo(0, 36);
      ctx.lineTo(w, 36);
      ctx.stroke();

      ctx.restore();

      // Logo text
      ctx.save();
      ctx.fillStyle = "#00ff41";
      ctx.font = "bold 11px monospace";
      ctx.globalAlpha = 0.9;
      ctx.textAlign = "left";
      ctx.fillText("⬡ ZYRVEX", 16, 22);
      ctx.restore();
    };

    const animate = () => {
      drawTopBar();
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "50px",
        zIndex: 100,
        pointerEvents: "none",
      }}
    />
  );
};

export default TopBarCanvas;