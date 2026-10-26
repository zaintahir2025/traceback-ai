import fs from 'node:fs';
import path from 'node:path';

function generatePresentationHtml() {
  const slides = [
    {
      id: 1, section: "Cover", title: "TraceBack AI",
      sub: "Autonomous 4-Way Cross-Source Data Virtualization & Spend Recovery Agent",
      render: `
        <div style="background:#0f172a; border:2px solid #312e81; border-radius:1rem; padding:2rem; height:100%; display:flex; flex-direction:column; justify-content:space-between;">
          <div>
            <div style="display:inline-block; font-size:0.75rem; font-family:'JetBrains Mono',monospace; padding:0.25rem 0.75rem; background:rgba(99,102,241,0.2); border:1px solid #6366f1; border-radius:9999px; color:#c7d2fe; margin-bottom:1rem; font-weight:700;">GLOBAL AI HACKATHON 2026</div>
            <div style="font-size:2.8rem; font-weight:800; color:#fff; line-height:1.1; margin-bottom:0.5rem;">TraceBack AI</div>
            <div style="font-size:1.15rem; font-weight:700; color:#38bdf8; margin-bottom:0.75rem;">Autonomous 4-Way Cross-Source Data Virtualization & Spend Recovery Agent</div>
            <div style="font-size:0.92rem; color:#cbd5e1; max-width:850px; line-height:1.5;">Unifying ERP purchase orders, warehouse delivery notes, AP invoices, and master contracts with Zero-ETL virtualization, cell-level audit defensibility, and $0.00 local AI execution.</div>
          </div>
          <div class="grid-3">
            <div style="background:#082F49; border:1.5px solid #38bdf8; border-radius:0.75rem; padding:1rem;">
              <div style="font-size:0.75rem; font-family:'JetBrains Mono',monospace; font-weight:700; color:#38bdf8; margin-bottom:0.35rem;">ZETARIS VIRTUALIZATION</div>
              <div style="font-size:0.85rem; color:#cbd5e1;">Zero-ETL federated queries across 4 enterprise datasets in 12ms.</div>
            </div>
            <div style="background:#064E3B; border:1.5px solid #10b981; border-radius:0.75rem; padding:1rem;">
              <div style="font-size:0.75rem; font-family:'JetBrains Mono',monospace; font-weight:700; color:#10b981; margin-bottom:0.35rem;">METERLESS RELAY & H-MEM</div>
              <div style="font-size:0.85rem; color:#cbd5e1;">Scout intent, relay coordination, and persistent Gaia working memory.</div>
            </div>
            <div style="background:#2E1065; border:1.5px solid #a855f7; border-radius:0.75rem; padding:1rem;">
              <div style="font-size:0.75rem; font-family:'JetBrains Mono',monospace; font-weight:700; color:#a855f7; margin-bottom:0.35rem;">NIGHTSHIFT AI PROVIDER</div>
              <div style="font-size:0.85rem; color:#cbd5e1;">4-stage Race/Judge/Verify/Generate cycle at $0 cloud token cost.</div>
            </div>
          </div>
          <div style="font-size:0.8rem; color:#94a3b8; border-top:1px solid #1e293b; padding-top:0.75rem; display:flex; justify-content:space-between;">
            <span>Live Deployment: https://zaintahir2025.github.io/traceback-ai/</span>
            <span>Lead Developer: Zain Tahir</span>
          </div>
        </div>
      `,
      notes: "Welcome everyone. Today we are presenting TraceBack AI, an autonomous multi-agent platform designed to eliminate enterprise procurement spend leakage. By combining Zetaris Zero-ETL Data Virtualization, Meterless Relay Orchestration, and Meterless Nightshift local intelligence, TraceBack AI reconciles purchase orders, delivery notes, supplier invoices, and legal contracts in under 200 milliseconds with an immutable, cell-level audit trail."
    },
    {
      id: 2, section: "Executive Brief", title: "Mission & Core Value Proposition",
      sub: "Eliminating enterprise procurement leakage through autonomous cross-source data virtualization.",
      render: `
        <div class="grid-2" style="height:100%;">
          <div class="card" style="border-color:#f43f5e;">
            <div class="card-title highlight-red">01 • THE INDUSTRY IMPERATIVE</div>
            <div class="card-heading">1.5% to 4.0% Spend Leakage</div>
            <div class="card-desc">Fortune 500 enterprises lose billions annually to uncaptured invoice discrepancies, quantity mismatches, and contract rate creep across fragmented enterprise software.</div>
          </div>
          <div class="card" style="border-color:#38bdf8;">
            <div class="card-title highlight-sky">02 • THE ARCHITECTURAL BREAKTHROUGH</div>
            <div class="card-heading">Zero-ETL Virtualization</div>
            <div class="card-desc">Instead of building slow, brittle ETL data pipelines, TraceBack AI uses Zetaris Data Virtualization to query live enterprise datasets in place with zero data movement.</div>
          </div>
          <div class="card" style="border-color:#10b981;">
            <div class="card-title highlight-green">03 • AUTONOMOUS MULTI-AGENT AUDIT</div>
            <div class="card-heading">Meterless Engine & Nightshift AI</div>
            <div class="card-desc">Meterless Engine orchestrates Scout Intent and Relay tools, while Meterless Nightshift provides local reasoning at $0.00 cloud token cost with cryptographic receipts.</div>
          </div>
          <div class="card" style="border-color:#a855f7;">
            <div class="card-title highlight-purple">04 • HUMAN GOVERNANCE & ACTION</div>
            <div class="card-heading">1-Click Claim Approvals</div>
            <div class="card-desc">Lead auditors retain final 1-click claim authority, generating automated supplier dispute notices citing exact contract clauses and delivery notes.</div>
          </div>
        </div>
      `,
      notes: "Our mission is simple: transform procurement auditing from a slow, sample-based, manual retrospective into a real-time, 100% census spend defense system. Traditional systems fail because data is siloed across ERP, warehouse, accounts payable, and legal contracts. TraceBack AI connects these systems virtually, analyzes discrepancies deterministically, and prepares ready-to-send dispute claims in seconds."
    },
    {
      id: 3, section: "Deck Structure", title: "Presentation Agenda: 5 Strategic Dimensions",
      sub: "Comprehensive roadmap covering problem, users, solution, architecture, and sponsor tech.",
      render: `
        <div style="display:flex; flex-direction:column; gap:0.6rem; height:100%; justify-content:center;">
          <div class="card" style="border-color:#f43f5e; display:flex; justify-content:space-between; align-items:center; padding:0.9rem 1.4rem;">
            <div><span class="highlight-red" style="font-size:1.1rem; font-weight:800; margin-right:1rem;">01</span><strong style="color:#fff; font-size:1.05rem;">The Problem</strong><span style="color:#f43f5e; font-size:0.75rem; margin-left:0.75rem; font-family:'JetBrains Mono';">SLIDES 4-8</span></div>
            <div style="font-size:0.85rem; color:#94a3b8; max-width:650px;">$14T B2B spend volume, 4 disconnected silos, structural failure of 2-way/3-way matching, and why brittle ETL pipelines fail.</div>
          </div>
          <div class="card" style="border-color:#38bdf8; display:flex; justify-content:space-between; align-items:center; padding:0.9rem 1.4rem;">
            <div><span class="highlight-sky" style="font-size:1.1rem; font-weight:800; margin-right:1rem;">02</span><strong style="color:#fff; font-size:1.05rem;">Target Users</strong><span style="color:#38bdf8; font-size:0.75rem; margin-left:0.75rem; font-family:'JetBrains Mono';">SLIDES 9-13</span></div>
            <div style="font-size:0.85rem; color:#94a3b8; max-width:650px;">Chief Procurement Officer, Lead Financial Auditor, Accounts Payable Controller, and Warehouse Receiving Dock Operations.</div>
          </div>
          <div class="card" style="border-color:#10b981; display:flex; justify-content:space-between; align-items:center; padding:0.9rem 1.4rem;">
            <div><span class="highlight-green" style="font-size:1.1rem; font-weight:800; margin-right:1rem;">03</span><strong style="color:#fff; font-size:1.05rem;">The Solution</strong><span style="color:#10b981; font-size:0.75rem; margin-left:0.75rem; font-family:'JetBrains Mono';">SLIDES 14-18</span></div>
            <div style="font-size:0.85rem; color:#94a3b8; max-width:650px;">TraceBack AI 4-way reconciliation, live PO-1001 audit uncovering $1,200 leakage, and clean PO-1002 zero false-positive proof.</div>
          </div>
          <div class="card" style="border-color:#f59e0b; display:flex; justify-content:space-between; align-items:center; padding:0.9rem 1.4rem;">
            <div><span class="highlight-amber" style="font-size:1.1rem; font-weight:800; margin-right:1rem;">04</span><strong style="color:#fff; font-size:1.05rem;">System Architecture</strong><span style="color:#f59e0b; font-size:0.75rem; margin-left:0.75rem; font-family:'JetBrains Mono';">SLIDES 19-23</span></div>
            <div style="font-size:0.85rem; color:#94a3b8; max-width:650px;">4-tier enterprise system pipeline, 5-stage Meterless mission workflow, cell-level evidence index, and human governance.</div>
          </div>
          <div class="card" style="border-color:#a855f7; display:flex; justify-content:space-between; align-items:center; padding:0.9rem 1.4rem;">
            <div><span class="highlight-purple" style="font-size:1.1rem; font-weight:800; margin-right:1rem;">05</span><strong style="color:#fff; font-size:1.05rem;">Sponsor Tech</strong><span style="color:#a855f7; font-size:0.75rem; margin-left:0.75rem; font-family:'JetBrains Mono';">SLIDES 24-28</span></div>
            <div style="font-size:0.85rem; color:#94a3b8; max-width:650px;">Zetaris Zero-ETL Data Virtualization, Meterless Scout & Relay Router, Meterless Nightshift ($0.00 local AI), and enterprise ROI.</div>
          </div>
        </div>
      `,
      notes: "Here is the master roadmap for our presentation. We will walk through five clear sections: first, the enterprise procurement problem; second, the four key personas who benefit; third, our autonomous reconciliation solution with live benchmark data; fourth, our four-tier architecture and governance model; and fifth, deep integration with our sponsor technologies: Zetaris, Meterless Engine, and Meterless Nightshift."
    },
    {
      id: 4, section: "SECTION 01 / 05", title: "The Enterprise Procurement Problem",
      sub: "Why Fortune 500 enterprises lose billions annually to uncaptured procurement spend leakage.",
      render: `
        <div style="background:#0f172a; border:2px solid #f43f5e; border-radius:1rem; padding:2rem; height:100%; display:flex; flex-direction:column; justify-content:space-between;">
          <div>
            <div style="display:inline-block; font-size:0.75rem; font-family:'JetBrains Mono',monospace; padding:0.25rem 0.75rem; background:rgba(244,63,94,0.2); border:1px solid #f43f5e; border-radius:9999px; color:#f43f5e; margin-bottom:1rem; font-weight:700;">SECTION 01 / 05</div>
            <div style="font-size:2.4rem; font-weight:800; color:#fff; line-height:1.2; margin-bottom:0.5rem;">The Enterprise Procurement Problem</div>
            <div style="font-size:1.1rem; color:#cbd5e1;">Why Fortune 500 enterprises lose billions annually to uncaptured procurement spend leakage.</div>
          </div>
          <div class="grid-3">
            <div class="card" style="border-color:#1e293b;">
              <div style="font-size:1.4rem; font-weight:800; color:#f43f5e; margin-bottom:0.25rem;">01</div>
              <div style="font-size:1.05rem; font-weight:700; color:#fff; margin-bottom:0.5rem;">$14T B2B Volume</div>
              <div style="font-size:0.85rem; color:#94a3b8;">Overwhelming annual invoice velocity prevents exhaustive manual auditing across enterprise AP.</div>
            </div>
            <div class="card" style="border-color:#1e293b;">
              <div style="font-size:1.4rem; font-weight:800; color:#f43f5e; margin-bottom:0.25rem;">02</div>
              <div style="font-size:1.05rem; font-weight:700; color:#fff; margin-bottom:0.5rem;">4 Fractured Silos</div>
              <div style="font-size:0.85rem; color:#94a3b8;">ERP purchase orders, warehouse dock notes, AP invoices, and legal contracts do not talk to each other.</div>
            </div>
            <div class="card" style="border-color:#1e293b;">
              <div style="font-size:1.4rem; font-weight:800; color:#f43f5e; margin-bottom:0.25rem;">03</div>
              <div style="font-size:1.05rem; font-weight:700; color:#fff; margin-bottom:0.5rem;">Legacy Matching Fails</div>
              <div style="font-size:0.85rem; color:#94a3b8;">Traditional 2-way and 3-way matching rules leave massive loopholes for rate creep and short shipments.</div>
            </div>
          </div>
        </div>
      `,
      notes: "Section One focuses on the Problem. We examine why modern enterprise finance departments fail to catch invoice overpayments. With fourteen trillion dollars in annual business-to-business commerce, the sheer volume overwhelms accounts payable teams. Data lives in disconnected silos, and legacy matching tools leave gaping blind spots."
    },
    {
      id: 5, section: "1. Problem", title: "The $14 Trillion Global Procurement Challenge",
      sub: "Massive transaction velocity overwhelms traditional financial controls.",
      render: `
        <div style="display:flex; flex-direction:column; justify-content:space-between; height:100%;">
          <div class="grid-4">
            <div class="card" style="border-color:#38bdf8; text-align:center;">
              <div style="font-size:2.2rem; font-weight:800; color:#38bdf8;">$14T</div>
              <div style="font-size:0.95rem; font-weight:700; color:#fff; margin-top:0.25rem;">Global B2B Spend</div>
              <div style="font-size:0.75rem; color:#94a3b8;">Commercial procurement worldwide</div>
            </div>
            <div class="card" style="border-color:#f43f5e; text-align:center;">
              <div style="font-size:2.2rem; font-weight:800; color:#f43f5e;">4.0%</div>
              <div style="font-size:0.95rem; font-weight:700; color:#fff; margin-top:0.25rem;">Max Spend Leakage</div>
              <div style="font-size:0.75rem; color:#94a3b8;">Lost to uncaptured overcharges</div>
            </div>
            <div class="card" style="border-color:#f59e0b; text-align:center;">
              <div style="font-size:2.2rem; font-weight:800; color:#f59e0b;">100K+</div>
              <div style="font-size:0.95rem; font-weight:700; color:#fff; margin-top:0.25rem;">Invoices / Year</div>
              <div style="font-size:0.75rem; color:#94a3b8;">Average enterprise transaction volume</div>
            </div>
            <div class="card" style="border-color:#a855f7; text-align:center;">
              <div style="font-size:2.2rem; font-weight:800; color:#a855f7;">&lt;5%</div>
              <div style="font-size:0.95rem; font-weight:700; color:#fff; margin-top:0.25rem;">Audit Coverage</div>
              <div style="font-size:0.75rem; color:#94a3b8;">Invoices audited in depth before payment</div>
            </div>
          </div>
          <div class="card" style="border-color:#1e293b; background:#0f172a; margin-top:0.75rem;">
            <div class="card-title highlight-amber">WHY ENTERPRISES FAIL TO CAPTURE OVERCHARGES TODAY:</div>
            <div style="font-size:0.85rem; color:#cbd5e1; line-height:1.6;">
              1. <strong>Disconnected Software Systems:</strong> SAP ERP, Blue Yonder WMS, Coupa AP, and DocuSign contracts do not share a common query model.<br/>
              2. <strong>Fragile Data Pipelines:</strong> Traditional ETL data lakehouse projects take 6-12 months and $500K+ in engineering before returning insights.<br/>
              3. <strong>Human Bottlenecks:</strong> Clerks match PO totals against invoice headers, ignoring line-item rate escalations and warehouse receipt exceptions.<br/>
              4. <strong>Commercial Erosion:</strong> Suppliers quietly test rate increases; when unflagged on the first invoice, higher rates become the de facto baseline.
            </div>
          </div>
        </div>
      `,
      notes: "Global B2B procurement processes 14 trillion dollars every year. Yet, less than 5% of invoices ever receive rigorous, multi-point cross-source verification before payment. ERPs perform basic two-way matching that only compares the invoice against the purchase order. They completely miss the warehouse receiving dock notes where items were damaged or unreceived, and they miss the contract pricing schedule where unit price ceilings were negotiated."
    },
    {
      id: 6, section: "1. Problem", title: "The Anatomy of Spend Leakage: 4 Primary Vectors",
      sub: "Quantifying where enterprise cash disappears in procurement cycles.",
      render: `
        <div class="grid-4" style="height:100%;">
          <div class="card" style="border-color:#f43f5e;">
            <div class="card-title highlight-red">1. QUANTITY OVERBILLING</div>
            <div style="font-size:0.75rem; font-family:'JetBrains Mono'; color:#f43f5e; margin-bottom:0.5rem; font-weight:700;">45% OF TOTAL LEAKAGE</div>
            <div class="card-desc">Suppliers invoice for ordered quantities rather than delivered quantities. Warehouse damaged or short receipt decrements rarely reach Accounts Payable.</div>
            <div style="font-size:0.75rem; color:#fca5a5; background:rgba(244,63,94,0.1); padding:0.5rem; border-radius:0.5rem; border:1px solid rgba(244,63,94,0.3); margin-top:0.5rem;">PO-1001: 120 invoiced vs 100 received = $1,000 loss</div>
          </div>
          <div class="card" style="border-color:#f59e0b;">
            <div class="card-title highlight-amber">2. RATE ESCALATION</div>
            <div style="font-size:0.75rem; font-family:'JetBrains Mono'; color:#f59e0b; margin-bottom:0.5rem; font-weight:700;">30% OF TOTAL LEAKAGE</div>
            <div class="card-desc">Suppliers quietly bill standard catalogue prices instead of negotiated master contract schedules. Creep accumulates across thousands of line items.</div>
            <div style="font-size:0.75rem; color:#fde68a; background:rgba(245,158,11,0.1); padding:0.5rem; border-radius:0.5rem; border:1px solid rgba(245,158,11,0.3); margin-top:0.5rem;">PO-1001: Billed $50 vs $48 contract = $200 loss</div>
          </div>
          <div class="card" style="border-color:#38bdf8;">
            <div class="card-title highlight-sky">3. PHANTOM FEES</div>
            <div style="font-size:0.75rem; font-family:'JetBrains Mono'; color:#38bdf8; margin-bottom:0.5rem; font-weight:700;">15% OF TOTAL LEAKAGE</div>
            <div class="card-desc">Invoices add unapproved handling fees, logistics surcharges, fuel indexing, or expediting tariffs violating master contract terms prohibiting auxiliary billing.</div>
            <div style="font-size:0.75rem; color:#bae6fd; background:rgba(56,189,248,0.1); padding:0.5rem; border-radius:0.5rem; border:1px solid rgba(56,189,248,0.3); margin-top:0.5rem;">Unapproved $150 logistics fee appended without CPO approval</div>
          </div>
          <div class="card" style="border-color:#a855f7;">
            <div class="card-title highlight-purple">4. DUPLICATES</div>
            <div style="font-size:0.75rem; font-family:'JetBrains Mono'; color:#a855f7; margin-bottom:0.5rem; font-weight:700;">10% OF TOTAL LEAKAGE</div>
            <div class="card-desc">Resubmitted invoices for previously cleared purchase orders, altered invoice numbers, or cross-entity double billing evading simple relational uniqueness.</div>
            <div style="font-size:0.75rem; color:#e9d5ff; background:rgba(168,85,247,0.1); padding:0.5rem; border-radius:0.5rem; border:1px solid rgba(168,85,247,0.3); margin-top:0.5rem;">Vendor resubmits invoice with suffix "-A" after 60 days</div>
          </div>
        </div>
      `,
      notes: "Where exactly does this money leak? Our taxonomy identifies four distinct vectors: Forty-five percent is quantity overbilling, where vendors bill the purchase order quantity rather than the dock receipt quantity. Thirty percent is contract rate escalation, where prices quietly drift above contract caps. Fifteen percent is phantom fees. And ten percent is duplicate billing."
    },
    {
      id: 7, section: "1. Problem", title: "The 4 Enterprise Silos: Root Cause of Blind Spots",
      sub: "Procurement truth is fragmented across four isolated enterprise architectures.",
      render: `
        <div class="grid-2" style="height:100%;">
          <div class="card" style="border-color:#38bdf8;">
            <div class="card-title highlight-sky">SILO A: SAP ERP (PURCHASE ORDERS)</div>
            <div class="card-heading">Commercial Intent</div>
            <div class="card-desc">Stores PO numbers, line item authorizations, and designated suppliers. Establishes commercial intent but has zero real-time visibility into receiving dock status.</div>
          </div>
          <div class="card" style="border-color:#f59e0b;">
            <div class="card-title highlight-amber">SILO B: WMS LOGISTICS (DELIVERY RECEIPTS)</div>
            <div class="card-heading">Physical Ground Truth</div>
            <div class="card-desc">Maintained by warehouse teams in isolated WMS systems. Dock manifests (DN-045) log damaged units and short shipments, but exceptions rarely propagate to AP finance.</div>
          </div>
          <div class="card" style="border-color:#f43f5e;">
            <div class="card-title highlight-red">SILO C: ACCOUNTS PAYABLE (VENDOR INVOICES)</div>
            <div class="card-heading">Vendor Payment Demand</div>
            <div class="card-desc">Incoming payment requests processed under high throughput quotas. Clerks verify invoice totals against original purchase order headers without verifying dock delivery.</div>
          </div>
          <div class="card" style="border-color:#a855f7;">
            <div class="card-title highlight-purple">SILO D: LEGAL REPOSITORY (MASTER CONTRACTS)</div>
            <div class="card-heading">Legal Price Ceilings</div>
            <div class="card-desc">Contract schedules and negotiated rate caps stored in legal doc repositories. Almost never cross-referenced during daily accounts payable invoice disbursement runs.</div>
          </div>
        </div>
      `,
      notes: "Why does spend leak so reliably? Because enterprise data is trapped in four distinct architectural silos: Silo A is SAP ERP with purchase orders; Silo B is warehouse WMS with receiving logs; Silo C is accounts payable with vendor invoices; and Silo D is legal contracts. None of these four systems communicate in real time."
    },
    {
      id: 8, section: "1. Problem", title: "Why Traditional 2-Way and 3-Way Matching Fails",
      sub: "Traditional automated matching rules leave glaring loopholes.",
      render: `
        <div style="display:flex; flex-direction:column; gap:0.75rem; height:100%; justify-content:center;">
          <div class="card" style="border-color:#f43f5e;">
            <div style="display:flex; justify-content:space-between; margin-bottom:0.25rem;">
              <strong style="color:#fff; font-size:1rem;">Legacy 2-Way Matching (PO vs Invoice)</strong>
              <span class="badge" style="background:rgba(244,63,94,0.15); border-color:#f43f5e; color:#f43f5e;">CRITICAL FLAWS</span>
            </div>
            <div style="font-size:0.85rem; color:#cbd5e1;">Only compares Invoice total against original PO total. Completely blind to warehouse delivery receipts (DN-045). Pays 100% of invoice even if 50% of goods were damaged or unreceived ($1,000 loss on PO-1001 passes).</div>
          </div>
          <div class="card" style="border-color:#f59e0b;">
            <div style="display:flex; justify-content:space-between; margin-bottom:0.25rem;">
              <strong style="color:#fff; font-size:1rem;">Legacy 3-Way Matching (PO vs Receipt vs Invoice)</strong>
              <span class="badge" style="background:rgba(245,158,11,0.15); border-color:#f59e0b; color:#f59e0b;">SUBTLE FAILURES</span>
            </div>
            <div style="font-size:0.85rem; color:#cbd5e1;">Checks totals across PO, Receipt, and Invoice, but ignores line-item rate caps. If supplier charges $50 instead of contracted $48 on 100 received units, 3-way match approves payment ($200 rate creep on PO-1001 passes).</div>
          </div>
          <div class="card" style="border-color:#10b981; background:#064e3b15;">
            <div style="display:flex; justify-content:space-between; margin-bottom:0.25rem;">
              <strong style="color:#6ee7b7; font-size:1rem;">TraceBack AI 4-Way Cross-Source Audit</strong>
              <span class="badge" style="background:rgba(16,185,129,0.15); border-color:#10b981; color:#10b981;">ZERO LEAKAGE DEFENSE</span>
            </div>
            <div style="font-size:0.85rem; color:#cbd5e1;">Simultaneously reconciles Purchase Order, Warehouse Delivery Receipt, AP Invoice, and Legal Contract Price Schedule. Catches both quantity mismatches AND rate creep with cell-level audit citations.</div>
          </div>
        </div>
      `,
      notes: "Standard ERP matching is fundamentally broken. Two-way matching checks only the PO and invoice, paying for phantom goods that never arrived. Three-way matching adds the dock receipt, but completely ignores contract price schedules! If the vendor bills fifty dollars instead of the contracted forty-eight, standard three-way matching approves the invoice. Only TraceBack AI executes true four-way cross-source reconciliation."
    },
    {
      id: 9, section: "SECTION 02 / 05", title: "Enterprise User Personas & Stakeholders",
      sub: "Aligning incentives across procurement, internal audit, accounts payable, and supply chain operations.",
      render: `
        <div style="background:#0f172a; border:2px solid #38bdf8; border-radius:1rem; padding:2rem; height:100%; display:flex; flex-direction:column; justify-content:space-between;">
          <div>
            <div style="display:inline-block; font-size:0.75rem; font-family:'JetBrains Mono',monospace; padding:0.25rem 0.75rem; background:rgba(56,189,248,0.2); border:1px solid #38bdf8; border-radius:9999px; color:#38bdf8; margin-bottom:1rem; font-weight:700;">SECTION 02 / 05</div>
            <div style="font-size:2.4rem; font-weight:800; color:#fff; line-height:1.2; margin-bottom:0.5rem;">Enterprise User Personas & Stakeholders</div>
            <div style="font-size:1.1rem; color:#cbd5e1;">Aligning incentives across procurement, internal audit, accounts payable, and supply chain operations.</div>
          </div>
          <div class="grid-3">
            <div class="card" style="border-color:#1e293b;">
              <div style="font-size:1.4rem; font-weight:800; color:#38bdf8; margin-bottom:0.25rem;">01</div>
              <div style="font-size:1.05rem; font-weight:700; color:#fff; margin-bottom:0.5rem;">Strategic Sourcing</div>
              <div style="font-size:0.85rem; color:#94a3b8;">Chief Procurement Officers defending negotiated supplier discounts and contract schedules.</div>
            </div>
            <div class="card" style="border-color:#1e293b;">
              <div style="font-size:1.4rem; font-weight:800; color:#38bdf8; margin-bottom:0.25rem;">02</div>
              <div style="font-size:1.05rem; font-weight:700; color:#fff; margin-bottom:0.5rem;">Financial Governance</div>
              <div style="font-size:0.85rem; color:#94a3b8;">Lead Auditors and Controllers requiring 100% census SOX compliance with zero hallucination.</div>
            </div>
            <div class="card" style="border-color:#1e293b;">
              <div style="font-size:1.4rem; font-weight:800; color:#38bdf8; margin-bottom:0.25rem;">03</div>
              <div style="font-size:1.05rem; font-weight:700; color:#fff; margin-bottom:0.5rem;">Operational Velocity</div>
              <div style="font-size:0.85rem; color:#94a3b8;">Accounts Payable specialists and Warehouse Managers eliminating manual matching backlogs.</div>
            </div>
          </div>
        </div>
      `,
      notes: "Section Two covers our Users and Stakeholders. TraceBack AI serves four key personas across the enterprise: the Chief Procurement Officer who negotiates contracts, the Lead Financial Auditor who guarantees governance, the Accounts Payable Controller who disburses cash, and the Warehouse Dock Manager who physically receives goods."
    },
    {
      id: 10, section: "2. Users", title: "Executive Stakeholder Value Alignment",
      sub: "How TraceBack AI aligns incentives across procurement, finance, and logistics.",
      render: `
        <div style="display:flex; flex-direction:column; gap:0.65rem; height:100%; justify-content:center;">
          <div class="card" style="border-color:#38bdf8; display:flex; justify-content:space-between; align-items:center;">
            <div><strong style="color:#fff; font-size:1rem;">Chief Procurement Officer</strong><div style="font-size:0.8rem; color:#38bdf8;">Contract Spend Compliance</div></div>
            <span class="badge" style="background:#082f49; color:#7dd3fc; border-color:#0284c7;">3.2% SPEND REDUCTION</span>
            <div style="font-size:0.85rem; color:#cbd5e1; max-width:480px;">Automated contract ceiling enforcement & empirical supplier compliance scorecards.</div>
          </div>
          <div class="card" style="border-color:#10b981; display:flex; justify-content:space-between; align-items:center;">
            <div><strong style="color:#fff; font-size:1rem;">Lead Financial Auditor</strong><div style="font-size:0.8rem; color:#10b981;">SOX Controls & Defensibility</div></div>
            <span class="badge" style="background:#064e3b; color:#6ee7b7; border-color:#059669;">100% AUDIT COVERAGE</span>
            <div style="font-size:0.85rem; color:#cbd5e1; max-width:480px;">Deterministic cell-level proof eliminating random sampling risks.</div>
          </div>
          <div class="card" style="border-color:#f59e0b; display:flex; justify-content:space-between; align-items:center;">
            <div><strong style="color:#fff; font-size:1rem;">Accounts Payable Controller</strong><div style="font-size:0.8rem; color:#f59e0b;">Operational Throughput</div></div>
            <span class="badge" style="background:#451a03; color:#fde68a; border-color:#d97706;">80% MANUAL CUT</span>
            <div style="font-size:0.85rem; color:#cbd5e1; max-width:480px;">Pre-payment automated dispute packets; elimination of invoice clearing backlogs.</div>
          </div>
          <div class="card" style="border-color:#a855f7; display:flex; justify-content:space-between; align-items:center;">
            <div><strong style="color:#fff; font-size:1rem;">Supply Chain Operations VP</strong><div style="font-size:0.8rem; color:#a855f7;">Receiving Dock Integrity</div></div>
            <span class="badge" style="background:#2e1065; color:#d8b4fe; border-color:#9333ea;">ZERO DOCK LEAKAGE</span>
            <div style="font-size:0.85rem; color:#cbd5e1; max-width:480px;">Instant dock receipt synchronization ensuring only accepted goods are billed.</div>
          </div>
        </div>
      `,
      notes: "TraceBack AI serves the complete enterprise financial hierarchy. The CPO gains contract compliance. The Financial Auditor gains a bulletproof audit trail. The AP Controller eliminates manual verification backlogs. And the Supply Chain VP ensures that warehouse receiving dock records govern financial disbursements."
    },
    {
      id: 11, section: "2. Users", title: "Persona 1: Chief Procurement Officer (CPO)",
      sub: "Strategic sourcing, supplier rate enforcement, and commercial discipline.",
      render: `
        <div class="grid-2" style="height:100%;">
          <div class="card" style="border-color:#38bdf8;">
            <div class="card-title highlight-sky">CPO STRATEGIC OBJECTIVES</div>
            <div class="card-heading">Defending Negotiated Contract Terms</div>
            <div class="card-desc">
              • Sourcing teams spend months negotiating 5% to 8% contract discounts, only to have suppliers quietly bill uncontracted list prices.<br/><br/>
              • Lack of real-time visibility prevents procurement from holding suppliers accountable during quarterly business reviews (QBRs).<br/><br/>
              • Supplier performance scorecards are based on subjective surveys rather than factual dispute histories.
            </div>
          </div>
          <div class="card" style="border-color:#38bdf8; background:#082f4915;">
            <div class="card-title highlight-sky">TRACEBACK AI DELIVERABLES FOR CPOs</div>
            <div class="card-heading">Automated Contract Enforcement</div>
            <div class="card-desc">
              • <strong>100% Rate Schedule Adherence:</strong> Flags every line item exceeding master contract price caps in real time.<br/><br/>
              • <strong>Empirical Supplier Scorecards:</strong> Tracks dispute frequency, quantity variance rates, and pricing compliance by vendor.<br/><br/>
              • <strong>Sourcing Leverage:</strong> Provides hard data during contract renewals, transforming anecdotal complaints into verifiable leverage.<br/><br/>
              • <strong>Projected Impact:</strong> Recovers 1.5% to 3.2% of total addressable procurement spend directly to company operating margins.
            </div>
          </div>
        </div>
      `,
      notes: "For the Chief Procurement Officer, TraceBack AI ensures that every negotiated dollar actually reaches the bottom line. It stops supplier price creep and provides factual vendor scorecards based on real reconciliation history."
    },
    {
      id: 12, section: "2. Users", title: "Persona 2: Lead Financial Auditor & Controller",
      sub: "Sarbanes-Oxley compliance, internal controls, and audit defensibility.",
      render: `
        <div class="grid-2" style="height:100%;">
          <div class="card" style="border-color:#10b981;">
            <div class="card-title highlight-green">AUDIT & CONTROL CHALLENGES</div>
            <div class="card-heading">The High Risk of Sample-Based Auditing</div>
            <div class="card-desc">
              • SOX 404 Compliance Burden: Internal audit teams must verify internal controls over financial reporting without full visibility.<br/><br/>
              • Hallucination Risk in Generic AI: LLMs that guess or hallucinate financial numbers cannot be used in formal accounting work.<br/><br/>
              • Lack of Provenance: When auditors challenge a vendor, they need the exact document coordinates, row numbers, and contract clause numbers.
            </div>
          </div>
          <div class="card" style="border-color:#10b981; background:#064e3b15;">
            <div class="card-title highlight-green">TRACEBACK AI DELIVERABLES FOR AUDITORS</div>
            <div class="card-heading">Deterministic Proof & Zero Hallucination</div>
            <div class="card-desc">
              • <strong>Immutable Cell Coordinates:</strong> Every financial claim cites {file, row, column, value} with absolute precision.<br/><br/>
              • <strong>Deterministic Corroboration:</strong> Variances are calculated via exact mathematics, not statistical approximations.<br/><br/>
              • <strong>Audit Defensibility Certificate:</strong> Generates cryptographic, timestamped audit certificates verifying reconciliation integrity.<br/><br/>
              • <strong>Complete Census Audit:</strong> Eliminates sampling risk by validating 100% of purchase orders in sub-second cycles.
            </div>
          </div>
        </div>
      `,
      notes: "For Financial Auditors and Controllers, TraceBack AI provides the gold standard of audit defensibility: zero hallucination. Every claim cites the exact file, row, and column. It replaces random sampling with a 100% census audit."
    },
    {
      id: 13, section: "2. Users", title: "Personas 3 & 4: AP Operations & Supply Chain Leads",
      sub: "Operational velocity, invoice clearing throughput, and receiving dock integrity.",
      render: `
        <div class="grid-2" style="height:100%;">
          <div class="card" style="border-color:#f59e0b;">
            <div class="card-title highlight-amber">PERSONA 3: AP CONTROLLER & CLERKS</div>
            <div class="card-heading">High-Volume Invoice Processing</div>
            <div class="card-desc">
              • <strong>Processing Pressure:</strong> AP teams process tens of thousands of invoices under strict 30-day payment terms.<br/><br/>
              • <strong>Manual Exception Handling:</strong> Investigating a single discrepancy takes 45 to 90 minutes across emails and spreadsheets.<br/><br/>
              • <strong>Automated Dispute Synthesis:</strong> TraceBack AI drafts ready-to-send dispute emails citing line items, dock notes, and contract rates.<br/><br/>
              • <strong>Operational Impact:</strong> Reduces manual matching overhead by 80%, allowing staff to focus on strategic exceptions.
            </div>
          </div>
          <div class="card" style="border-color:#a855f7;">
            <div class="card-title highlight-purple">PERSONA 4: SUPPLY CHAIN & LOGISTICS LEAD</div>
            <div class="card-heading">Receiving Dock Ground Truth</div>
            <div class="card-desc">
              • <strong>Dock Exception Reality:</strong> Shipments arrive damaged, short, or with delayed backorders logged in local WMS receipts.<br/><br/>
              • <strong>Frustration:</strong> Warehouse managers report discrepancies, but finance pays the vendor in full regardless.<br/><br/>
              • <strong>Closing the Loop:</strong> TraceBack AI enforces that dock receipt quantities (e.g. DN-045) strictly govern payment authorization.<br/><br/>
              • <strong>Vendor Accountability:</strong> Suppliers cannot exploit delivery discrepancies when dock receiving logs are linked directly to invoice clearing.
            </div>
          </div>
        </div>
      `,
      notes: "For Accounts Payable, TraceBack AI eliminates the manual grind of tracking down delivery tickets. For Warehouse managers, it ensures that when they log damaged or short goods on the receiving dock, finance actually protects company cash."
    },
    {
      id: 14, section: "SECTION 03 / 05", title: "The Solution: Autonomous 4-Way Reconciliation",
      sub: "Zero-ETL virtualization, multi-agent reasoning, and mathematical spend recovery in sub-second cycles.",
      render: `
        <div style="background:#0f172a; border:2px solid #10b981; border-radius:1rem; padding:2rem; height:100%; display:flex; flex-direction:column; justify-content:space-between;">
          <div>
            <div style="display:inline-block; font-size:0.75rem; font-family:'JetBrains Mono',monospace; padding:0.25rem 0.75rem; background:rgba(16,185,129,0.2); border:1px solid #10b981; border-radius:9999px; color:#10b981; margin-bottom:1rem; font-weight:700;">SECTION 03 / 05</div>
            <div style="font-size:2.4rem; font-weight:800; color:#fff; line-height:1.2; margin-bottom:0.5rem;">The Solution: Autonomous 4-Way Reconciliation</div>
            <div style="font-size:1.1rem; color:#cbd5e1;">Zero-ETL virtualization, multi-agent reasoning, and mathematical spend recovery in sub-second cycles.</div>
          </div>
          <div class="grid-3">
            <div class="card" style="border-color:#1e293b;">
              <div style="font-size:1.4rem; font-weight:800; color:#10b981; margin-bottom:0.25rem;">01</div>
              <div style="font-size:1.05rem; font-weight:700; color:#fff; margin-bottom:0.5rem;">4-Way Virtualization</div>
              <div style="font-size:0.85rem; color:#94a3b8;">Federated cross-source queries across SAP ERP, WMS dock notes, AP invoices, and contracts in 12ms.</div>
            </div>
            <div class="card" style="border-color:#1e293b;">
              <div style="font-size:1.4rem; font-weight:800; color:#10b981; margin-bottom:0.25rem;">02</div>
              <div style="font-size:1.05rem; font-weight:700; color:#fff; margin-bottom:0.5rem;">Deterministic Proof</div>
              <div style="font-size:0.85rem; color:#94a3b8;">Exact mathematical variance calculations with calibrated 96.5% confidence and cell citations.</div>
            </div>
            <div class="card" style="border-color:#1e293b;">
              <div style="font-size:1.4rem; font-weight:800; color:#10b981; margin-bottom:0.25rem;">03</div>
              <div style="font-size:1.05rem; font-weight:700; color:#fff; margin-bottom:0.5rem;">1-Click Recovery</div>
              <div style="font-size:0.85rem; color:#94a3b8;">Human-in-the-loop audit approvals with automated professional supplier dispute notices.</div>
            </div>
          </div>
        </div>
      `,
      notes: "Section Three presents the Solution. TraceBack AI introduces an autonomous reconciliation agent powered by Zero-ETL data virtualization and local AI reasoning. Let us walk through the architecture and a live audit case study."
    },
    {
      id: 15, section: "3. Solution", title: "TraceBack AI: Solution Overview & Core Capabilities",
      sub: "Autonomous cross-source spend defense with zero data movement.",
      render: `
        <div class="grid-2" style="height:100%;">
          <div class="card" style="border-color:#38bdf8;">
            <div class="card-title highlight-sky">01 • ZERO-ETL VIRTUALIZATION</div>
            <div class="card-heading">Zetaris Data Virtualization</div>
            <div class="card-desc">Queries SAP ERP, warehouse receipts, AP invoices, and contracts where they live in 12ms without pipelines or data movement. Financial records stay inside secure enterprise bounds.</div>
          </div>
          <div class="card" style="border-color:#10b981;">
            <div class="card-title highlight-green">02 • DETERMINISTIC 4-WAY MATCHING</div>
            <div class="card-heading">Exact Mathematical Reconciliation</div>
            <div class="card-desc">Simultaneously cross-references ordered quantities, received dock units, billed amounts, and contracted price schedules with exact math, calculating calibrated 96.5% confidence.</div>
          </div>
          <div class="card" style="border-color:#f59e0b;">
            <div class="card-title highlight-amber">03 • CELL-LEVEL EVIDENCE INDEX</div>
            <div class="card-heading">Immutable Audit Provenance</div>
            <div class="card-desc">Every detected overcharge cites exact immutable coordinates: {file, row, column, value}, guaranteeing 100% audit defensibility for SOX compliance and supplier dispute letters.</div>
          </div>
          <div class="card" style="border-color:#a855f7;">
            <div class="card-title highlight-purple">04 • HUMAN GOVERNANCE & DISPUTES</div>
            <div class="card-heading">One-Click Claim Recovery</div>
            <div class="card-desc">Auditors retain 1-click claim endorsement, generating formal supplier dispute letters citing exact contract sections and warehouse delivery notes with cryptographic audit receipts.</div>
          </div>
        </div>
      `,
      notes: "Here is the core capability stack of TraceBack AI. It unifies four critical innovations: Zero-ETL data virtualization via Zetaris, deterministic four-way matching algorithms, cell-level evidence indexing, and human-in-the-loop dispute synthesis."
    },
    {
      id: 16, section: "3. Solution", title: "Case Study: PO-1001 Audit Overview",
      sub: "Supplier SUP-42 billed $6,000.00; TraceBack AI uncovers $1,200.00 in overcharges in 184ms.",
      render: `
        <div style="display:grid; grid-template-columns: 1fr 1.6fr; gap:1.25rem; height:100%;">
          <div class="card" style="border-color:#f43f5e;">
            <div class="card-title highlight-red">BENCHMARK ORDER DETAILS</div>
            <div class="card-heading">PO-1001 Investigation</div>
            <div class="card-desc" style="font-size:0.85rem; line-height:1.6;">
              • <strong>Purchase Order:</strong> PO-1001<br/>
              • <strong>Supplier:</strong> Apex Industrial (SUP-42)<br/>
              • <strong>Invoiced Amount:</strong> $6,000.00 USD<br/>
              • <strong>Received Value:</strong> $4,800.00 USD<br/>
              • <strong>Recoverable Overcharge:</strong> $1,200.00 USD<br/>
              • <strong>Audit Latency:</strong> 184 milliseconds<br/>
              • <strong>Audit Confidence:</strong> 96.5%<br/>
              • <strong>Recommendation:</strong> DISPUTE & WITHHOLD
            </div>
          </div>
          <div style="display:flex; flex-direction:column; gap:0.6rem;">
            <div class="card" style="border-color:#38bdf8; display:flex; justify-content:space-between; align-items:center; padding:0.6rem 1rem;">
              <div><strong style="color:#fff; font-size:0.9rem;">SAP ERP (purchase_orders.csv)</strong><div style="font-size:0.75rem; color:#94a3b8;">120 units ordered @ $50.00/unit</div></div>
              <strong style="color:#fff; font-size:1.05rem;">$6,000.00</strong>
            </div>
            <div class="card" style="border-color:#f59e0b; display:flex; justify-content:space-between; align-items:center; padding:0.6rem 1rem;">
              <div><strong style="color:#fff; font-size:0.9rem;">WMS Warehouse (deliveries.csv)</strong><div style="font-size:0.75rem; color:#94a3b8;">100 units physically received (DN-045)</div></div>
              <strong style="color:#fff; font-size:1.05rem;">$5,000.00</strong>
            </div>
            <div class="card" style="border-color:#f43f5e; display:flex; justify-content:space-between; align-items:center; padding:0.6rem 1rem;">
              <div><strong style="color:#fff; font-size:0.9rem;">AP Invoices (invoices.csv)</strong><div style="font-size:0.75rem; color:#94a3b8;">120 units billed on INV-9001</div></div>
              <strong style="color:#fff; font-size:1.05rem;">$6,000.00</strong>
            </div>
            <div class="card" style="border-color:#a855f7; display:flex; justify-content:space-between; align-items:center; padding:0.6rem 1rem;">
              <div><strong style="color:#fff; font-size:0.9rem;">Legal Contracts (contract_prices.csv)</strong><div style="font-size:0.75rem; color:#94a3b8;">Master Agreement schedule cap @ $48.00/unit</div></div>
              <strong style="color:#fff; font-size:1.05rem;">$4,800.00</strong>
            </div>
            <div class="card" style="border-color:#10b981; background:#064e3b25; padding:0.6rem 1rem;">
              <strong style="color:#6ee7b7; font-size:0.9rem;">RECONCILIATION RESULT: $1,200.00 DISCREPANCY DETECTED</strong>
              <div style="font-size:0.75rem; color:#cbd5e1;">Discrepancy 1 ($1,000 qty overcharge) + Discrepancy 2 ($200 price escalation)</div>
            </div>
          </div>
        </div>
      `,
      notes: "Let us examine benchmark Purchase Order PO-1001. The supplier invoiced six thousand dollars. But when TraceBack AI executes four-way cross-source reconciliation in one hundred eighty-four milliseconds, it exposes two distinct overcharges totaling twelve hundred dollars."
    },
    {
      id: 17, section: "3. Solution", title: "PO-1001 Discrepancy Deep-Dive: 2 Distinct Vectors",
      sub: "Cell-level mathematical proof for quantity overbilling and contract rate escalation.",
      render: `
        <div class="grid-2" style="height:100%;">
          <div class="card" style="border-color:#f43f5e;">
            <div class="card-title highlight-red">DISCREPANCY 1: QUANTITY OVERBILLING</div>
            <div class="card-heading" style="color:#f43f5e;">+$1,000.00 Overcharge</div>
            <div class="card-desc">
              Invoiced 120 units vs Delivered 100 units (20 units × $50.00)<br/><br/>
              • Invoiced Quantity: 120 units (INV-9001)<br/>
              • Warehouse Delivered: 100 units (DN-045)<br/>
              • Unreceived Billed Units: 20 units<br/>
              • Variance Math: 20 units × $50.00 = $1,000.00<br/><br/>
              <span style="font-family:'JetBrains Mono'; font-size:0.75rem; color:#38bdf8;">Citations: invoices.csv:Row 2:Col 3 | deliveries.csv:Row 2:Col 3</span>
            </div>
          </div>
          <div class="card" style="border-color:#f59e0b;">
            <div class="card-title highlight-amber">DISCREPANCY 2: CONTRACT RATE ESCALATION</div>
            <div class="card-heading" style="color:#f59e0b;">+$200.00 Overcharge</div>
            <div class="card-desc">
              Billed $50.00/unit vs Contract $48.00/unit ($2.00 creep on 100 units)<br/><br/>
              • Billed Unit Price: $50.00 / unit (INV-9001)<br/>
              • Contract Rate Cap: $48.00 / unit (Schedule A)<br/>
              • Rate Creep: +$2.00 / unit<br/>
              • Variance Math: 100 units × $2.00 = $200.00<br/><br/>
              <span style="font-family:'JetBrains Mono'; font-size:0.75rem; color:#38bdf8;">Citations: invoices.csv:Row 2:Col 4 | contract_prices.csv:Row 2:Col 3</span>
            </div>
          </div>
        </div>
      `,
      notes: "Here is the exact mathematical breakdown of PO-1001. Discrepancy One is quantity overbilling: the vendor billed for twenty units that warehouse note DN-045 confirms were never received. Discrepancy Two is contract rate creep: the vendor charged fifty dollars instead of the contracted forty-eight dollar ceiling."
    },
    {
      id: 18, section: "3. Solution", title: "Zero False Positive Benchmark: Clean Order PO-1002",
      sub: "Proving system credibility: clean orders produce zero false alarms and 100% concordance.",
      render: `
        <div class="grid-2" style="height:100%;">
          <div class="card" style="border-color:#6366f1;">
            <div class="card-title" style="color:#818cf8;">BENCHMARK ORDER PO-1002</div>
            <div class="card-heading">Clean Transaction Validation</div>
            <div class="card-desc" style="line-height:1.6;">
              • <strong>Order ID:</strong> PO-1002 | Supplier: Beacon Industrial (SUP-18)<br/>
              • <strong>Ordered:</strong> 50 units @ $20.00/unit ($1,000.00 authorized)<br/>
              • <strong>Received:</strong> 50 units verified at dock (DN-048)<br/>
              • <strong>Invoiced:</strong> 50 units @ $20.00/unit (INV-9002)<br/>
              • <strong>Contract Schedule:</strong> $20.00/unit agreed contract cap<br/>
              • <strong>Audit Latency:</strong> 162 milliseconds across 4 virtual tables<br/>
              • <strong>Assessment:</strong> CLEAN TRANSACTION — PAYMENT CLEARED
            </div>
          </div>
          <div class="card" style="border-color:#10b981; background:#064e3b15;">
            <div class="card-title highlight-green">CREDIBILITY & FALSE-POSITIVE DEFENSE</div>
            <div class="card-heading">Zero False Alarms (100% Concordance)</div>
            <div class="card-desc" style="line-height:1.6;">
              • <strong>Zero Hallucinated Claims:</strong> The system does not invent overcharges where none exist.<br/>
              • <strong>100% Quantity Concordance:</strong> Ordered (50) == Delivered (50) == Billed (50).<br/>
              • <strong>100% Rate Compliance:</strong> Billed rate ($20.00) matches contract cap ($20.00).<br/>
              • <strong>Frictionless Clearance:</strong> Clean invoices pass straight through to automated AP payment clearance with zero auditor intervention required.<br/>
              • <strong>Critical Proof:</strong> Zero false alarms build trusted enterprise adoption.
            </div>
          </div>
        </div>
      `,
      notes: "Credibility is everything in financial systems. If an AI agent flags false alarms, auditors will turn it off. On benchmark order PO-1002, where the order, delivery, invoice, and contract all match perfectly, TraceBack AI returns exactly zero overcharge with one hundred percent concordance."
    },
    {
      id: 19, section: "SECTION 04 / 05", title: "System Architecture & Audit Governance",
      sub: "High-performance 4-tier pipeline combining data virtualization, agent orchestration, and immutable provenance.",
      render: `
        <div style="background:#0f172a; border:2px solid #f59e0b; border-radius:1rem; padding:2rem; height:100%; display:flex; flex-direction:column; justify-content:space-between;">
          <div>
            <div style="display:inline-block; font-size:0.75rem; font-family:'JetBrains Mono',monospace; padding:0.25rem 0.75rem; background:rgba(245,158,11,0.2); border:1px solid #f59e0b; border-radius:9999px; color:#f59e0b; margin-bottom:1rem; font-weight:700;">SECTION 04 / 05</div>
            <div style="font-size:2.4rem; font-weight:800; color:#fff; line-height:1.2; margin-bottom:0.5rem;">System Architecture & Audit Governance</div>
            <div style="font-size:1.1rem; color:#cbd5e1;">High-performance 4-tier pipeline combining data virtualization, agent orchestration, and immutable provenance.</div>
          </div>
          <div class="grid-3">
            <div class="card" style="border-color:#1e293b;">
              <div style="font-size:1.4rem; font-weight:800; color:#f59e0b; margin-bottom:0.25rem;">01</div>
              <div style="font-size:1.05rem; font-weight:700; color:#fff; margin-bottom:0.5rem;">Virtualization Tier</div>
              <div style="font-size:0.85rem; color:#94a3b8;">Zetaris federated SQL engine querying across SAP ERP, WMS, and contracts in place with zero data movement.</div>
            </div>
            <div class="card" style="border-color:#1e293b;">
              <div style="font-size:1.4rem; font-weight:800; color:#f59e0b; margin-bottom:0.25rem;">02</div>
              <div style="font-size:1.05rem; font-weight:700; color:#fff; margin-bottom:0.5rem;">Agent Orchestration</div>
              <div style="font-size:0.85rem; color:#94a3b8;">Meterless mission architecture orchestrating Scout intent parsing, Relay routing, and Nightshift AI.</div>
            </div>
            <div class="card" style="border-color:#1e293b;">
              <div style="font-size:1.4rem; font-weight:800; color:#f59e0b; margin-bottom:0.25rem;">03</div>
              <div style="font-size:1.05rem; font-weight:700; color:#fff; margin-bottom:0.5rem;">Defensible Governance</div>
              <div style="font-size:0.85rem; color:#94a3b8;">Cell-level citation provenance index, cryptographic audit certificates, and human approval workflow.</div>
            </div>
          </div>
        </div>
      `,
      notes: "Section Four details our System Architecture. We examine the four-tier architectural pipeline, our five-stage Meterless mission workflow, cell-level coordinate indexing, and human-in-the-loop governance."
    },
    {
      id: 20, section: "4. Architecture", title: "End-to-End Enterprise System Architecture",
      sub: "A 4-tier pipeline combining data virtualization, agent orchestration, and audit governance.",
      render: `
        <div style="display:flex; flex-direction:column; gap:0.65rem; height:100%; justify-content:center;">
          <div class="card" style="border-color:#38bdf8;">
            <div style="display:flex; justify-content:space-between; margin-bottom:0.25rem;">
              <div><span class="highlight-sky" style="font-weight:700; margin-right:0.5rem;">TIER 1</span><strong style="color:#fff;">Data Virtualization Layer (Zetaris Engine)</strong></div>
              <span style="font-size:0.75rem; color:#38bdf8; font-family:'JetBrains Mono';">Zetaris Federated SQL • SQLite Mock • Zero ETL</span>
            </div>
            <div style="font-size:0.85rem; color:#cbd5e1;">Queries SAP ERP, WMS Logistics, AP Invoices, and Legal Contracts in place. Eliminates data copying and staging databases with 12ms query response.</div>
          </div>
          <div class="card" style="border-color:#10b981;">
            <div style="display:flex; justify-content:space-between; margin-bottom:0.25rem;">
              <div><span class="highlight-green" style="font-weight:700; margin-right:0.5rem;">TIER 2</span><strong style="color:#fff;">Agent Orchestration Pipeline (Meterless Architecture)</strong></div>
              <span style="font-size:0.75rem; color:#10b981; font-family:'JetBrains Mono';">Scout Intent • Relay Router • Nightshift AI • Gaia H-MEM</span>
            </div>
            <div style="font-size:0.85rem; color:#cbd5e1;">5-stage autonomous mission execution: Scout establishes rules, Relay executes tools, Reconciliation quantifies variance, and Nightshift AI reasons locally.</div>
          </div>
          <div class="card" style="border-color:#f59e0b;">
            <div style="display:flex; justify-content:space-between; margin-bottom:0.25rem;">
              <div><span class="highlight-amber" style="font-weight:700; margin-right:0.5rem;">TIER 3</span><strong style="color:#fff;">Evidence Index & Dispute Synthesis</strong></div>
              <span style="font-size:0.75rem; color:#f59e0b; font-family:'JetBrains Mono';">Cell Citation Index • Dispute Formatter • Audit Certificates</span>
            </div>
            <div style="font-size:0.85rem; color:#cbd5e1;">Indexes cell coordinates {file, row, col, value} with 100% defensibility. Synthesizes formal supplier dispute claim packets with contractual references.</div>
          </div>
          <div class="card" style="border-color:#a855f7;">
            <div style="display:flex; justify-content:space-between; margin-bottom:0.25rem;">
              <div><span class="highlight-purple" style="font-weight:700; margin-right:0.5rem;">TIER 4</span><strong style="color:#fff;">Human-in-the-Loop Audit Workspace</strong></div>
              <span style="font-size:0.75rem; color:#a855f7; font-family:'JetBrains Mono';">React 18 • TypeScript • Tailwind CSS • Vite Dashboard</span>
            </div>
            <div style="font-size:0.85rem; color:#cbd5e1;">Auditor command center with spend metrics, 4-way evidence explorer, 2-minute demo video walkthrough, and 1-click claim approval modal.</div>
          </div>
        </div>
      `,
      notes: "Our system architecture is structured in four high-performance tiers. Tier 1 is Data Virtualization powered by Zetaris. Tier 2 is Multi-Agent Orchestration powered by Meterless. Tier 3 is the Evidence Index that locks down immutable coordinates. And Tier 4 is our interactive React dashboard."
    },
    {
      id: 21, section: "4. Architecture", title: "The 5-Stage Meterless Mission Pipeline",
      sub: "From audit intent extraction to local AI reasoning and dispute generation.",
      render: `
        <div style="display:flex; flex-direction:column; gap:0.55rem; height:100%; justify-content:center;">
          <div class="card" style="border-color:#6366f1; padding:0.6rem 1rem;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <div><span style="color:#818cf8; font-family:'JetBrains Mono'; font-weight:700; margin-right:0.75rem;">STAGE 1</span><strong style="color:#fff;">Scout Intent</strong></div>
              <span class="badge">12ms Latency</span>
            </div>
            <div style="font-size:0.8rem; color:#94a3b8; margin-top:0.25rem;">Parses audit parameters, sets $0 discrepancy tolerance threshold, and identifies required data entities.</div>
          </div>
          <div class="card" style="border-color:#38bdf8; padding:0.6rem 1rem;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <div><span style="color:#38bdf8; font-family:'JetBrains Mono'; font-weight:700; margin-right:0.75rem;">STAGE 2</span><strong style="color:#fff;">Relay Zetaris</strong></div>
              <span class="badge">18ms Latency</span>
            </div>
            <div style="font-size:0.8rem; color:#94a3b8; margin-top:0.25rem;">Dispatches federated SQL queries across ERP, warehouse, invoices, and contracts via Zetaris virtualization.</div>
          </div>
          <div class="card" style="border-color:#f59e0b; padding:0.6rem 1rem;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <div><span style="color:#f59e0b; font-family:'JetBrains Mono'; font-weight:700; margin-right:0.75rem;">STAGE 3</span><strong style="color:#fff;">Reconciliation</strong></div>
              <span class="badge">8ms Latency</span>
            </div>
            <div style="font-size:0.8rem; color:#94a3b8; margin-top:0.25rem;">Executes deterministic 4-way matching algorithms to quantify quantity, rate, fee, and duplicate variances.</div>
          </div>
          <div class="card" style="border-color:#10b981; padding:0.6rem 1rem;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <div><span style="color:#10b981; font-family:'JetBrains Mono'; font-weight:700; margin-right:0.75rem;">STAGE 4</span><strong style="color:#fff;">Confidence Score</strong></div>
              <span class="badge">14ms Latency</span>
            </div>
            <div style="font-size:0.8rem; color:#94a3b8; margin-top:0.25rem;">Evaluates cross-source corroboration strength, generating a calibrated confidence score (96.5% on PO-1001).</div>
          </div>
          <div class="card" style="border-color:#a855f7; padding:0.6rem 1rem;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <div><span style="color:#a855f7; font-family:'JetBrains Mono'; font-weight:700; margin-right:0.75rem;">STAGE 5</span><strong style="color:#fff;">Meterless Nightshift</strong></div>
              <span class="badge">42ms Latency</span>
            </div>
            <div style="font-size:0.8rem; color:#94a3b8; margin-top:0.25rem;">Executes Race/Judge/Verify/Generate local AI reasoning cycle; outputs cryptographic receipt at $0 token cost.</div>
          </div>
        </div>
      `,
      notes: "Every audit executes as a five-stage Meterless mission pipeline. Stage 1 is Scout Intent parsing. Stage 2 is Relay Zetaris querying. Stage 3 is algorithmic reconciliation. Stage 4 is confidence scoring. And Stage 5 is Meterless Nightshift local reasoning. The entire cycle finishes in 184 milliseconds."
    },
    {
      id: 22, section: "4. Architecture", title: "Cell-Level Evidence Provenance Index",
      sub: "Absolute audit proof: every financial claim is anchored in {file, row, col, value}.",
      render: `
        <div class="grid-2" style="height:100%;">
          <div class="card" style="border-color:#38bdf8;">
            <div class="card-title highlight-sky">PRECISE COORDINATE CITATIONS</div>
            <div class="card-heading">100% Audit Defensibility</div>
            <div class="card-desc">
              Every single variance is tied directly to an immutable data cell coordinate:<br/>
              • Discrepancy 1: invoices.csv:Row 2:Col 3 (invoiced_qty = 120)<br/>
              • Corroborating: deliveries.csv:Row 2:Col 3 (delivered_qty = 100)<br/>
              • Discrepancy 2: invoices.csv:Row 2:Col 4 (unit_price = $50.00)<br/>
              • Corroborating: contract_prices.csv:Row 2:Col 3 (contract_unit_price = $48.00)
            </div>
          </div>
          <div class="card" style="border-color:#10b981;">
            <div class="card-title highlight-green">CRYPTOGRAPHIC AUDIT CERTIFICATE</div>
            <div class="card-heading">Tamper-Proof Receipt</div>
            <div class="card-desc">
              When an audit completes, TraceBack AI generates an immutable audit receipt:<br/>
              • Cryptographic receipt hash: sha256:8f3a9e...21b0<br/>
              • Timestamped with zero-tamper verification<br/>
              • Bound to auditor digital signature upon approval<br/>
              • Directly exportable for internal SOX controllers and external Big 4 audit review
            </div>
          </div>
          <div class="card" style="border-color:#f59e0b;">
            <div class="card-title highlight-amber">MATHEMATICAL DEFENSIBILITY</div>
            <div class="card-heading">Zero Generative Guessing</div>
            <div class="card-desc">
              No black-box probability or hallucinated calculations:<br/>
              • Overcharge amounts are calculated via deterministic integer/float arithmetic<br/>
              • Variance = (invoiced_qty - delivered_qty) * unit_price<br/>
              • Rate Creep = delivered_qty * (invoiced_price - contract_price)<br/>
              • 100% reproducible and legally binding
            </div>
          </div>
          <div class="card" style="border-color:#a855f7;">
            <div class="card-title highlight-purple">SUPPLIER DISPUTE PACKAGE</div>
            <div class="card-heading">Ready-to-Dispatch Evidence</div>
            <div class="card-desc">
              Dispute notices are not generic complaints:<br/>
              • Fully synthesized supplier letter generated in seconds<br/>
              • Formatted with exact contract clause citations (Section 4.2)<br/>
              • Cross-referenced with warehouse dock note numbers (DN-045)<br/>
              • Ready for immediate dispatch to vendor accounts team
            </div>
          </div>
        </div>
      `,
      notes: "Audit defensibility is what separates TraceBack AI from toy LLM wrappers. When an enterprise auditor challenges a vendor, they cannot quote an AI summary. They need the exact row, column, and file coordinates. Our Evidence Provenance Index guarantees 100% citation precision."
    },
    {
      id: 23, section: "4. Architecture", title: "Human-in-the-Loop Governance & Dispute Synthesis",
      sub: "Empowering human auditors with 1-click approvals and automated supplier notices.",
      render: `
        <div class="grid-2" style="height:100%;">
          <div class="card" style="border-color:#a855f7;">
            <div class="card-title highlight-purple">HUMAN GOVERNANCE WORKFLOW</div>
            <div class="card-heading">Auditor In Full Control</div>
            <div class="card-desc" style="line-height:1.6;">
              • <strong>AI as Copilot, Human as Authority:</strong> Agents discover and corroborate discrepancies, but human auditors hold final claim approval authority.<br/><br/>
              • <strong>1-Click Decision Actions:</strong><br/>
              1. <em>APPROVE CLAIM:</em> Endorses $1,200.00 recovery and generates formal dispute notice.<br/>
              2. <em>OVERRIDE TOLERANCE:</em> Flags transaction as acceptable commercial concession.<br/>
              3. <em>REQUEST RE-AUDIT:</em> Triggers re-verification against updated vendor notes.
            </div>
          </div>
          <div class="card" style="border-color:#10b981; background:#064e3b15;">
            <div class="card-title highlight-green">SYNTHESIZED DISPUTE NOTICE</div>
            <div class="card-heading">Ready-to-Dispatch Supplier Email</div>
            <div class="card-desc" style="font-size:0.8rem; line-height:1.4; color:#e2e8f0; font-family:monospace; background:rgba(0,0,0,0.3); padding:0.75rem; border-radius:0.5rem;">
              Subject: Notice of Invoice Discrepancy — PO-1001 / INV-9001<br/><br/>
              Dear Apex Industrial Accounts Team,<br/><br/>
              Our automated audit of PO-1001 has identified $1,200.00 in discrepancies requiring adjustment prior to payment:<br/>
              1. Quantity Overbilling ($1,000.00): Invoiced 120 units; warehouse dock note DN-045 logged 100 units received.<br/>
              2. Rate Escalation ($200.00): Invoiced price of $50.00 exceeds Master Agreement ceiling of $48.00 (Section 4.2).<br/><br/>
              Please issue an amended invoice or credit memo for $1,200.00.
            </div>
          </div>
        </div>
      `,
      notes: "Crucially, TraceBack AI keeps a human in the loop. The AI discovers and documents the leakages, but the human auditor endorses the claim. With one click, the system synthesizes a professional supplier dispute notice citing every dock note and contract section."
    },
    {
      id: 24, section: "SECTION 05 / 05", title: "Sponsor Tech Integration: Zetaris & Meterless",
      sub: "How cutting-edge virtualization and agent infrastructure power TraceBack AI core capabilities.",
      render: `
        <div style="background:#0f172a; border:2px solid #a855f7; border-radius:1rem; padding:2rem; height:100%; display:flex; flex-direction:column; justify-content:space-between;">
          <div>
            <div style="display:inline-block; font-size:0.75rem; font-family:'JetBrains Mono',monospace; padding:0.25rem 0.75rem; background:rgba(168,85,247,0.2); border:1px solid #a855f7; border-radius:9999px; color:#a855f7; margin-bottom:1rem; font-weight:700;">SECTION 05 / 05</div>
            <div style="font-size:2.4rem; font-weight:800; color:#fff; line-height:1.2; margin-bottom:0.5rem;">Sponsor Tech Integration: Zetaris & Meterless</div>
            <div style="font-size:1.1rem; color:#cbd5e1;">How cutting-edge virtualization and agent infrastructure power TraceBack AI core capabilities.</div>
          </div>
          <div class="grid-3">
            <div class="card" style="border-color:#1e293b;">
              <div style="font-size:1.4rem; font-weight:800; color:#a855f7; margin-bottom:0.25rem;">01</div>
              <div style="font-size:1.05rem; font-weight:700; color:#fff; margin-bottom:0.5rem;">Zetaris Virtualization</div>
              <div style="font-size:0.85rem; color:#94a3b8;">Zero-ETL federated queries executing across 4 enterprise datasets in 12ms without pipelines.</div>
            </div>
            <div class="card" style="border-color:#1e293b;">
              <div style="font-size:1.4rem; font-weight:800; color:#a855f7; margin-bottom:0.25rem;">02</div>
              <div style="font-size:1.05rem; font-weight:700; color:#fff; margin-bottom:0.5rem;">Meterless Engine</div>
              <div style="font-size:0.85rem; color:#94a3b8;">Scout intent parsing, Relay asynchronous routing, and Gaia H-MEM persistent working memory.</div>
            </div>
            <div class="card" style="border-color:#1e293b;">
              <div style="font-size:1.4rem; font-weight:800; color:#a855f7; margin-bottom:0.25rem;">03</div>
              <div style="font-size:1.05rem; font-weight:700; color:#fff; margin-bottom:0.5rem;">Nightshift AI Provider</div>
              <div style="font-size:0.85rem; color:#94a3b8;">4-stage local reasoning provider (Race, Judge, Verify, Generate) delivering receipts at $0.00 cloud token cost.</div>
            </div>
          </div>
        </div>
      `,
      notes: "Section Five details our deep integration with Sponsor Technologies. We demonstrate how Zetaris Data Virtualization, Meterless Engine orchestration, and Meterless Nightshift AI make this platform lightning fast, private, and cost-effective."
    },
    {
      id: 25, section: "5. Sponsor Tech", title: "Zetaris Data Virtualization: Zero-ETL Federated SQL",
      sub: "Querying enterprise data where it lives without data movement or pipeline lag.",
      render: `
        <div class="grid-2" style="height:100%;">
          <div class="card" style="border-color:#38bdf8;">
            <div class="card-title highlight-sky">ZETARIS VIRTUALIZATION ENGINE</div>
            <div class="card-heading">Zero-ETL Federated SQL Join</div>
            <div class="card-desc" style="line-height:1.6;">
              • <strong>Direct Virtualization:</strong> Zetaris connects directly to SAP ERP tables, WMS dock logs, AP invoices, and contract schedules.<br/>
              • <strong>12ms Query Latency:</strong> Executes cross-table joins on the fly across heterogeneous schemas without staging databases.<br/>
              • <strong>Zero Data Duplication:</strong> Financial and banking data never leaves its original security perimeter, satisfying enterprise data residency.<br/>
              • <strong>Zero Pipeline Maintenance:</strong> Eliminates brittle ETL jobs that break whenever a schema changes.
            </div>
          </div>
          <div class="card" style="border-color:#38bdf8; background:#082f4915;">
            <div class="card-title highlight-sky">ENTERPRISE RESILIENCE & HYBRID MODE</div>
            <div class="card-heading">Seamless Cloud & Offline Fallback</div>
            <div class="card-desc" style="line-height:1.6;">
              • <strong>Live Cloud Connection:</strong> When Zetaris endpoints are available, queries route through the enterprise virtualization gateway.<br/>
              • <strong>In-Memory SQLite Fallback:</strong> When offline or in air-gapped dev environments, our SQLite mock replicates identical SQL federation semantics.<br/>
              • <strong>100% High Availability:</strong> Financial audits never fail due to network interruptions.<br/>
              • <strong>Verifiable Telemetry:</strong> Every query returns latency metrics and data lineage logs for full operational observability.
            </div>
          </div>
        </div>
      `,
      notes: "Zetaris is the foundation of our data tier. Instead of copying sensitive financial data across ETL pipelines, Zetaris queries data where it lives. Federated joins execute across four disparate datasets in just twelve milliseconds with zero replication."
    },
    {
      id: 26, section: "5. Sponsor Tech", title: "Meterless Engine Architecture: Scout, Relay & H-MEM",
      sub: "Autonomous multi-agent orchestration, intent parsing, and hierarchical memory.",
      render: `
        <div class="grid-3" style="height:100%;">
          <div class="card" style="border-color:#6366f1;">
            <div class="card-title" style="color:#818cf8;">SCOUT INTENT</div>
            <div class="card-heading">Meterless Scout Engine</div>
            <div class="badge" style="margin-bottom:0.5rem;">12ms Latency</div>
            <div class="card-desc">Analyzes user prompts, audit directives, and compliance policies. Configures audit tolerances ($0 threshold) and translates natural language queries into structured execution plans.</div>
          </div>
          <div class="card" style="border-color:#38bdf8;">
            <div class="card-title highlight-sky">RELAY ENGINE</div>
            <div class="card-heading">Meterless Relay Router</div>
            <div class="badge" style="margin-bottom:0.5rem;">18ms Latency</div>
            <div class="card-desc">Asynchronous multi-agent dispatcher that coordinates tool execution. Routes queries to Zetaris, triggers reconciliation algorithms, and monitors execution telemetry.</div>
          </div>
          <div class="card" style="border-color:#a855f7;">
            <div class="card-title highlight-purple">GAIA H-MEM</div>
            <div class="card-heading">Hierarchical Working Memory</div>
            <div class="badge" style="margin-bottom:0.5rem;">Persistent State</div>
            <div class="card-desc">Meterless Gaia H-MEM maintains multi-turn context across audit sessions. Persists investigation checkpoints, dispute correspondence, and historical auditor decisions.</div>
          </div>
        </div>
      `,
      notes: "For agent orchestration, we leverage the Meterless Engine. Scout extracts audit intent. Relay coordinates tool execution and data queries. And Gaia H-MEM provides hierarchical memory so multi-turn audit investigations maintain state seamlessly."
    },
    {
      id: 27, section: "5. Sponsor Tech", title: "Meterless Nightshift AI: $0.00 Token Compute Provider",
      sub: "Local AI reasoning cycle: Race, Judge, Verify, and Generate.",
      render: `
        <div class="grid-4" style="height:100%;">
          <div class="card" style="border-color:#38bdf8;">
            <div class="card-title highlight-sky">STAGE 1: RACE</div>
            <div class="card-heading">Parallel Threads</div>
            <div style="font-size:0.75rem; color:#38bdf8; font-family:'JetBrains Mono'; margin-bottom:0.5rem;">Parallel Local Inference</div>
            <div class="card-desc">Nightshift initiates parallel local inference threads to evaluate discrepancy patterns against enterprise policies.</div>
          </div>
          <div class="card" style="border-color:#f59e0b;">
            <div class="card-title highlight-amber">STAGE 2: JUDGE</div>
            <div class="card-heading">Tolerance Check</div>
            <div style="font-size:0.75rem; color:#f59e0b; font-family:'JetBrains Mono'; margin-bottom:0.5rem;">Policy Validator</div>
            <div class="card-desc">Threshold evaluator applies corporate tolerance rules (strict $0 allowance) to eliminate immaterial noise.</div>
          </div>
          <div class="card" style="border-color:#10b981;">
            <div class="card-title highlight-green">STAGE 3: VERIFY</div>
            <div class="card-heading">Math Prover</div>
            <div style="font-size:0.75rem; color:#10b981; font-family:'JetBrains Mono'; margin-bottom:0.5rem;">100% Math Calculation</div>
            <div class="card-desc">Deterministic math prover checks calculations: quantity variance, price differential, and invoice sum.</div>
          </div>
          <div class="card" style="border-color:#a855f7;">
            <div class="card-title highlight-purple">STAGE 4: GENERATE</div>
            <div class="card-heading">$0.00 Tokens</div>
            <div style="font-size:0.75rem; color:#a855f7; font-family:'JetBrains Mono'; margin-bottom:0.5rem;">Immutable Receipt</div>
            <div class="card-desc">Generates immutable cryptographic audit receipt and dispute letter at zero dollar cloud token cost.</div>
          </div>
        </div>
      `,
      notes: "Our AI provider is Meterless Nightshift. Nightshift executes a four-stage local reasoning cycle: Race, Judge, Verify, and Generate. Because it runs locally, it incurs zero cloud token costs, avoids vendor API rate limits, and produces cryptographically verifiable audit receipts."
    },
    {
      id: 28, section: "5. Sponsor Tech / Conclusion", title: "Summary, Live Demo, and Open-Source Repository",
      sub: "TraceBack AI turns enterprise procurement leakage into measurable cash recovery.",
      render: `
        <div style="display:flex; flex-direction:column; gap:0.6rem; height:100%; justify-content:center;">
          <div class="card" style="border-color:#38bdf8; padding:0.65rem 1.25rem;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <div><strong style="color:#fff;">Live Web Application (GitHub Pages)</strong><div style="font-size:0.75rem; color:#94a3b8;">Full interactive React dashboard with simulation, audit trail & claim approval.</div></div>
              <a href="https://zaintahir2025.github.io/traceback-ai/" target="_blank" style="color:#38bdf8; font-family:'JetBrains Mono'; font-size:0.8rem;">Launch App ▶</a>
            </div>
          </div>
          <div class="card" style="border-color:#10b981; padding:0.65rem 1.25rem;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <div><strong style="color:#fff;">Interactive Web Presentation Deck</strong><div style="font-size:0.75rem; color:#94a3b8;">In-browser 28-slide deck with keyboard navigation and speaker notes.</div></div>
              <a href="https://zaintahir2025.github.io/traceback-ai/presentation.html" target="_blank" style="color:#10b981; font-family:'JetBrains Mono'; font-size:0.8rem;">View Slides ▶</a>
            </div>
          </div>
          <div class="card" style="border-color:#6366f1; padding:0.65rem 1.25rem;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <div><strong style="color:#fff;">PowerPoint File (.pptx) Download</strong><div style="font-size:0.75rem; color:#94a3b8;">Direct download of official 28-slide Microsoft PowerPoint deck.</div></div>
              <a href="https://zaintahir2025.github.io/traceback-ai/traceback-ai-presentation.pptx" download style="color:#818cf8; font-family:'JetBrains Mono'; font-size:0.8rem;">Download .PPTX (708 KB) ▶</a>
            </div>
          </div>
          <div class="card" style="border-color:#f59e0b; padding:0.65rem 1.25rem;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <div><strong style="color:#fff;">Official Demo Video (MP4) File</strong><div style="font-size:0.75rem; color:#94a3b8;">Direct download of 107-second HD MP4 video file (4.22 MB).</div></div>
              <a href="https://zaintahir2025.github.io/traceback-ai/traceback-ai-demo.mp4" download style="color:#f59e0b; font-family:'JetBrains Mono'; font-size:0.8rem;">Download MP4 (4.22 MB) ▶</a>
            </div>
          </div>
          <div class="card" style="border-color:#a855f7; padding:0.65rem 1.25rem;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <div><strong style="color:#fff;">Open-Source GitHub Repository</strong><div style="font-size:0.75rem; color:#94a3b8;">Full source code, backend API, tests, Zetaris integration & Meterless engine.</div></div>
              <a href="https://github.com/zaintahir2025/traceback-ai" target="_blank" style="color:#a855f7; font-family:'JetBrains Mono'; font-size:0.8rem;">View GitHub ▶</a>
            </div>
          </div>
        </div>
      `,
      notes: "In conclusion: TraceBack AI demonstrates that autonomous agents, when grounded in Zero-ETL Data Virtualization and local intelligence, solve real multi-million dollar enterprise problems. Everything shown today is live, verifiable, and open-source. Thank you very much!"
    }
  ];

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TraceBack AI — 28-Slide Executive Deck</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #020617;
      color: #f8fafc;
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
      user-select: none;
    }
    .deck-container {
      width: 100%;
      max-width: 1200px;
      background: #0b1120;
      border: 1px solid #1e293b;
      border-radius: 1rem;
      overflow: hidden;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8);
      display: flex;
      flex-direction: column;
    }
    .deck-header {
      padding: 0.75rem 1.5rem;
      background: #090d16;
      border-bottom: 1px solid #1e293b;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    .deck-title {
      font-size: 0.95rem;
      font-weight: 700;
      color: #fff;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .badge {
      font-size: 0.7rem;
      font-family: 'JetBrains Mono', monospace;
      padding: 0.2rem 0.5rem;
      border-radius: 9999px;
      background: rgba(99, 102, 241, 0.15);
      border: 1px solid rgba(99, 102, 241, 0.4);
      color: #a5b4fc;
    }
    .badge-sponsor {
      background: rgba(16, 185, 129, 0.15);
      border-color: rgba(16, 185, 129, 0.4);
      color: #6ee7b7;
    }
    .slide-viewport {
      aspect-ratio: 16 / 9;
      background: #020617;
      position: relative;
      display: flex;
      flex-direction: column;
      padding: 2.2rem 2.8rem;
      overflow: hidden;
    }
    .slide-top-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.75rem;
    }
    .slide-category {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      padding: 0.3rem 0.75rem;
      border-radius: 9999px;
      background: rgba(99, 102, 241, 0.15);
      border: 1px solid rgba(99, 102, 241, 0.4);
      color: #c7d2fe;
    }
    .slide-number {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.8rem;
      color: #94a3b8;
    }
    .slide-heading {
      font-size: 1.65rem;
      font-weight: 800;
      color: #fff;
      line-height: 1.2;
      margin-bottom: 0.35rem;
    }
    .slide-sub {
      font-size: 0.95rem;
      color: #94a3b8;
      margin-bottom: 1.25rem;
    }
    .slide-body {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-height: 0;
    }
    .deck-controls {
      padding: 0.75rem 1.5rem;
      background: #090d16;
      border-top: 1px solid #1e293b;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    .btn-group { display: flex; gap: 0.5rem; align-items: center; }
    button, .btn {
      background: #1e293b;
      color: #f8fafc;
      border: 1px solid #334155;
      padding: 0.4rem 0.85rem;
      border-radius: 0.5rem;
      font-size: 0.82rem;
      font-weight: 600;
      cursor: pointer;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      transition: all 0.15s ease;
    }
    button:hover, .btn:hover { background: #334155; border-color: #475569; }
    .btn-primary { background: #4f46e5; border-color: #4338ca; color: #fff; }
    .btn-primary:hover { background: #4338ca; }
    .btn-emerald { background: #059669; border-color: #047857; color: #fff; }
    .btn-emerald:hover { background: #047857; }
    .btn-blue { background: #2563eb; border-color: #1d4ed8; color: #fff; }
    .btn-blue:hover { background: #1d4ed8; }
    select {
      background: #1e293b;
      color: #f8fafc;
      border: 1px solid #334155;
      padding: 0.4rem 0.75rem;
      border-radius: 0.5rem;
      outline: none;
      font-family: inherit;
    }
    .speaker-notes-box {
      width: 100%;
      max-width: 1200px;
      margin-top: 1rem;
      background: #090d16;
      border: 1px solid #1e293b;
      border-radius: 0.75rem;
      padding: 1rem 1.5rem;
      font-size: 0.85rem;
      color: #cbd5e1;
      line-height: 1.5;
    }
    .notes-title {
      font-size: 0.75rem;
      font-family: 'JetBrains Mono', monospace;
      font-weight: 700;
      color: #38bdf8;
      text-transform: uppercase;
      margin-bottom: 0.35rem;
    }
    .grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
    .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
    .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
    .card {
      background: #0b1120;
      border: 1.5px solid #1e293b;
      border-radius: 0.75rem;
      padding: 1.15rem;
      display: flex;
      flex-direction: column;
    }
    .card-title { font-size: 0.75rem; font-family: 'JetBrains Mono', monospace; font-weight: 700; margin-bottom: 0.25rem; }
    .card-heading { font-size: 1.05rem; font-weight: 700; color: #fff; margin-bottom: 0.5rem; }
    .card-desc { font-size: 0.82rem; color: #94a3b8; line-height: 1.4; flex: 1; }
    .highlight-red { color: #f43f5e; font-weight: 700; }
    .highlight-green { color: #10b981; font-weight: 700; }
    .highlight-amber { color: #f59e0b; font-weight: 700; }
    .highlight-sky { color: #38bdf8; font-weight: 700; }
    .highlight-purple { color: #a855f7; font-weight: 700; }
  </style>
</head>
<body>

  <div class="deck-container">
    <div class="deck-header">
      <div class="deck-title">
        <span>TraceBack AI</span>
        <span class="badge">28-SLIDE EXECUTIVE DECK</span>
        <span class="badge badge-sponsor">ZETARIS & METERLESS</span>
      </div>
      <div class="btn-group">
        <select id="slidePicker" onchange="jumpToSlide(this.value)" style="font-size:0.75rem;">
          <!-- Populated by script -->
        </select>
        <a href="./traceback-ai-presentation.pptx" download="traceback-ai-presentation.pptx" class="btn btn-blue">
          Download .PPTX (708 KB)
        </a>
        <a href="./" class="btn">
          Back to Dashboard
        </a>
      </div>
    </div>

    <!-- Active Slide Viewport -->
    <div class="slide-viewport" id="slideViewport">
      <!-- Rendered dynamically -->
    </div>

    <!-- Deck Controls -->
    <div class="deck-controls">
      <div class="btn-group">
        <button onclick="prevSlide()">◀ Previous</button>
        <button onclick="nextSlide()" class="btn-primary">Next ▶</button>
        <span id="slideCounter" style="font-family:'JetBrains Mono',monospace; font-size:0.8rem; margin:0 0.5rem; color:#94a3b8;">
          Slide 1 of 28
        </span>
      </div>

      <div class="btn-group">
        <button onclick="toggleNotes()" id="notesToggleBtn">Toggle Speaker Notes</button>
        <a href="./demo-video.html" class="btn btn-emerald">Watch 2-Min Demo Video ▶</a>
      </div>
    </div>
  </div>

  <!-- Speaker Notes Container -->
  <div class="speaker-notes-box" id="speakerNotesBox">
    <div class="notes-title">Speaker Script & Presenter Notes</div>
    <div id="notesContent">Loading speaker notes...</div>
  </div>

  <script>
    const slides = ${JSON.stringify(slides, null, 2)};

    let currentSlide = 0;
    let showNotes = true;

    function init() {
      const picker = document.getElementById('slidePicker');
      picker.innerHTML = slides.map((s, idx) => 
        \`<option value="\${idx}">Slide \${s.id}: [\${s.section}] \${s.title}</option>\`
      ).join('');
      renderSlide();
    }

    function renderSlide() {
      const s = slides[currentSlide];
      const vp = document.getElementById('slideViewport');

      vp.innerHTML = \`
        <div class="slide-top-bar">
          <div class="slide-category">\${s.section.toUpperCase()}</div>
          <div style="display:flex; gap:0.5rem;">
            <span class="badge" style="background:#082F49; border-color:#0284C7; color:#7DD3FC;">ZETARIS FEDERATED</span>
            <span class="badge" style="background:#064E3B; border-color:#059669; color:#6EE7B7;">METERLESS NIGHTSHIFT</span>
          </div>
          <div class="slide-number">SLIDE \${s.id} OF \${slides.length}</div>
        </div>
        <div class="slide-heading">\${s.title}</div>
        <div class="slide-sub">\${s.sub}</div>
        <div class="slide-body">\${s.render}</div>
      \`;

      document.getElementById('slideCounter').innerText = \`Slide \${s.id} of \${slides.length}\`;
      document.getElementById('slidePicker').value = currentSlide;
      document.getElementById('notesContent').innerText = s.notes || "No notes available.";
    }

    function nextSlide() {
      if (currentSlide < slides.length - 1) {
        currentSlide++;
        renderSlide();
      }
    }

    function prevSlide() {
      if (currentSlide > 0) {
        currentSlide--;
        renderSlide();
      }
    }

    function jumpToSlide(idx) {
      currentSlide = parseInt(idx, 10);
      renderSlide();
    }

    function toggleNotes() {
      showNotes = !showNotes;
      document.getElementById('speakerNotesBox').style.display = showNotes ? 'block' : 'none';
      document.getElementById('notesToggleBtn').innerText = showNotes ? 'Hide Speaker Notes' : 'Show Speaker Notes';
    }

    // Keyboard navigation
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        prevSlide();
      }
    });

    init();
  </script>
</body>
</html>`;

  fs.writeFileSync('frontend/public/presentation.html', html, 'utf8');
  fs.writeFileSync('docs/presentation.html', html, 'utf8');
  console.log('SUCCESS: Generated frontend/public/presentation.html and docs/presentation.html');
}

generatePresentationHtml();
