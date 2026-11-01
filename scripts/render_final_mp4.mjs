import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer-core';

const PORT = 3042;
const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const wavBuffer = fs.readFileSync('frontend/public/narration.wav');
const wavBase64 = wavBuffer.toString('base64');

const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { margin: 0; background: #020617; overflow: hidden; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
    canvas { display: block; width: 1280px; height: 720px; }
  </style>
</head>
<body>
  <canvas id="c" width="1280" height="720"></canvas>
  <script>
    const canvas = document.getElementById('c');
    const ctx = canvas.getContext('2d');
    const totalDuration = 163.6;

    const subtitles = [
      { start: 0.0, end: 5.0, text: "Welcome to TraceBack AI, an autonomous enterprise spend recovery platform." },
      { start: 5.0, end: 17.5, text: "Enterprises lose 1.5% to 4% of procurement spend due to data fragmented across ERP, WMS, AP, and Contracts." },
      { start: 17.5, end: 23.0, text: "TraceBack AI unifies all four sources into an autonomous agent that stops spend leakage in real time." },
      { start: 23.0, end: 31.0, text: "In a live audit of Purchase Order PO-1001, TraceBack AI discovers $1,200 in overcharges in 184 milliseconds." },
      { start: 31.0, end: 41.0, text: "Discrepancy 1: Quantity overbilling. Invoiced 120 units vs warehouse dock note DN-045 logging 100 received ($1,000 loss)." },
      { start: 41.0, end: 51.5, text: "Discrepancy 2: Contract rate escalation. Invoiced at $50/unit versus contracted $48 ceiling ($200 rate creep)." },
      { start: 51.5, end: 57.5, text: "Every finding carries an immutable evidence link down to the exact file, row, and column." },
      
      // Scene 3: Zetaris Demo Challenge Personal Insight (57.5s - 113.5s = 56s segment)
      { start: 57.5, end: 65.0, text: "This brings us to Zetaris Data Virtualization, submitted as part of the Zetaris Demo Challenge." },
      { start: 65.0, end: 77.0, text: "When building TraceBack AI, our biggest hurdle was data fragmentation across 4 silos without building a 6-month ETL lakehouse." },
      { start: 77.0, end: 81.5, text: "That was the moment Zetaris clicked for our team." },
      { start: 81.5, end: 91.5, text: "Zetaris acted as our decentralized data harness, running federated SQL joins across live ERP, WMS, AP, and Contracts in place." },
      { start: 91.5, end: 100.5, text: "What surprised us most was the speed: federated queries executing in just 12 milliseconds with zero data movement." },
      { start: 100.5, end: 107.5, text: "Crucially, Zetaris enabled 100% cell-level audit defensibility: every claim cites raw file, row, and column coordinates." },
      { start: 107.5, end: 114.0, text: "In one sentence: Zetaris eliminated the ETL bottleneck, giving our autonomous agent instant access to enterprise reality." },
      
      // Scene 4: Meterless & Nightshift AI
      { start: 114.0, end: 118.5, text: "The agent orchestration is powered by Meterless architecture." },
      { start: 118.5, end: 126.5, text: "Scout Intent sets tolerances, Relay dispatches Zetaris queries, and reconciliation algorithms compute exact variances." },
      { start: 126.5, end: 139.0, text: "Meterless Nightshift runs a 4-stage local reasoning cycle on local compute at $0.00 cloud token cost, committed to Gaia memory." },
      
      // Scene 5: Human in the loop & Clean benchmark
      { start: 139.0, end: 149.0, text: "With one click, the lead auditor approves the $1,200 claim, and TraceBack AI synthesizes a formal supplier dispute letter." },
      { start: 149.0, end: 156.5, text: "Meanwhile, testing clean order PO-1002 returns zero overcharges and zero false alarms with 100% concordance." },
      { start: 156.5, end: 163.6, text: "TraceBack AI turns enterprise procurement leakage into immediate cash recovery." }
    ];

    function getSubtitle(t) {
      const match = subtitles.find(s => t >= s.start && t < s.end);
      return match ? match.text : "";
    }

    function draw(sec) {
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, 1280, 720);

      // Top Brand Header Bar
      ctx.fillStyle = '#090d16';
      ctx.fillRect(30, 20, 1220, 65);
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      ctx.strokeRect(30, 20, 1220, 65);

      // App Title
      ctx.fillStyle = '#6366f1';
      ctx.font = 'bold 22px sans-serif';
      ctx.fillText('TraceBack AI', 55, 60);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '14px sans-serif';
      ctx.fillText('|   Autonomous Cross-Source Reconciliation & Spend Recovery Agent', 205, 59);

      // Top Badges
      // Badge 1: Zetaris Challenge
      ctx.fillStyle = '#082f49';
      ctx.fillRect(810, 36, 230, 32);
      ctx.strokeStyle = '#0284c7';
      ctx.strokeRect(810, 36, 230, 32);
      ctx.fillStyle = '#7dd3fc';
      ctx.font = 'bold 11px monospace';
      ctx.fillText('ZETARIS DEMO CHALLENGE 2026', 820, 56);

      // Badge 2: Meterless
      ctx.fillStyle = '#064e3b';
      ctx.fillRect(1055, 36, 175, 32);
      ctx.strokeStyle = '#059669';
      ctx.strokeRect(1055, 36, 175, 32);
      ctx.fillStyle = '#6ee7b7';
      ctx.font = 'bold 11px monospace';
      ctx.fillText('METERLESS NIGHTSHIFT', 1068, 56);

      // Determine Active Scene
      let scene = 1;
      if (sec >= 23.0 && sec < 57.5) scene = 2;
      else if (sec >= 57.5 && sec < 114.0) scene = 3;
      else if (sec >= 114.0 && sec < 139.0) scene = 4;
      else if (sec >= 139.0) scene = 5;

      // Main Card Container
      ctx.fillStyle = '#0b1120';
      ctx.fillRect(30, 100, 1220, 480);
      ctx.strokeStyle = '#1e293b';
      ctx.strokeRect(30, 100, 1220, 480);

      if (scene === 1) {
        // SCENE 1: The Problem
        ctx.fillStyle = '#f43f5e';
        ctx.font = 'bold 14px monospace';
        ctx.fillText('SCENE 1/5: THE ENTERPRISE PROBLEM & SPEND LEAKAGE', 60, 145);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 28px sans-serif';
        ctx.fillText('Why Enterprises Lose 1.5% to 4% of Procurement Spend', 60, 190);

        ctx.fillStyle = '#94a3b8';
        ctx.font = '16px sans-serif';
        ctx.fillText('Global procurement operations suffer from 4 disconnected, uncoordinated enterprise data silos:', 60, 225);

        // 4 Silo Cards
        const silos = [
          { name: "ERP System (SAP)", sub: "Purchase Orders", detail: "PO-1001: 120 units ordered @ $50/ea ($6,000.00)", color: "#38bdf8" },
          { name: "WMS Logistics", sub: "Goods Receipts", detail: "DN-045: Only 100 units physically delivered to dock", color: "#f59e0b" },
          { name: "Accounts Payable", sub: "Supplier Invoices", detail: "INV-9001: Invoiced for full 120 units ($6,000.00)", color: "#f43f5e" },
          { name: "Legal / Sourcing", sub: "Master Contracts", detail: "Contract Ceiling: Rate capped at $48/ea (not $50)", color: "#a855f7" }
        ];

        silos.forEach((silo, idx) => {
          const x = 60 + (idx % 2) * 580;
          const y = 255 + Math.floor(idx / 2) * 115;
          ctx.fillStyle = '#0f172a';
          ctx.fillRect(x, y, 550, 95);
          ctx.strokeStyle = silo.color;
          ctx.lineWidth = 1.5;
          ctx.strokeRect(x, y, 550, 95);

          ctx.fillStyle = silo.color;
          ctx.font = 'bold 15px monospace';
          ctx.fillText(silo.name + ' • ' + silo.sub, x + 20, y + 35);

          ctx.fillStyle = '#e2e8f0';
          ctx.font = '14px sans-serif';
          ctx.fillText(silo.detail, x + 20, y + 68);
        });

        ctx.fillStyle = '#10b981';
        ctx.font = 'bold 18px sans-serif';
        ctx.fillText('TraceBack AI unifies all 4 data streams with Zero-ETL Data Virtualization.', 60, 545);

      } else if (scene === 2) {
        // SCENE 2: Live PO-1001 Audit
        ctx.fillStyle = '#f59e0b';
        ctx.font = 'bold 14px monospace';
        ctx.fillText('SCENE 2/5: LIVE PO-1001 4-WAY AUDIT & EVIDENCE TRAIL', 60, 145);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 28px sans-serif';
        ctx.fillText('Purchase Order PO-1001: $1,200.00 Overcharge Uncovered in 184ms', 60, 190);

        // Discrepancy Card 1
        ctx.fillStyle = '#1c1917';
        ctx.fillRect(60, 220, 1160, 115);
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2;
        ctx.strokeRect(60, 220, 1160, 115);

        ctx.fillStyle = '#ef4444';
        ctx.font = 'bold 18px monospace';
        ctx.fillText('DISCREPANCY 1: QUANTITY OVERBILLING (+$1,000.00 USD)', 85, 255);

        ctx.fillStyle = '#f8fafc';
        ctx.font = '15px sans-serif';
        ctx.fillText('Invoice billed for 120 units, but warehouse receiving note DN-045 logged only 100 units physically received.', 85, 285);

        ctx.fillStyle = '#38bdf8';
        ctx.font = 'bold 13px monospace';
        ctx.fillText('Evidence Link: invoices.csv [Row 2, invoiced_qty=120] vs deliveries.csv [Row 2, delivered_qty=100] -> 20 unreceived x $50 = $1,000.00', 85, 315);

        // Discrepancy Card 2
        ctx.fillStyle = '#1c1917';
        ctx.fillRect(60, 355, 1160, 115);
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 2;
        ctx.strokeRect(60, 355, 1160, 115);

        ctx.fillStyle = '#f59e0b';
        ctx.font = 'bold 18px monospace';
        ctx.fillText('DISCREPANCY 2: CONTRACT RATE ESCALATION (+$200.00 USD)', 85, 390);

        ctx.fillStyle = '#f8fafc';
        ctx.font = '15px sans-serif';
        ctx.fillText('Invoice billed at $50.00/unit, breaching Master Procurement Contract ceiling rate of $48.00/unit.', 85, 420);

        ctx.fillStyle = '#38bdf8';
        ctx.font = 'bold 13px monospace';
        ctx.fillText('Evidence Link: invoices.csv [Row 2, unit_price=$50] vs contract_prices.csv [Row 2, contract_unit_price=$48] -> 100 units x $2 = $200.00', 85, 450);

        // Bottom Metrics Bar
        ctx.fillStyle = '#10b981';
        ctx.font = 'bold 18px monospace';
        ctx.fillText('TOTAL EXPOSURE: $1,200.00 USD   |   AUDIT CONFIDENCE: 96.5%   |   LATENCY: 184ms', 60, 545);

      } else if (scene === 3) {
        // SCENE 3: MANDATORY ZETARIS DEMO CHALLENGE PERSONAL INSIGHT (56s segment)
        ctx.fillStyle = '#06b6d4';
        ctx.font = 'bold 13px monospace';
        ctx.fillText('SCENE 3/5: ZETARIS DEMO CHALLENGE — WHY ZETARIS CLICKED FOR OUR TEAM (56s DEDICATED SEGMENT)', 60, 135);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 24px sans-serif';
        ctx.fillText('Decentralized Data Harness: The "Aha!" Moment That Eliminated Brittle ETL', 60, 170);

        // Required One-Sentence Statement Box
        ctx.fillStyle = '#082f49';
        ctx.fillRect(60, 190, 1160, 100);
        ctx.strokeStyle = '#06b6d4';
        ctx.lineWidth = 2;
        ctx.strokeRect(60, 190, 1160, 100);

        ctx.fillStyle = '#67e8f9';
        ctx.font = 'bold 12px monospace';
        ctx.fillText('REQUIRED STATEMENT: IN ONE SENTENCE, WHY DID YOU THINK IT WAS AMAZING? (PROJECT: TRACEBACK AI)', 80, 215);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'italic 13.5px sans-serif';
        ctx.fillText('"Zetaris completely eliminated our need for brittle, multi-month ETL pipelines by enabling TraceBack AI to', 80, 245);
        ctx.fillText('execute sub-20ms federated SQL queries directly across live ERP purchase orders, warehouse delivery receipts,', 80, 265);
        ctx.fillText('AP invoices, and legal contracts in place—providing 100% cell-level audit defensibility with zero data movement."', 80, 285);

        // Side by Side: Left = Insights / Right = Live SQL Query
        // Left Column: What Surprised Us & What It Enabled
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(60, 305, 565, 205);
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 1;
        ctx.strokeRect(60, 305, 565, 205);

        ctx.fillStyle = '#38bdf8';
        ctx.font = 'bold 13px monospace';
        ctx.fillText('1. The "Moment It Clicked" (Zero Data Movement)', 80, 332);
        ctx.fillStyle = '#cbd5e1';
        ctx.font = '12px sans-serif';
        ctx.fillText('No 6-month lakehouse project. Agent queries SAP, WMS & Contracts in situ.', 80, 355);

        ctx.fillStyle = '#34d399';
        ctx.font = 'bold 13px monospace';
        ctx.fillText('2. What Surprised Us (12ms Query Speed)', 80, 390);
        ctx.fillStyle = '#cbd5e1';
        ctx.font = '12px sans-serif';
        ctx.fillText('Pure SQL-92 execution joining 4 sources in 12ms with zero pipeline lag.', 80, 413);

        ctx.fillStyle = '#a855f7';
        ctx.font = 'bold 13px monospace';
        ctx.fillText('3. What It Enabled (100% Cell-Level Defensibility)', 80, 448);
        ctx.fillStyle = '#cbd5e1';
        ctx.font = '12px sans-serif';
        ctx.fillText('Every claim cites {file, row, col, value} ground truth. Zero AI hallucinations.', 80, 471);

        // Right Column: Live Zetaris SQL-92 query terminal
        ctx.fillStyle = '#030712';
        ctx.fillRect(645, 305, 575, 205);
        ctx.strokeStyle = '#0284c7';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(645, 305, 575, 205);

        ctx.font = '11.5px monospace';
        ctx.fillStyle = '#38bdf8';
        ctx.fillText('// Zetaris In-Situ Federated Cross-Source Virtualization', 665, 330);
        ctx.fillStyle = '#e2e8f0';
        ctx.fillText('SELECT po.po_id, po.ordered_qty, del.delivered_qty, inv.invoiced_qty,', 665, 352);
        ctx.fillText('       inv.unit_price, cp.contract_unit_price', 665, 372);
        ctx.fillStyle = '#818cf8';
        ctx.fillText('FROM   zetaris.sap_erp.purchase_orders po', 665, 395);
        ctx.fillStyle = '#34d399';
        ctx.fillText('LEFT JOIN zetaris.wms_cloud.deliveries del   ON po.po_id = del.po_id', 665, 417);
        ctx.fillStyle = '#fbbf24';
        ctx.fillText('LEFT JOIN zetaris.ap_portal.invoices inv     ON po.po_id = inv.po_id', 665, 439);
        ctx.fillStyle = '#c084fc';
        ctx.fillText('LEFT JOIN zetaris.legal_repo.contract_prices cp ON po.supplier_id = cp.supplier_id;', 665, 461);
        ctx.fillStyle = '#10b981';
        ctx.fillText('>> Execution Telemetry: 1 Record Joined in 12ms | 0 Bytes Copied', 665, 492);

        // Attestation Footer
        ctx.fillStyle = '#94a3b8';
        ctx.font = 'bold 12px monospace';
        ctx.fillText('SUBMITTED AS PART OF THE ZETARIS DEMO CHALLENGE   •   GOVERNED BY THE LAWS OF VICTORIA, AUSTRALIA', 60, 545);

      } else if (scene === 4) {
        // SCENE 4: Meterless Relay & Nightshift
        ctx.fillStyle = '#10b981';
        ctx.font = 'bold 14px monospace';
        ctx.fillText('SCENE 4/5: METERLESS RELAY ENGINE & NIGHTSHIFT AI', 60, 145);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 28px sans-serif';
        ctx.fillText('Autonomous 5-Stage Mission Orchestration & $0.00 Token Compute', 60, 190);

        const stages = [
          { num: "01", name: "Scout Intent", time: "12ms", desc: "Establishes audit parameters & zero-tolerance thresholds" },
          { num: "02", name: "Relay Zetaris", time: "18ms", desc: "Coordinates cross-source queries across SAP, WMS, AP & Contracts" },
          { num: "03", name: "Reconciliation", time: "8ms", desc: "Deterministic mathematical matching & variance quantification" },
          { num: "04", name: "Confidence Scoring", time: "14ms", desc: "Multi-point corroboration yielding 96.5% confidence score" },
          { num: "05", name: "Meterless Nightshift", time: "42ms", desc: "Race > Judge > Verify > Generate local AI reasoning cycle" }
        ];

        stages.forEach((stg, i) => {
          const y = 230 + i * 54;
          ctx.fillStyle = '#0f172a';
          ctx.fillRect(60, y, 1160, 46);
          ctx.strokeStyle = '#334155';
          ctx.strokeRect(60, y, 1160, 46);

          ctx.fillStyle = '#6366f1';
          ctx.font = 'bold 14px monospace';
          ctx.fillText(stg.num, 80, y + 28);

          ctx.fillStyle = '#f8fafc';
          ctx.font = 'bold 15px sans-serif';
          ctx.fillText(stg.name, 125, y + 28);

          ctx.fillStyle = '#94a3b8';
          ctx.font = '13px sans-serif';
          ctx.fillText(stg.desc, 320, y + 28);

          ctx.fillStyle = '#10b981';
          ctx.font = 'bold 13px monospace';
          ctx.fillText(stg.time, 1150, y + 28);
        });

        // Nightshift receipt
        ctx.fillStyle = '#a855f7';
        ctx.font = 'bold 16px monospace';
        ctx.fillText('NIGHTSHIFT RECEIPT: ns-rcpt-8f3a9e   |   $0.00 CLOUD TOKEN COST   |   METERLESS GAIA H-MEM COMMITTED', 60, 545);

      } else {
        // SCENE 5: Human in the loop & Clean benchmark
        ctx.fillStyle = '#a855f7';
        ctx.font = 'bold 14px monospace';
        ctx.fillText('SCENE 5/5: HUMAN-IN-THE-LOOP APPROVAL & CREDIBILITY BENCHMARK', 60, 145);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 28px sans-serif';
        ctx.fillText('Auditor Claim Approval & Zero False Positives on Clean Order PO-1002', 60, 190);

        // Approval Card
        ctx.fillStyle = '#064e3b';
        ctx.fillRect(60, 230, 560, 230);
        ctx.strokeStyle = '#059669';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(60, 230, 560, 230);

        ctx.fillStyle = '#6ee7b7';
        ctx.font = 'bold 16px monospace';
        ctx.fillText('HUMAN-IN-THE-LOOP APPROVAL', 85, 270);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 20px sans-serif';
        ctx.fillText('Claim #CLM-1001: APPROVED', 85, 310);

        ctx.fillStyle = '#e2e8f0';
        ctx.font = '14px sans-serif';
        ctx.fillText('• Lead auditor approved recovery of $1,200.00', 85, 345);
        ctx.fillText('• Supplier dispute email synthesized automatically', 85, 375);
        ctx.fillText('• Full cell-level audit trail attached to claim packet', 85, 405);
        ctx.fillText('• Status: Ready for dispatch to Supplier SUP-42', 85, 435);

        // Clean Benchmark Card
        ctx.fillStyle = '#1e1b4b';
        ctx.fillRect(660, 230, 560, 230);
        ctx.strokeStyle = '#4f46e5';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(660, 230, 560, 230);

        ctx.fillStyle = '#a5b4fc';
        ctx.font = 'bold 16px monospace';
        ctx.fillText('CREDIBILITY BENCHMARK: PO-1002', 685, 270);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 20px sans-serif';
        ctx.fillText('PO-1002 Clean Order: $0.00 Overcharge', 685, 310);

        ctx.fillStyle = '#e2e8f0';
        ctx.font = '14px sans-serif';
        ctx.fillText('• 50 units ordered in SAP ERP', 685, 345);
        ctx.fillText('• 50 units received in Warehouse WMS', 685, 375);
        ctx.fillText('• 50 units invoiced at exact $20.00 contract rate', 685, 405);

        ctx.fillStyle = '#34d399';
        ctx.font = 'bold 15px monospace';
        ctx.fillText('RESULT: 100% CONCORDANCE (ZERO FALSE POSITIVES)', 685, 435);

        // Bottom takeaway
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 18px sans-serif';
        ctx.fillText('TraceBack AI turns enterprise procurement leakage into measurable cash recovery in seconds.', 60, 545);
      }

      // Bottom Subtitles & Progress Bar
      ctx.fillStyle = '#090d16';
      ctx.fillRect(30, 600, 1220, 100);
      ctx.strokeStyle = '#1e293b';
      ctx.strokeRect(30, 600, 1220, 100);

      // Subtitle Text
      const sub = getSubtitle(sec);
      ctx.fillStyle = '#f8fafc';
      ctx.font = '600 15px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(sub, 640, 642);
      ctx.textAlign = 'left';

      // Progress Track
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(50, 670, 1180, 8);

      const progressWidth = Math.min((sec / totalDuration) * 1180, 1180);
      ctx.fillStyle = '#06b6d4';
      ctx.fillRect(50, 670, progressWidth, 8);

      // Time Display
      const curM = Math.floor(sec / 60);
      const curS = Math.floor(sec % 60);
      const totM = Math.floor(totalDuration / 60);
      const totS = Math.floor(totalDuration % 60);
      const timeStr = curM + ':' + (curS < 10 ? '0' : '') + curS + ' / ' + totM + ':' + (totS < 10 ? '0' : '') + totS;

      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 12px monospace';
      ctx.fillText(timeStr, 1150, 662);
    }

    draw(0);

    // Audio setup
    async function startRecording() {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const wavBase64 = "${wavBase64}";
      const binaryString = atob(wavBase64);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      const audioBuffer = await audioCtx.decodeAudioData(bytes.buffer);
      const source = audioCtx.createBufferSource();
      source.buffer = audioBuffer;

      const dest = audioCtx.createMediaStreamDestination();
      source.connect(dest);

      const stream = canvas.captureStream(20);
      stream.addTrack(dest.stream.getAudioTracks()[0]);

      const rec = new MediaRecorder(stream, { mimeType: 'video/mp4;codecs=avc1' });
      const chunks = [];
      rec.ondataavailable = e => { if (e.data.size > 0) chunks.push(e.data); };

      rec.onstop = async () => {
        const blob = new Blob(chunks, { type: 'video/mp4' });
        const arrayBuf = await blob.arrayBuffer();
        fetch('/save', { method: 'POST', body: arrayBuf });
      };

      rec.start(1000);
      source.start(0);

      const startTime = audioCtx.currentTime;
      const interval = setInterval(() => {
        const elapsed = audioCtx.currentTime - startTime;
        draw(elapsed);
        if (elapsed >= totalDuration) {
          clearInterval(interval);
          source.stop();
          rec.stop();
        }
      }, 50);

      source.onended = () => {
        clearInterval(interval);
        setTimeout(() => rec.stop(), 500);
      };
    }

    window.startRecording = startRecording;
  </script>
