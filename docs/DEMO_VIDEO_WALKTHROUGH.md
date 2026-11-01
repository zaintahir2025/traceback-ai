# TraceBack AI - Official Zetaris Demo Challenge Video Walkthrough and Production Script

> **Challenge**: Zetaris Demo Challenge (Open Agent Hackathon 2026)  
> **Project Name**: TraceBack AI  
> **Target Audience**: Challenge Judges, Enterprise Procurement Executives, Supply Chain Auditors  
> **Total Duration**: 2 Minutes 44 Seconds (163.6 Seconds Exact)  
> **Official File Naming**: `TRACEBACK-AI_011126.mp4` (Mirror: `traceback-ai-demo.mp4`)  
> **Key Financial Finding**: $1,200.00 Recovered on Purchase Order PO-1001 with 96.5% Confidence Score  
> **Mandatory Segment**: Scene 3 (56 Seconds Dedicated Personal Insight on Why Zetaris Clicked)  
> **Governing Law**: Laws of Victoria, Australia  

---

## Required Submission Statement

> **Question**: *"In one sentence, why did you think it was amazing?"*  
> **Statement**:  
> *"Zetaris completely eliminated our need for brittle, multi-month ETL pipelines by enabling TraceBack AI to execute sub-20ms federated SQL queries directly across live ERP purchase orders, warehouse delivery receipts, AP invoices, and legal contracts in place—providing 100% cell-level audit defensibility with zero data movement."*  
>  
> *When quoted, this statement will note that it was submitted as part of the Zetaris Demo Challenge.*

---

## Interactive Video Players Available

1. In-App Video Walkthrough:
   Click the "2-Min Demo Video" button or "Zetaris Challenge" button in the top navigation bar or sidebar of the dashboard to launch the synchronized audio/video walkthrough.
2. Standalone HTML5 Video Player:
   Open "demo-video.html" in any modern browser for a self-contained 60FPS simulation with speech synthesis narration, scrub controls, and chapter jump points:
   https://zaintahir2025.github.io/traceback-ai/demo-video.html
3. Direct MP4 Video Downloads:
   - Official Challenge Format: https://zaintahir2025.github.io/traceback-ai/TRACEBACK-AI_011126.mp4 (6.68 MB)
   - Primary Format: https://zaintahir2025.github.io/traceback-ai/traceback-ai-demo.mp4 (6.68 MB)

---

## Scene-by-Scene Storyboard & Audio Narration

### Scene 1: The Enterprise Problem & Spend Leakage (0:00 - 0:23)
Visual Display:
- Animated diagram of 4 enterprise data silos:
  1. Source A: SAP ERP Purchase Orders (PO-1001: 120 units ordered @ $50/ea)
  2. Source B: Warehouse WMS Delivery Notes (DN-045: 100 units physically received)
  3. Source C: Accounts Payable Invoices (INV-9001: 120 units billed at $50/ea)
  4. Source D: Master Contracts (Contract ceiling rate: $48/ea)
- Glowing red alert badge: "PROCUREMENT LEAKAGE DETECTED: 1.5% - 4% SPEND LOSS".

Spoken Narration (Audio Track):
"Welcome to TraceBack AI, an autonomous enterprise spend recovery platform. Modern organizations lose between 1.5% and 4% of procurement spend to uncaptured overcharges because critical data is fragmented across ERP purchase orders, warehouse delivery receipts, AP invoices, and legal contracts. TraceBack AI stops this financial leakage in real time."

---

### Scene 2: Live PO-1001 4-Way Audit & Evidence Trail (0:23 - 0:58)
Visual Display:
- TraceBack AI dashboard loaded on PO-1001 with Supplier SUP-42.
- Top Metrics: "$1,200.00 USD Overcharge Detected", "Audit Confidence: 96.5%", "Latency: 184ms".
- Card 1 (Red): Discrepancy 1 - Quantity Overbilling (+$1,000.00 USD). Invoiced 120 units vs delivered 100 units = 20 unreceived units * $50.00.
  - Evidence Link: invoices.csv [Row 2, invoiced_qty=120] vs deliveries.csv [Row 2, delivered_qty=100].
- Card 2 (Amber): Discrepancy 2 - Contract Rate Escalation (+$200.00 USD). Invoiced $50.00 vs contract ceiling $48.00 = $2.00 markup * 100 delivered units.
  - Evidence Link: invoices.csv [Row 2, unit_price=$50] vs contract_prices.csv [Row 2, contract_unit_price=$48].

Spoken Narration (Audio Track):
"In this live audit of Purchase Order PO-1001, TraceBack AI discovers $1,200 in overcharges in 184 milliseconds. First: quantity overbilling. The supplier billed for 120 units, but warehouse dock note DN-045 logged only 100 units physically received: a $1,000 loss. Second: contract rate escalation. The invoice charged $50 per unit, breaching our $48 master contract ceiling: adding $200 in rate creep. Every finding carries an immutable evidence link down to the exact file, row, and column."

