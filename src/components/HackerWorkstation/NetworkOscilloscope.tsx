import React, { useEffect, useRef } from "react";

export const NetworkOscilloscope: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 200);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 60);

    const onResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", onResize);

    let offset = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Grid background
      ctx.strokeStyle = "rgba(0, 240, 255, 0.08)";
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 15) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw Waveform (oscilloscope pulse)
      ctx.strokeStyle = "#00f0ff";
      ctx.lineWidth = 1.8;
      ctx.shadowColor = "#00f0ff";
      ctx.shadowBlur = 8;
      ctx.beginPath();

      const centerY = height / 2;
      for (let x = 0; x < width; x++) {
        // Base sine wave + spike pulses
        const freq1 = Math.sin((x + offset) * 0.06);
        const freq2 = Math.cos((x - offset * 0.5) * 0.12) * 0.4;
        const spike = Math.sin((x + offset * 2) * 0.03) > 0.85 ? Math.sin(x * 0.5) * 14 : 0;
        const y = centerY + (freq1 + freq2) * 8 + spike;

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      offset += 1.8;
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="relative w-full h-full bg-[#030612] p-1 flex flex-col justify-between font-mono select-none overflow-hidden">
      <div className="flex items-center justify-between text-[8px] text-cyan-400 font-bold px-1">
        <span>BANDWIDTH PULSE</span>
        <span className="text-emerald-400">1.4 Gbps</span>
      </div>
      <div className="relative flex-1 w-full h-full min-h-[35px]">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
      </div>
    </div>
  );
};
