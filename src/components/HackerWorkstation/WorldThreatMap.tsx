import React, { useEffect, useRef } from "react";

interface Hub {
  name: string;
  x: number;
  y: number;
}

interface AttackArc {
  source: Hub;
  target: Hub;
  progress: number;
  speed: number;
  color: string;
}

interface Explosion {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  color: string;
}

// Major international tech / cyber telemetry hubs (normalized 0..100)
const HUBS: Hub[] = [
  { name: "San Francisco", x: 19, y: 35 },
  { name: "New York", x: 28, y: 34 },
  { name: "São Paulo", x: 34, y: 72 },
  { name: "London", x: 48, y: 26 },
  { name: "Frankfurt", x: 52, y: 28 },
  { name: "Mumbai", x: 67, y: 46 },
  { name: "Singapore", x: 77, y: 56 },
  { name: "Tokyo", x: 84, y: 36 },
  { name: "Sydney", x: 88, y: 78 },
  { name: "Cairo", x: 56, y: 41 },
  { name: "Cape Town", x: 54, y: 78 },
  { name: "Reykjavik", x: 44, y: 17 }
];

// Approximate continent dot coordinates for a futuristic stylized digital world map
const CONTINENT_DOTS: [number, number][] = [
  // North America
  [12, 22], [15, 20], [18, 18], [22, 17], [25, 20], [28, 22],
  [14, 26], [17, 25], [20, 24], [23, 23], [26, 25], [29, 26],
  [15, 30], [18, 30], [21, 29], [24, 29], [27, 30], [30, 31],
  [17, 35], [20, 35], [23, 34], [26, 35], [28, 36],
  [19, 40], [22, 40], [25, 41],
  [21, 46], [23, 48],
  // South America
  [28, 56], [31, 55], [34, 57],
  [29, 61], [32, 60], [35, 62], [37, 63],
  [30, 67], [33, 66], [36, 68],
  [31, 73], [34, 72],
  [32, 79], [33, 84],
  // Europe
  [47, 22], [50, 21], [53, 20],
  [46, 27], [49, 26], [52, 26], [55, 26],
  [47, 32], [50, 31], [53, 32],
  // Africa
  [48, 42], [51, 40], [54, 40], [57, 43],
  [49, 48], [52, 47], [55, 48], [58, 49],
  [51, 55], [54, 54], [57, 56],
  [52, 63], [55, 62],
  [53, 70], [55, 71],
  [54, 78],
  // Asia
  [59, 23], [63, 22], [67, 21], [71, 22], [75, 23], [79, 25], [83, 24],
  [61, 28], [65, 27], [69, 27], [73, 28], [77, 29], [81, 29], [85, 30],
  [60, 34], [64, 34], [68, 34], [72, 35], [76, 36], [80, 36], [84, 37],
  [62, 41], [66, 42], [70, 42], [74, 42], [78, 43], [82, 43],
  [67, 47], [71, 48], [75, 48], [79, 50],
  [76, 56], [78, 58],
  // Australia / Oceania
  [84, 72], [87, 70], [90, 72],
  [83, 77], [86, 76], [89, 78],
  [85, 83], [88, 82]
];

const ATTACK_COLORS = ["#00f0ff", "#ff0055", "#00ff66", "#a855f7", "#38bdf8"];