---

### Scene 3: MANDATORY ZETARIS DEMO CHALLENGE PERSONAL INSIGHT (0:58 - 1:54 | 56 SECONDS EXACT)
Visual Display:
- Official Banner: "ZETARIS DEMO CHALLENGE 2026 SUBMISSION • PROJECT: TRACEBACK AI"
- Heading: "Decentralized Data Harness: The Moment It Clicked for Our Team"
- Glowing cyan quote box displaying the required one-sentence statement:
  "Zetaris completely eliminated our need for brittle, multi-month ETL pipelines by enabling TraceBack AI to execute sub-20ms federated SQL queries directly across live ERP purchase orders, warehouse delivery receipts, AP invoices, and legal contracts in place—providing 100% cell-level audit defensibility with zero data movement."
- Side-by-side technical proof:
  - Left: 1. The Moment It Clicked | 2. What Surprised Us (12ms execution) | 3. What It Enabled (100% cell-level ground truth)
  - Right: Live Zetaris SQL-92 query terminal executing federated join across SAP, WMS, AP, and Contracts with "1 Record Joined in 12ms | 0 Bytes Copied".
- Attestation footer: "SUBMITTED AS PART OF THE ZETARIS DEMO CHALLENGE • GOVERNED BY THE LAWS OF VICTORIA, AUSTRALIA"

Spoken Narration (Audio Track):
"This brings us to Zetaris Data Virtualization, submitted as part of the Zetaris Demo Challenge. When building TraceBack AI, our biggest hurdle was data fragmentation: how do you reconcile four disconnected enterprise silos without spending six months building a brittle ETL lakehouse? That was the moment Zetaris clicked for us. Zetaris acted as our decentralized data harness, allowing our agent to run federated SQL joins across live ERP tables, warehouse receipts, invoices, and contracts in place. What surprised us most was the speed: federated queries executing in just 12 milliseconds with zero data movement. Crucially, Zetaris enabled 100% cell-level audit defensibility: every claim cites raw file, row, and column coordinates with zero AI hallucinations. In one sentence: Zetaris eliminated the data engineering bottleneck, giving our autonomous agent instant access to fragmented enterprise reality."

---

### Scene 4: Meterless Relay Engine & Nightshift AI (1:54 - 2:19)
Visual Display:
- 5-Step Meterless Workflow execution sequence:
  1. Scout Intent (12ms): Target scope, tolerances ($0 threshold)
  2. Relay Zetaris (18ms): Federated cross-source query across SAP, WMS, AP, Contracts
  3. Reconciliation (8ms): Discrepancy math execution
  4. Confidence Scoring (14ms): Cross-source corroboration (96.5%)
  5. Meterless Nightshift AI (42ms): Race -> Judge -> Verify -> Generate cycle
- Immutable Nightshift Execution Receipt:
  - ID: ns-rcpt-8f3a9e
  - Local Hostspot Socket: 127.0.0.1:11434
  - Cloud Token Cost: $0.00 USD
  - Gaia H-MEM memory commit

Spoken Narration (Audio Track):
"The agent orchestration is powered by Meterless architecture. Scout Intent sets tolerances, Relay dispatches Zetaris queries, and reconciliation algorithms compute exact variances. For reasoning, Meterless Nightshift acts as our private AI provider, running a four-stage Race, Judge, Verify, and Generate cycle on local compute at zero dollar cloud token cost, committing all state to Gaia memory."

---

### Scene 5: Human-in-the-Loop Approval & Benchmark Credibility (2:19 - 2:44)
Visual Display:
- Left Card: Lead Auditor clicking "Claim #CLM-1001: APPROVED" ($1,200.00 recovery). Ready for dispatch to Supplier SUP-42.
- Right Card: Credibility Benchmark PO-1002 showing 50 units ordered, 50 delivered, $20 contract rate = $0.00 overcharge and 100% concordance.
- Bottom takeaway: "TraceBack AI turns enterprise procurement leakage into measurable cash recovery in seconds."

Spoken Narration (Audio Track):
"With one click, the lead auditor approves the $1,200 recovery claim, and TraceBack AI synthesizes a formal supplier dispute letter citing every dock note and contract section. Meanwhile, testing clean order PO-1002 returns zero overcharges and zero false alarms with 100% concordance. TraceBack AI turns procurement leakage into immediate cash recovery."

---

## Technical Attestations for Challenge Judges

1. Original Work: The entire codebase, agent architecture, virtual query definitions, and presentation assets are original works created by the team.
2. Central Role of Zetaris: Zetaris data virtualization is the foundational data layer enabling sub-20ms in-place cross-source querying without moving enterprise records.
3. Personal Insight Duration: The personal insight segment in Scene 3 is 56 seconds, meeting the 40–60 second requirement.
4. Jurisdiction: Governed by the laws of Victoria, Australia.
