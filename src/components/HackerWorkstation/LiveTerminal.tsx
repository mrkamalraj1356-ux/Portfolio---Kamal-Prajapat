import React, { useState, useEffect, useRef } from "react";

interface Workflow {
  cmd: string;
  outputs: { text: string; color?: string }[];
}

const WORKFLOWS: Workflow[] = [
  {
    cmd: "nmap -sV -T4 target.local",
    outputs: [
      { text: "Starting Nmap 7.94 ( https://nmap.org ) at 2026-10-21 10:48", color: "text-white/60" },
      { text: "Nmap scan report for target.local (192.168.1.38)", color: "text-cyan-300" },
      { text: "Host is up (0.00042s latency).", color: "text-white/60" },
      { text: "PORT     STATE SERVICE     VERSION", color: "text-emerald-400 font-bold" },
      { text: "22/tcp   open  ssh         OpenSSH 8.9p1 Ubuntu", color: "text-emerald-300" },
      { text: "80/tcp   open  http        Apache httpd 2.4.52", color: "text-emerald-300" },
      { text: "443/tcp  open  ssl/http    nginx/1.18.0", color: "text-emerald-300" },
      { text: "3306/tcp open  mysql       MySQL 8.0.35", color: "text-emerald-300" },
      { text: "8080/tcp open  http-proxy  Node.js Express", color: "text-emerald-300" },
      { text: "Nmap done: 1 IP address (1 host up) scanned in 2.14s", color: "text-cyan-400 font-semibold" }
    ]
  },
  {
    cmd: "gobuster dir -u http://192.168.1.38 -w common.txt -q",
    outputs: [
      { text: "===============================================", color: "text-white/40" },
      { text: "Gobuster v3.5 - Directory & File Brute Forcing", color: "text-cyan-300" },
      { text: "===============================================", color: "text-white/40" },
      { text: "[+] /api                 (Status: 200) [Size: 1042]", color: "text-emerald-400" },
      { text: "[+] /admin               (Status: 403) [Size: 284]", color: "text-amber-400" },
      { text: "[+] /auth                (Status: 200) [Size: 856]", color: "text-emerald-400" },
      { text: "[+] /dashboard           (Status: 301) [Size: 178]", color: "text-cyan-300" },
      { text: "[+] /robots.txt          (Status: 200) [Size: 94]", color: "text-emerald-400" },
      { text: "[+] /config.env          (Status: 403) [Size: 153]", color: "text-amber-400" },
      { text: "Progress: 4614 / 4614 (100.00%) | Finished", color: "text-white/60" }
    ]
  },
  {
    cmd: "curl -I https://secure.target.local/api/health",
    outputs: [
      { text: "HTTP/2 200 OK", color: "text-emerald-400 font-bold" },
      { text: "server: cloudflare-tunnel", color: "text-white/70" },
      { text: "strict-transport-security: max-age=31536000", color: "text-white/70" },
      { text: "x-frame-options: DENY", color: "text-cyan-300" },
      { text: "x-content-type-options: nosniff", color: "text-cyan-300" },
      { text: "x-xss-protection: 1; mode=block", color: "text-cyan-300" },
      { text: "content-type: application/json; charset=utf-8", color: "text-white/70" },
      { text: "{\"status\": \"operational\", \"uptime\": \"99.98%\"}", color: "text-emerald-300" }
    ]
  },
  {
    cmd: "python3 -m packet_sniffer --interface eth0 --filter tcp",
    outputs: [
      { text: "[*] Initializing BPF capture filter on eth0...", color: "text-white/60" },
      { text: "[+] Interface promiscuous mode enabled", color: "text-emerald-400" },
      { text: "[>] Frame #401: 192.168.1.15:54210 -> 192.168.1.38:443 [SYN]", color: "text-cyan-300" },
      { text: "[>] Frame #402: 192.168.1.38:443 -> 192.168.1.15:54210 [SYN, ACK]", color: "text-cyan-300" },
      { text: "[*] TLSv1.3 Handshake Client Hello verified (TLS_AES_256_GCM)", color: "text-purple-300" },
      { text: "[OK] Zero anomalies detected in stream payload", color: "text-emerald-400" }
    ]
  }
];

