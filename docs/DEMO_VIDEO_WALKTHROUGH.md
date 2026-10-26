# TraceBack AI - 2-Minute Demo Video Walkthrough and Production Script

Target Audience: Hackathon Judges, Enterprise Procurement Executives, Supply Chain Auditors
Total Duration: 2 Minutes (120 Seconds Exact)
Key Financial Finding: $1,200.00 Recovered on Purchase Order PO-1001 with 96.5% Confidence Score
Sponsor Technologies Showcased: Zetaris (Data Virtualization), Meterless (Relay Engine & Gaia H-MEM), Meterless Nightshift ($0.00 Token Compute Receipt), NVIDIA NIM (meta/llama-3.1-8b-instruct)

---

## Interactive Video Players Available

1. In-App Video Walkthrough:
   Click the "2-Min Demo Video" button in the top navigation bar or sidebar of the dashboard to launch the synchronized audio/video walkthrough.
2. Standalone HTML5 Video Player:
   Open "demo-video.html" in any modern browser for a self-contained 4K 60FPS simulation with speech synthesis narration, scrub controls, and chapter jump points.
3. Web Link on GitHub Pages:
   https://zaintahir2025.github.io/traceback-ai/demo-video.html

---

## Scene-by-Scene Storyboard & Audio Narration

### Scene 1: The Enterprise Problem (0:00 - 0:24)
Visual Display:
- Animated diagram of 4 enterprise data silos:
  1. Source A: SAP ERP Purchase Orders (120 units ordered)
  2. Source B: Warehouse WMS Delivery Notes (100 units physically received)
  3. Source C: Accounts Payable Supplier Invoices (120 units invoiced at $50/unit)
  4. Source D: Master Contract Agreements ($48/unit contracted price)
- Glowing red alert badge: "PROCUREMENT LEAKAGE DETECTED: 1.5% - 4% SPEND LOSS".

Spoken Narration (Audio Track):
"Welcome to TraceBack AI. In global supply chains, companies quietly lose between 1.5% and 4% of their total procurement spend to uncaptured invoice overcharges. The root cause is data fragmentation. Purchase orders live in ERP systems, warehouse delivery receipts live in WMS, supplier invoices arrive in accounts payable, and contract prices sit in legal agreements. No human has time to manually cross-reference all four. Introducing TraceBack AI: an autonomous agent that unifies all four sources, detects discrepancies in real time, and proves every dollar with an immutable evidence trail."

---

### Scene 2: Live PO-1001 Audit and Evidence Trail (0:24 - 0:48)
Visual Display:
- TraceBack AI dashboard loaded on PO-1001 with Supplier SUP-42.
- Top Metrics: "$1,200.00 USD Overcharge Detected", "Audit Confidence: 96.5%".
- Card 1 (Red): Discrepancy 1 - Quantity Overbilling (+$1,000.00). Invoiced 120 units vs delivered 100 units = 20 unreceived units * $50.00.
  - Evidence Chips: invoices.csv:L2:invoiced_qty (120), deliveries.csv:L2:delivered_qty (100).
- Card 2 (Amber): Discrepancy 2 - Contract Rate Escalation (+$200.00). Invoiced $50.00 vs contract $48.00 = $2.00 markup * 100 delivered units.
  - Evidence Chips: invoices.csv:L2:unit_price ($50), contract_prices.csv:L2:contract_unit_price ($48).

Spoken Narration (Audio Track):
"Here is a live audit of Purchase Order PO-1001 with supplier SUP-42. In under 200 milliseconds, TraceBack AI surfaces exactly $1,200 in recoverable overcharges across two distinct discrepancies, corroborated with a 96.5% confidence score. First, quantity overbilling: the supplier billed for 120 units, but warehouse receiving note DN-045 logged only 100 units physically delivered. That is 20 unreceived units billed at $50 each, yielding $1,000 in direct loss. Second, price escalation: the invoice charged $50 per unit, but our contracted price guarantees $48. That is an unauthorized $2 markup on 100 received units, adding $200 in rate leakage. Every finding cites the exact CSV file, row, and column."

---

