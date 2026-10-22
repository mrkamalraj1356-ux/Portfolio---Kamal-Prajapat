import React, { useState, useEffect, useRef } from "react";

// Quadrant 1: Nmap Port Recon Terminal
const NmapTerminal: React.FC = () => {
  const [typed, setTyped] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const fullCmd = "nmap -sV 192.168.1.0/24";
  const results = [
    "Starting Nmap 7.94 ( https://nmap.org )",
    "Nmap scan report for target.local (192.168.1.38)",
    "Host is up (0.00038s latency).",
    "PORT     STATE SERVICE  VERSION",
    "22/tcp   open  ssh      OpenSSH 8.9p1",
    "80/tcp   open  http     Apache 2.4.52",
    "443/tcp  open  ssl/http nginx 1.18.0",
    "Service Info: OS: Linux",
    "Nmap done: 256 IP addresses (1 host up) in 1.94s"
  ];

  useEffect(() => {
    let mounted = true;
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    const loop = async () => {
      while (mounted) {
        setHistory([]);
        setTyped("");

        // Type command
        for (let i = 0; i <= fullCmd.length; i++) {
          if (!mounted) return;
          setTyped(fullCmd.slice(0, i));
          await sleep(35 + Math.random() * 25);
        }

        await sleep(350);
        if (!mounted) return;
        setHistory([`kali@kali:~$ ${fullCmd}`]);
        setTyped("");

        // Show outputs
        for (const line of results) {
          if (!mounted) return;
          await sleep(100 + Math.random() * 80);
          setHistory((prev) => [...prev, line]);
        }

        await sleep(3500);
      }
    };

    loop();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, typed]);

  return (
    <div className="w-full h-full bg-[#030713]/95 p-1.5 font-mono text-[8.5px] leading-tight text-emerald-400 select-none overflow-hidden flex flex-col">
      <div className="text-[7.5px] text-white/40 border-b border-cyan-500/20 pb-0.5 mb-1 flex justify-between font-bold">
        <span>terminal: port-scan</span>
        <span className="text-emerald-400">ACTIVE</span>
      </div>
      <div className="flex-1 overflow-y-auto space-y-0.5 scrollbar-none">
        {history.map((h, i) => (
          <div key={i} className={h.startsWith("22") || h.startsWith("80") || h.startsWith("443") ? "text-emerald-300 font-bold" : "text-emerald-400/80"}>
            {h}
          </div>
        ))}
        {typed && (
          <div className="text-white">
            <span className="text-cyan-400 font-bold">kali@kali:~$ </span>
            <span>{typed}</span>
            <span className="w-1.5 h-3 bg-emerald-400 inline-block animate-pulse align-middle ml-0.5" />
          </div>
        )}
        <div ref={scrollRef} />
      </div>
    </div>
  );
};

