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
    const totalDuration = 107.4;

    const subtitles = [
      { start: 0.0, end: 3.5, text: "Welcome to TraceBack AI — Autonomous Supplier Invoice & Reconciliation Agent." },
      { start: 3.5, end: 9.5, text: "Enterprises lose up to 4% of procurement spend to uncaptured invoice overcharges." },
      { start: 9.5, end: 18.0, text: "Data is siloed across ERP purchase orders, warehouse delivery receipts, AP invoices, and legal contracts." },
      { start: 18.0, end: 24.5, text: "TraceBack AI unifies all four sources into an autonomous agent that stops spend leakage in real time." },
      { start: 24.5, end: 32.5, text: "In a live audit of Purchase Order PO-1001, TraceBack AI discovers $1,200 in overcharges in 184 milliseconds." },
      { start: 32.5, end: 41.5, text: "Discrepancy 1: Quantity overbilling. Invoiced 120 units, but warehouse dock note DN-045 logged 100 received ($1,000 loss)." },
      { start: 41.5, end: 50.5, text: "Discrepancy 2: Contract rate escalation. Invoiced at $50/unit versus contracted $48 ceiling ($200 rate creep)." },
      { start: 50.5, end: 55.5, text: "Every single finding links directly to the exact file, row, and column." },
      { start: 55.5, end: 60.5, text: "This is powered by Zetaris data virtualization." },
      { start: 60.5, end: 68.0, text: "TraceBack AI executes federated SQL joins across all four data sources on the fly in 12 milliseconds." },
      { start: 68.0, end: 74.5, text: "Data stays in place with zero ETL pipelines, zero replication, and zero latency." },
      { start: 74.5, end: 79.5, text: "The agent workflow is orchestrated with Meterless architecture." },
      { start: 79.5, end: 87.0, text: "Scout Intent establishes audit rules, Relay coordinates queries, and Meterless Nightshift acts as our AI provider." },
      { start: 87.0, end: 95.5, text: "Nightshift runs a 4-stage local reasoning cycle on local compute, producing an audit receipt at $0.00 cloud token cost." },
      { start: 95.5, end: 101.5, text: "The lead auditor approves the claim with one click, and the system synthesizes a formal supplier dispute notice." },
      { start: 101.5, end: 107.4, text: "Testing clean order PO-1002 returns zero overcharges and zero false alarms. Cash recovery in seconds!" }
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
      ctx.fillStyle = '#1e1b4b';
      ctx.fillRect(870, 36, 170, 32);
      ctx.strokeStyle = '#4338ca';
      ctx.strokeRect(870, 36, 170, 32);
      ctx.fillStyle = '#a5b4fc';
      ctx.font = 'bold 12px monospace';
      ctx.fillText('ZETARIS FEDERATED', 885, 57);

      ctx.fillStyle = '#064e3b';
      ctx.fillRect(1055, 36, 175, 32);
      ctx.strokeStyle = '#059669';
      ctx.strokeRect(1055, 36, 175, 32);
      ctx.fillStyle = '#6ee7b7';
      ctx.font = 'bold 12px monospace';
      ctx.fillText('METERLESS NIGHTSHIFT', 1068, 57);

      // Determine Active Scene
      let scene = 1;
      if (sec >= 24.5 && sec < 55.5) scene = 2;
      else if (sec >= 55.5 && sec < 74.5) scene = 3;
      else if (sec >= 74.5 && sec < 95.5) scene = 4;
      else if (sec >= 95.5) scene = 5;

      // Main Card Container
      ctx.fillStyle = '#0b1120';
      ctx.fillRect(30, 100, 1220, 480);
      ctx.strokeStyle = '#1e293b';
      ctx.strokeRect(30, 100, 1220, 480);

      if (scene === 1) {
        // SCENE 1: The Problem
        ctx.fillStyle = '#f43f5e';
        ctx.font = 'bold 14px monospace';
        ctx.fillText('SCENE 1/5: THE $1.5M ENTERPRISE PROCUREMENT LEAKAGE', 60, 145);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 28px sans-serif';
        ctx.fillText('Why Enterprises Lose 1.5% to 4% of Procurement Spend', 60, 190);

        ctx.fillStyle = '#94a3b8';
        ctx.font = '16px sans-serif';
        ctx.fillText('Global procurement operations suffer from 4 disconnected, uncoordinated enterprise silos:', 60, 225);

        // 4 Silo Cards
        const silos = [
          { name: "ERP System (SAP)", sub: "Purchase Orders", detail: "PO-1001: 120 units ordered @ $50/ea ($6,000)", color: "#38bdf8" },
          { name: "WMS Logistics", sub: "Goods Receipts", detail: "DN-045: Only 100 units physically delivered", color: "#f59e0b" },
          { name: "Accounts Payable", sub: "Supplier Invoices", detail: "INV-9001: Invoiced for full 120 units ($6,000)", color: "#f43f5e" },
          { name: "Legal / Sourcing", sub: "Master Contracts", detail: "Contract Ceiling: Cap rate $48/ea (not $50)", color: "#a855f7" }
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
        ctx.fillText('Purchase Order PO-1001: $1,200.00 Overcharge Uncovered', 60, 190);

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
        // SCENE 3: Zetaris Data Virtualization
        ctx.fillStyle = '#38bdf8';
        ctx.font = 'bold 14px monospace';
        ctx.fillText('SCENE 3/5: ZETARIS DATA VIRTUALIZATION ENGINE', 60, 145);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 28px sans-serif';
        ctx.fillText('Zero-ETL Federated SQL Query Across 4 Disparate Sources', 60, 190);

        // SQL Query Code Box
        ctx.fillStyle = '#030712';
        ctx.fillRect(60, 220, 1160, 240);
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(60, 220, 1160, 240);

        ctx.font = '15px monospace';
        ctx.fillStyle = '#38bdf8';
        ctx.fillText('SELECT po.po_id, po.supplier_id, po.ordered_qty,', 85, 260);
        ctx.fillText('       del.delivered_qty, inv.invoiced_qty, inv.unit_price, cp.contract_unit_price', 85, 290);
        ctx.fillStyle = '#818cf8';
        ctx.fillText('FROM   zetaris.sap_erp.purchase_orders po', 85, 325);
        ctx.fillStyle = '#34d399';
        ctx.fillText('LEFT JOIN zetaris.wms_cloud.deliveries del      ON po.po_id = del.po_id', 85, 360);
        ctx.fillStyle = '#fbbf24';
        ctx.fillText('LEFT JOIN zetaris.ap_portal.invoices inv        ON po.po_id = inv.po_id', 85, 395);
        ctx.fillStyle = '#c084fc';
        ctx.fillText('LEFT JOIN zetaris.legal_repo.contract_prices cp ON po.supplier_id = cp.supplier_id;', 85, 430);

        // Verification callout
        ctx.fillStyle = '#10b981';
        ctx.font = 'bold 18px sans-serif';
        ctx.fillText('Executed in 12ms   •   Zero Data Movement   •   100% Immutable Cell-Level Ground Truth', 60, 545);

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
          { num: "02", name: "Relay Zetaris", time: "18ms", desc: "Coordinates cross-source queries across SAP, WMS & AP" },
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
        ctx.font = 'bold 17px monospace';
        ctx.fillText('NIGHTSHIFT RECEIPT: ns-rcpt-8f3a9e   |   $0.00 CLOUD TOKEN COST   |   METERLESS GAIA H-MEM COMMITTED', 60, 545);

      } else {
        // SCENE 5: Human in the loop & Clean benchmark
        ctx.fillStyle = '#a855f7';
        ctx.font = 'bold 14px monospace';
        ctx.fillText('SCENE 5/5: HUMAN-IN-THE-LOOP APPROVAL & CREDIBILITY BENCHMARK', 60, 145);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 28px sans-serif';
        ctx.fillText('Auditor Claim Approval & Zero False Positives on PO-1002', 60, 190);

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
        ctx.font = 'bold 19px sans-serif';
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
      ctx.font = '600 16px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(sub, 640, 642);
      ctx.textAlign = 'left';

      // Progress Track
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(50, 670, 1180, 8);

      const progressWidth = Math.min((sec / totalDuration) * 1180, 1180);
      ctx.fillStyle = '#6366f1';
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
      const rootPath = path.resolve('traceback-ai-demo.mp4');
      const publicPath = path.resolve('frontend/public/traceback-ai-demo.mp4');
      const docsPath = path.resolve('docs/traceback-ai-demo.mp4');

      fs.writeFileSync(rootPath, buf);
      fs.writeFileSync(publicPath, buf);
      fs.writeFileSync(docsPath, buf);

      console.log('SUCCESS! Rendered and saved MP4 video:');
      console.log(' - ' + rootPath + ' (' + (buf.length / 1024 / 1024).toFixed(2) + ' MB)');
      console.log(' - ' + publicPath);
      console.log(' - ' + docsPath);

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
  console.log('Page loaded in Edge! Starting recording (107 seconds, natural normal-speed voiceover)...');
  await page.evaluate(() => window.startRecording());
});
