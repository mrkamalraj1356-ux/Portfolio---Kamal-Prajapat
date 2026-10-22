import React, { useState, useEffect } from "react";
import { WorldThreatMap } from "./WorldThreatMap";
import { NetworkOscilloscope } from "./NetworkOscilloscope";

export const CenterMonitorScreen: React.FC = () => {
  const [packets, setPackets] = useState(4182910);

  useEffect(() => {
    const timer = setInterval(() => {
      setPackets((prev) => prev + Math.floor(Math.random() * 24 + 10));
    }, 400);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-full bg-[#030612]/95 flex flex-col justify-between font-mono select-none overflow-hidden">
      {/* Screen Header Bar: Matches Reference "NETWORK TRAFFIC" */}
      <div className="flex items-center justify-between px-2.5 py-1 bg-[#060a18] border-b border-cyan-500/20 text-[9px] text-cyan-400">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-bold tracking-widest text-white">NETWORK TRAFFIC</span>
        </div>
        <div className="flex items-center gap-3 text-[8.5px] text-white/50">
          <span>PACKETS: <span className="text-cyan-300 font-semibold">{packets.toLocaleString()}</span></span>
          <span className="text-emerald-400 font-bold">LOSS: 0.00%</span>
        </div>
      </div>

      {/* Main Upper Area: Animated Global Cyber Threat Map */}
      <div className="flex-1 w-full relative min-h-[120px] overflow-hidden">
        <WorldThreatMap />
      </div>

      {/* Bottom Area: Threat Gauge & Real-time Throughput Waveform */}
      <div className="h-[30%] w-full grid grid-cols-12 border-t border-cyan-500/20 divide-x divide-cyan-500/15 bg-black/70">
        {/* Left Status: THREAT LEVEL LOW */}
        <div className="col-span-5 p-1.5 flex flex-col justify-between text-[8px]">
          <div className="text-white/40 flex justify-between font-semibold">
            <span>DEFENSE POSTURE</span>
            <span className="text-emerald-400">ACTIVE</span>
          </div>
          <div className="flex items-center gap-1.5 my-auto">
            <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.5)]">
              <span className="text-[7px]">✓</span>
            </div>
            <div>
              <div className="text-white font-bold text-[8.5px] tracking-wide">THREAT LEVEL</div>
              <div className="text-emerald-400 font-black text-[9px]">LOW [NOMINAL]</div>
            </div>
          </div>
          <div className="text-[7.5px] text-white/30 truncate">
            ENCRYPTION: AES-256-GCM
          </div>
        </div>

        {/* Right Status: Throughput Oscilloscope */}
        <div className="col-span-7 h-full overflow-hidden">
          <NetworkOscilloscope />
        </div>
      </div>
    </div>
  );
};
