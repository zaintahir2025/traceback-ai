import React from "react";
import { Cpu, Database, Bot, Terminal, ShieldCheck, Sparkles } from "lucide-react";
import { SystemHealth } from "../types";

interface FooterProps {
  systemHealth: SystemHealth | null;
  onOpenSponsorHub: (tab: "nvidia" | "zetaris" | "meterless" | "cursor") => void;
}

export const Footer: React.FC<FooterProps> = ({ systemHealth, onOpenSponsorHub }) => {
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

        {/* Right: Sponsor Tech Badges */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Meterless Nightshift Primary AI Badge */}
          <button
            onClick={() => onOpenSponsorHub("meterless")}
            className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 hover:border-emerald-500/40 text-emerald-300 font-mono text-[11px] transition shadow-sm cursor-pointer"
            title="Inspect Meterless Nightshift AI Provider & Relay/Gaia Engines"
          >
            <Bot className="w-3.5 h-3.5 text-emerald-400" />
            <span>AI Provider: Meterless Nightshift ($0.00 Token Cost)</span>
            <span className="text-[9px] bg-emerald-500/20 text-emerald-200 px-1 rounded ml-1">Inspect</span>
          </button>

          {/* Meterless Engines Badge */}
          <button
            onClick={() => onOpenSponsorHub("meterless")}
            className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/20 hover:border-teal-500/40 text-teal-300 font-mono text-[11px] transition shadow-sm cursor-pointer"
            title="Inspect Meterless Relay Engine & Gaia Context Engine"
          >
            <Cpu className="w-3.5 h-3.5 text-teal-400" />
            <span>Meterless Engines: Relay + Gaia</span>
            <span className="text-[9px] bg-teal-500/20 text-teal-200 px-1 rounded ml-1">Engine</span>
          </button>

          {/* Zetaris Badge */}
          <button
            onClick={() => onOpenSponsorHub("zetaris")}
            className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 hover:border-cyan-500/40 text-cyan-300 font-mono text-[11px] transition shadow-sm cursor-pointer"
            title="Inspect Zetaris data virtualization SQL query"
          >
            <Database className="w-3.5 h-3.5 text-cyan-400" />
            <span>Zetaris: {zetaris?.mode === "live" ? "Live Cloud" : "Cross-Source Mock"}</span>
            <span className="text-[9px] bg-cyan-500/20 text-cyan-200 px-1 rounded ml-1">Inspect</span>
          </button>

          {/* NVIDIA Badge (Optional) */}
          <button
            onClick={() => onOpenSponsorHub("nvidia")}
            className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 hover:border-purple-500/40 text-purple-300 font-mono text-[11px] transition shadow-sm cursor-pointer"
            title="Inspect NVIDIA NIM integration (Optional)"
          >
            <Cpu className="w-3.5 h-3.5 text-purple-400" />
            <span>NVIDIA NIM (Optional)</span>
            <span className="text-[9px] bg-purple-500/20 text-purple-200 px-1 rounded ml-1">Inspect</span>
          </button>

          {/* Cursor Badge (Optional) */}
          <button
            onClick={() => onOpenSponsorHub("cursor")}
            className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 text-slate-300 font-mono text-[11px] transition shadow-sm cursor-pointer"
            title="Inspect Cursor Agent Mode development documentation"
          >
            <Terminal className="w-3.5 h-3.5 text-slate-400" />
            <span>Cursor</span>
            <span className="text-[9px] bg-slate-700 text-slate-300 px-1 rounded ml-1">Docs</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