// Quadrant 2: System Resources & Process Table
const ResourceMonitor: React.FC = () => {
  const [cpu, setCpu] = useState(12);
  const [mem, setMem] = useState(48);

  useEffect(() => {
    const timer = setInterval(() => {
      setCpu(10 + Math.floor(Math.random() * 8));
      setMem(46 + Math.floor(Math.random() * 5));
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-full bg-[#030612]/95 p-1.5 font-mono text-[8px] leading-tight text-white/80 select-none overflow-hidden flex flex-col justify-between">
      <div className="text-[7.5px] text-white/40 border-b border-cyan-500/20 pb-0.5 mb-1 flex justify-between font-bold">
        <span>HTOP TELEMETRY</span>
        <span className="text-cyan-300">TASKS: 114</span>
      </div>

      {/* Resource Bars */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-cyan-300 font-bold w-7">CPU</span>
          <div className="flex-1 h-1.5 bg-black/60 rounded overflow-hidden mx-1 border border-white/5">
            <div className="h-full bg-cyan-400 rounded transition-all duration-500" style={{ width: `${cpu}%` }} />
          </div>
          <span className="w-6 text-right text-emerald-400 font-bold">{cpu}%</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-blue-300 font-bold w-7">MEM</span>
          <div className="flex-1 h-1.5 bg-black/60 rounded overflow-hidden mx-1 border border-white/5">
            <div className="h-full bg-blue-400 rounded transition-all duration-500" style={{ width: `${mem}%` }} />
          </div>
          <span className="w-6 text-right text-cyan-300 font-bold">{mem}%</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-purple-300 font-bold w-7">SWAP</span>
          <div className="flex-1 h-1.5 bg-black/60 rounded overflow-hidden mx-1 border border-white/5">
            <div className="h-full bg-purple-400 rounded" style={{ width: "2%" }} />
          </div>
          <span className="w-6 text-right text-white/40">0%</span>
        </div>
      </div>

      {/* Process Table */}
      <div className="mt-1 border-t border-white/5 pt-1 space-y-0.5 text-[7.5px]">
        <div className="grid grid-cols-12 text-white/40 font-bold">
          <span className="col-span-3">PID</span>
          <span className="col-span-3">USER</span>
          <span className="col-span-2">CPU%</span>
          <span className="col-span-4 text-right">COMMAND</span>
        </div>
        <div className="grid grid-cols-12 text-cyan-300">
          <span className="col-span-3">1337</span>
          <span className="col-span-3">kali</span>
          <span className="col-span-2">{cpu}.2</span>
          <span className="col-span-4 text-right truncate">nmap</span>
        </div>
        <div className="grid grid-cols-12 text-white/70">
          <span className="col-span-3">2211</span>
          <span className="col-span-3">kali</span>
          <span className="col-span-2">5.2</span>
          <span className="col-span-4 text-right truncate">apache2</span>
        </div>
        <div className="grid grid-cols-12 text-white/70">
          <span className="col-span-3">3087</span>
          <span className="col-span-3">kali</span>
          <span className="col-span-2">3.1</span>
          <span className="col-span-4 text-right truncate">python3</span>
        </div>
      </div>
    </div>
  );
};

// Quadrant 3: Interactive Linux Shell
const ShellTerminal: React.FC = () => {
  const [typed, setTyped] = useState("");
  const [step, setStep] = useState(0);

  useEffect(() => {
    let mounted = true;
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    const commands = ["ls", "whoami", "uname -r", "clear"];

    const loop = async () => {
      let idx = 0;
      while (mounted) {
        const cmd = commands[idx % commands.length];
        setTyped("");

        for (let i = 0; i <= cmd.length; i++) {
          if (!mounted) return;
          setTyped(cmd.slice(0, i));
          await sleep(40 + Math.random() * 30);
        }

        await sleep(400);
        if (!mounted) return;
        setStep(idx);
        idx++;
        setTyped("");
        await sleep(2500);
      }
    };

    loop();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="w-full h-full bg-[#030612]/95 p-1.5 font-mono text-[8.5px] leading-tight select-none overflow-hidden flex flex-col justify-between">
      <div className="text-[7.5px] text-white/40 border-b border-cyan-500/20 pb-0.5 mb-1 flex justify-between font-bold">
        <span>bash: tty3</span>
        <span className="text-cyan-300">ACTIVE</span>
      </div>

      <div className="space-y-1 text-white/80">
        <div>
          <span className="text-cyan-400 font-bold">kali@kali:~$ </span>
          <span className="text-white">ls</span>
          <div className="grid grid-cols-3 gap-1 text-cyan-300 mt-0.5 text-[8px] font-semibold">
            <span>Desktop</span>
            <span>Documents</span>
            <span>Downloads</span>
            <span>Music</span>
            <span>Templates</span>
            <span>Videos</span>
          </div>
        </div>

        {step % 3 >= 1 && (
          <div>
            <span className="text-cyan-400 font-bold">kali@kali:~$ </span>
            <span className="text-white">whoami</span>
            <div className="text-emerald-400 font-bold">kali [uid: 1000]</div>
          </div>
        )}

        <div className="flex items-center">
          <span className="text-cyan-400 font-bold">kali@kali:~$ </span>
          <span className="text-white ml-1">{typed}</span>
          <span className="w-1.5 h-3 bg-cyan-400 inline-block animate-pulse align-middle ml-0.5" />
        </div>
      </div>

      <div className="text-[7px] text-white/30 pt-0.5 border-t border-white/5">
        SESSION: /dev/pts/1 | UTF-8
      </div>
    </div>
  );
};

// Quadrant 4: Python Socket Exploit Script
const PythonEditor: React.FC = () => {
  return (
    <div className="w-full h-full bg-[#02050e]/95 p-1.5 font-mono text-[8px] leading-tight select-none overflow-hidden flex flex-col justify-between">
      <div className="text-[7.5px] text-white/40 border-b border-cyan-500/20 pb-0.5 mb-1 flex justify-between font-bold">
        <span>python: exploit.py</span>
        <span className="text-purple-400">PYTHON 3.11</span>
      </div>

      <div className="space-y-0.5 font-mono text-[7.8px]">
        <div><span className="text-white/30 mr-1.5">1</span><span className="text-purple-400 font-bold">import</span> <span className="text-white">socket</span></div>
        <div><span className="text-white/30 mr-1.5">2</span><span className="text-white">s = socket.socket()</span></div>
        <div><span className="text-white/30 mr-1.5">3</span><span className="text-white">s.connect((</span><span className="text-emerald-300">&quot;192.168.1.1&quot;</span><span className="text-white">, </span><span className="text-amber-300">80</span><span className="text-white">))</span></div>
        <div><span className="text-white/30 mr-1.5">4</span><span className="text-cyan-400">print</span><span className="text-white">(</span><span className="text-emerald-300">&quot;Connected to gateway&quot;</span><span className="text-white">)</span></div>
        <div><span className="text-white/30 mr-1.5">5</span><span className="text-white">s.send(</span><span className="text-emerald-300">b&quot;GET / HTTP/1.1\r\n\r\n&quot;</span><span className="text-white">)</span></div>
        <div><span className="text-white/30 mr-1.5">6</span><span className="text-cyan-400">print</span><span className="text-white">(s.recv(</span><span className="text-amber-300">4096</span><span className="text-white">))</span></div>
        <div><span className="text-white/30 mr-1.5">7</span><span className="text-white">s.close()</span><span className="w-1.5 h-3 bg-cyan-400 inline-block animate-pulse align-middle ml-1" /></div>
      </div>

      <div className="text-[7px] text-white/30 pt-0.5 border-t border-white/5 flex justify-between">
        <span>UTF-8</span>
        <span className="text-emerald-400">SYNTAX: OK</span>
      </div>
    </div>
  );
};

export const RightMonitorScreen: React.FC = () => {
  return (
    <div className="relative w-full h-full grid grid-cols-2 grid-rows-2 gap-1 p-1 bg-[#02040c]/90 overflow-hidden">
      {/* Top Left Quadrant: Nmap Port Scan Terminal */}
      <div className="w-full h-full overflow-hidden border border-cyan-500/15 rounded-sm">
        <NmapTerminal />
      </div>

      {/* Top Right Quadrant: System Resources & Process Table */}
      <div className="w-full h-full overflow-hidden border border-cyan-500/15 rounded-sm">
        <ResourceMonitor />
      </div>

      {/* Bottom Left Quadrant: Interactive Linux Shell */}
      <div className="w-full h-full overflow-hidden border border-cyan-500/15 rounded-sm">
        <ShellTerminal />
      </div>

      {/* Bottom Right Quadrant: Python Script Editor */}
      <div className="w-full h-full overflow-hidden border border-cyan-500/15 rounded-sm">
        <PythonEditor />
      </div>
    </div>
  );
};
