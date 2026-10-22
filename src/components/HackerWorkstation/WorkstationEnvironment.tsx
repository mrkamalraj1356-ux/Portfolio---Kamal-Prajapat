import React, { useEffect, useRef } from "react";

export const WorkstationEnvironment: React.FC = () => {
  const rainCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = rainCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const onResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", onResize);

    // Subtle rain streaks
    const drops = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      len: 12 + Math.random() * 20,
      speed: 4 + Math.random() * 6,
      opacity: 0.12 + Math.random() * 0.18
    }));

    // City bokeh lights
    const bokeh = Array.from({ length: 18 }, () => ({
      x: Math.random() * width,
      y: 100 + Math.random() * (height * 0.5),
      r: 6 + Math.random() * 18,
      alpha: 0.08 + Math.random() * 0.15,
      color: Math.random() > 0.5 ? "rgba(0, 240, 255," : "rgba(168, 85, 247,"
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw bokeh circles in distant night window
      bokeh.forEach((b) => {
        ctx.fillStyle = `${b.color}${b.alpha})`;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw rain streaks
      ctx.strokeStyle = "rgba(180, 220, 255, 0.2)";
      ctx.lineWidth = 1;
      drops.forEach((d) => {
        d.y += d.speed;
        d.x -= d.speed * 0.25; // slight angle
        if (d.y > height) {
          d.y = -20;
          d.x = Math.random() * width;
        }

        ctx.strokeStyle = `rgba(140, 200, 255, ${d.opacity})`;
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - 3, d.y + d.len);
        ctx.stroke();
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden bg-[#020205]">
      {/* Distant Cyber City Rain Window Canvas */}
      <canvas ref={rainCanvasRef} className="absolute inset-0 w-full h-full opacity-60" />

      {/* Volumetric Blue Ambient Lighting in Room */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[80vw] h-[60vh] bg-gradient-to-b from-blue-700/10 via-cyan-600/5 to-transparent blur-[140px] pointer-events-none" />
      <div className="absolute top-10 right-1/4 w-[40vw] h-[40vh] bg-gradient-to-b from-cyan-500/15 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-red-600/10 blur-[100px] pointer-events-none" />

      {/* Cyber Conduits & Ceiling Cable Runs */}
      <div className="absolute top-0 left-0 right-0 h-10 border-b border-cyan-500/10 bg-gradient-to-b from-black/80 to-transparent flex items-center px-8 justify-between opacity-40">
        <div className="flex gap-4">
          <div className="h-0.5 w-48 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
          <div className="h-0.5 w-32 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
        </div>
        <div className="flex items-center gap-2 text-[9px] font-mono text-cyan-500/40 tracking-widest">
          <span>RACK #01</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 animate-ping" />
        </div>
      </div>

      {/* Left Wall: Neon Sign - "USERS DON'T HACK SYSTEMS PEOPLE HACK PEOPLE" */}
      <div className="absolute top-28 left-6 sm:left-10 lg:left-16 z-0 max-w-[240px] opacity-70 hidden sm:block">
        <div className="p-3 rounded-lg border border-cyan-500/20 bg-black/50 backdrop-blur-xs shadow-[0_0_20px_rgba(0,240,255,0.1)]">
          <div className="text-[10px] font-mono tracking-widest text-cyan-400 font-bold mb-1 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            PROTOCOL
          </div>
          <div className="text-xs font-mono font-semibold tracking-wider text-white/90 leading-relaxed uppercase shadow-[0_0_8px_rgba(255,255,255,0.4)]">
            USERS DON&apos;T HACK SYSTEMS
            <br />
            <span className="text-cyan-400 font-bold drop-shadow-[0_0_10px_rgba(0,240,255,0.8)]">
              PEOPLE HACK PEOPLE
            </span>
          </div>
        </div>

        {/* Faint vertical cyber code stream falling along the left wall */}
        <div className="mt-4 text-[9px] font-mono text-cyan-500/25 leading-none space-y-1 select-none pointer-events-none">
          <div>0x7F41A90B22 45 00 00 3C</div>
          <div>192.168.1.1 &gt;&gt; INGRESS</div>
          <div>SHA256: e3b0c44298fc1c</div>
          <div>CIPHER: AES-256-GCM</div>
          <div>SSH-2.0-OpenSSH_8.9p1</div>
          <div>STATUS: INTERCEPTING</div>
        </div>
      </div>

      {/* Left Foreground: Gaming Chair Silhouette (matches reference image composition!) */}
      <div className="absolute -left-12 sm:-left-6 lg:left-0 bottom-0 z-10 w-48 sm:w-64 lg:w-80 h-[80vh] pointer-events-none opacity-90 select-none">
        <svg
          viewBox="0 0 320 600"
          className="w-full h-full drop-shadow-[0_10px_35px_rgba(0,0,0,0.95)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main Ergonomic Gaming Bucket Seat Silhouette */}
          <path
            d="M 60 550 C 40 450, 20 300, 35 180 C 42 120, 60 70, 110 50 C 145 35, 175 35, 210 50 C 260 70, 278 120, 285 180 C 300 300, 280 450, 260 550 Z"
            fill="#05070c"
            stroke="#162035"
            strokeWidth="3"
          />

          {/* Integrated Headrest Cushion */}
          <path
            d="M 90 75 C 110 65, 210 65, 230 75 C 245 90, 245 130, 230 145 C 210 155, 110 155, 90 145 C 75 130, 75 90, 90 75 Z"
            fill="#090d18"
            stroke="#00f0ff"
            strokeWidth="1.2"
            strokeOpacity="0.4"
          />

          {/* Harness / Harness Pass-through Holes with Cyan/Blue glow */}
          <rect x="110" y="160" width="30" height="14" rx="7" fill="#000000" stroke="#00f0ff" strokeWidth="1" strokeOpacity="0.6" />
          <rect x="180" y="160" width="30" height="14" rx="7" fill="#000000" stroke="#00f0ff" strokeWidth="1" strokeOpacity="0.6" />

          {/* Side Bolster Racing Wings */}
          <path
            d="M 35 220 C 10 300, 15 420, 50 490 L 70 470 C 45 410, 40 310, 60 240 Z"
            fill="#0a0f1d"
            stroke="#2563eb"
            strokeWidth="1.5"
            strokeOpacity="0.5"
          />
          <path
            d="M 285 220 C 310 300, 305 420, 270 490 L 250 470 C 275 410, 280 310, 260 240 Z"
            fill="#0a0f1d"
            stroke="#2563eb"
            strokeWidth="1.5"
            strokeOpacity="0.5"
          />

          {/* Cyber Stitching Highlights & Electric Blue Rim Light */}
          <path
            d="M 60 70 C 35 150, 20 280, 40 450"
            stroke="#00f0ff"
            strokeWidth="1.8"
            strokeOpacity="0.5"
            strokeDasharray="4 6"
          />
          <path
            d="M 260 70 C 285 150, 300 280, 280 450"
            stroke="#ef4444"
            strokeWidth="1.5"
            strokeOpacity="0.4"
            strokeDasharray="4 6"
          />

          {/* Lumbar Cushion Contour */}
          <path
            d="M 80 360 C 120 345, 200 345, 240 360 C 255 385, 255 425, 240 445 C 200 460, 120 460, 80 445 C 65 425, 65 385, 80 360 Z"
            fill="#080c16"
            stroke="#1e293b"
            strokeWidth="1.5"
          />
        </svg>
      </div>
    </div>
  );
};
