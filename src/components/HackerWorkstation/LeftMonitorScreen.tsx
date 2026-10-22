import React, { useState, useEffect } from "react";

const CONNECTIONS = [
  { proto: "TCP", local: "192.168.1.38:52140", remote: "10.0.8.1:443", state: "ESTABLISHED", color: "text-emerald-400" },
  { proto: "TCP", local: "192.168.1.38:22", remote: "10.0.8.15:48922", state: "CONNECTED", color: "text-cyan-400" },
  { proto: "UDP", local: "192.168.1.38:53", remote: "8.8.8.8:53", state: "RESOLVED", color: "text-blue-400" },
  { proto: "TCP", local: "192.168.1.38:8080", remote: "0.0.0.0:*", state: "LISTENING", color: "text-emerald-400" },
  { proto: "TCP", local: "192.168.1.38:443", remote: "185.220.101.4:*", state: "BLOCKED", color: "text-red-400 font-bold" }
];

const LOG_FEEDS = [
  "[+] DPI session #1042: TLS 1.3 handshake verified",
  "[>] Ingress packet checksum valid (eth0)",
  "[*] Wireguard tunnel wg0: 1.4 GB transferred",
  "[+] Zero-day heuristics: 0 anomalies detected",
  "[*] SSH brute-force defense: active (0 bans)"
];

export const LeftMonitorScreen: React.FC = () => {
  const [logIndex, setLogIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setLogIndex((prev) => (prev + 1) % LOG_FEEDS.length);
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-full bg-[#030611]/90 flex flex-col justify-between p-2 font-mono text-[9px] select-none overflow-hidden leading-tight">
      {/* Background Kali Dragon Watermark */}
      <div className="absolute right-2 bottom-2 w-28 h-28 opacity-10 pointer-events-none text-cyan-400">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z" />
          <path d="M4 12c2.5-3.5 5.5-5 8-5 4 0 7 3.5 8 7" />
          <path d="M12 7c-2 2-3 4.5-3 7 0 2.5 1.5 4 3 4s3-1.5 3-4c0-2.5-1-5-3-7z" />
        </svg>
      </div>

      {/* Screen Header */}
      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-1 text-[8px] text-cyan-400">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-bold tracking-widest text-white">SOCKET INGRESS</span>
        </div>
        <span className="text-white/40">INTERFACE: eth0</span>
      </div>

      {/* Active Socket Table */}
      <div className="space-y-1 my-1">
        <div className="grid grid-cols-12 text-[7.5px] text-white/40 font-bold border-b border-white/5 pb-0.5">
          <span className="col-span-2">PROTO</span>
          <span className="col-span-4">LOCAL</span>
          <span className="col-span-4">REMOTE</span>
          <span className="col-span-2 text-right">STATE</span>
        </div>
        {CONNECTIONS.map((c, i) => (
          <div key={i} className="grid grid-cols-12 text-[8px] text-white/80">
            <span className="col-span-2 text-cyan-300 font-semibold">{c.proto}</span>
            <span className="col-span-4 truncate text-white/60">{c.local}</span>
            <span className="col-span-4 truncate text-white/70">{c.remote}</span>
            <span className={`col-span-2 text-right ${c.color}`}>{c.state}</span>
          </div>
        ))}
      </div>

      {/* Live IDS Log Ticker */}
      <div className="border-t border-cyan-500/20 pt-1 text-[8px] text-cyan-300/80 flex items-center justify-between">
        <span className="truncate">{LOG_FEEDS[logIndex]}</span>
        <span className="text-emerald-400 font-bold shrink-0 ml-1">ARMED</span>
      </div>
    </div>
  );
};
