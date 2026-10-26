import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Download,
  Film,
  Sparkles,
  ShieldAlert,
  Database,
  Cpu,
  Mail,
  CheckCircle,
  ExternalLink,
  ChevronRight,
  Maximize2
} from "lucide-react";

interface Scene {
  id: number;
  title: string;
  durationSec: number;
  badge: string;
  badgeColor: string;
  heading: string;
  narration: string;
  renderVisual: (progress: number) => React.ReactNode;
}

interface DemoVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJumpToPo?: (poId: string) => void;
}

export const DemoVideoModal: React.FC<DemoVideoModalProps> = ({
  isOpen,
  onClose,
  onJumpToPo
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const totalDuration = 120; // 2 minutes exact

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const timerRef = useRef<any>(null);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);

  // 5 High-Impact Scenes (24 seconds each = 120s total)
  const scenes: Scene[] = [
    {
      id: 1,
      title: "The Problem",
      durationSec: 24,
      badge: "The $1.5M Enterprise Leakage",
      badgeColor: "bg-rose-500/20 text-rose-300 border-rose-500/30",
      heading: "Uncaptured Supplier Overcharges in Siloed Enterprise Data",
      narration:
        "Welcome to TraceBack AI. In global supply chains, companies quietly lose between 1.5% and 4% of their procurement spend to uncaptured invoice overcharges. The root cause? Data fragmentation. Purchase orders live in ERP systems, warehouse delivery receipts live in WMS, supplier invoices arrive in accounts payable, and contract prices sit in legal agreements. No one has time to manually cross-reference all four. Introducing TraceBack AI: an autonomous agent that unifies all four sources, detects discrepancies in real time, and proves every dollar with an immutable evidence trail.",
      renderVisual: (progress) => (
        <div className="w-full h-full flex flex-col justify-center items-center p-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-mono mb-4 animate-pulse">
            <ShieldAlert className="w-4 h-4 text-rose-400" /> PROCUREMENT LEAKAGE DETECTED
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">
            Why Do Companies Overpay Suppliers by <span className="text-rose-400">1.5% - 4%</span>?
          </h2>
          <p className="text-slate-300 text-sm max-w-xl mb-6">
            Four disconnected enterprise systems make manual 3-way or 4-way matching impossible at scale.
          </p>

          {/* 4 Data Silos Diagram */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-2xl">
            <div className={`p-4 rounded-xl border transition-all duration-500 ${progress > 0.1 ? "bg-indigo-950/40 border-indigo-500/40 translate-y-0 opacity-100" : "bg-slate-900 border-slate-800 translate-y-4 opacity-50"}`}>
              <div className="text-xs font-mono text-indigo-400 font-semibold mb-1">Source A</div>
              <div className="text-sm font-bold text-white mb-1">Purchase Orders</div>
              <div className="text-[11px] text-slate-400">ERP / SAP (120 ordered)</div>
            </div>
            <div className={`p-4 rounded-xl border transition-all duration-500 delay-100 ${progress > 0.3 ? "bg-emerald-950/40 border-emerald-500/40 translate-y-0 opacity-100" : "bg-slate-900 border-slate-800 translate-y-4 opacity-50"}`}>
              <div className="text-xs font-mono text-emerald-400 font-semibold mb-1">Source B</div>
              <div className="text-sm font-bold text-white mb-1">Delivery Notes</div>
              <div className="text-[11px] text-slate-400">Warehouse WMS (100 goods in)</div>
            </div>
            <div className={`p-4 rounded-xl border transition-all duration-500 delay-200 ${progress > 0.5 ? "bg-amber-950/40 border-amber-500/40 translate-y-0 opacity-100" : "bg-slate-900 border-slate-800 translate-y-4 opacity-50"}`}>
              <div className="text-xs font-mono text-amber-400 font-semibold mb-1">Source C</div>
              <div className="text-sm font-bold text-white mb-1">Supplier Invoice</div>
              <div className="text-[11px] text-slate-400">Accounts Payable (120 billed)</div>
            </div>
            <div className={`p-4 rounded-xl border transition-all duration-500 delay-300 ${progress > 0.7 ? "bg-purple-950/40 border-purple-500/40 translate-y-0 opacity-100" : "bg-slate-900 border-slate-800 translate-y-4 opacity-50"}`}>
              <div className="text-xs font-mono text-purple-400 font-semibold mb-1">Source D</div>
              <div className="text-sm font-bold text-white mb-1">Contract Rates</div>
              <div className="text-[11px] text-slate-400">Master Agreement ($48/unit)</div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-xs font-mono text-slate-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
            TraceBack AI unifies all four data streams with zero ETL pipelines.
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: "Live Reconciliation",
      durationSec: 24,
      badge: "Real-Time 4-Way Match",
      badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
      heading: "Purchase Order PO-1001: $1,200.00 Overcharge Uncovered",
      narration:
        "Here is a live audit of Purchase Order PO-1001 with supplier SUP-42. In under 200 milliseconds, TraceBack AI surfaces exactly $1,200 in recoverable overcharges across two distinct discrepancies, corroborated with a 96.5% confidence score. First, quantity overbilling: the supplier billed for 120 units, but warehouse receiving note DN-045 logged only 100 units physically delivered. That is 20 unreceived units billed at $50 each, yielding $1,000 in direct loss. Second, price escalation: the invoice charged $50 per unit, but our contracted price guarantees $48. That is an unauthorized $2 markup on 100 received units, adding $200 in rate leakage. Every finding cites the exact CSV file, row, and column.",
      renderVisual: (progress) => (
        <div className="w-full h-full flex flex-col p-6 overflow-hidden">
          {/* Top Metric Bar */}
          <div className="flex items-center justify-between bg-slate-900/90 border border-slate-800 rounded-xl p-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-base font-bold text-white">PO-1001</span>
              <span className="text-xs text-slate-400">• Supplier: SUP-42</span>
              <span className="text-xs font-medium text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">Widget-A</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Overcharge Detected</div>
                <div className="text-lg font-mono font-extrabold text-rose-400 animate-pulse">$1,200.00 USD</div>
              </div>
              <div className="text-right border-l border-slate-800 pl-4">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Audit Confidence</div>
                <div className="text-lg font-mono font-extrabold text-emerald-400">96.5%</div>
              </div>
            </div>
          </div>

          {/* Evidence Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1 overflow-hidden">
            {/* Card 1 */}
            <div className={`p-4 rounded-xl border flex flex-col justify-between transition-all duration-500 ${progress > 0.2 ? "bg-rose-950/30 border-rose-500/40 scale-100 opacity-100" : "bg-slate-900 border-slate-800 scale-95 opacity-50"}`}>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-rose-400 bg-rose-500/20 px-2 py-0.5 rounded border border-rose-500/30">
                    DISCREPANCY #1: QUANTITY OVERBILLING
                  </span>
                  <span className="text-sm font-mono font-extrabold text-rose-300">+$1,000.00</span>
                </div>
                <p className="text-xs text-slate-200 mb-2">
                  Invoiced for <strong>120 units</strong>, but warehouse receiving note <code>DN-045</code> logged only <strong>100 units</strong> received.
                </p>
                <div className="text-[11px] font-mono text-slate-400 bg-slate-950/60 p-2 rounded border border-slate-800">
                  Formula: (120 - 100) × $50.00 = $1,000.00
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-3 pt-2 border-t border-slate-800/80">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950/60 text-indigo-300 border border-indigo-800/50">invoices.csv:L2:invoiced_qty (120)</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/50">deliveries.csv:L2:delivered_qty (100)</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className={`p-4 rounded-xl border flex flex-col justify-between transition-all duration-500 delay-150 ${progress > 0.5 ? "bg-amber-950/30 border-amber-500/40 scale-100 opacity-100" : "bg-slate-900 border-slate-800 scale-95 opacity-50"}`}>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30">
                    DISCREPANCY #2: CONTRACT RATE ESCALATION
                  </span>
                  <span className="text-sm font-mono font-extrabold text-amber-300">+$200.00</span>
                </div>
                <p className="text-xs text-slate-200 mb-2">
                  Invoiced unit price is <strong>$50.00</strong>, exceeding the contracted rate of <strong>$48.00</strong>.
                </p>
                <div className="text-[11px] font-mono text-slate-400 bg-slate-950/60 p-2 rounded border border-slate-800">
                  Formula: 100 delivered × ($50.00 - $48.00) = $200.00
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-3 pt-2 border-t border-slate-800/80">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-800/50">invoices.csv:L2:unit_price ($50)</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-800/50">contract_prices.csv:L2:contract_unit_price ($48)</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: "Zetaris Virtualization",
      durationSec: 24,
      badge: "Sponsor Tech: Zetaris",
      badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/30",
      heading: "Zero-ETL Federated SQL Across 4 Disparate Sources",
      narration:
        "How does TraceBack AI achieve this without brittle ETL pipelines? Through Zetaris data virtualization. TraceBack AI executes federated SQL joins across purchase orders, deliveries, invoices, and contracts on the fly. Whether connecting to Zetaris cloud network or our built-in virtual SQL federator, the data remains where it lives. Every discrepancy carries an immutable evidence trail linking to the exact file, row, column, and raw ground-truth value. When an auditor or supplier clicks an evidence chip, they inspect the raw data row instantly.",
      renderVisual: (progress) => (
        <div className="w-full h-full flex flex-col p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-blue-400" />
              <h3 className="text-base font-bold text-white">Zetaris Federated Virtual Schema</h3>
            </div>
            <span className="text-xs font-mono bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2.5 py-0.5 rounded-full">
              STATUS: VIRTUALIZATION ACTIVE (SQL-92)
            </span>
          </div>

          {/* SQL Terminal Visual */}
          <div className="flex-1 bg-slate-950 rounded-xl border border-slate-800 p-4 font-mono text-xs overflow-hidden flex flex-col justify-between">
            <div>
              <div className="text-slate-500 mb-2">// Zetaris cross-source virtualization query</div>
              <div className="text-blue-400 font-semibold mb-1">SELECT</div>
              <div className="pl-4 text-slate-300 leading-relaxed">
                po.po_id, po.supplier_id, po.ordered_qty, po.unit_price AS po_unit_price,<br />
                del.delivery_id, del.delivered_qty,<br />
                inv.invoice_id, inv.invoiced_qty, inv.unit_price AS invoiced_unit_price,<br />
                cp.contract_unit_price<br />
              </div>
              <div className="text-blue-400 font-semibold mt-1">FROM <span className="text-indigo-300">purchase_orders po</span></div>
              <div className="pl-4 text-emerald-300">LEFT JOIN <span className="text-white">deliveries del</span> ON po.po_id = del.po_id</div>
              <div className="pl-4 text-amber-300">LEFT JOIN <span className="text-white">invoices inv</span> ON po.po_id = inv.po_id</div>
              <div className="pl-4 text-purple-300">LEFT JOIN <span className="text-white">contract_prices cp</span> ON po.supplier_id = cp.supplier_id</div>
              <div className="text-blue-400 font-semibold mt-1">WHERE <span className="text-white">po.po_id = 'PO-1001'</span></div>
            </div>

            {/* Live virtual join result indicator */}
            <div className={`mt-3 p-3 rounded-lg border text-xs transition-all duration-500 ${progress > 0.4 ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-300" : "bg-slate-900 border-slate-800 text-slate-400"}`}>
              <div className="flex items-center justify-between font-bold">
                <span>Zetaris Unified View Execution: 1 Record Joined in 12ms</span>
                <span className="font-mono text-emerald-400">0 ETL DUPLICATION</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                Ordered: 120 | Delivered: 100 | Invoiced: 120 ($50.00) | Contract: $48.00
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: "Meterless Nightshift AI",
      durationSec: 24,
      badge: "Sponsor Tech: Meterless & Nightshift",
      badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
      heading: "Autonomous Relay Orchestration & $0.00 Token Compute",
      narration:
        "TraceBack AI is not a brittle prompt wrapper — it is powered by Meterless Agent architecture. Step one: Scout Intent establishes audit rules and discrepancy tolerances. Step two: Relay execution queries Zetaris. Step three: reconciliation algorithms quantify exposure. Step four: confidence scoring verifies cross-source coherence. And step five: Meterless Nightshift acts as our autonomous AI provider, executing a four-stage Race, Judge, Verify, and Generate cycle on local compute, producing an immutable audit receipt at zero dollar cloud token cost. The entire mission context is committed to Meterless Gaia H-MEM memory.",
      renderVisual: (progress) => (
        <div className="w-full h-full flex flex-col p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-emerald-400" />
              <h3 className="text-base font-bold text-white">Meterless Relay & Nightshift Engine</h3>
            </div>
            <span className="text-xs font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
              COMPUTE COST: $0.00 / RECEIPT VERIFIED
            </span>
          </div>

          {/* 5 Agent Workflow Steps */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-2 mb-3">
            {[
              { num: 1, name: "Scout Intent", desc: "Tolerances & scope", time: "12ms" },
              { num: 2, name: "Relay Zetaris", desc: "Federated 4-way SQL", time: "18ms" },
              { num: 3, name: "Reconciliation", desc: "Leakage detection", time: "8ms" },
              { num: 4, name: "Confidence", desc: "Corroboration: 96.5%", time: "14ms" },
              { num: 5, name: "Nightshift AI", desc: "Race > Judge > Verify", time: "42ms" }
            ].map((step, idx) => (
              <div
                key={step.num}
                className={`p-2.5 rounded-xl border text-center transition-all duration-300 ${
                  progress > (idx + 1) * 0.18
                    ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-200 shadow-sm shadow-emerald-500/20"
                    : "bg-slate-900 border-slate-800 text-slate-500"
                }`}
              >
                <div className="text-[10px] font-mono text-emerald-400 font-bold mb-0.5">STEP {step.num}</div>
                <div className="text-xs font-bold text-white truncate">{step.name}</div>
                <div className="text-[10px] text-slate-400 truncate mt-0.5">{step.desc}</div>
                <div className="text-[10px] font-mono text-slate-500 mt-1">{step.time}</div>
              </div>
            ))}
          </div>

          {/* Nightshift Execution Receipt */}
          <div className="bg-slate-950 rounded-xl border border-slate-800 p-3.5 font-mono text-xs flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-emerald-400 font-bold border-b border-slate-800 pb-1.5 mb-2">
                <span>[METERLESS NIGHTSHIFT VERIFICATION RECEIPT]</span>
                <span className="text-[11px] text-slate-400">ID: ns-rcpt-8f3a9e</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-slate-300 text-[11px]">
                <div><span className="text-slate-500">Method:</span> Race-Judge-Verify</div>
                <div><span className="text-slate-500">Latency:</span> 42ms</div>
                <div><span className="text-slate-500">Local Hotspot:</span> 127.0.0.1:11434</div>
                <div><span className="text-slate-500">Cloud Tokens:</span> 0 ($0.00 USD)</div>
              </div>
              <div className="mt-2 text-slate-300 text-[11px] leading-relaxed">
                Verdict: Invoiced 120 units at $50.00 vs delivered 100 at contract $48.00. Mathematical verification passed with 100% integrity.
              </div>
            </div>
            <div className="text-[10px] text-slate-500 pt-1.5 border-t border-slate-900 flex justify-between">
              <span>Memory Engine: Meterless Gaia H-MEM</span>
              <span className="text-emerald-400">Cryptographically Grounded</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 5,
      title: "Human Approval & Resolution",
      durationSec: 24,
      badge: "Human-in-the-Loop & NVIDIA NIM",
      badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/30",
      heading: "One-Click Claim Approval, Supplier Email & Credibility",
      narration:
        "Crucially, TraceBack AI keeps a human in the loop. No dispute is dispatched without auditor approval. With one click, the lead auditor approves the $1,200 recovery claim. Instantly, our system synthesizes a professional, evidence-backed supplier dispute letter ready for dispatch. It itemizes the purchase order, invoice number, delivery note, contract schedule, and requests an immediate $1,200 credit memo. Furthermore, TraceBack AI guarantees zero false positives: testing clean purchase order PO-1002 returns zero dollars in overcharge with 100% concordance. TraceBack AI turns procurement leakages into measurable cash recovery in seconds.",
      renderVisual: (progress) => (
        <div className="w-full h-full flex flex-col p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
            {/* Left: Approval Bar & PO-1002 comparison */}
            <div className="flex flex-col justify-between space-y-3">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                <div className="text-xs text-slate-400 font-semibold mb-2 uppercase">Auditor Human-in-the-Loop Control</div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex-1 py-2 px-3 rounded-lg bg-emerald-600 text-white font-bold text-xs text-center flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-600/30">
                    <CheckCircle className="w-4 h-4" /> Claim Approved: Recover $1,200.00
                  </div>
                </div>
                <div className="text-[11px] text-slate-400">
                  Status: Approved by Lead Auditor on 2026-10-26. Audit certificate issued.
                </div>
              </div>

              {/* Credibility test: PO-1002 */}
              <div className={`p-4 rounded-xl border transition-all duration-500 ${progress > 0.4 ? "bg-slate-900 border-indigo-500/40 text-slate-200" : "bg-slate-950 border-slate-800 text-slate-500"}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono font-bold text-indigo-400">Credibility Benchmark: PO-1002</span>
                  <span className="text-xs font-mono text-emerald-400 font-bold">$0.00 (CLEAN)</span>
                </div>
                <div className="text-xs text-slate-300">
                  50 ordered, 50 delivered, 50 invoiced at contract $20.00. 100% concordance with zero false alarms!
                </div>
              </div>
            </div>

            {/* Right: Supplier Resolution Email */}
            <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 font-mono text-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2 text-indigo-400 font-bold">
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Dispute Letter: Supplier SUP-42</span>
                  </div>
                  <span className="text-[10px] text-slate-400">NVIDIA NIM / Nightshift</span>
                </div>
                <div className="text-slate-300 space-y-1.5 text-[11px]">
                  <div><strong className="text-white">Subject:</strong> Overcharge Notice: Invoice INV-9001 ($1,200.00 Variance)</div>
                  <div className="text-slate-400 pt-1 text-[10px] leading-relaxed">
                    "Dear SUP-42 Accounts Receivable Team,<br />
                    Reconciliation of PO-1001 against Delivery Note DN-045 and Contract Price Schedule identified $1,200.00 in billed variances:<br />
                    - 20 unreceived units on Widget-A ($1,000.00)<br />
                    - $2.00/unit rate escalation on 100 received units ($200.00)<br />
                    Please issue a revised credit memo for $1,200.00 within 5 business days."
                  </div>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-900 flex justify-between items-center text-[10px] text-slate-500">
                <span>Citations: 100% ground truth linked</span>
                <span className="text-emerald-400 font-semibold">Ready for Dispatch</span>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  // Determine current scene index
  const currentSceneIndex = Math.min(
    Math.floor(currentTime / 24),
    scenes.length - 1
  );
  const currentScene = scenes[currentSceneIndex];
  const sceneProgress = (currentTime % 24) / 24;

  // Speech narration synchronizer
  useEffect(() => {
    if (!isOpen) {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
      return;
    }

    if (isMuted || !isPlaying) {
      if (window.speechSynthesis) window.speechSynthesis.pause();
      return;
    }

    if (window.speechSynthesis && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      return;
    }

    // Play narration when entering a new scene
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentScene.narration);
      utterance.rate = 1.05 * playbackSpeed;
      utterance.pitch = 1.0;
      utterance.volume = isMuted ? 0 : 1;

      // Select natural English voice if available
      const voices = window.speechSynthesis.getVoices();
      const preferred = voices.find(
        (v) =>
          v.lang.startsWith("en") &&
          (v.name.includes("Natural") ||
            v.name.includes("Google") ||
            v.name.includes("David") ||
            v.name.includes("Samantha"))
      );
      if (preferred) utterance.voice = preferred;

      speechRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    }

    return () => {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    };
  }, [currentSceneIndex, isMuted, isPlaying, isOpen, playbackSpeed]);

  // Main playback timer loop
  useEffect(() => {
    if (!isOpen || !isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev >= totalDuration) {
          setIsPlaying(false);
          return totalDuration;
        }
        return prev + 1;
      });
    }, 1000 / playbackSpeed);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isOpen, isPlaying, playbackSpeed]);

  // Scrub handler
  const handleSeek = (newTime: number) => {
    setCurrentTime(newTime);
    if (window.speechSynthesis) window.speechSynthesis.cancel();
  };

  // Jump to specific scene
  const handleJumpToScene = (sceneIndex: number) => {
    handleSeek(sceneIndex * 24);
  };

  // Restart video
  const handleRestart = () => {
    setCurrentTime(0);
    setIsPlaying(true);
    if (window.speechSynthesis) window.speechSynthesis.cancel();
  };

  // Export / Open standalone player
  const handleExportVideo = () => {
    window.open("./demo-video.html", "_blank");
  };

  // Download official MP4 video file
  const handleDownloadMp4 = () => {
    const a = document.createElement("a");
    a.href = "./traceback-ai-demo.mp4";
    a.download = "traceback-ai-demo.mp4";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  if (!isOpen) return null;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-5xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
        {/* Modal Top Header */}
        <div className="px-5 py-3 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-gradient-to-tr from-amber-500 to-rose-500 text-white shadow-md">
              <Film className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white">
                  TraceBack AI — 2-Minute Full Feature Walkthrough
                </h3>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  4K / 60 FPS SIMULATION
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Autonomous Supplier Invoice Reconciliation with Zetaris & Meterless Nightshift AI
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadMp4}
              className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-110 text-white flex items-center gap-1.5 transition shadow-sm"
              title="Download 1080p MP4 Video File"
            >
              <Download className="w-3.5 h-3.5" /> Download MP4
            </button>
            <button
              onClick={handleExportVideo}
              className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition"
              title="Open standalone HTML5 video player"
            >
              <ExternalLink className="w-3.5 h-3.5" /> Standalone Player
            </button>
            <button
              onClick={() => {
                if (window.speechSynthesis) window.speechSynthesis.cancel();
                onClose();
              }}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Screen / Canvas Viewport (16:9 Aspect Ratio Container) */}
        <div className="relative aspect-video w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden border-b border-slate-800 flex flex-col justify-between">
          {/* Subtle Cyber Grid Background */}
          <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />

          {/* Top In-Video Header & Scene Badge */}
          <div className="relative z-10 p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`text-[11px] font-mono font-bold px-3 py-1 rounded-full border ${currentScene.badgeColor} shadow-md`}>
                SCENE {currentScene.id}/5: {currentScene.badge.toUpperCase()}
              </span>
              <span className="text-xs font-mono text-slate-400">
                {formatTime(currentTime)} / {formatTime(totalDuration)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-rose-500 animate-ping" />
              <span className="text-[11px] font-mono text-slate-300 font-semibold tracking-wider">
                LIVE DEMO ENGINE
              </span>
            </div>
          </div>

          {/* Main Visual Display of Current Scene */}
          <div className="relative z-10 flex-1 flex items-center justify-center">
            {currentScene.renderVisual(sceneProgress)}
          </div>

          {/* Bottom Subtitle / Captions Bar */}
          <div className="relative z-10 bg-slate-950/90 border-t border-slate-800/80 px-6 py-2.5 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase shrink-0">
                AUDIO CAPTION:
              </span>
              <p className="text-xs text-slate-200 line-clamp-2 leading-snug">
                "{currentScene.narration}"
              </p>
            </div>
          </div>
        </div>

        {/* Video Control Bar & Timeline */}
        <div className="p-4 bg-slate-900 space-y-3">
          {/* Progress Slider */}
          <div className="space-y-1">
            <div className="relative h-2 bg-slate-800 rounded-full cursor-pointer overflow-hidden group">
              <div
                className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500 rounded-full transition-all duration-200"
                style={{ width: `${(currentTime / totalDuration) * 100}%` }}
              />
              <input
                type="range"
                min={0}
                max={totalDuration}
                value={currentTime}
                onChange={(e) => handleSeek(Number(e.target.value))}
                className="absolute inset-0 opacity-0 cursor-pointer w-full"
              />
            </div>

            {/* Chapter Markers */}
            <div className="flex justify-between text-[10px] font-mono text-slate-400 pt-1">
              {scenes.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => handleJumpToScene(idx)}
                  className={`hover:text-white transition flex items-center gap-1 ${
                    currentSceneIndex === idx ? "text-indigo-400 font-bold" : ""
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600 inline-block" />
                  {idx * 24}s {s.title}
                </button>
              ))}
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center space-x-3">
              {/* Play / Pause */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 transition flex items-center gap-1.5 text-xs font-bold"
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                <span>{isPlaying ? "Pause" : "Play"}</span>
              </button>

              {/* Restart */}
              <button
                onClick={handleRestart}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                title="Restart from beginning"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {/* Audio Mute/Unmute */}
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`p-2 rounded-xl border transition flex items-center gap-1.5 text-xs ${
                  isMuted
                    ? "bg-rose-500/10 border-rose-500/30 text-rose-400"
                    : "bg-slate-800 border-slate-700 text-slate-300 hover:text-white"
                }`}
                title={isMuted ? "Unmute voiceover" : "Mute voiceover"}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                <span>{isMuted ? "Muted" : "Narration ON"}</span>
              </button>

              {/* Speed Selector */}
              <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700 text-[11px] font-mono">
                {[1, 1.25, 1.5].map((spd) => (
                  <button
                    key={spd}
                    onClick={() => setPlaybackSpeed(spd)}
                    className={`px-2 py-0.5 rounded transition ${
                      playbackSpeed === spd
                        ? "bg-indigo-600 text-white font-bold"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>
            </div>

            {/* Jump to Interactive Live App Button */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (onJumpToPo) onJumpToPo("PO-1001");
                  if (window.speechSynthesis) window.speechSynthesis.cancel();
                  onClose();
                }}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-md shadow-emerald-600/30 flex items-center gap-1.5 transition"
              >
                <Sparkles className="w-3.5 h-3.5" /> Jump to Live PO-1001 Audit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