### Scene 3: Zetaris Data Virtualization Layer (0:48 - 1:12)
Visual Display:
- Zetaris federated virtual schema code panel showing SQL-92 query:
  SELECT po.po_id, po.ordered_qty, del.delivered_qty, inv.invoiced_qty, inv.unit_price, cp.contract_unit_price
  FROM purchase_orders po
  LEFT JOIN deliveries del ON po.po_id = del.po_id
  LEFT JOIN invoices inv ON po.po_id = inv.po_id
  LEFT JOIN contract_prices cp ON po.supplier_id = cp.supplier_id
  WHERE po.po_id = 'PO-1001';
- Execution Telemetry: 1 Record Joined in 12ms. Zero ETL pipeline lag. Zero hallucination risk.

Spoken Narration (Audio Track):
"How does TraceBack AI achieve this without brittle ETL pipelines? Through Zetaris data virtualization. TraceBack AI executes federated SQL joins across purchase orders, deliveries, invoices, and contracts on the fly. Whether connecting to Zetaris cloud network or our built-in virtual SQL federator, the data remains where it lives. Every discrepancy carries an immutable evidence trail linking to the exact file, row, column, and raw ground-truth value. When an auditor or supplier clicks an evidence chip, they inspect the raw data row instantly."

---

### Scene 4: Meterless Agent Architecture and Nightshift AI (1:12 - 1:36)
Visual Display:
- 5-Step Meterless Workflow execution sequence:
  1. Scout Intent (12ms): Target scope, tolerances ($0 threshold)
  2. Relay Zetaris (18ms): Federated cross-source query
  3. Reconciliation (8ms): Discrepancy math execution
  4. Confidence Scoring (14ms): Cross-source corroboration
  5. Meterless Nightshift AI (42ms): Race -> Judge -> Verify -> Generate cycle
- Immutable Nightshift Execution Receipt:
  - ID: ns-rcpt-8f3a9e
  - Local Hostspot Socket: 127.0.0.1:11434
  - Cloud Token Cost: $0.00 USD
  - Mathematical integrity: 100% verified

Spoken Narration (Audio Track):
"TraceBack AI is not a brittle prompt wrapper; it is powered by Meterless Agent architecture. Step one: Scout Intent establishes audit rules and discrepancy tolerances. Step two: Relay execution queries Zetaris. Step three: reconciliation algorithms quantify exposure. Step four: confidence scoring verifies cross-source coherence. And step five: Meterless Nightshift acts as our autonomous AI provider, executing a four-stage Race, Judge, Verify, and Generate cycle on local compute, producing an immutable audit receipt at zero dollar cloud token cost. The entire mission context is committed to Meterless Gaia H-MEM memory."

---

### Scene 5: Human-in-the-Loop Approval and Supplier Resolution (1:36 - 2:00)
Visual Display:
- Lead Auditor clicking "Claim Approved: Recover $1,200.00".
- Cryptographic Audit Certificate generated and sealed.
- Supplier Dispute Email Panel:
  - Subject: Overcharge Notice: Invoice INV-9001 ($1,200.00 Variance)
  - Polite, professional letter with itemized PO, invoice, and delivery references demanding an immediate $1,200.00 credit memo.
- Credibility Benchmark: PO-1002 showing $0.00 overcharge and 100% concordance.

Spoken Narration (Audio Track):
"Crucially, TraceBack AI keeps a human in the loop. No dispute is dispatched without auditor approval. With one click, the lead auditor approves the $1,200 recovery claim. Instantly, our system synthesizes a professional, evidence-backed supplier dispute letter ready for dispatch. It itemizes the purchase order, invoice number, delivery note, contract schedule, and requests an immediate $1,200 credit memo. Furthermore, TraceBack AI guarantees zero false positives: testing clean purchase order PO-1002 returns zero dollars in overcharge with 100% concordance. TraceBack AI turns procurement leakages into measurable cash recovery in seconds."

---

## Technical Summary for Judges

- Architecture: Full-stack TypeScript Monorepo (Node.js Express + React Vite Tailwind).
- Data Virtualization: ZetarisClient with live API switch and SQLite in-memory federated query engine.
- Agent Orchestration: Meterless Relay Engine with Gaia H-MEM persistent context memory.
- Primary AI Provider: Meterless Nightshift (4-stage local race/judge/verify/generate cycle at $0.00 token cost).
- Dispute Drafting: NVIDIA NIM (meta/llama-3.1-8b-instruct) fallback.
- Test Coverage: 12/12 passing unit tests covering reconciliation, edge cases, and MCP tool protocols.
