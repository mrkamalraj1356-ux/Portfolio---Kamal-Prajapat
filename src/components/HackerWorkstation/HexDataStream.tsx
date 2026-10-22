import React, { useState, useEffect } from "react";

const HEX_CHARS = "0123456789ABCDEF";

function generateHexLine(offset: number): string {
  const hexOffset = "0x" + offset.toString(16).padStart(6, "0").toUpperCase();
  let bytes = "";
  for (let i = 0; i < 8; i++) {
    const b1 = HEX_CHARS[Math.floor(Math.random() * 16)];
    const b2 = HEX_CHARS[Math.floor(Math.random() * 16)];
    bytes += `${b1}${b2} `;
  }
  return `${hexOffset}: ${bytes.trim()}`;
}

export const HexDataStream: React.FC = () => {
  const [lines, setLines] = useState<string[]>([
    "0x004120: 45 00 00 3C 1A 4F 40 00",
    "0x004128: 40 06 B1 E6 C0 A8 01 26",
    "0x004130: C0 A8 01 01 00 50 1F 90",
    "0x004138: 9C 2A 4B 11 00 00 00 00",
    "0x004140: 80 02 FA F0 E2 B4 00 00"
  ]);

  useEffect(() => {
    let offset = 0x4148;
    const interval = setInterval(() => {
      setLines((prev) => {
        const next = [...prev.slice(-6), generateHexLine(offset)];
        offset += 8;
        return next;
      });
    }, 450);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full bg-[#030713] p-1.5 font-mono text-[8.5px] leading-tight text-cyan-300/80 select-none overflow-hidden flex flex-col justify-between">
      <div className="text-[8px] text-white/40 border-b border-cyan-500/15 pb-0.5 mb-1 flex justify-between font-bold">
        <span>RAW PACKET BUFFER</span>
        <span className="text-emerald-400">INGRESS</span>
      </div>
      <div className="space-y-0.5">
        {lines.map((l, i) => (
          <div key={i} className="truncate">
            <span className="text-white/30">{l.slice(0, 9)}</span>
            <span className={i === lines.length - 1 ? "text-cyan-400 font-bold" : "text-cyan-300/70"}>
              {l.slice(9)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
