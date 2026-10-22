import React, { useState, useEffect } from "react";

const MODULES = [
  { name: "information gathering", tools: "nmap, recon-ng, whois" },
  { name: "vulnerability analysis", tools: "nikto, sqlmap, openvas" },
  { name: "exploitation tools", tools: "metasploit, beef, exploitdb" },
  { name: "post exploitation", tools: "mimikatz, empire, linenum" },
  { name: "reporting & analysis", tools: "cherrytree, autopsy, maltego" }
];

export const KaliHeader: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % MODULES.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-full bg-[#030612]/95 border-b border-cyan-500/20 p-2.5 flex flex-col justify-between font-mono select-none overflow-hidden">
      {/* Top Bar with Kali Dragon Logo */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Stylized Kali Dragon SVG */}
          <div className="w-8 h-8 rounded bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_12px_rgba(0,240,255,0.25)]">
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z" />
              <path d="M4 12c2.5-3.5 5.5-5 8-5 4 0 7 3.5 8 7" />
              <path d="M12 7c-2 2-3 4.5-3 7 0 2.5 1.5 4 3 4s3-1.5 3-4c0-2.5-1-5-3-7z" />
            </svg>
          </div>

          <div>
            <div className="text-xs font-black tracking-widest text-white flex items-center gap-2">
              <span className="text-cyan-400">KALI</span> LINUX
              <span className="text-[9px] px-1 py-0.2 rounded bg-cyan-500/20 text-cyan-300 font-normal">ROBUST</span>
            </div>
            <div className="text-[9px] text-white/50 tracking-wide">OFFENSIVE SECURITY LAB</div>
          </div>
        </div>

        <div className="text-right text-[9px] text-white/40">
          <div>KERNEL: <span className="text-cyan-300">6.6.9-kali1</span></div>
          <div>STATUS: <span className="text-emerald-400">READY</span></div>
        </div>
      </div>

      {/* Cyber Phase List */}
      <div className="grid grid-cols-1 gap-0.5 my-1">
        {MODULES.map((mod, idx) => {
          const isActive = idx === activeIdx;
          return (
            <div
              key={mod.name}
              className={`flex items-center justify-between px-2 py-0.5 rounded text-[10px] transition-all duration-300 ${
                isActive
                  ? "bg-cyan-500/20 border-l-2 border-cyan-400 text-cyan-300 shadow-[0_0_8px_rgba(0,240,255,0.15)]"
                  : "text-white/40 hover:text-white/60"
              }`}
            >
              <div className="flex items-center gap-1.5 capitalize">
                <span className={`text-[8px] ${isActive ? "text-cyan-400 animate-pulse font-bold" : "text-white/20"}`}>
                  {isActive ? "▶" : "•"}
                </span>
                <span className={isActive ? "font-bold tracking-wide" : "font-normal"}>{mod.name}</span>
              </div>
              <span className="text-[8px] text-white/30 truncate max-w-[120px] font-mono">
                {isActive ? mod.tools : ""}
              </span>
            </div>
          );
        })}
      </div>

      {/* Bottom Live Scan Indicator Bar */}
      <div className="flex items-center gap-2 text-[8px] text-cyan-400/80 pt-1 border-t border-cyan-500/10">
        <span className="uppercase tracking-widest font-semibold">RECON ENGINE:</span>
        <div className="flex-1 h-1 bg-black/60 rounded overflow-hidden">
          <div className="h-full bg-cyan-400 animate-[pulse_1.5s_infinite] w-3/4 rounded" />
        </div>
        <span className="text-emerald-400 font-mono">98.4%</span>
      </div>
    </div>
  );
};
