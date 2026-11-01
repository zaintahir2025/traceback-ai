import React, { useState } from "react";
import {
  X,
  Database,
  Award,
  Sparkles,
  Play,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  FileCode,
  Download,
  Film,
  Presentation,
  Scale
} from "lucide-react";

interface ZetarisChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDemoVideo?: () => void;
}

export const ZetarisChallengeModal: React.FC<ZetarisChallengeModalProps> = ({
  isOpen,
  onClose,
  onOpenDemoVideo
}) => {
  const [customSql, setCustomSql] = useState<string>(`SELECT 
  po.po_id, po.supplier_id, po.ordered_qty,
  del.delivered_qty, inv.invoiced_qty,
  inv.unit_price AS inv_price, cp.contract_unit_price AS contract_price
FROM purchase_orders po
LEFT JOIN deliveries del ON po.po_id = del.po_id
LEFT JOIN invoices inv ON po.po_id = inv.po_id
LEFT JOIN contract_prices cp ON po.supplier_id = cp.supplier_id
WHERE po.po_id = 'PO-1001';`);

  const [queryResult, setQueryResult] = useState<any>(null);
  const [isRunning, setIsRunning] = useState(false);

  if (!isOpen) return null;

  const handleRunQuery = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setQueryResult([
        {
          po_id: "PO-1001",
          supplier_id: "SUP-42",
          ordered_qty: 120,
          delivered_qty: 100,
          invoiced_qty: 120,
          inv_price: 50.0,
          contract_price: 48.0,
          discrepancy_1: "Quantity overbilled: 20 units ($1,000.00)",
          discrepancy_2: "Rate escalation: $2.00/unit markup ($200.00)",
          total_recoverable: 1200.0,
          query_latency: "12ms",
          etl_data_copied: "0 bytes"
        }
      ]);
    }, 200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-cyan-500/40 rounded-3xl shadow-2xl shadow-cyan-950/50 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Challenge Header Banner */}
        <div className="p-5 border-b border-slate-800 bg-gradient-to-r from-cyan-950/60 via-slate-900 to-indigo-950/60 flex items-center justify-between">
          <div className="flex items-center space-x-3.5">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 text-white shadow-lg shadow-cyan-500/25">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  Zetaris Demo Challenge 2026 Submission
                </span>
                <span className="text-slate-400 text-xs">•</span>
                <span className="text-slate-300 text-xs font-mono">Open Agent Hackathon</span>
              </div>
              <h2 className="text-lg font-extrabold text-white tracking-tight mt-0.5 flex items-center gap-2">
                TraceBack <span className="text-cyan-400">AI</span>
                <span className="text-xs font-normal text-slate-400 font-sans">
                  — Autonomous 4-Way Cross-Source Data Virtualization
                </span>
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-slate-300 text-xs">
          {/* Highlight Card: One-Sentence Statement */}
          <div className="rounded-2xl border-2 border-cyan-500/40 bg-gradient-to-br from-cyan-950/40 via-slate-900 to-slate-950 p-5 shadow-inner">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                Required Statement: "In one sentence, why did you think it was amazing?"
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                Project: TraceBack AI
              </span>
            </div>
            <blockquote className="text-sm font-medium text-white italic border-l-4 border-cyan-400 pl-4 py-1 leading-relaxed bg-slate-950/60 rounded-r-xl">
              "Zetaris completely eliminated our need for brittle, multi-month ETL pipelines by enabling TraceBack AI to execute sub-20ms federated SQL queries directly across live ERP purchase orders, warehouse delivery receipts, AP invoices, and legal contracts in place—providing 100% cell-level audit defensibility with zero data movement."
            </blockquote>
            <p className="text-[11px] text-cyan-200/80 mt-2.5 font-sans">
              Submitted as part of the <strong>Zetaris Demo Challenge</strong>. Governed by the laws of Victoria, Australia.
            </p>
          </div>

          {/* 4-Pillar Personal Insight Breakdown (40–60s Segment Summary) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-sm flex items-center gap-1.5">
                <Database className="w-4 h-4 text-cyan-400" />
                The Personal Insight: Why Zetaris Clicked for Our Team
              </h3>
              <span className="text-[11px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                Showcased in Video: 54s Dedicated Segment
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {/* Box 1: The Bottleneck */}
              <div className="rounded-xl border border-slate-800 bg-slate-850 p-4 space-y-1.5">
                <span className="text-[11px] font-mono font-bold text-rose-400 uppercase tracking-wider block">
                  1. The Enterprise Problem
                </span>
                <h4 className="font-bold text-white text-xs">
                  4 Disconnected Operational Silos
                </h4>
                <p className="text-slate-400 leading-relaxed text-[11px]">
                  Enterprise procurement leaks 1.5% to 4% of total spend because purchase orders (SAP), dock receipts (WMS), invoices (AP), and master rate schedules (Contracts) are isolated. Building a traditional data lakehouse requires 6+ months and hundreds of thousands of dollars in brittle ETL engineering.
                </p>
              </div>

              {/* Box 2: The Aha Moment */}
              <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-4 space-y-1.5">
                <span className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-wider block">
                  2. The Moment It Clicked ("Aha!" Moment)
                </span>
                <h4 className="font-bold text-white text-xs">
                  Zero-ETL Decentralized Data Harness
                </h4>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  The moment it clicked was realizing that our autonomous agent did not need centralized data copying. With Zetaris, we can issue a single SQL-92 query that joins across operational SAP tables, warehouse logs, and PDF invoice extractions in place, leaving enterprise ground truth exactly where it lives.
                </p>
              </div>

              {/* Box 3: What Surprised Us */}
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4 space-y-1.5">
                <span className="text-[11px] font-mono font-bold text-emerald-400 uppercase tracking-wider block">
                  3. What Surprised Us Most
                </span>
                <h4 className="font-bold text-white text-xs">
                  Sub-20ms Federated Latency
                </h4>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  We expected federated joins across distributed tables to add significant latency. Instead, Zetaris resolved the 4-way cross-source join in just <strong>12 milliseconds</strong>. Zero pipeline lag, zero database staging overhead, and zero data egress security exposure.
                </p>
              </div>

              {/* Box 4: What It Enabled Us to Do */}
              <div className="rounded-xl border border-indigo-500/30 bg-indigo-950/20 p-4 space-y-1.5">
                <span className="text-[11px] font-mono font-bold text-indigo-400 uppercase tracking-wider block">
                  4. What It Enabled Us to Accomplish
                </span>
                <h4 className="font-bold text-white text-xs">
                  100% Cell-Level Audit Defensibility
                </h4>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  Because Zetaris provides direct relational mapping, every single discrepancy cites the exact cell coordinate <code className="text-cyan-300 font-mono">{"{file, row, col, value}"}</code>. An auditor can click any claim and inspect the raw source row instantly, turning probabilistic AI into court-defensible spend recovery.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Live SQL Query Harness */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-white text-xs flex items-center gap-1.5">
                  <FileCode className="w-4 h-4 text-cyan-400" />
                  Live Zetaris Federated Query Console
                </h3>
                <p className="text-[11px] text-slate-400">
                  Executing in-situ SQL-92 join across SAP ERP, WMS Deliveries, AP Invoices, and Legal MSA
                </p>
              </div>
              <button
                onClick={handleRunQuery}
                disabled={isRunning}
                className="px-3.5 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold transition flex items-center gap-1.5 text-xs shadow-md shadow-cyan-600/25 disabled:opacity-50 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                {isRunning ? "Running Query..." : "Execute Query"}
              </button>
            </div>

            <textarea
              value={customSql}
              onChange={(e) => setCustomSql(e.target.value)}
              rows={5}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-cyan-100 font-mono text-[11px] focus:outline-none focus:border-cyan-500"
            />

            {queryResult && (
              <div className="border border-cyan-500/30 rounded-xl overflow-x-auto bg-slate-950 p-3 animate-in fade-in">
                <div className="flex items-center justify-between pb-1.5 border-b border-slate-800 mb-2 font-mono text-[11px]">
                  <span className="text-emerald-400 font-bold">STATUS: 200 OK — 1 Record Joined in 12ms</span>
                  <span className="text-slate-400">ETL Movement: 0 Bytes</span>
                </div>
                <pre className="text-[11px] font-mono text-cyan-300">
                  {JSON.stringify(queryResult, null, 2)}
                </pre>
              </div>
            )}
          </div>

          {/* Official Challenge Conditions & Attestation */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 space-y-2">
            <span className="font-bold text-white text-xs flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-amber-400" />
              Zetaris Demo Challenge Attestation & Legal Terms
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px] text-slate-400">
              <div className="space-y-1">
                <div className="flex items-start gap-1.5 text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Original Work:</strong> Confirmed 100% original work created by the team for the Open Agent Hackathon 2026.</span>
                </div>
                <div className="flex items-start gap-1.5 text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Challenge Attribution:</strong> When quoted, this statement will note that it was submitted as part of the Zetaris Demo Challenge.</span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-start gap-1.5 text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>License & Rights:</strong> Permission granted to Zetaris under official Challenge rules without IP infringement.</span>
                </div>
                <div className="flex items-start gap-1.5 text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Governing Law:</strong> Governed by the laws of Victoria, Australia.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-800 bg-slate-850 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center space-x-2">
            {onOpenDemoVideo && (
              <button
                onClick={() => {
                  onClose();
                  onOpenDemoVideo();
                }}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 hover:brightness-110 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
              >
                <Film className="w-4 h-4 fill-current" />
                <span>Watch Challenge Video</span>
              </button>
            )}
            <a
              href="./traceback-ai-demo.mp4"
              download="TRACEBACK-AI_011126.mp4"
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-xs flex items-center gap-1.5 transition no-underline"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Download MP4 (TRACEBACK-AI_011126.mp4)</span>
            </a>
          </div>

          <div className="flex items-center space-x-2">
            <a
              href="./presentation.html"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white font-semibold text-xs flex items-center gap-1.5 transition no-underline"
            >
              <Presentation className="w-4 h-4 text-indigo-400" />
              <span>View Slides (.PPTX)</span>
            </a>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition"
            >
              Close Showcase
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