export const WorldThreatMap: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 340);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    const arcs: AttackArc[] = [];
    const explosions: Explosion[] = [];

    const spawnArc = () => {
      if (arcs.length >= 6) return;
      const srcIdx = Math.floor(Math.random() * HUBS.length);
      let tgtIdx = Math.floor(Math.random() * HUBS.length);
      while (tgtIdx === srcIdx) {
        tgtIdx = Math.floor(Math.random() * HUBS.length);
      }

      arcs.push({
        source: HUBS[srcIdx],
        target: HUBS[tgtIdx],
        progress: 0,
        speed: 0.007 + Math.random() * 0.008,
        color: ATTACK_COLORS[Math.floor(Math.random() * ATTACK_COLORS.length)]
      });
    };

    let lastSpawn = 0;
    let time = 0;

    const render = (now: number) => {
      time += 0.02;

      if (now - lastSpawn > 800) {
        spawnArc();
        lastSpawn = now;
      }

      ctx.clearRect(0, 0, width, height);

      // Deep dark cyber background grid
      ctx.strokeStyle = "rgba(0, 240, 255, 0.04)";
      ctx.lineWidth = 1;
      const gridSize = 24;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw stylized continent dots
      CONTINENT_DOTS.forEach(([px, py]) => {
        const cx = (px / 100) * width;
        const cy = (py / 100) * height;

        ctx.fillStyle = "rgba(0, 210, 255, 0.35)";
        ctx.beginPath();
        ctx.arc(cx, cy, 1.6, 0, Math.PI * 2);
        ctx.fill();

        // Subtle shimmer on random dots
        const pulse = Math.sin(time * 3 + px * 0.2 + py * 0.3);
        if (pulse > 0.7) {
          ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
          ctx.beginPath();
          ctx.arc(cx, cy, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Draw hubs with pulsing concentric radar waves
      HUBS.forEach((hub, idx) => {
        const hx = (hub.x / 100) * width;
        const hy = (hub.y / 100) * height;
        const wave = (time * 1.5 + idx * 0.5) % 1;

        // Wave circle
        ctx.strokeStyle = `rgba(0, 240, 255, ${0.4 * (1 - wave)})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(hx, hy, 4 + wave * 16, 0, Math.PI * 2);
        ctx.stroke();

        // Hub core
        ctx.fillStyle = "#00f0ff";
        ctx.shadowColor = "#00f0ff";
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(hx, hy, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Update and draw attack arcs
      for (let i = arcs.length - 1; i >= 0; i--) {
        const arc = arcs[i];
        arc.progress += arc.speed;

        const sx = (arc.source.x / 100) * width;
        const sy = (arc.source.y / 100) * height;
        const tx = (arc.target.x / 100) * width;
        const ty = (arc.target.y / 100) * height;

        // Quadratic curve peak
        const midX = (sx + tx) / 2;
        const dist = Math.hypot(tx - sx, ty - sy);
        const midY = (sy + ty) / 2 - Math.min(dist * 0.35, 70);

        // Draw faint trajectory path
        ctx.strokeStyle = "rgba(0, 240, 255, 0.08)";
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 4]);
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.quadraticCurveTo(midX, midY, tx, ty);
        ctx.stroke();
        ctx.setLineDash([]);

        // Compute current point along curve
        const t = Math.min(arc.progress, 1);
        const currX = (1 - t) * (1 - t) * sx + 2 * (1 - t) * t * midX + t * t * tx;
        const currY = (1 - t) * (1 - t) * sy + 2 * (1 - t) * t * midY + t * t * ty;

        // Compute tail point
        const tailT = Math.max(0, t - 0.18);
        const tailX = (1 - tailT) * (1 - tailT) * sx + 2 * (1 - tailT) * tailT * midX + tailT * tailT * tx;
        const tailY = (1 - tailT) * (1 - tailT) * sy + 2 * (1 - tailT) * tailT * midY + tailT * tailT * ty;

        // Draw projectile beam
        const grad = ctx.createLinearGradient(tailX, tailY, currX, currY);
        grad.addColorStop(0, "rgba(0,0,0,0)");
        grad.addColorStop(0.7, arc.color);
        grad.addColorStop(1, "#ffffff");

        ctx.strokeStyle = grad;
        ctx.lineWidth = 2.2;
        ctx.shadowColor = arc.color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.quadraticCurveTo(midX, midY, currX, currY);
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Head glowing dot
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(currX, currY, 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Check if finished
        if (arc.progress >= 1) {
          explosions.push({
            x: tx,
            y: ty,
            radius: 2,
            maxRadius: 18 + Math.random() * 8,
            alpha: 1,
            color: arc.color
          });
          arcs.splice(i, 1);
        }
      }

      // Update and draw impact shockwaves
      for (let i = explosions.length - 1; i >= 0; i--) {
        const exp = explosions[i];
        exp.radius += 1;
        exp.alpha -= 0.04;

        if (exp.alpha <= 0) {
          explosions.splice(i, 1);
          continue;
        }

        ctx.strokeStyle = exp.color;
        ctx.globalAlpha = exp.alpha;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(exp.x, exp.y, exp.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#030712]/90 flex flex-col">
      {/* Top Threat Telemetry Status Bar */}
      <div className="flex items-center justify-between px-2 py-0.5 bg-black/75 border-b border-cyan-500/20 text-[8px] font-mono tracking-wider text-cyan-400 select-none whitespace-nowrap">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping inline-block" />
          <span className="font-bold text-white tracking-widest">THREAT MAP</span>
          <span className="text-white/30">|</span>
          <span className="text-cyan-300/80 hidden sm:inline">GLOBAL SENSORS: 42/42</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-emerald-400 font-semibold">DEFCON: 4</span>
          <span className="text-white/40 hidden md:inline">16ms</span>
        </div>
      </div>

      {/* Canvas */}
      <div className="relative flex-1 w-full h-full min-h-[140px]">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

        {/* Live Attack Feed Ticker at bottom */}
        <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between text-[9px] font-mono text-cyan-300/70 bg-black/70 px-2 py-0.5 rounded border border-cyan-500/10 backdrop-blur-xs select-none">
          <span className="truncate">
            <span className="text-red-400 font-semibold">[BLOCKED]</span> TCP SYN FLOOD &gt; 185.220.101.4:443
          </span>
          <span className="text-emerald-400 font-semibold ml-2 shrink-0">STATE: ENFORCING</span>
        </div>
      </div>
    </div>
  );
};
