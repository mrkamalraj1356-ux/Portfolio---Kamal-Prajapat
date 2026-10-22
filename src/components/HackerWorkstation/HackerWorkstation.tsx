import React, { useEffect, useRef } from "react";
import { LeftMonitorScreen } from "./LeftMonitorScreen";
import { CenterMonitorScreen } from "./CenterMonitorScreen";
import { RightMonitorScreen } from "./RightMonitorScreen";

export const HackerWorkstation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const scrollY = window.scrollY;
      // Dims smoothly when scrolling down to maintain maximum contrast for About, Skills, and Work sections
      const opacity = Math.max(0.18, 1 - scrollY / 750);
      containerRef.current.style.opacity = opacity.toString();
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[-1] pointer-events-none select-none overflow-hidden bg-[#020205] transition-opacity duration-300 ease-out"
    >
      {/* 
        16:9 Aspect-Ratio Locked Container:
        Keeps the physical triple-monitor battlestation and all integrated screen displays
        100% pixel-aligned across every display aspect ratio (ultrawide, 16:9, laptop, tablet, mobile).
      */}
      <div
        className="absolute top-[53%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.78vh] overflow-hidden"
      >
        {/* Base Layer: High-End Realistic Triple-Monitor Hacker Battlestation */}
        <img
          src="/triple_monitor_workstation_base.jpg"
          alt="Triple-Monitor Hacker Workstation"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* Ambient Neon Bloom in Room */}
        <div className="absolute top-[8%] right-[25%] w-[40%] h-[35%] bg-cyan-500/10 rounded-full blur-[90px] pointer-events-none animate-[pulse_4s_ease-in-out_infinite]" />
        <div className="absolute bottom-[28%] right-[30%] w-[35%] h-[15%] bg-red-600/15 rounded-full blur-[60px] pointer-events-none" />

        {/* ========================================================================= */}
        {/* PHYSICAL MONITOR 1 (LEFT): Active Sockets, Kali Watermark & IDS Buffer     */}
        {/* Rendered directly inside the physical monitor screen bezel                */}
        {/* ========================================================================= */}
        <div
          className="absolute overflow-hidden shadow-[inset_0_0_12px_rgba(0,0,0,0.9)] rounded-[2px]"
          style={{
            left: "31.8%",
            top: "25.2%",
            width: "17.4%",
            height: "33.6%"
          }}
        >
          <LeftMonitorScreen />
          {/* Authentic Glass Glare */}
          <div
            className="absolute inset-0 pointer-events-none opacity-15 mix-blend-overlay"
            style={{
              backgroundImage: "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 60%)"
            }}
          />
        </div>

        {/* ========================================================================= */}
        {/* PHYSICAL MONITOR 2 (CENTER): Global Threat Map, Network Traffic & Waveform */}
        {/* Rendered directly inside the physical monitor screen bezel                */}
        {/* ========================================================================= */}
        <div
          className="absolute overflow-hidden shadow-[inset_0_0_15px_rgba(0,0,0,0.9)] rounded-[2px]"
          style={{
            left: "49.7%",
            top: "22.6%",
            width: "22.5%",
            height: "38.1%"
          }}
        >
          <CenterMonitorScreen />
          {/* Authentic Glass Glare & Scanlines */}
          <div
            className="absolute inset-0 pointer-events-none opacity-10 mix-blend-overlay"
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, #000, #000 1px, transparent 1px, transparent 3px)"
            }}
          />
        </div>

        {/* ========================================================================= */}
        {/* PHYSICAL MONITOR 3 (RIGHT): 4-Quadrant Tactical Cybersecurity Dashboard    */}
        {/* Port Scan + System Telemetry + Bash Shell + Python Exploit Script         */}
        {/* Rendered directly inside the physical monitor screen bezel                */}
        {/* ========================================================================= */}
        <div
          className="absolute overflow-hidden shadow-[inset_0_0_15px_rgba(0,0,0,0.9)] rounded-[2px]"
          style={{
            left: "72.8%",
            top: "14.8%",
            width: "26.2%",
            height: "49.5%"
          }}
        >
          <RightMonitorScreen />
          {/* Authentic Glass Glare */}
          <div
            className="absolute inset-0 pointer-events-none opacity-12 mix-blend-overlay"
            style={{
              backgroundImage: "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 65%)"
            }}
          />
        </div>

      </div>

      {/* 
        Hero Text Contrast Gradient (Left Half):
        Guarantees that "KAMAL PRAJAPAT", subtitle, buttons, and social links have
        crystal-clear readability while leaving the central and right monitors glowing brilliantly!
      */}
      <div className="absolute inset-y-0 left-0 w-full sm:w-[58vw] lg:w-[46vw] bg-gradient-to-r from-[#020205] via-[#020205]/75 to-transparent pointer-events-none z-10" />

      {/* Subtle CRT Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025] mix-blend-overlay"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, #000, #000 1px, transparent 1px, transparent 2px)",
          backgroundSize: "100% 2px"
        }}
      />
    </div>
  );
};

export default HackerWorkstation;
