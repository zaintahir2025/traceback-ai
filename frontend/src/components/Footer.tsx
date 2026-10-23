import React from "react";
import { Cpu, Database, Bot, Terminal, ShieldCheck } from "lucide-react";
import { SystemHealth } from "../types";

interface FooterProps {
  systemHealth: SystemHealth | null;
}

export const Footer: React.FC<FooterProps> = ({ systemHealth }) => {
  const nvidia = systemHealth?.sponsorIntegrations.nvidia;
  const zetaris = systemHealth?.sponsorIntegrations.zetaris;
  const meterless = systemHealth?.sponsorIntegrations.meterless;

  return (
    <footer className="border-t border-slate-800 bg-slate-900/60 py-4 px-6 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Hackathon Branding & Build Window */}
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-indigo-400" />
          <span className="font-semibold text-slate-300">TraceBack AI</span>
          <span>•</span>
          <span>Supplier Invoice Reconciliation</span>
          <span>•</span>
          <span className="font-mono text-slate-400 text-[11px]">
            Hackathon Build Window: Oct 22–27, 2026
          </span>
        </div>

        {/* Right: Mandatory Sponsor Tech Badges */}
        <div className="flex flex-wrap items-center gap-2">
          {/* NVIDIA Badge */}
          <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 font-mono text-[11px]">
            <Cpu className="w-3.5 h-3.5 text-purple-400" />
            <span>NVIDIA NIM: {nvidia?.model || "meta/llama-3.1-8b-instruct"}</span>
          </div>

          {/* Zetaris Badge */}
          <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-mono text-[11px]">
            <Database className="w-3.5 h-3.5 text-cyan-400" />
            <span>Zetaris: {zetaris?.mode === "live" ? "Live Cloud" : "Cross-Source Mock"}</span>
          </div>

          {/* Meterless Badge */}
          <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-mono text-[11px]">
            <Bot className="w-3.5 h-3.5 text-emerald-400" />
            <span>Meterless: Scout → Relay → H-MEM</span>
          </div>

          {/* Cursor Badge */}
          <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 font-mono text-[11px]">
            <Terminal className="w-3.5 h-3.5 text-slate-400" />
            <span>Cursor Agent Mode</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
