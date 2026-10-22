import React from "react";

export const DeskPeripherals: React.FC = () => {
  return (
    <div className="relative w-full h-full pointer-events-none select-none">
      {/* Desk Surface Gradient & Reflection Layer */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#020307] via-[#050913] to-transparent">
        {/* Mirror Reflection of cyan & blue monitor glow */}
        <div className="absolute top-0 left-1/4 right-1/4 h-24 bg-gradient-to-b from-cyan-500/15 via-blue-600/5 to-transparent blur-2xl transform -scale-y-100 opacity-60" />
        <div className="absolute top-0 right-10 w-96 h-28 bg-gradient-to-b from-cyan-400/20 via-red-500/10 to-transparent blur-3xl transform -scale-y-100 opacity-50" />
      </div>

      {/* Peripherals Container positioned on desk */}
      <div className="relative w-full h-full flex items-end justify-center pb-2 px-4 sm:px-8">
        <div className="w-full max-w-5xl flex items-end justify-between gap-4 sm:gap-6">

          {/* Left area: Audio Headset resting on desk */}
          <div className="hidden xl:flex flex-col items-center opacity-80 translate-y-3">
            <div className="relative w-14 h-14 rounded-full border-2 border-zinc-800 bg-[#070912] flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.9)]">
              {/* Headband arch */}
              <div className="absolute -top-3 w-10 h-5 border-t-2 border-zinc-700 rounded-t-full" />
              {/* Earcup Red LED Ring */}
              <div className="w-9 h-9 rounded-full border border-red-500/70 bg-red-950/30 flex items-center justify-center shadow-[0_0_10px_rgba(239,68,68,0.5)]">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              </div>
            </div>
            <span className="text-[7.5px] font-mono text-zinc-500 mt-1 tracking-widest">AUDIO LINK</span>
          </div>

          {/* Center: EXTENDED DESK MAT WITH GLOWING RED NEON PERIMETER */}
          <div className="relative p-2.5 rounded-xl bg-[#070912] border-2 border-red-500/90 shadow-[0_0_35px_rgba(239,68,68,0.5),inset_0_0_20px_rgba(239,68,68,0.15)] flex items-end gap-5 mx-auto">
            {/* Pulsing neon red border line */}
            <div className="absolute -inset-[1px] rounded-xl border border-red-400 animate-pulse pointer-events-none" />

            {/* 1. Mechanical Keyboard on Mat */}
            <div className="relative p-2 rounded-md bg-[#0b0e1b] border border-cyan-500/30 shadow-[0_0_25px_rgba(0,240,255,0.2)]">
              {/* Ambient Underglow */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/25 via-blue-500/20 to-purple-500/25 rounded-md blur-xs -z-10" />

              {/* Function Row */}
              <div className="flex gap-1 mb-1">
                {Array.from({ length: 14 }).map((_, i) => (
                  <div
                    key={`fn-${i}`}
                    className="w-3.5 h-2 rounded-[2px] bg-[#12182b] border border-cyan-500/25"
                    style={{
                      boxShadow: i % 2 === 0 ? "0 0 5px rgba(0, 240, 255, 0.4)" : undefined
                    }}
                  />
                ))}
              </div>

              {/* Key Matrix */}
              <div className="space-y-1">
                <div className="flex gap-1">
                  {Array.from({ length: 14 }).map((_, i) => (
                    <div
                      key={`r1-${i}`}
                      className="w-3.5 h-3 rounded-[2px] bg-[#141b31] border border-white/5"
                    />
                  ))}
                </div>

                <div className="flex gap-1">
                  <div className="w-5 h-3 rounded-[2px] bg-[#101526] border border-white/5" />
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div
                      key={`r2-${i}`}
                      className="w-3.5 h-3 rounded-[2px] bg-[#141c33] border border-cyan-500/20"
                    />
                  ))}
                  <div className="w-5 h-3 rounded-[2px] bg-[#101526] border border-white/5" />
                </div>

                <div className="flex gap-1">
                  <div className="w-6 h-3 rounded-[2px] bg-[#101526] border border-white/5" />
                  {Array.from({ length: 11 }).map((_, i) => (
                    <div
                      key={`r3-${i}`}
                      className="w-3.5 h-3 rounded-[2px] bg-[#141c33] border border-white/5"
                    />
                  ))}
                  <div className="w-7 h-3 rounded-[2px] bg-[#101526] border border-white/5" />
                </div>

                <div className="flex gap-1 items-center">
                  <div className="w-7 h-3 rounded-[2px] bg-[#101526] border border-white/5" />
                  <div className="w-3.5 h-3 rounded-[2px] bg-[#141c33] border border-white/5" />
                  <div className="w-3.5 h-3 rounded-[2px] bg-[#141c33] border border-white/5" />
                  {/* Spacebar with Cyan RGB Pulse */}
                  <div className="w-28 h-3 rounded-[2px] bg-[#18233f] border border-cyan-400/50 shadow-[0_0_10px_rgba(0,240,255,0.5)]" />
                  <div className="w-3.5 h-3 rounded-[2px] bg-[#141c33] border border-white/5" />
                  <div className="w-3.5 h-3 rounded-[2px] bg-[#141c33] border border-white/5" />
                  <div className="w-8 h-3 rounded-[2px] bg-[#101526] border border-white/5" />
                </div>
              </div>
            </div>

            {/* 2. Precision Gaming Mouse on Mat */}
            <div className="relative w-10 h-16 rounded-t-2xl rounded-b-xl bg-[#141724] border border-zinc-700 shadow-[0_4px_16px_rgba(0,0,0,0.9)] flex flex-col items-center justify-between p-1 my-1">
              {/* Cyan Illuminated Scroll Wheel */}
              <div className="w-1.5 h-3.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,240,255,0.9)] mt-0.5" />
              {/* Mouse RGB Accent */}
              <div className="w-3.5 h-2.5 rounded-full border border-red-500/70 bg-red-500/30 shadow-[0_0_8px_rgba(239,68,68,0.5)] mb-1" />
            </div>

          </div>

          {/* Right Area: Hacker Coffee Mug: "Hack Learn Build Repeat" */}
          <div className="relative flex flex-col items-center translate-y-1">
            {/* Rising steam effect */}
            <div className="absolute -top-6 flex gap-1 pointer-events-none opacity-40">
              <span className="w-1 h-5 bg-gradient-to-t from-white/40 to-transparent rounded-full animate-[pulse_2s_infinite]" />
              <span className="w-1 h-7 bg-gradient-to-t from-white/30 to-transparent rounded-full animate-[pulse_2.5s_infinite] delay-100" />
            </div>

            {/* Ceramic Mug Body */}
            <div className="relative w-12 h-14 rounded-b-lg rounded-t-sm bg-gradient-to-r from-zinc-900 via-black to-zinc-900 border border-zinc-800 shadow-[0_4px_20px_rgba(0,0,0,0.95)] flex items-center justify-center p-1">
              {/* Mug Handle */}
              <div className="absolute -right-3 top-2 w-3.5 h-8 rounded-r-lg border-2 border-zinc-700 bg-transparent" />

              {/* Typography Stencil */}
              <div className="text-[7px] font-sans font-bold leading-tight text-white/95 text-center tracking-tight">
                <div>Hack</div>
                <div>Learn</div>
                <div>Build</div>
                <div className="text-cyan-400 font-extrabold">Repeat</div>
              </div>
            </div>
          </div>

          {/* Far Right: Sleek Laptop / Test Rig on desk */}
          <div className="hidden lg:flex flex-col items-end opacity-90 translate-y-2">
            <div className="relative w-36 h-20 rounded-md bg-[#0a0d17] border border-cyan-500/30 shadow-[0_0_25px_rgba(0,240,255,0.18)] p-1.5 flex flex-col justify-between">
              <div className="w-full h-10 rounded bg-[#060914] border border-cyan-500/20 p-1 flex items-center justify-between font-mono text-[7px] text-cyan-300">
                <span>LAB-RIG-02</span>
                <span className="text-emerald-400 font-bold">UP</span>
              </div>
              <div className="flex justify-between items-center text-[7px] font-mono text-white/50">
                <span>NODE #04</span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              </div>
            </div>
            <span className="text-[7.5px] font-mono text-zinc-500 mt-1 tracking-widest">OFFENSIVE NODE</span>
          </div>

        </div>
      </div>
    </div>
  );
};