export const LiveTerminal: React.FC = () => {
  const [history, setHistory] = useState<{ id: number; type: "cmd" | "out"; text: string; color?: string }[]>([]);
  const [currentTyped, setCurrentTyped] = useState<string>("");
  const terminalEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let isMounted = true;
    let workflowIdx = 0;
    let nextId = 0;

    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    const runEngine = async () => {
      // Seed with initial prompt
      await sleep(400);

      while (isMounted) {
        const wf = WORKFLOWS[workflowIdx % WORKFLOWS.length];

        // 1. Type command character by character
        setCurrentTyped("");
        for (let i = 0; i <= wf.cmd.length; i++) {
          if (!isMounted) return;
          setCurrentTyped(wf.cmd.slice(0, i));
          // Natural typing jitter
          await sleep(28 + Math.random() * 32);
        }

        // 2. Pause on completed command line (hit Enter)
        await sleep(350);
        if (!isMounted) return;

        // Commit command to history
        setHistory((prev) => {
          const updated = [...prev, { id: nextId++, type: "cmd" as const, text: wf.cmd }];
          // Keep history limited to prevent infinite memory growth
          return updated.slice(-24);
        });
        setCurrentTyped("");

        // 3. Render outputs line by line
        for (const out of wf.outputs) {
          if (!isMounted) return;
          await sleep(100 + Math.random() * 120);
          setHistory((prev) => {
            const updated = [...prev, { id: nextId++, type: "out" as const, text: out.text, color: out.color }];
            return updated.slice(-24);
          });
        }

        // 4. Pause before next command
        await sleep(2400);
        workflowIdx++;

        // Clear terminal after every 2 workflows to keep it fresh & clean like a real hacker session
        if (workflowIdx % 2 === 0) {
          await sleep(600);
          if (!isMounted) return;
          setHistory([]);
        }
      }
    };

    runEngine();

    return () => {
      isMounted = false;
    };
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, currentTyped]);

  return (
    <div className="w-full h-full bg-[#050914]/95 flex flex-col font-mono text-[10px] leading-tight select-none overflow-hidden">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-2.5 py-1 bg-[#0a1122] border-b border-cyan-500/20 text-white/70 text-[10px]">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-500/80" />
          <div className="w-2 h-2 rounded-full bg-amber-500/80" />
          <div className="w-2 h-2 rounded-full bg-emerald-500/80" />
          <span className="ml-2 font-semibold text-cyan-300">kali@lab: ~/recon</span>
        </div>
        <span className="text-[9px] text-white/30">bash 5.2</span>
      </div>

      {/* Terminal Body */}
      <div className="flex-1 p-2.5 overflow-y-auto space-y-1 scrollbar-none">
        {history.map((item) => (
          <div key={item.id} className="break-words">
            {item.type === "cmd" ? (
              <div className="flex items-start gap-1">
                <span className="text-cyan-400 font-bold shrink-0">kali@lab:</span>
                <span className="text-blue-400 font-semibold shrink-0">~</span>
                <span className="text-white/60 shrink-0">$</span>
                <span className="text-white font-medium ml-1">{item.text}</span>
              </div>
            ) : (
              <div className={item.color || "text-white/80"}>{item.text}</div>
            )}
          </div>
        ))}

        {/* Active typing prompt line */}
        <div className="flex items-center gap-1">
          <span className="text-cyan-400 font-bold shrink-0">kali@lab:</span>
          <span className="text-blue-400 font-semibold shrink-0">~</span>
          <span className="text-white/60 shrink-0">$</span>
          <span className="text-white font-medium ml-1">{currentTyped}</span>
          <span className="w-1.5 h-3.5 bg-cyan-400 inline-block animate-pulse align-middle ml-0.5" />
        </div>

        <div ref={terminalEndRef} />
      </div>
    </div>
  );
};
