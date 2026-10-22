import React, { useState, useEffect } from "react";

const SYSTEMS = [
  { name: "Kali Linux", status: "ONLINE", color: "text-emerald-400", dot: "bg-emerald-400" },
  { name: "Ubuntu 22.04", status: "ONLINE", color: "text-emerald-400", dot: "bg-emerald-400" },
  { name: "Windows AD", status: "LAB", color: "text-blue-400", dot: "bg-blue-400" },
  { name: "Parrot OS", status: "IDLE", color: "text-cyan-400", dot: "bg-cyan-400" },
  { name: "Termux Node", status: "READY", color: "text-emerald-400", dot: "bg-emerald-400" }
];

export const TelemetrySidebar: React.FC = () => {
  const [ping, setPing] = useState(18);
  const [rx, setRx] = useState(1420);
  const [tx, setTx] = useState(842);

  useEffect(() => {
    const timer = setInterval(() => {
      setPing(16 + Math.floor(Math.random() * 8));
      setRx((prev) => prev + Math.floor(Math.random() * 8));
      setTx((prev) => prev + Math.floor(Math.random() * 5));
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-full bg-[#040817]/95 border-l border-cyan-500/20 p-2.5 flex flex-col justify-between font-mono text-[10px] select-none overflow-hidden">
      {/* Systems Online Header */}
      <div>
        <div className="flex items-center gap-1.5 text-cyan-400 font-bold tracking-widest text-[11px] pb-1 border-b border-cyan-500/20 mb-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          SYSTEMS ONLINE
        </div>

        <div className="space-y-1.5">
          {SYSTEMS.map((sys) => (
            <div key={sys.name} className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-white/80">
                <span className={`w-1.5 h-1.5 rounded-full ${sys.dot} shadow-[0_0_6px_currentColor]`} />
                <span>{sys.name}</span>
              </div>
              <span className={`text-[9px] font-bold ${sys.color}`}>{sys.status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Network Info */}
      <div className="pt-2 border-t border-cyan-500/20 space-y-1 text-white/70">
        <div className="text-cyan-400 font-bold tracking-widest text-[11px] pb-1 border-b border-cyan-500/10 mb-1">
          NETWORK
        </div>

        <div className="flex justify-between">
          <span className="text-white/40">IP:</span>
          <span className="text-cyan-300 font-semibold">192.168.1.38</span>
        </div>
        <div className="flex justify-between">
          <span className="text-white/40">GATEWAY:</span>
          <span className="text-white/80">192.168.1.1</span>
        </div>
        <div className="flex justify-between">
          <span className="text-white/40">DNS:</span>
          <span className="text-white/80">8.8.8.8</span>
        </div>
        <div className="flex justify-between">
          <span className="text-white/40">LATENCY:</span>
          <span className="text-emerald-400 font-bold">{ping}ms</span>
        </div>
        <div className="flex justify-between">
          <span className="text-white/40">FIREWALL:</span>
          <span className="text-emerald-400 font-semibold">ACTIVE</span>
        </div>
      </div>

      {/* Live Data Ticker */}
      <div className="pt-2 border-t border-cyan-500/10 text-[9px] text-white/40 flex justify-between">
        <span>RX: <span className="text-cyan-400">{(rx / 1024).toFixed(2)} MB</span></span>
        <span>TX: <span className="text-purple-400">{(tx / 1024).toFixed(2)} MB</span></span>
      </div>
    </div>
  );
};