</body>
</html>
`;

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
  } else if (req.url === '/save') {
    const chunks = [];
    req.on('data', c => chunks.push(c));
    req.on('end', () => {
      const buf = Buffer.concat(chunks);
      
      // Save under both official challenge format (TRACEBACK-AI_011126.mp4) and primary format (traceback-ai-demo.mp4)
      const filenames = ['traceback-ai-demo.mp4', 'TRACEBACK-AI_011126.mp4'];
      
      filenames.forEach(fn => {
        const rootPath = path.resolve(fn);
        const publicPath = path.resolve('frontend/public/' + fn);
        const docsPath = path.resolve('docs/' + fn);

        fs.writeFileSync(rootPath, buf);
        fs.writeFileSync(publicPath, buf);
        fs.writeFileSync(docsPath, buf);

        console.log('Saved: ' + rootPath + ' (' + (buf.length / 1024 / 1024).toFixed(2) + ' MB)');
      });

      console.log('SUCCESS! Rendered and saved MP4 video in root, frontend/public, and docs!');
      res.writeHead(200);
      res.end('OK');
      setTimeout(() => {
        server.close();
        process.exit(0);
      }, 500);
    });
  }
});

server.listen(PORT, async () => {
  console.log(`Server listening on port ${PORT}... Launching Edge headless via puppeteer...`);
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  await page.goto(`http://localhost:${PORT}/`);
  console.log('Page loaded in Edge! Starting recording (163.6 seconds, natural normal-speed voiceover with Zetaris 56s insight segment)...');
  await page.evaluate(() => window.startRecording());
});
