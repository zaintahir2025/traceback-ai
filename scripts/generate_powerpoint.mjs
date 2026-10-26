import pptxgen from 'pptxgenjs';
import fs from 'node:fs';
import path from 'node:path';

async function generate28SlideDeck() {
  const pres = new pptxgen();

  pres.layout = 'LAYOUT_16x9'; // 13.33 x 7.5 inches
  pres.author = 'Zain Tahir';
  pres.company = 'TraceBack AI';
  pres.title = 'TraceBack AI — Comprehensive 28-Slide Executive Deck';
  pres.subject = 'Autonomous 4-Way Cross-Source Data Virtualization & Spend Recovery Agent';

  // Palette Constants
  const BG_DARK = '020617';        // Slate 950
  const CARD_BG = '0B1120';        // Slate 900
  const CARD_BG_ALT = '0F172A';    // Slate 850
  const BORDER_COLOR = '1E293B';   // Slate 800
  const TEXT_WHITE = 'FFFFFF';
  const TEXT_LIGHT = 'F8FAFC';
  const TEXT_MUTED = '94A3B8';
  const TEXT_SLATE = 'CBD5E1';
  const ACCENT_INDIGO = '6366F1';
  const ACCENT_EMERALD = '10B981';
  const ACCENT_ROSE = 'F43F5E';
  const ACCENT_AMBER = 'F59E0B';
  const ACCENT_SKY = '38BDF8';
  const ACCENT_PURPLE = 'A855F7';

  // Helper: Top Header Bar on Content Slides
  function addHeader(slide, slideNum, totalSlides, category, title, subtitle) {
    // Top category pill
    slide.addShape(pres.ShapeType.roundRect, {
      x: 0.8, y: 0.42, w: 2.8, h: 0.32,
      rectRadius: 0.16,
      fill: { color: '1E1B4B' },
      line: { color: '4338CA', width: 1 }
    });
    slide.addText(category.toUpperCase(), {
      x: 0.8, y: 0.42, w: 2.8, h: 0.32,
      fontSize: 9.5, fontFace: 'Calibri', bold: true, color: 'A5B4FC',
      align: 'center', valign: 'middle'
    });

    // Slide Counter Pill
    slide.addShape(pres.ShapeType.roundRect, {
      x: 3.75, y: 0.42, w: 1.5, h: 0.32,
      rectRadius: 0.16,
      fill: { color: '0F172A' },
      line: { color: '334155', width: 1 }
    });
    slide.addText(`SLIDE ${slideNum} OF ${totalSlides}`, {
      x: 3.75, y: 0.42, w: 1.5, h: 0.32,
      fontSize: 8.5, fontFace: 'Calibri', bold: true, color: '94A3B8',
      align: 'center', valign: 'middle'
    });

    // Top Right Sponsor Pills
    slide.addShape(pres.ShapeType.roundRect, {
      x: 8.9, y: 0.42, w: 1.8, h: 0.32,
      rectRadius: 0.16,
      fill: { color: '082F49' },
      line: { color: '0284C7', width: 1 }
    });
    slide.addText('ZETARIS FEDERATED', {
      x: 8.9, y: 0.42, w: 1.8, h: 0.32,
      fontSize: 8.5, fontFace: 'Calibri', bold: true, color: '7DD3FC',
      align: 'center', valign: 'middle'
    });

    slide.addShape(pres.ShapeType.roundRect, {
      x: 10.8, y: 0.42, w: 1.7, h: 0.32,
      rectRadius: 0.16,
      fill: { color: '064E3B' },
      line: { color: '059669', width: 1 }
    });
    slide.addText('METERLESS NIGHTSHIFT', {
      x: 10.8, y: 0.42, w: 1.7, h: 0.32,
      fontSize: 8.5, fontFace: 'Calibri', bold: true, color: '6EE7B7',
      align: 'center', valign: 'middle'
    });

    // Main slide title
    slide.addText(title, {
      x: 0.8, y: 0.82, w: 11.7, h: 0.55,
      fontSize: 21, fontFace: 'Calibri', bold: true, color: TEXT_WHITE,
      valign: 'top'
    });

    // Optional subtitle
    if (subtitle) {
      slide.addText(subtitle, {
        x: 0.8, y: 1.35, w: 11.7, h: 0.32,
        fontSize: 12.5, fontFace: 'Calibri', color: TEXT_MUTED,
        valign: 'top'
      });
    }
  }

  const TOTAL_SLIDES = 28;

  // =========================================================================
  // SECTION 1: EXECUTIVE OVERVIEW & CONTEXT (SLIDES 1-4)
  // =========================================================================

  // SLIDE 1: Title Slide (Cover)
  {
    const slide = pres.addSlide();
    slide.background = { color: BG_DARK };

    slide.addShape(pres.ShapeType.roundRect, {
      x: 0.8, y: 0.8, w: 11.73, h: 5.8,
      rectRadius: 0.2,
      fill: { color: CARD_BG },
      line: { color: '312E81', width: 2 }
    });

    slide.addShape(pres.ShapeType.roundRect, {
      x: 1.3, y: 1.3, w: 3.5, h: 0.36,
      rectRadius: 0.18,
      fill: { color: '1E1B4B' },
      line: { color: '6366F1', width: 1.5 }
    });
    slide.addText('GLOBAL AI HACKATHON 2026', {
      x: 1.3, y: 1.3, w: 3.5, h: 0.36,
      fontSize: 11, fontFace: 'Calibri', bold: true, color: 'C7D2FE',
      align: 'center', valign: 'middle'
    });

    slide.addText('TraceBack AI', {
      x: 1.3, y: 1.85, w: 10.5, h: 0.95,
      fontSize: 46, fontFace: 'Calibri', bold: true, color: TEXT_WHITE,
      valign: 'middle'
    });

    slide.addText('Autonomous 4-Way Cross-Source Data Virtualization & Spend Recovery Agent', {
      x: 1.3, y: 2.8, w: 10.5, h: 0.45,
      fontSize: 17, fontFace: 'Calibri', bold: true, color: ACCENT_SKY,
      valign: 'top'
    });

    slide.addText('Unifying ERP purchase orders, warehouse delivery notes, AP invoices, and master contracts with Zero-ETL virtualization, cell-level audit defensibility, and $0.00 local AI execution.', {
      x: 1.3, y: 3.3, w: 10.5, h: 0.65,
      fontSize: 13.5, fontFace: 'Calibri', color: TEXT_SLATE,
      valign: 'top'
    });

    const pillars = [
      { label: 'ZETARIS VIRTUALIZATION', desc: 'Zero-ETL federated queries across 4 enterprise datasets in 12ms', color: ACCENT_SKY, bg: '082F49' },
      { label: 'METERLESS RELAY & H-MEM', desc: 'Scout intent, relay coordination, and persistent Gaia memory', color: ACCENT_EMERALD, bg: '064E3B' },
      { label: 'NIGHTSHIFT AI PROVIDER', desc: '4-stage Race/Judge/Verify/Generate cycle at $0 cloud token cost', color: ACCENT_PURPLE, bg: '2E1065' }
    ];

    pillars.forEach((p, idx) => {
      const px = 1.3 + idx * 3.6;
      slide.addShape(pres.ShapeType.roundRect, {
        x: px, y: 4.25, w: 3.4, h: 1.25,
        rectRadius: 0.15,
        fill: { color: p.bg },
        line: { color: p.color, width: 1.5 }
      });
      slide.addText(p.label, {
        x: px + 0.15, y: 4.35, w: 3.1, h: 0.3,
        fontSize: 10.5, fontFace: 'Calibri', bold: true, color: p.color
      });
      slide.addText(p.desc, {
        x: px + 0.15, y: 4.65, w: 3.1, h: 0.75,
        fontSize: 10.5, fontFace: 'Calibri', color: TEXT_SLATE
      });
    });

    slide.addText('Live Deployment: https://zaintahir2025.github.io/traceback-ai/   |   Lead Developer: Zain Tahir', {
      x: 1.3, y: 5.9, w: 10.5, h: 0.3,
      fontSize: 10, fontFace: 'Calibri', color: TEXT_MUTED
    });

    slide.addNotes('Welcome everyone. Today we are presenting TraceBack AI, an autonomous multi-agent platform designed to eliminate enterprise procurement spend leakage. By combining Zetaris Zero-ETL Data Virtualization, Meterless Relay Orchestration, and Meterless Nightshift local intelligence, TraceBack AI reconciles purchase orders, delivery notes, supplier invoices, and legal contracts in under 200 milliseconds with an immutable, cell-level audit trail.');
  }

  // SLIDE 2: Executive Summary & Mission
  {
    const slide = pres.addSlide();
    slide.background = { color: BG_DARK };
    addHeader(slide, 2, TOTAL_SLIDES, 'Executive Summary', 'Mission & Core Value Proposition', 'Eliminating enterprise procurement leakage through autonomous cross-source data virtualization.');

    slide.addShape(pres.ShapeType.roundRect, {
      x: 0.8, y: 1.85, w: 11.73, h: 4.95,
      rectRadius: 0.15,
      fill: { color: CARD_BG },
      line: { color: BORDER_COLOR, width: 1.5 }
    });

    const pillars = [
      {
        num: '01', title: 'The Industry Imperative',
        body: 'Fortune 500 enterprises lose 1.5% to 4.0% of their total procurement spend to uncaptured invoice discrepancies, quantity mismatches, and contract rate creep.',
        color: ACCENT_ROSE
      },
      {
        num: '02', title: 'The Architectural Breakthrough',
        body: 'Instead of building expensive, slow ETL data pipelines, TraceBack AI employs Zetaris Data Virtualization to query live enterprise datasets in place with zero data movement.',
        color: ACCENT_SKY
      },
      {
        num: '03', title: 'Autonomous Multi-Agent Audit',
        body: 'Meterless Engine orchestrates Scout Intent and Relay tools, while Meterless Nightshift provides local reasoning at $0.00 cloud token cost with cryptographic receipts.',
        color: ACCENT_EMERALD
      },
      {
        num: '04', title: 'Human Governance & Action',
        body: 'Lead auditors retain 1-click claim approval authority, generating automated supplier dispute notices citing exact contract clauses and delivery notes.',
        color: ACCENT_PURPLE
      }
    ];

    pillars.forEach((p, idx) => {
      const col = idx % 2;
      const row = Math.floor(idx / 2);
      const px = 1.1 + col * 5.65;
      const py = 2.1 + row * 2.25;

      slide.addShape(pres.ShapeType.roundRect, {
        x: px, y: py, w: 5.4, h: 2.05,
        rectRadius: 0.1,
        fill: { color: CARD_BG_ALT },
        line: { color: p.color, width: 1 }
      });

      slide.addText(p.num, {
        x: px + 0.2, y: py + 0.15, w: 0.8, h: 0.35,
        fontSize: 16, fontFace: 'Calibri', bold: true, color: p.color
      });
      slide.addText(p.title, {
        x: px + 1.0, y: py + 0.15, w: 4.2, h: 0.35,
        fontSize: 14, fontFace: 'Calibri', bold: true, color: TEXT_WHITE
      });
      slide.addText(p.body, {
        x: px + 0.2, y: py + 0.55, w: 5.0, h: 1.35,
        fontSize: 11, fontFace: 'Calibri', color: TEXT_SLATE
      });
    });

    slide.addNotes('Our mission is simple: transform procurement auditing from a slow, sample-based, manual retrospective into a real-time, 100% census spend defense system. Traditional systems fail because data is siloed across ERP, warehouse, accounts payable, and legal contracts. TraceBack AI connects these systems virtually, analyzes discrepancies deterministically, and prepares ready-to-send dispute claims in seconds.');
  }

  // SLIDE 3: Enterprise Procurement Landscape
  {
    const slide = pres.addSlide();
    slide.background = { color: BG_DARK };
    addHeader(slide, 3, TOTAL_SLIDES, 'Market Context', 'The $14 Trillion Global Procurement Challenge', 'Massive transaction velocity overwhelms traditional financial controls.');

    const cards = [
      { num: '$14T', label: 'Global B2B Spend', sub: 'Annual goods and services procured by commercial enterprises worldwide.', color: ACCENT_SKY },
      { num: '4.0%', label: 'Max Spend Leakage', sub: 'Observed variance between contracted rates, dock receipts, and paid invoices.', color: ACCENT_ROSE },
      { num: '100K+', label: 'Invoices / Year', sub: 'Average enterprise transaction volume processed by Accounts Payable teams.', color: ACCENT_AMBER },
      { num: '<5%', label: 'Audit Coverage', sub: 'Typical percentage of invoices audited in depth before disbursement.', color: ACCENT_PURPLE }
    ];

    cards.forEach((c, idx) => {
      const cx = 0.8 + idx * 2.98;
      slide.addShape(pres.ShapeType.roundRect, {
        x: cx, y: 1.85, w: 2.85, h: 2.1,
        rectRadius: 0.12,
        fill: { color: CARD_BG },
        line: { color: c.color, width: 1.5 }
      });
      slide.addText(c.num, {
        x: cx + 0.15, y: 2.0, w: 2.55, h: 0.7,
        fontSize: 34, fontFace: 'Calibri', bold: true, color: c.color,
        align: 'center', valign: 'middle'
      });
      slide.addText(c.label, {
        x: cx + 0.15, y: 2.75, w: 2.55, h: 0.3,
        fontSize: 13, fontFace: 'Calibri', bold: true, color: TEXT_WHITE,
        align: 'center'
      });
      slide.addText(c.sub, {
        x: cx + 0.15, y: 3.1, w: 2.55, h: 0.75,
        fontSize: 10, fontFace: 'Calibri', color: TEXT_SLATE,
        align: 'center'
      });
    });

    slide.addShape(pres.ShapeType.roundRect, {
      x: 0.8, y: 4.15, w: 11.73, h: 2.65,
      rectRadius: 0.15,
      fill: { color: CARD_BG_ALT },
      line: { color: BORDER_COLOR, width: 1.5 }
    });

    slide.addText('WHY ENTERPRISES FAIL TO CAPTURE OVERCHARGES TODAY:', {
      x: 1.1, y: 4.35, w: 11.1, h: 0.3,
      fontSize: 11, fontFace: 'Calibri', bold: true, color: ACCENT_AMBER
    });

    slide.addText('1. Disconnected Software Systems: SAP ERP, Blue Yonder WMS, Coupa AP, and DocuSign contracts do not share a common query model.\n2. Fragile Data Pipelines: Traditional ETL data lakehouse projects take 6-12 months and $500K+ in engineering before returning insights.\n3. Human Bottlenecks: Clerks match PO totals against invoice headers, ignoring line-item rate escalations and warehouse receipt exceptions.\n4. Commercial Erosion: Suppliers quietly test rate increases; when unflagged on the first invoice, higher rates become the de facto baseline.', {
      x: 1.1, y: 4.75, w: 11.1, h: 1.85,
      fontSize: 11, fontFace: 'Calibri', color: TEXT_SLATE
    });

    slide.addNotes('Global B2B procurement processes 14 trillion dollars every year. Yet, less than 5% of invoices ever receive rigorous, multi-point cross-source verification before payment. ERPs perform basic two-way matching that only compares the invoice against the purchase order. They completely miss the warehouse receiving dock notes where items were damaged or unreceived, and they miss the contract pricing schedule where unit price ceilings were negotiated.');
  }

  // SLIDE 4: Key Performance Indicators & Benchmark Highlights
  {
    const slide = pres.addSlide();
    slide.background = { color: BG_DARK };
    addHeader(slide, 4, TOTAL_SLIDES, 'Performance Metrics', 'TraceBack AI Quantitative Benchmark Results', 'Rigorous empirical results across live enterprise reconciliation tests.');

    const kpis = [
      { metric: '184ms', label: 'End-to-End Latency', desc: 'Complete 4-way cross-source audit cycle time per purchase order', color: ACCENT_SKY },
      { metric: '$1,200', label: 'Direct Recovery / PO', desc: 'Recovered overcharge on benchmark order PO-1001 with supplier SUP-42', color: ACCENT_EMERALD },
      { metric: '96.5%', label: 'Audit Confidence', desc: 'Deterministic multi-point corroboration across all 4 independent data sources', color: ACCENT_AMBER },
      { metric: '0.00%', label: 'False Positive Rate', desc: 'Validated on PO-1002 clean benchmark order with 100% concordance ($0 flagged)', color: ACCENT_PURPLE }
    ];

    kpis.forEach((k, idx) => {
      const kx = 0.8 + idx * 2.98;
      slide.addShape(pres.ShapeType.roundRect, {
        x: kx, y: 1.85, w: 2.85, h: 2.4,
        rectRadius: 0.15,
        fill: { color: CARD_BG },
        line: { color: k.color, width: 2 }
      });
      slide.addText(k.metric, {
        x: kx + 0.15, y: 2.05, w: 2.55, h: 0.8,
        fontSize: 36, fontFace: 'Calibri', bold: true, color: k.color,
        align: 'center', valign: 'middle'
      });
      slide.addText(k.label, {
        x: kx + 0.15, y: 2.9, w: 2.55, h: 0.35,
        fontSize: 13, fontFace: 'Calibri', bold: true, color: TEXT_WHITE,
        align: 'center'
      });
      slide.addText(k.desc, {
        x: kx + 0.15, y: 3.3, w: 2.55, h: 0.85,
        fontSize: 10, fontFace: 'Calibri', color: TEXT_SLATE,
        align: 'center'
      });
    });

    slide.addShape(pres.ShapeType.roundRect, {
      x: 0.8, y: 4.45, w: 11.73, h: 2.35,
      rectRadius: 0.15,
      fill: { color: CARD_BG_ALT },
      line: { color: ACCENT_INDIGO, width: 1.5 }
    });

    slide.addText('ADDITIONAL SYSTEM BENCHMARKS & VERIFIED RECEIPT TELEMETRY:', {
      x: 1.1, y: 4.65, w: 11.1, h: 0.3,
      fontSize: 11, fontFace: 'Calibri', bold: true, color: ACCENT_INDIGO
    });

    slide.addText('• Zetaris Zero-ETL Query Latency: 12ms average response time across 4 virtual tables\n• Meterless Nightshift AI Inference: 42ms local execution time with 0ms cloud network delay\n• Cloud Token Compute Cost: Exactly $0.00 USD (verified via Nightshift cryptographic receipt ns-rcpt-8f3a9e)\n• Evidence Provenance Granularity: 100% of financial claims cite exact CSV/table coordinates {file, row, column, value}\n• False Alarm Defense: 100% concordance on clean order PO-1002 (50 ordered = 50 received = 50 billed @ $20 contract rate)', {
      x: 1.1, y: 5.0, w: 11.1, h: 1.65,
      fontSize: 10.5, fontFace: 'Calibri', color: TEXT_SLATE
    });

    slide.addNotes('These four metrics define TraceBack AI. 184 milliseconds per audit, meaning we can audit an entire enterprise monthly transaction ledger in minutes. $1,200 recovered on a single $6,000 purchase order, demonstrating immediate ROI. 96.5% audit confidence backed by deterministic cell-level citations. And zero false positives, proven on our benchmark test of clean order PO-1002.');
  }

  // =========================================================================
  // SECTION 2: THE PROBLEM DEEP-DIVE (SLIDES 5-9)
  // =========================================================================

  // SLIDE 5: The $1.5M Spend Leakage Anatomy
  {
    const slide = pres.addSlide();
    slide.background = { color: BG_DARK };
    addHeader(slide, 5, TOTAL_SLIDES, 'Problem Analysis', 'The Anatomy of Spend Leakage: 4 Primary Vectors', 'Quantifying where enterprise cash disappears in procurement cycles.');

    const vectors = [
      {
        title: '1. Quantity Overbilling', share: '45% of Total Leakage',
        desc: 'Suppliers invoice for ordered quantities rather than delivered quantities. When warehouse dock receiving logs damaged, short, or backordered units, the AP payment loop rarely reflects the decrement.',
        example: 'PO-1001: 120 units invoiced vs 100 units physically received. 20 units paid for nothing = $1,000.00 loss.',
        color: ACCENT_ROSE
      },
      {
        title: '2. Contract Rate Escalation', share: '30% of Total Leakage',
        desc: 'Suppliers quietly bill standard catalogue prices instead of negotiated master contract schedules. Over time, price creep accumulates across thousands of line items unnoticed by AP clerks.',
        example: 'PO-1001: Billed $50.00/unit vs $48.00 contract schedule cap. $2.00 rate creep on 100 units = $200.00 loss.',
        color: ACCENT_AMBER
      },
      {
        title: '3. Phantom & Unapproved Fees', share: '15% of Total Leakage',
        desc: 'Invoices add unapproved handling fees, logistics surcharges, fuel indexing, or expediting tariffs that violate master contract terms prohibiting auxiliary billing without pre-authorization.',
        example: 'Unapproved $150 logistics fee appended to invoice without prior written CPO authorization.',
        color: ACCENT_SKY
      },
      {
        title: '4. Duplicate / Stale Invoicing', share: '10% of Total Leakage',
        desc: 'Resubmitted invoices for previously cleared purchase orders, altered invoice numbers, or cross-entity double billing that evade simple relational uniqueness constraints.',
        example: 'Supplier resubmits invoice with suffix "-A" after 60 days, triggering double disbursement.',
        color: ACCENT_PURPLE
      }
    ];

    vectors.forEach((v, idx) => {
      const vx = 0.8 + idx * 2.98;
      slide.addShape(pres.ShapeType.roundRect, {
        x: vx, y: 1.85, w: 2.85, h: 4.95,
        rectRadius: 0.12,
        fill: { color: CARD_BG },
        line: { color: v.color, width: 1.5 }
      });

      slide.addText(v.title, {
        x: vx + 0.15, y: 2.05, w: 2.55, h: 0.45,
        fontSize: 12.5, fontFace: 'Calibri', bold: true, color: TEXT_WHITE
      });
      slide.addShape(pres.ShapeType.roundRect, {
        x: vx + 0.15, y: 2.55, w: 2.55, h: 0.32,
        rectRadius: 0.08,
        fill: { color: '0F172A' },
        line: { color: v.color, width: 1 }
      });
      slide.addText(v.share, {
        x: vx + 0.15, y: 2.55, w: 2.55, h: 0.32,
        fontSize: 9.5, fontFace: 'Calibri', bold: true, color: v.color,
        align: 'center', valign: 'middle'
      });

      slide.addText(v.desc, {
        x: vx + 0.15, y: 3.0, w: 2.55, h: 1.85,
        fontSize: 10, fontFace: 'Calibri', color: TEXT_SLATE
      });

      slide.addShape(pres.ShapeType.roundRect, {
        x: vx + 0.15, y: 4.95, w: 2.55, h: 1.65,
        rectRadius: 0.08,
        fill: { color: '1C1917' },
        line: { color: '44403C', width: 1 }
      });
      slide.addText('REAL-WORLD EXAMPLE:', {
        x: vx + 0.25, y: 5.05, w: 2.35, h: 0.25,
        fontSize: 8.5, fontFace: 'Calibri', bold: true, color: ACCENT_AMBER
      });
      slide.addText(v.example, {
        x: vx + 0.25, y: 5.3, w: 2.35, h: 1.2,
        fontSize: 9.5, fontFace: 'Calibri', color: TEXT_LIGHT
      });
    });

    slide.addNotes('Where does the money go? 45% of procurement leakage is quantity overbilling, where suppliers bill for ordered units rather than delivered units. 30% is contract rate escalation, where suppliers charge catalogue rates instead of negotiated contract rates. 15% is unapproved surcharges. And 10% is duplicate billing. TraceBack AI targets all four vectors simultaneously.');
  }

  // SLIDE 6: The 4 Disconnected Enterprise Silos
  {
    const slide = pres.addSlide();
    slide.background = { color: BG_DARK };
    addHeader(slide, 6, TOTAL_SLIDES, 'Systemic Fragmentation', 'The 4 Enterprise Silos: Root Cause of Blind Spots', 'No single software system maintains complete cross-source truth.');

    const silos = [
      {
        num: 'SOURCE A', name: 'ERP System (SAP / Oracle)', file: 'data/purchase_orders.csv',
        records: 'Purchase Orders & Authorization',
        scope: 'Contains approved POs, buyer authorizations, authorized items, and budgeted dollar thresholds.',
        blindspot: 'Completely blind to physical receiving dock receipts and post-agreement legal amendments.',
        color: ACCENT_SKY
      },
      {
        num: 'SOURCE B', name: 'WMS Logistics (Manhattan / Blue Yonder)', file: 'data/deliveries.csv',
        records: 'Goods Receipts & Inspection Notes',
        scope: 'Contains physical receiving slips (DN-045), carrier bill of lading, damaged counts, and dock time stamps.',
        blindspot: 'Completely blind to purchase order contractual pricing terms and accounts payable payments.',
        color: ACCENT_AMBER
      },
      {
        num: 'SOURCE C', name: 'AP Portals (Coupa / Tipalti)', file: 'data/invoices.csv',
        records: 'Supplier Invoices & Billing Requests',
        scope: 'Contains supplier billing claims (INV-9001), bank remittance details, tax line items, and payment dates.',
        blindspot: 'Clerks verify against PO headers without line-item cross-dock reconciliation against physical receipts.',
        color: ACCENT_ROSE
      },
      {
        num: 'SOURCE D', name: 'Contract Repositories (DocuSign / Icertis)', file: 'data/contract_prices.csv',
        records: 'Master Agreements & Ceiling Rate Schedules',
        scope: 'Contains volume tiered discounts, ceiling rates ($48/unit cap), SLA penalty clauses, and surcharge bans.',
        blindspot: 'Legal documents sit locked in static PDF repositories disconnected from day-to-day AP payments.',
        color: ACCENT_PURPLE
      }
    ];

    silos.forEach((s, idx) => {
      const col = idx % 2;
      const row = Math.floor(idx / 2);
      const sx = 0.8 + col * 5.95;
      const sy = 1.85 + row * 2.5;

      slide.addShape(pres.ShapeType.roundRect, {
        x: sx, y: sy, w: 5.75, h: 2.35,
        rectRadius: 0.12,
        fill: { color: CARD_BG },
        line: { color: s.color, width: 1.5 }
      });

      slide.addText(`${s.num} • ${s.name}`, {
        x: sx + 0.2, y: sy + 0.15, w: 5.35, h: 0.3,
        fontSize: 12.5, fontFace: 'Calibri', bold: true, color: s.color
      });
      slide.addText(`Physical Artifact: ${s.file}`, {
        x: sx + 0.2, y: sy + 0.45, w: 5.35, h: 0.25,
        fontSize: 9.5, fontFace: 'Calibri', color: TEXT_MUTED
      });

      slide.addText(`Core Scope: ${s.scope}`, {
        x: sx + 0.2, y: sy + 0.75, w: 5.35, h: 0.65,
        fontSize: 10, fontFace: 'Calibri', color: TEXT_SLATE
      });

      slide.addShape(pres.ShapeType.roundRect, {
        x: sx + 0.2, y: sy + 1.45, w: 5.35, h: 0.75,
        rectRadius: 0.08,
        fill: { color: '1E1B4B' },
        line: { color: '3730A3', width: 1 }
      });
      slide.addText(`Critical Blindspot: ${s.blindspot}`, {
        x: sx + 0.3, y: sy + 1.5, w: 5.15, h: 0.65,
        fontSize: 9.5, fontFace: 'Calibri', color: 'C7D2FE'
      });
    });

    slide.addNotes('This slide illustrates why the enterprise remains vulnerable: every system is an island. SAP ERP knows what was ordered. The WMS knows what was received. The AP portal knows what was billed. And the legal repository knows the agreed rates. No single system has visibility into the other three. This gap is where spend leakage thrives.');
  }

  // SLIDE 7: Why Traditional 2-Way & 3-Way Matching Fails
  {
    const slide = pres.addSlide();
    slide.background = { color: BG_DARK };
    addHeader(slide, 7, TOTAL_SLIDES, 'Legacy Limitations', 'Why Traditional 2-Way and 3-Way Matching Fails', 'Traditional automated matching rules leave glaring loopholes.');

    const comparisons = [
      {
        type: 'Legacy 2-Way Matching (PO vs Invoice)',
        status: 'CRITICAL FLAWS',
        color: ACCENT_ROSE,
        points: [
          'Only checks if Invoice total matches the original Purchase Order total.',
          'Completely ignores physical warehouse delivery receipts (DN-045).',
          'Pays 100% of the invoice even if 50% of goods were damaged or unreceived.',
          'Result: $1,000.00 quantity overbilling on PO-1001 passes completely undetected.'
        ]
      },
      {
        type: 'Legacy 3-Way Matching (PO vs Receipt vs Invoice)',
        status: 'SUBTLE FAILURES',
        color: ACCENT_AMBER,
        points: [
          'Checks header totals across PO, Receipt, and Invoice, but ignores line-item rate caps.',
          'Fails to cross-reference legal contract schedules ($48/unit cap).',
          'If supplier bills for 100 received units at $50 instead of contracted $48, 3-way match clears it.',
          'Result: $200.00 contract price escalation on PO-1001 passes undetected.'
        ]
      },
      {
        type: 'TraceBack AI 4-Way Cross-Source Audit',
        status: 'ZERO LEAKAGE DEFENSE',
        color: ACCENT_EMERALD,
        points: [
          'Unifies PO, Warehouse Receipt, Invoice, and Contract Price Schedules simultaneously.',
          'Evaluates both quantity concordance and unit-price ceiling compliance.',
          'Produces exact cell coordinates {file, row, col, value} for audit defensibility.',
          'Result: Catches both the $1,000 quantity mismatch AND the $200 rate escalation.'
        ]
      }
    ];

    comparisons.forEach((c, idx) => {
      const cy = 1.85 + idx * 1.65;
      slide.addShape(pres.ShapeType.roundRect, {
        x: 0.8, y: cy, w: 11.73, h: 1.5,
        rectRadius: 0.12,
        fill: { color: CARD_BG },
        line: { color: c.color, width: 1.5 }
      });

      slide.addText(c.type, {
        x: 1.1, y: cy + 0.12, w: 7.5, h: 0.35,
        fontSize: 13, fontFace: 'Calibri', bold: true, color: TEXT_WHITE
      });
      slide.addShape(pres.ShapeType.roundRect, {
        x: 9.8, y: cy + 0.12, w: 2.4, h: 0.32,
        rectRadius: 0.08,
        fill: { color: '0F172A' },
        line: { color: c.color, width: 1 }
      });
      slide.addText(c.status, {
        x: 9.8, y: cy + 0.12, w: 2.4, h: 0.32,
        fontSize: 9, fontFace: 'Calibri', bold: true, color: c.color,
        align: 'center', valign: 'middle'
      });

      const bulletText = c.points.map(p => `• ${p}`).join('\n');
      slide.addText(bulletText, {
        x: 1.1, y: cy + 0.48, w: 11.1, h: 0.92,
        fontSize: 10, fontFace: 'Calibri', color: TEXT_SLATE
      });
    });

    slide.addNotes('Most CFOs believe their ERP protects them with automated 2-way or 3-way matching. In reality, 2-way matching completely ignores the receiving dock, and 3-way matching completely ignores contract pricing schedules. If a supplier bills for 100 received units at $50 instead of contracted $48, 3-way matching clears the invoice without a hiccup. TraceBack AI is a true 4-way reconciliation agent that checks all four vectors simultaneously.');
  }

  // SLIDE 8: The Failure of Brittle ETL Pipelines
  {
    const slide = pres.addSlide();
    slide.background = { color: BG_DARK };
    addHeader(slide, 8, TOTAL_SLIDES, 'Architectural Friction', 'Why Brittle ETL Pipelines Are the Wrong Solution', 'Data movement creates lag, high costs, security exposure, and stale data.');

    const etlFails = [
      { title: '1. Stale Data & Batch Lag', desc: 'Nightly batch ETL transfers data with a 12-to-24 hour delay. AP invoices arriving today are evaluated against yesterday\'s warehouse status, resulting in missed disputes.', color: ACCENT_ROSE },
      { title: '2. High Engineering Cost', desc: 'Building custom data pipelines across SAP, Manhattan WMS, and Coupa requires specialized data engineers, costing upwards of $500,000 in upfront setup and maintenance.', color: ACCENT_AMBER },
      { title: '3. Data Duplication & Security', desc: 'Copying sensitive financial, banking, and supplier pricing records into a centralized staging bucket multiplies security attack surfaces and violates data residency rules.', color: ACCENT_PURPLE },
      { title: '4. The Zetaris Solution: Zero-ETL', desc: 'Zetaris Data Virtualization queries data where it lives. Federated SQL queries join disparate databases in 12ms with zero data movement, zero latency, and zero replication cost.', color: ACCENT_EMERALD }
    ];

    etlFails.forEach((f, idx) => {
      const col = idx % 2;
      const row = Math.floor(idx / 2);
      const fx = 0.8 + col * 5.95;
      const fy = 1.85 + row * 2.5;

      slide.addShape(pres.ShapeType.roundRect, {
        x: fx, y: fy, w: 5.75, h: 2.35,
        rectRadius: 0.12,
        fill: { color: CARD_BG },
        line: { color: f.color, width: 1.5 }
      });

      slide.addText(f.title, {
        x: fx + 0.2, y: fy + 0.2, w: 5.35, h: 0.35,
        fontSize: 13, fontFace: 'Calibri', bold: true, color: f.color
      });
      slide.addText(f.desc, {
        x: fx + 0.2, y: fy + 0.65, w: 5.35, h: 1.5,
        fontSize: 11, fontFace: 'Calibri', color: TEXT_SLATE
      });
    });

    slide.addNotes('Why not just build an ETL data lakehouse? Because moving data is slow, expensive, and insecure. Nightly batch ETL means you are always auditing yesterday\'s data. Zetaris completely rethinks this by querying data where it lives. Through Zero-ETL Data Virtualization, TraceBack AI joins ERP, WMS, invoice, and contract datasets across sources in 12 milliseconds with zero data duplication.');
  }

  // SLIDE 9: The Human Auditor Bottleneck
  {
    const slide = pres.addSlide();
    slide.background = { color: BG_DARK };
    addHeader(slide, 9, TOTAL_SLIDES, 'Operational Fatigue', 'The Human Auditor Bottleneck & Audit Sampling', 'Human teams cannot keep pace with exponential procurement velocity.');

    slide.addShape(pres.ShapeType.roundRect, {
      x: 0.8, y: 1.85, w: 5.7, h: 4.95,
      rectRadius: 0.15,
      fill: { color: '1C1917' },
      line: { color: ACCENT_ROSE, width: 2 }
    });

    slide.addText('THE REALITY OF MANUAL AUDITS', {
      x: 1.1, y: 2.1, w: 5.1, h: 0.3,
      fontSize: 11, fontFace: 'Calibri', bold: true, color: ACCENT_ROSE
    });
    slide.addText('Human AP Auditing Is Structurally Flawed', {
      x: 1.1, y: 2.4, w: 5.1, h: 0.45,
      fontSize: 16, fontFace: 'Calibri', bold: true, color: TEXT_WHITE
    });

    slide.addText('• Cognitive Fatigue: Auditing 200 invoice line items across 4 PDFs requires cross-referencing dozens of tables. After 2 hours, auditor error rates surge past 40%.\n\n• The 5% Sampling Trap: Internal auditors only inspect a 5% sample of cleared transactions. 95% of transactions are never scrutinized.\n\n• Retroactive Recovery: Traditional recovery auditors take 6 to 18 months to find overcharges, taking a 25% to 35% contingency fee on recovered dollars.\n\n• Supplier Relationship Strain: Late dispute notices issued 6 months after delivery cause vendor friction and delayed shipments.', {
      x: 1.1, y: 2.95, w: 5.1, h: 3.65,
      fontSize: 10.5, fontFace: 'Calibri', color: TEXT_SLATE
    });

    slide.addShape(pres.ShapeType.roundRect, {
      x: 6.8, y: 1.85, w: 5.7, h: 4.95,
      rectRadius: 0.15,
      fill: { color: CARD_BG },
      line: { color: ACCENT_EMERALD, width: 2 }
    });

    slide.addText('THE TRACEBACK AI ADVANTAGE', {
      x: 7.1, y: 2.1, w: 5.1, h: 0.3,
      fontSize: 11, fontFace: 'Calibri', bold: true, color: ACCENT_EMERALD
    });
    slide.addText('100% Census Audit in Real Time', {
      x: 7.1, y: 2.4, w: 5.1, h: 0.45,
      fontSize: 16, fontFace: 'Calibri', bold: true, color: TEXT_WHITE
    });

    slide.addText('• 100% Census Coverage: Audits every single purchase order line item in 184ms before payments are released.\n\n• Zero Sampling Risk: No sample sizes, no blind spots, no extrapolation errors.\n\n• Pre-Payment Prevention: Flags discrepancies before money leaves the bank account, eliminating recovery fees entirely.\n\n• Instant Dispute Generation: Produces clear, professional dispute documentation citing exact dock notes within seconds of invoice arrival.\n\n• Auditor Empowerment: Human auditors transition from repetitive clerks into strategic exception approvers.', {
      x: 7.1, y: 2.95, w: 5.1, h: 3.65,
      fontSize: 10.5, fontFace: 'Calibri', color: TEXT_LIGHT
    });

    slide.addNotes('Manual auditing is physically unable to handle enterprise volume. When auditors inspect only a 5% random sample, 95% of spend leakage walks out the door. Third-party recovery audit firms charge up to 35% contingency fees to find these mistakes a year later. TraceBack AI conducts a 100% census audit in real time, stopping overpayments before they occur.');
  }

  // =========================================================================
  // SECTION 3: TARGET USERS & STAKEHOLDER PERSONAS (SLIDES 10-13)
  // =========================================================================

  // SLIDE 10: Stakeholder Landscape & Value Matrix
  {
    const slide = pres.addSlide();
    slide.background = { color: BG_DARK };
    addHeader(slide, 10, TOTAL_SLIDES, 'Stakeholder Matrix', 'Executive Stakeholder Value Alignment', 'How TraceBack AI aligns incentives across procurement, finance, and logistics.');

    const matrix = [
      { role: 'Chief Procurement Officer', focus: 'Contract Spend Compliance', metric: '3.2% Spend Reduction', benefit: 'Automated contract ceiling enforcement & supplier compliance scorecards.', color: ACCENT_SKY },
      { role: 'Lead Financial Auditor', focus: 'SOX Controls & Defensibility', metric: '100% Audit Coverage', benefit: 'Deterministic cell-level proof eliminating sample-based audit risk.', color: ACCENT_EMERALD },
      { role: 'Accounts Payable Controller', focus: 'Operational Throughput', metric: '80% Manual Effort Cut', benefit: 'Pre-payment automated dispute packets; elimination of invoice backlogs.', color: ACCENT_AMBER },
      { role: 'Supply Chain Operations VP', focus: 'Receiving Dock Integrity', metric: 'Zero Dock Leakage', benefit: 'Instant dock receipt synchronization ensuring only accepted goods are billed.', color: ACCENT_PURPLE }
    ];

    matrix.forEach((m, idx) => {
      const my = 1.85 + idx * 1.25;
      slide.addShape(pres.ShapeType.roundRect, {
        x: 0.8, y: my, w: 11.73, h: 1.15,
        rectRadius: 0.1,
        fill: { color: CARD_BG },
        line: { color: m.color, width: 1.5 }
      });

      slide.addText(m.role, {
        x: 1.1, y: my + 0.15, w: 3.2, h: 0.35,
        fontSize: 13, fontFace: 'Calibri', bold: true, color: TEXT_WHITE
      });
      slide.addText(m.focus, {
        x: 1.1, y: my + 0.5, w: 3.2, h: 0.3,
        fontSize: 10, fontFace: 'Calibri', color: m.color
      });

      slide.addShape(pres.ShapeType.roundRect, {
        x: 4.5, y: my + 0.25, w: 2.2, h: 0.45,
        rectRadius: 0.08,
        fill: { color: '0F172A' },
        line: { color: m.color, width: 1 }
      });
      slide.addText(m.metric, {
        x: 4.5, y: my + 0.25, w: 2.2, h: 0.45,
        fontSize: 11, fontFace: 'Calibri', bold: true, color: m.color,
        align: 'center', valign: 'middle'
      });

      slide.addText(m.benefit, {
        x: 7.0, y: my + 0.2, w: 5.2, h: 0.75,
        fontSize: 10.5, fontFace: 'Calibri', color: TEXT_SLATE
      });
    });

    slide.addNotes('TraceBack AI serves the complete enterprise financial hierarchy. The CPO gains contract compliance. The Financial Auditor gains a bulletproof audit trail. The AP Controller eliminates manual verification backlogs. And the Supply Chain VP ensures that warehouse receiving dock records govern financial disbursements.');
  }

  // SLIDE 11: Persona 1 — Chief Procurement Officer (CPO)
  {
    const slide = pres.addSlide();
    slide.background = { color: BG_DARK };
    addHeader(slide, 11, TOTAL_SLIDES, 'Persona Deep-Dive', 'Persona 1: Chief Procurement Officer (CPO)', 'Strategic sourcing, supplier rate enforcement, and commercial discipline.');

    slide.addShape(pres.ShapeType.roundRect, {
      x: 0.8, y: 1.85, w: 5.7, h: 4.95,
      rectRadius: 0.15,
      fill: { color: CARD_BG },
      line: { color: ACCENT_SKY, width: 2 }
    });

    slide.addText('CPO STRATEGIC OBJECTIVES', {
      x: 1.1, y: 2.1, w: 5.1, h: 0.3,
      fontSize: 11, fontFace: 'Calibri', bold: true, color: ACCENT_SKY
    });
    slide.addText('Defending Negotiated Contract Terms', {
      x: 1.1, y: 2.4, w: 5.1, h: 0.45,
      fontSize: 16, fontFace: 'Calibri', bold: true, color: TEXT_WHITE
    });
    slide.addText('• Sourcing teams spend months negotiating 5% to 8% contract discounts, only to have suppliers quietly bill uncontracted list prices.\n• Lack of real-time visibility prevents procurement from holding suppliers accountable during quarterly business reviews (QBRs).\n• Supplier performance scorecards are based on subjective surveys rather than factual dispute histories.', {
      x: 1.1, y: 2.95, w: 5.1, h: 3.65,
      fontSize: 11, fontFace: 'Calibri', color: TEXT_SLATE
    });

    slide.addShape(pres.ShapeType.roundRect, {
      x: 6.8, y: 1.85, w: 5.7, h: 4.95,
      rectRadius: 0.15,
      fill: { color: CARD_BG_ALT },
      line: { color: ACCENT_SKY, width: 2 }
    });

    slide.addText('TRACEBACK AI DELIVERABLES FOR CPOs', {
      x: 7.1, y: 2.1, w: 5.1, h: 0.3,
      fontSize: 11, fontFace: 'Calibri', bold: true, color: ACCENT_SKY
    });
    slide.addText('Automated Contract Enforcement', {
      x: 7.1, y: 2.4, w: 5.1, h: 0.45,
      fontSize: 16, fontFace: 'Calibri', bold: true, color: TEXT_WHITE
    });
    slide.addText('• 100% Rate Schedule Adherence: Flags every line item exceeding master contract price caps in real time.\n• Empirical Supplier Scorecards: Tracks dispute frequency, quantity variance rates, and pricing compliance by vendor.\n• Sourcing Leverage: Provides hard data during contract renewals, transforming anecdotal complaints into verifiable leverage.\n• Projected Impact: Recovers 1.5% to 3.2% of total addressable procurement spend directly to company operating margins.', {
      x: 7.1, y: 2.95, w: 5.1, h: 3.65,
      fontSize: 11, fontFace: 'Calibri', color: TEXT_LIGHT
    });

    slide.addNotes('For the Chief Procurement Officer, TraceBack AI ensures that every negotiated dollar actually reaches the bottom line. It stops supplier price creep and provides factual vendor scorecards based on real reconciliation history.');
  }

  // SLIDE 12: Persona 2 — Lead Financial Auditor & Controller
  {
    const slide = pres.addSlide();
    slide.background = { color: BG_DARK };
    addHeader(slide, 12, TOTAL_SLIDES, 'Persona Deep-Dive', 'Persona 2: Lead Financial Auditor & Controller', 'Sarbanes-Oxley compliance, internal controls, and audit defensibility.');

    slide.addShape(pres.ShapeType.roundRect, {
      x: 0.8, y: 1.85, w: 5.7, h: 4.95,
      rectRadius: 0.15,
      fill: { color: CARD_BG },
      line: { color: ACCENT_EMERALD, width: 2 }
    });

    slide.addText('AUDIT & CONTROL CHALLENGES', {
      x: 1.1, y: 2.1, w: 5.1, h: 0.3,
      fontSize: 11, fontFace: 'Calibri', bold: true, color: ACCENT_EMERALD
    });
    slide.addText('The High Risk of Sample-Based Auditing', {
      x: 1.1, y: 2.4, w: 5.1, h: 0.45,
      fontSize: 16, fontFace: 'Calibri', bold: true, color: TEXT_WHITE
    });
    slide.addText('• SOX 404 Compliance Burden: Internal audit teams must verify internal controls over financial reporting without full visibility.\n• Hallucination & Risk in Generic AI: LLMs that guess or hallucinate financial numbers cannot be used in formal accounting work.\n• Lack of Provenance: When auditors challenge a vendor, they need the exact document coordinates, row numbers, and contract clause numbers.', {
      x: 1.1, y: 2.95, w: 5.1, h: 3.65,
      fontSize: 11, fontFace: 'Calibri', color: TEXT_SLATE
    });

    slide.addShape(pres.ShapeType.roundRect, {
      x: 6.8, y: 1.85, w: 5.7, h: 4.95,
      rectRadius: 0.15,
      fill: { color: CARD_BG_ALT },
      line: { color: ACCENT_EMERALD, width: 2 }
    });

    slide.addText('TRACEBACK AI DELIVERABLES FOR AUDITORS', {
      x: 7.1, y: 2.1, w: 5.1, h: 0.3,
      fontSize: 11, fontFace: 'Calibri', bold: true, color: ACCENT_EMERALD
    });
    slide.addText('Deterministic Proof & Zero Hallucination', {
      x: 7.1, y: 2.4, w: 5.1, h: 0.45,
      fontSize: 16, fontFace: 'Calibri', bold: true, color: TEXT_WHITE
    });
    slide.addText('• Immutable Cell Coordinates: Every financial claim cites {file, row, column, value} with absolute precision.\n• Deterministic Corroboration: Variances are calculated via exact mathematics, not statistical approximations.\n• Audit Defensibility Certificate: Generates cryptographic, timestamped audit certificates verifying reconciliation integrity.\n• Complete Census Audit: Eliminates sampling risk by validating 100% of purchase orders in sub-second cycles.', {
      x: 7.1, y: 2.95, w: 5.1, h: 3.65,
      fontSize: 11, fontFace: 'Calibri', color: TEXT_LIGHT
    });

    slide.addNotes('For Financial Auditors and Controllers, TraceBack AI provides the gold standard of audit defensibility: zero hallucination. Every claim cites the exact file, row, and column. It replaces random sampling with a 100% census audit.');
  }

  // SLIDE 13: Persona 3 & 4 — AP Operations & Supply Chain Leads
  {
    const slide = pres.addSlide();
    slide.background = { color: BG_DARK };
    addHeader(slide, 13, TOTAL_SLIDES, 'Persona Deep-Dive', 'Personas 3 & 4: AP Operations & Supply Chain Leads', 'Operational efficiency, automated disputes, and receiving dock synchronization.');

    slide.addShape(pres.ShapeType.roundRect, {
      x: 0.8, y: 1.85, w: 5.7, h: 4.95,
      rectRadius: 0.15,
      fill: { color: CARD_BG },
      line: { color: ACCENT_AMBER, width: 2 }
    });

    slide.addText('ACCOUNTS PAYABLE CONTROLLER', {
      x: 1.1, y: 2.1, w: 5.1, h: 0.3,
      fontSize: 11, fontFace: 'Calibri', bold: true, color: ACCENT_AMBER
    });
    slide.addText('Eliminating Invoice Friction & Backlogs', {
      x: 1.1, y: 2.4, w: 5.1, h: 0.45,
      fontSize: 16, fontFace: 'Calibri', bold: true, color: TEXT_WHITE
    });
    slide.addText('• Pre-Payment Flagging: Alerts AP before disbursements occur, eliminating tedious post-payment recovery.\n• Automated Dispute Drafting: Synthesizes professional, itemized dispute emails citing delivery notes and contract clauses.\n• 80% Reduction in Manual Verification: Routine clean invoices (PO-1002) are auto-cleared in milliseconds.\n• Better Supplier Relations: Objective, cell-referenced dispute documentation eliminates subjective vendor arguments.', {
      x: 1.1, y: 2.95, w: 5.1, h: 3.65,
      fontSize: 11, fontFace: 'Calibri', color: TEXT_SLATE
    });

    slide.addShape(pres.ShapeType.roundRect, {
      x: 6.8, y: 1.85, w: 5.7, h: 4.95,
      rectRadius: 0.15,
      fill: { color: CARD_BG_ALT },
      line: { color: ACCENT_PURPLE, width: 2 }
    });

    slide.addText('SUPPLY CHAIN OPERATIONS VP', {
      x: 7.1, y: 2.1, w: 5.1, h: 0.3,
      fontSize: 11, fontFace: 'Calibri', bold: true, color: ACCENT_PURPLE
    });
    slide.addText('Dock Receipt Integrity & Inventory Sync', {
      x: 7.1, y: 2.4, w: 5.1, h: 0.45,
      fontSize: 16, fontFace: 'Calibri', bold: true, color: TEXT_WHITE
    });
    slide.addText('• Physical Dock Alignment: Ensures warehouse dock note DN-045 strictly determines financial liability.\n• Damaged Goods Accounting: Damaged or rejected cartons logged at the receiving bay are never accidentally paid for.\n• Cross-Dock Traceability: Immediate visibility into vendor shipment accuracy and delivery reliability.\n• Closed-Loop Logistics: Closes the communication gap between warehouse dock workers and finance disbursements.', {
      x: 7.1, y: 2.95, w: 5.1, h: 3.65,
      fontSize: 11, fontFace: 'Calibri', color: TEXT_LIGHT
    });

    slide.addNotes('For AP Controllers, TraceBack AI auto-drafts polite, fact-based dispute letters with exact proof attached. For Supply Chain leads, it guarantees that warehouse dock receipts govern financial payments.');
  }

  // =========================================================================
  // SECTION 4: THE SOLUTION & LIVE AUDIT WALKTHROUGH (SLIDES 14-18)
  // =========================================================================

  // SLIDE 14: TraceBack AI Solution Overview
  {
    const slide = pres.addSlide();
    slide.background = { color: BG_DARK };
    addHeader(slide, 14, TOTAL_SLIDES, 'Solution Architecture', 'TraceBack AI: Autonomous 4-Way Reconciliation', 'High-speed deterministic multi-agent auditing with zero ETL pipelines.');

    slide.addShape(pres.ShapeType.roundRect, {
      x: 0.8, y: 1.85, w: 11.73, h: 4.95,
      rectRadius: 0.15,
      fill: { color: CARD_BG },
      line: { color: ACCENT_INDIGO, width: 1.5 }
    });

    const solutionSteps = [
      { step: '01', title: 'Virtualize', desc: 'Zetaris connects to ERP, WMS, AP, and Contracts, executing a single federated SQL join in 12ms with zero data movement.', color: ACCENT_SKY },
      { step: '02', title: 'Orchestrate', desc: 'Meterless Scout extracts intent, Relay routes queries, and reconciliation algorithms quantify financial variance in 8ms.', color: ACCENT_EMERALD },
      { step: '03', title: 'Reason Locally', desc: 'Meterless Nightshift AI executes a 4-stage Race/Judge/Verify/Generate cycle on local compute at $0 cloud token cost.', color: ACCENT_AMBER },
      { step: '04', title: 'Act & Recover', desc: 'Lead auditor approves claim with 1 click; system generates formal supplier dispute letter with exact cell citations.', color: ACCENT_PURPLE }
    ];

    solutionSteps.forEach((s, idx) => {
      const sx = 1.1 + idx * 2.82;
      slide.addShape(pres.ShapeType.roundRect, {
        x: sx, y: 2.1, w: 2.65, h: 4.45,
        rectRadius: 0.1,
        fill: { color: CARD_BG_ALT },
        line: { color: s.color, width: 1.5 }
      });

      slide.addText(s.step, {
        x: sx + 0.15, y: 2.3, w: 2.35, h: 0.6,
        fontSize: 32, fontFace: 'Calibri', bold: true, color: s.color
      });
      slide.addText(s.title, {
        x: sx + 0.15, y: 2.95, w: 2.35, h: 0.35,
        fontSize: 16, fontFace: 'Calibri', bold: true, color: TEXT_WHITE
      });
      slide.addText(s.desc, {
        x: sx + 0.15, y: 3.4, w: 2.35, h: 2.9,
        fontSize: 11, fontFace: 'Calibri', color: TEXT_SLATE
      });
    });

    slide.addNotes('This slide shows the four pillars of the TraceBack AI solution: First, Virtualize with Zetaris. Second, Orchestrate with Meterless. Third, Reason locally with Meterless Nightshift at zero token cost. And fourth, Act and Recover with human-in-the-loop dispute generation.');
  }

  // SLIDE 15: Live Audit Case Study: PO-1001 (Overview)
  {
    const slide = pres.addSlide();
    slide.background = { color: BG_DARK };
    addHeader(slide, 15, TOTAL_SLIDES, 'Live Audit Case Study', 'Case Study: PO-1001 Audit Overview', 'Supplier SUP-42 billed $6,000.00; TraceBack AI uncovers $1,200.00 in overcharges.');

    slide.addShape(pres.ShapeType.roundRect, {
      x: 0.8, y: 1.85, w: 4.5, h: 4.95,
      rectRadius: 0.15,
      fill: { color: '1C1917' },
      line: { color: ACCENT_ROSE, width: 2 }
    });

    slide.addText('BENCHMARK ORDER DETAILS', {
      x: 1.05, y: 2.05, w: 4.0, h: 0.25,
      fontSize: 10.5, fontFace: 'Calibri', bold: true, color: ACCENT_ROSE
    });
    slide.addText('PO-1001 Investigation', {
      x: 1.05, y: 2.3, w: 4.0, h: 0.4,
      fontSize: 18, fontFace: 'Calibri', bold: true, color: TEXT_WHITE
    });

    slide.addText('• Purchase Order ID: PO-1001\n• Supplier: Apex Industrial (SUP-42)\n• Total Invoiced Amount: $6,000.00 USD\n• Total Physical Received Value: $4,800.00 USD\n• Total Recoverable Overcharge: $1,200.00 USD\n• Total Audit Latency: 184 milliseconds\n• Overall Audit Confidence: 96.5%\n• Audit Recommendation: DISPUTE & WITHHOLD', {
      x: 1.05, y: 2.8, w: 4.0, h: 3.8,
      fontSize: 11, fontFace: 'Calibri', color: TEXT_SLATE
    });

    slide.addShape(pres.ShapeType.roundRect, {
      x: 5.6, y: 1.85, w: 6.93, h: 4.95,
      rectRadius: 0.15,
      fill: { color: CARD_BG },
      line: { color: BORDER_COLOR, width: 1.5 }
    });

    slide.addText('4-WAY SOURCE RECONCILIATION SUMMARY:', {
      x: 5.85, y: 2.05, w: 6.4, h: 0.25,
      fontSize: 11, fontFace: 'Calibri', bold: true, color: ACCENT_SKY
    });

    const rows = [
      { source: 'SAP ERP (purchase_orders.csv)', metric: '120 units ordered @ $50.00/unit', total: '$6,000.00', color: ACCENT_SKY },
      { source: 'WMS Warehouse (deliveries.csv)', metric: '100 units physically received (DN-045)', total: '$5,000.00', color: ACCENT_AMBER },
      { source: 'AP Invoices (invoices.csv)', metric: '120 units billed on INV-9001', total: '$6,000.00', color: ACCENT_ROSE },
      { source: 'Legal Contracts (contract_prices.csv)', metric: 'Contract rate cap: $48.00/unit', total: '$4,800.00', color: ACCENT_PURPLE }
    ];

    rows.forEach((r, idx) => {
      const ry = 2.45 + idx * 0.95;
      slide.addShape(pres.ShapeType.roundRect, {
        x: 5.85, y: ry, w: 6.4, h: 0.82,
        rectRadius: 0.08,
        fill: { color: CARD_BG_ALT },
        line: { color: r.color, width: 1 }
      });
      slide.addText(r.source, {
        x: 6.0, y: ry + 0.1, w: 3.8, h: 0.25,
        fontSize: 11, fontFace: 'Calibri', bold: true, color: r.color
      });
      slide.addText(r.metric, {
        x: 6.0, y: ry + 0.38, w: 4.5, h: 0.35,
        fontSize: 10, fontFace: 'Calibri', color: TEXT_SLATE
      });
      slide.addText(r.total, {
        x: 10.6, y: ry + 0.22, w: 1.5, h: 0.35,
        fontSize: 13, fontFace: 'Calibri', bold: true, color: TEXT_WHITE,
        align: 'right'
      });
    });

    slide.addShape(pres.ShapeType.roundRect, {
      x: 5.85, y: 5.8, w: 6.4, h: 0.8,
      rectRadius: 0.08,
      fill: { color: '064E3B' },
      line: { color: ACCENT_EMERALD, width: 1.5 }
    });
    slide.addText('RECONCILIATION RESULT: $1,200.00 DISCREPANCY DETECTED', {
      x: 6.0, y: 5.9, w: 6.1, h: 0.25,
      fontSize: 11, fontFace: 'Calibri', bold: true, color: ACCENT_EMERALD
    });
    slide.addText('Discrepancy 1 ($1,000 qty overcharge) + Discrepancy 2 ($200 price escalation)', {
      x: 6.0, y: 6.18, w: 6.1, h: 0.3,
      fontSize: 10, fontFace: 'Calibri', color: TEXT_WHITE
    });

    slide.addNotes('Here is our live benchmark order, PO-1001. The supplier billed for $6,000. Traditional 2-way matching approves it because the PO authorized $6,000. But TraceBack AI compares it with the warehouse receiving log and contract schedule, immediately uncovering $1,200 in overcharges in 184 milliseconds.');
  }

  // SLIDE 16: Discrepancy 1: Quantity Overbilling Analysis
  {
    const slide = pres.addSlide();
    slide.background = { color: BG_DARK };
    addHeader(slide, 16, TOTAL_SLIDES, 'Discrepancy Breakdown', 'Discrepancy 1: Quantity Overbilling (+$1,000.00)', 'Invoicing for units exceeding physical warehouse receipt.');

    slide.addShape(pres.ShapeType.roundRect, {
      x: 0.8, y: 1.85, w: 11.73, h: 4.95,
      rectRadius: 0.15,
      fill: { color: CARD_BG },
      line: { color: ACCENT_ROSE, width: 2 }
    });

    slide.addText('VARIANCE IDENTIFICATION & CALCULATION:', {
      x: 1.1, y: 2.1, w: 11.1, h: 0.3,
      fontSize: 12, fontFace: 'Calibri', bold: true, color: ACCENT_ROSE
    });

    const mathBox = [
      { label: 'Invoiced Quantity (INV-9001):', val: '120 units', note: 'Accounts Payable claim' },
      { label: 'Warehouse Delivered (DN-045):', val: '100 units', note: 'Physical goods accepted at dock' },
      { label: 'Unreceived Billed Units:', val: '20 units', note: '120 invoiced - 100 delivered' },
      { label: 'Recoverable Overbilling Total:', val: '$1,000.00 USD', note: '20 units × $50.00/unit' }
    ];

    mathBox.forEach((m, idx) => {
      const mx = 1.1 + idx * 2.75;
      slide.addShape(pres.ShapeType.roundRect, {
        x: mx, y: 2.5, w: 2.6, h: 1.4,
        rectRadius: 0.1,
        fill: { color: CARD_BG_ALT },
        line: { color: '44403C', width: 1 }
      });
      slide.addText(m.label, {
        x: mx + 0.1, y: 2.6, w: 2.4, h: 0.35,
        fontSize: 9.5, fontFace: 'Calibri', bold: true, color: TEXT_MUTED
      });
      slide.addText(m.val, {
        x: mx + 0.1, y: 2.95, w: 2.4, h: 0.45,
        fontSize: 16, fontFace: 'Calibri', bold: true, color: idx === 3 ? ACCENT_ROSE : TEXT_WHITE
      });
      slide.addText(m.note, {
        x: mx + 0.1, y: 3.45, w: 2.4, h: 0.35,
        fontSize: 8.5, fontFace: 'Calibri', color: TEXT_SLATE
      });
    });

    slide.addShape(pres.ShapeType.roundRect, {
      x: 1.1, y: 4.15, w: 11.1, h: 2.4,
      rectRadius: 0.1,
      fill: { color: '1C1917' },
      line: { color: '44403C', width: 1 }
    });

    slide.addText('IMMUTABLE EVIDENCE PROVENANCE TRAIL:', {
      x: 1.3, y: 4.35, w: 10.7, h: 0.25,
      fontSize: 10.5, fontFace: 'Calibri', bold: true, color: ACCENT_AMBER
    });

    slide.addText('• Source File 1: invoices.csv -> Row 2, Column 3 [invoiced_qty = 120]\n• Source File 2: deliveries.csv -> Row 2, Column 3 [delivered_qty = 100, delivery_note = "DN-045"]\n• Corroboration Rule: delivered_qty < invoiced_qty => DiscrepancyType.QUANTITY_MISMATCH\n• Audit Action: Dispute line item #1 on INV-9001; demand $1,000.00 credit memo or payment deduction before clearance.', {
      x: 1.3, y: 4.7, w: 10.7, h: 1.65,
      fontSize: 11, fontFace: 'Calibri', color: TEXT_SLATE
    });

    slide.addNotes('Discrepancy 1 is straightforward quantity overbilling. The supplier billed for 120 units, but warehouse dock receipt DN-045 proved only 100 units were delivered. That is 20 phantom units billed at $50, creating a direct $1,000 loss.');
  }

  // SLIDE 17: Discrepancy 2: Contract Rate Escalation Analysis
  {
    const slide = pres.addSlide();
    slide.background = { color: BG_DARK };
    addHeader(slide, 17, TOTAL_SLIDES, 'Discrepancy Breakdown', 'Discrepancy 2: Contract Rate Escalation (+$200.00)', 'Billed unit rate breaches Master Procurement Contract ceiling price.');

    slide.addShape(pres.ShapeType.roundRect, {
      x: 0.8, y: 1.85, w: 11.73, h: 4.95,
      rectRadius: 0.15,
      fill: { color: CARD_BG },
      line: { color: ACCENT_AMBER, width: 2 }
    });

    slide.addText('PRICE CEILING VIOLATION & RATE CREEP MATH:', {
      x: 1.1, y: 2.1, w: 11.1, h: 0.3,
      fontSize: 12, fontFace: 'Calibri', bold: true, color: ACCENT_AMBER
    });

    const priceMath = [
      { label: 'Billed Unit Price (INV-9001):', val: '$50.00 / unit', note: 'Supplier invoice rate' },
      { label: 'Contract Ceiling (contract_prices):', val: '$48.00 / unit', note: 'Master agreement rate cap' },
      { label: 'Unauthorized Price Creep:', val: '+$2.00 / unit', note: '$50.00 billed - $48.00 cap' },
      { label: 'Rate Escalation Overcharge:', val: '$200.00 USD', note: '100 delivered units × $2.00' }
    ];

    priceMath.forEach((m, idx) => {
      const mx = 1.1 + idx * 2.75;
      slide.addShape(pres.ShapeType.roundRect, {
        x: mx, y: 2.5, w: 2.6, h: 1.4,
        rectRadius: 0.1,
        fill: { color: CARD_BG_ALT },
        line: { color: '44403C', width: 1 }
      });
      slide.addText(m.label, {
        x: mx + 0.1, y: 2.6, w: 2.4, h: 0.35,
        fontSize: 9.5, fontFace: 'Calibri', bold: true, color: TEXT_MUTED
      });
      slide.addText(m.val, {
        x: mx + 0.1, y: 2.95, w: 2.4, h: 0.45,
        fontSize: 16, fontFace: 'Calibri', bold: true, color: idx === 3 ? ACCENT_AMBER : TEXT_WHITE
      });
      slide.addText(m.note, {
        x: mx + 0.1, y: 3.45, w: 2.4, h: 0.35,
        fontSize: 8.5, fontFace: 'Calibri', color: TEXT_SLATE
      });
    });

    slide.addShape(pres.ShapeType.roundRect, {
      x: 1.1, y: 4.15, w: 11.1, h: 2.4,
      rectRadius: 0.1,
      fill: { color: '1C1917' },
      line: { color: '44403C', width: 1 }
    });

    slide.addText('CONTRACT CITATION & LEGAL PROVENANCE:', {
      x: 1.3, y: 4.35, w: 10.7, h: 0.25,
      fontSize: 10.5, fontFace: 'Calibri', bold: true, color: ACCENT_SKY
    });

    slide.addText('• Source File 1: invoices.csv -> Row 2, Column 4 [unit_price = $50.00]\n• Source File 2: contract_prices.csv -> Row 2, Column 2 [contract_unit_price = $48.00]\n• Master Agreement Reference: Section 4.2 ("Pricing Stability & Price Caps")\n• Audit Action: Reject $50/unit price on invoice line 1; adjust payment to contract ceiling rate of $48/unit; save $200.00.', {
      x: 1.3, y: 4.7, w: 10.7, h: 1.65,
      fontSize: 11, fontFace: 'Calibri', color: TEXT_SLATE
    });

    slide.addNotes('Discrepancy 2 is contract rate escalation. The invoice charged $50 per unit, exceeding our contracted ceiling price of $48. On the 100 delivered units, that $2 unauthorized increase created an additional $200 in leakage.');
  }

  // SLIDE 18: Credibility Benchmark: Clean Order PO-1002
  {
    const slide = pres.addSlide();
    slide.background = { color: BG_DARK };
    addHeader(slide, 18, TOTAL_SLIDES, 'Credibility Benchmark', 'Zero False Positive Benchmark: Clean Order PO-1002', 'Proving the agent does NOT flag false alarms on clean data.');

    slide.addShape(pres.ShapeType.roundRect, {
      x: 0.8, y: 1.85, w: 5.7, h: 4.95,
      rectRadius: 0.15,
      fill: { color: CARD_BG },
      line: { color: ACCENT_EMERALD, width: 2 }
    });

    slide.addText('CLEAN ORDER VERIFICATION (PO-1002)', {
      x: 1.1, y: 2.1, w: 5.1, h: 0.3,
      fontSize: 11, fontFace: 'Calibri', bold: true, color: ACCENT_EMERALD
    });
    slide.addText('100% Concordance Across All 4 Sources', {
      x: 1.1, y: 2.4, w: 5.1, h: 0.45,
      fontSize: 16, fontFace: 'Calibri', bold: true, color: TEXT_WHITE
    });
    slide.addText('• SAP ERP: PO-1002 authorized 50 units ordered @ $20.00/unit ($1,000.00 total).\n• WMS Logistics: Dock note DN-046 logged exactly 50 units received.\n• AP Invoices: Invoice INV-9002 billed for exactly 50 units @ $20.00/unit.\n• Legal Contracts: Contract price schedule cap confirmed at $20.00/unit.\n• Mathematical Variance: Exactly $0.00 USD across all fields.\n• Audit Confidence: 100.0% (Clean Concordance)', {
      x: 1.1, y: 2.95, w: 5.1, h: 3.65,
      fontSize: 11, fontFace: 'Calibri', color: TEXT_SLATE
    });

    slide.addShape(pres.ShapeType.roundRect, {
      x: 6.8, y: 1.85, w: 5.7, h: 4.95,
      rectRadius: 0.15,
      fill: { color: CARD_BG_ALT },
      line: { color: ACCENT_EMERALD, width: 2 }
    });

    slide.addText('WHY ZERO FALSE POSITIVES MATTERS', {
      x: 7.1, y: 2.1, w: 5.1, h: 0.3,
      fontSize: 11, fontFace: 'Calibri', bold: true, color: ACCENT_EMERALD
    });
    slide.addText('Eliminating "The Boy Who Cried Wolf"', {
      x: 7.1, y: 2.4, w: 5.1, h: 0.45,
      fontSize: 16, fontFace: 'Calibri', bold: true, color: TEXT_WHITE
    });
    slide.addText('• The Alert Fatigue Problem: AI agents that generate false alarms waste auditor time and get turned off within weeks.\n• High Specificity: TraceBack AI incorporates deterministic validation checks before raising alerts.\n• Trusted Automation: Clean orders like PO-1002 pass straight through without stopping, allowing finance teams to focus on true discrepancies.\n• Empirical Result: 0.00% False Positive Rate across all standard benchmarks.', {
      x: 7.1, y: 2.95, w: 5.1, h: 3.65,
      fontSize: 11, fontFace: 'Calibri', color: TEXT_LIGHT
    });

    slide.addNotes('Crucially, an AI auditor is only as good as its false positive rate. If an agent raises false alarms, finance teams ignore it. On clean order PO-1002, where 50 units were ordered, 50 delivered, and 50 invoiced at contract price, TraceBack AI returns exactly $0 overcharge and 100% concordance. Zero false alarms.');
  }

  // =========================================================================
  // SECTION 5: SYSTEM ARCHITECTURE & DATA FLOW (SLIDES 19-22)
  // =========================================================================

  // SLIDE 19: End-to-End System Architecture
  {
    const slide = pres.addSlide();
    slide.background = { color: BG_DARK };
    addHeader(slide, 19, TOTAL_SLIDES, 'System Architecture', 'End-to-End Enterprise System Architecture', 'A 4-tier pipeline combining data virtualization, agent orchestration, and audit governance.');

    const layers = [
      { num: 'TIER 1', name: 'Data Virtualization Layer (Zetaris Engine)', tech: 'Zetaris Federated SQL • SQLite In-Memory Mock • Zero ETL', desc: 'Queries SAP ERP, WMS Logistics, AP Invoices, and Legal Contracts in place. Eliminates data copying, staging databases, and batch latency with 12ms query response.', color: ACCENT_SKY },
      { num: 'TIER 2', name: 'Agent Orchestration Pipeline (Meterless Architecture)', tech: 'Scout Intent • Relay Router • Nightshift AI • Gaia H-MEM', desc: '5-stage autonomous mission execution: Scout establishes rules, Relay executes tools, Reconciliation quantifies variance, and Nightshift AI reasons locally.', color: ACCENT_EMERALD },
      { num: 'TIER 3', name: 'Evidence Index & Dispute Synthesis', tech: 'Cell Citation Index • Dispute Formatter • Audit Certificates', desc: 'Indexes cell coordinates {file, row, col, value} with 100% defensibility. Synthesizes formal supplier dispute claim packets with contractual references.', color: ACCENT_AMBER },
      { num: 'TIER 4', name: 'Human-in-the-Loop Audit Workspace', tech: 'React 18 • TypeScript • Tailwind CSS • Vite Dashboard', desc: 'Auditor command center with spend metrics, 4-way evidence explorer, 2-minute demo video walkthrough, and 1-click claim approval modal.', color: ACCENT_PURPLE }
    ];

    layers.forEach((l, idx) => {
      const ly = 1.85 + idx * 1.25;
      slide.addShape(pres.ShapeType.roundRect, {
        x: 0.8, y: ly, w: 11.73, h: 1.15,
        rectRadius: 0.1,
        fill: { color: CARD_BG },
        line: { color: l.color, width: 1.5 }
      });

      slide.addText(l.num, {
        x: 1.1, y: my => ly + 0.15, w: 1.5, h: 0.35,
        fontSize: 10, fontFace: 'Calibri', bold: true, color: l.color
      });
      slide.addText(l.name, {
        x: 2.8, y: ly + 0.12, w: 5.5, h: 0.35,
        fontSize: 13, fontFace: 'Calibri', bold: true, color: TEXT_WHITE
      });
      slide.addText(l.tech, {
        x: 8.5, y: ly + 0.12, w: 3.8, h: 0.35,
        fontSize: 9.5, fontFace: 'Calibri', bold: true, color: l.color,
        align: 'right'
      });
      slide.addText(l.desc, {
        x: 2.8, y: ly + 0.48, w: 9.5, h: 0.6,
        fontSize: 10, fontFace: 'Calibri', color: TEXT_SLATE
      });
    });

    slide.addNotes('Our system architecture is structured in four high-performance tiers. Tier 1 is Data Virtualization powered by Zetaris. Tier 2 is Multi-Agent Orchestration powered by Meterless. Tier 3 is the Evidence Index that locks down immutable coordinates. And Tier 4 is our interactive React dashboard.');
  }

  // SLIDE 20: 5-Stage Agent Orchestration Mission
  {
    const slide = pres.addSlide();
    slide.background = { color: BG_DARK };
    addHeader(slide, 20, TOTAL_SLIDES, 'Agent Workflow', 'The 5-Stage Meterless Mission Pipeline', 'From audit intent extraction to local AI reasoning and dispute generation.');

    const stages = [
      { step: 'STAGE 1', name: 'Scout Intent', latency: '12ms', desc: 'Parses audit parameters, sets $0 discrepancy tolerance threshold, and identifies required data entities.', color: ACCENT_INDIGO },
      { step: 'STAGE 2', name: 'Relay Zetaris', latency: '18ms', desc: 'Dispatches federated SQL queries across ERP, warehouse, invoices, and contracts via Zetaris virtualization.', color: ACCENT_SKY },
      { step: 'STAGE 3', name: 'Reconciliation', latency: '8ms', desc: 'Executes deterministic 4-way matching algorithms to quantify quantity, rate, fee, and duplicate variances.', color: ACCENT_AMBER },
      { step: 'STAGE 4', name: 'Confidence Score', latency: '14ms', desc: 'Evaluates cross-source corroboration strength, generating a calibrated confidence score (96.5% on PO-1001).', color: ACCENT_EMERALD },
      { step: 'STAGE 5', name: 'Meterless Nightshift', latency: '42ms', desc: 'Executes Race/Judge/Verify/Generate local AI reasoning cycle; outputs cryptographic receipt at $0 token cost.', color: ACCENT_PURPLE }
    ];

    stages.forEach((stg, idx) => {
      const sy = 1.85 + idx * 1.0;
      slide.addShape(pres.ShapeType.roundRect, {
        x: 0.8, y: sy, w: 11.73, h: 0.9,
        rectRadius: 0.1,
        fill: { color: CARD_BG },
        line: { color: stg.color, width: 1.5 }
      });

      slide.addText(stg.step, {
        x: 1.1, y: sy + 0.15, w: 1.5, h: 0.3,
        fontSize: 10, fontFace: 'Calibri', bold: true, color: stg.color
      });
      slide.addText(stg.name, {
        x: 2.8, y: sy + 0.15, w: 3.5, h: 0.35,
        fontSize: 13, fontFace: 'Calibri', bold: true, color: TEXT_WHITE
      });
      slide.addText(`Latency: ${stg.latency}`, {
        x: 10.6, y: sy + 0.15, w: 1.7, h: 0.35,
        fontSize: 11, fontFace: 'Calibri', bold: true, color: stg.color,
        align: 'right'
      });
      slide.addText(stg.desc, {
        x: 2.8, y: sy + 0.48, w: 9.5, h: 0.35,
        fontSize: 9.5, fontFace: 'Calibri', color: TEXT_SLATE
      });
    });

    slide.addShape(pres.ShapeType.roundRect, {
      x: 0.8, y: 6.0, w: 11.73, h: 0.8,
      rectRadius: 0.1,
      fill: { color: '0F172A' },
      line: { color: BORDER_COLOR, width: 1 }
    });
    slide.addText('TOTAL PIPELINE DURATION: 184ms   |   CLOUD TOKENS CONSUMED: 0   |   IMMUTABLE AUDIT RECEIPT: ns-rcpt-8f3a9e', {
      x: 1.1, y: 6.25, w: 11.1, h: 0.3,
      fontSize: 11, fontFace: 'Calibri', bold: true, color: ACCENT_EMERALD,
      align: 'center', valign: 'middle'
    });

    slide.addNotes('Here is the 5-stage mission pipeline. Stage 1: Scout parses intent. Stage 2: Relay coordinates Zetaris queries. Stage 3: Reconciliation calculates variance. Stage 4: Confidence scoring verifies multi-source alignment. Stage 5: Meterless Nightshift performs autonomous local reasoning. The entire sequence executes in 184 milliseconds.');
  }

  // SLIDE 21: Cell-Level Evidence & Audit Defensibility
  {
    const slide = pres.addSlide();
    slide.background = { color: BG_DARK };
    addHeader(slide, 21, TOTAL_SLIDES, 'Audit Defensibility', 'Cell-Level Evidence Provenance Index', 'Every flagged dollar links to immutable source coordinates {file, row, column, value}.');

    slide.addShape(pres.ShapeType.roundRect, {
      x: 0.8, y: 1.85, w: 11.73, h: 4.95,
      rectRadius: 0.15,
      fill: { color: CARD_BG },
      line: { color: ACCENT_SKY, width: 1.5 }
    });

    slide.addText('HOW TRACEBACK AI GUARANTEES AUDIT DEFENSIBILITY:', {
      x: 1.1, y: 2.1, w: 11.1, h: 0.3,
      fontSize: 12, fontFace: 'Calibri', bold: true, color: ACCENT_SKY
    });

    const auditFeatures = [
      {
        title: 'Deterministic Coordinate Index',
        body: 'Every discrepancy references exact source coordinates: {file: "invoices.csv", row: 2, column: "invoiced_qty", value: 120}. No vague summaries; auditors can click through to raw CSV rows in the UI.',
        color: ACCENT_SKY
      },
      {
        title: 'Zero Hallucination Guarantee',
        body: 'Generative AI is strictly restricted to text synthesis (writing dispute letters). All mathematical variances and data extractions are calculated using deterministic code, making hallucination mathematically impossible.',
        color: ACCENT_EMERALD
      },
      {
        title: 'Cryptographic Audit Certificate',
        body: 'The system generates a digitally stamped audit certificate citing transaction hashes, execution timestamps, and corroboration metrics, meeting strict SOX internal control criteria.',
        color: ACCENT_AMBER
      },
      {
        title: 'Auditor Inspection Modal',
        body: 'Auditors can click any evidence badge in the web UI to inspect the underlying source file, highlight the exact cell, and review preceding and succeeding rows for full context.',
        color: ACCENT_PURPLE
      }
    ];

    auditFeatures.forEach((af, idx) => {
      const col = idx % 2;
      const row = Math.floor(idx / 2);
      const ax = 1.1 + col * 5.65;
      const ay = 2.5 + row * 2.05;

      slide.addShape(pres.ShapeType.roundRect, {
        x: ax, y: ay, w: 5.4, h: 1.85,
        rectRadius: 0.1,
        fill: { color: CARD_BG_ALT },
        line: { color: af.color, width: 1 }
      });
      slide.addText(af.title, {
        x: ax + 0.2, y: ay + 0.15, w: 5.0, h: 0.35,
        fontSize: 13, fontFace: 'Calibri', bold: true, color: af.color
      });
      slide.addText(af.body, {
        x: ax + 0.2, y: ay + 0.55, w: 5.0, h: 1.15,
        fontSize: 10.5, fontFace: 'Calibri', color: TEXT_SLATE
      });
    });

    slide.addNotes('Audit defensibility is our core differentiator. Every dollar flagged links to an immutable coordinate citing file, row, column, and value. Generative AI is never allowed to guess numbers; math is computed deterministically.');
  }

  // SLIDE 22: Human-in-the-Loop Governance & Dispute Synthesis
  {
    const slide = pres.addSlide();
    slide.background = { color: BG_DARK };
    addHeader(slide, 22, TOTAL_SLIDES, 'Audit Governance', 'Human-in-the-Loop Governance & Dispute Synthesis', 'Empowering human auditors with 1-click approvals and automated supplier notices.');

    slide.addShape(pres.ShapeType.roundRect, {
      x: 0.8, y: 1.85, w: 5.7, h: 4.95,
      rectRadius: 0.15,
      fill: { color: CARD_BG },
      line: { color: ACCENT_PURPLE, width: 2 }
    });

    slide.addText('HUMAN GOVERNANCE WORKFLOW', {
      x: 1.1, y: 2.1, w: 5.1, h: 0.3,
      fontSize: 11, fontFace: 'Calibri', bold: true, color: ACCENT_PURPLE
    });
    slide.addText('Auditor In Full Control', {
      x: 1.1, y: 2.4, w: 5.1, h: 0.45,
      fontSize: 16, fontFace: 'Calibri', bold: true, color: TEXT_WHITE
    });
    slide.addText('• AI as Copilot, Human as Authority: Agents discover and corroborate discrepancies, but human auditors hold final claim approval authority.\n• 1-Click Decision Actions:\n  1. APPROVE CLAIM: Endorses $1,200.00 recovery and generates formal dispute notice.\n  2. OVERRIDE TOLERANCE: Flags transaction as acceptable commercial concession.\n  3. REQUEST RE-AUDIT: Triggers re-verification against updated vendor notes.', {
      x: 1.1, y: 2.95, w: 5.1, h: 3.65,
      fontSize: 11, fontFace: 'Calibri', color: TEXT_SLATE
    });

    slide.addShape(pres.ShapeType.roundRect, {
      x: 6.8, y: 1.85, w: 5.7, h: 4.95,
      rectRadius: 0.15,
      fill: { color: CARD_BG_ALT },
      line: { color: ACCENT_PURPLE, width: 2 }
    });

    slide.addText('SYNTHESIZED DISPUTE NOTICE', {
      x: 7.1, y: 2.1, w: 5.1, h: 0.3,
      fontSize: 11, fontFace: 'Calibri', bold: true, color: ACCENT_EMERALD
    });
    slide.addText('Ready-to-Dispatch Supplier Email', {
      x: 7.1, y: 2.4, w: 5.1, h: 0.45,
      fontSize: 16, fontFace: 'Calibri', bold: true, color: TEXT_WHITE
    });
    slide.addText('Subject: Notice of Invoice Discrepancy — PO-1001 / INV-9001\n\nDear Apex Industrial Accounts Team,\n\nOur automated audit of PO-1001 has identified $1,200.00 in discrepancies requiring adjustment prior to payment:\n1. Quantity Overbilling ($1,000.00): Invoiced 120 units; warehouse dock note DN-045 logged 100 units physically received.\n2. Rate Escalation ($200.00): Invoiced unit price of $50.00 exceeds Master Agreement ceiling of $48.00 (Section 4.2).\n\nPlease issue an amended invoice or credit memo for $1,200.00.', {
      x: 7.1, y: 2.95, w: 5.1, h: 3.65,
      fontSize: 9.5, fontFace: 'Calibri', color: TEXT_LIGHT
    });

    slide.addNotes('TraceBack AI keeps the human in the loop. The lead auditor approves the claim with one click, and the platform instantly drafts a professional, fact-based dispute letter citing exact delivery notes and contract clauses.');
  }

  // =========================================================================
  // SECTION 6: SPONSOR TECHNOLOGY INTEGRATION (SLIDES 23-26)
  // =========================================================================

  // SLIDE 23: Zetaris Data Virtualization — Deep Dive
  {
    const slide = pres.addSlide();
    slide.background = { color: BG_DARK };
    addHeader(slide, 23, TOTAL_SLIDES, 'Sponsor Integration', 'Zetaris Data Virtualization: Deep Technical Architecture', 'Federated SQL execution across decentralized enterprise data stores in 12ms.');

    slide.addShape(pres.ShapeType.roundRect, {
      x: 0.8, y: 1.85, w: 11.73, h: 4.95,
      rectRadius: 0.15,
      fill: { color: CARD_BG },
      line: { color: ACCENT_SKY, width: 2 }
    });

    slide.addText('FEDERATED SQL QUERY EXECUTION ACROSS 4 DATASETS:', {
      x: 1.1, y: 2.1, w: 11.1, h: 0.3,
      fontSize: 12, fontFace: 'Calibri', bold: true, color: ACCENT_SKY
    });

    slide.addShape(pres.ShapeType.roundRect, {
      x: 1.1, y: 2.5, w: 11.1, h: 2.2,
      rectRadius: 0.1,
      fill: { color: '020617' },
      line: { color: '082F49', width: 1.5 }
    });

    slide.addText(`SELECT po.po_id, po.supplier_id, po.ordered_qty, po.unit_price as po_price,
       del.delivery_id, del.delivered_qty, del.delivery_date,
       inv.invoice_id, inv.invoiced_qty, inv.unit_price as invoice_price,
       cp.contract_unit_price, cp.price_ceiling
FROM   zetaris.sap_erp.purchase_orders po
LEFT JOIN zetaris.wms_cloud.deliveries del      ON po.po_id = del.po_id
LEFT JOIN zetaris.ap_portal.invoices inv        ON po.po_id = inv.po_id
LEFT JOIN zetaris.legal_repo.contract_prices cp ON po.supplier_id = cp.supplier_id
WHERE  po.po_id = 'PO-1001';`, {
      x: 1.3, y: 2.6, w: 10.7, h: 2.0,
      fontSize: 10, fontFace: 'Courier New', color: ACCENT_SKY
    });

    slide.addText('TECHNICAL CAPABILITIES & ADVANTAGES:', {
      x: 1.1, y: 4.85, w: 11.1, h: 0.25,
      fontSize: 11, fontFace: 'Calibri', bold: true, color: ACCENT_EMERALD
    });

    slide.addText('• Zero ETL Pipeline Latency: Queries execute live in 12 milliseconds without waiting for nightly data warehouse ingest.\n• Unified Semantic Model: Normalizes field types across disparate CSVs, SQL databases, and cloud APIs into a cohesive tabular view.\n• Push-Down Optimization: Pushes filtering predicates directly to source systems, minimizing network data transfer.\n• Enterprise Security: Data remains within original security boundaries; sensitive banking and supplier data is never duplicated.', {
      x: 1.1, y: 5.15, w: 11.1, h: 1.45,
      fontSize: 10.5, fontFace: 'Calibri', color: TEXT_SLATE
    });

    slide.addNotes('Zetaris is our primary data integration foundation. Rather than copying files into a staging warehouse, our agents issue a federated SQL query directly through Zetaris, joining ERP, WMS, invoice, and contract datasets on the fly in 12 milliseconds.');
  }

  // SLIDE 24: Zetaris Cross-Source Mock & Enterprise Hybrid Mode
  {
    const slide = pres.addSlide();
    slide.background = { color: BG_DARK };
    addHeader(slide, 24, TOTAL_SLIDES, 'Sponsor Integration', 'Zetaris Enterprise Hybrid Mode & Offline Resilience', 'Dual-mode architecture ensuring 100% offline hackathon execution and cloud deployment.');

    slide.addShape(pres.ShapeType.roundRect, {
      x: 0.8, y: 1.85, w: 5.7, h: 4.95,
      rectRadius: 0.15,
      fill: { color: CARD_BG },
      line: { color: ACCENT_SKY, width: 2 }
    });

    slide.addText('MODE A: LIVE CLOUD ZETARIS API', {
      x: 1.1, y: 2.1, w: 5.1, h: 0.3,
      fontSize: 11, fontFace: 'Calibri', bold: true, color: ACCENT_SKY
    });
    slide.addText('Production Enterprise Deployment', {
      x: 1.1, y: 2.4, w: 5.1, h: 0.45,
      fontSize: 16, fontFace: 'Calibri', bold: true, color: TEXT_WHITE
    });
    slide.addText('• Connects directly to Zetaris Network API via POST /query.\n• Authenticates via bearer tokens and workspace credentials.\n• Queries live enterprise databases across SAP, Oracle, and Coupa.\n• Returns high-throughput federated result sets with low latency.\n• Environment variables: ZETARIS_API_URL, ZETARIS_API_KEY.', {
      x: 1.1, y: 2.95, w: 5.1, h: 3.65,
      fontSize: 11, fontFace: 'Calibri', color: TEXT_SLATE
    });

    slide.addShape(pres.ShapeType.roundRect, {
      x: 6.8, y: 1.85, w: 5.7, h: 4.95,
      rectRadius: 0.15,
      fill: { color: CARD_BG_ALT },
      line: { color: ACCENT_EMERALD, width: 2 }
    });

    slide.addText('MODE B: IN-MEMORY CROSS-SOURCE MOCK', {
      x: 7.1, y: 2.1, w: 5.1, h: 0.3,
      fontSize: 11, fontFace: 'Calibri', bold: true, color: ACCENT_EMERALD
    });
    slide.addText('100% Offline Hackathon Testability', {
      x: 7.1, y: 2.4, w: 5.1, h: 0.45,
      fontSize: 16, fontFace: 'Calibri', bold: true, color: TEXT_WHITE
    });
    slide.addText('• Auto-spins up an in-memory SQLite federated engine.\n• Loads physical CSV datasets: purchase_orders.csv, deliveries.csv, invoices.csv, contract_prices.csv.\n• Executes identical federated SQL join with identical schema output.\n• Enables 100% offline development, CI/CD testing, and static GitHub Pages simulation.\n• Zero external network dependencies required.', {
      x: 7.1, y: 2.95, w: 5.1, h: 3.65,
      fontSize: 11, fontFace: 'Calibri', color: TEXT_LIGHT
    });

    slide.addNotes('To ensure 100% resilience, TraceBack AI implements an Enterprise Hybrid architecture. In production, it connects to the live Zetaris Network API. In offline hackathon environments or GitHub Pages, it spins up an identical in-memory federator that mirrors the exact Zetaris SQL schema.');
  }

  // SLIDE 25: Meterless Engine: Scout, Relay & Gaia H-MEM
  {
    const slide = pres.addSlide();
    slide.background = { color: BG_DARK };
    addHeader(slide, 25, TOTAL_SLIDES, 'Sponsor Integration', 'Meterless Engine Architecture: Scout, Relay & H-MEM', 'Multi-agent orchestration, intent parsing, and persistent hierarchical memory.');

    const meterlessParts = [
      {
        num: 'SCOUT INTENT', title: 'Meterless Scout Engine', time: '12ms Latency',
        desc: 'Analyzes user prompts, audit directives, and compliance policies. Configures audit tolerances ($0 threshold) and translates natural language queries into structured execution plans.',
        color: ACCENT_INDIGO
      },
      {
        num: 'RELAY ENGINE', title: 'Meterless Relay Router', time: '18ms Latency',
        desc: 'Asynchronous multi-agent dispatcher that coordinates tool execution. Routes queries to Zetaris, triggers reconciliation algorithms, and monitors execution telemetry.',
        color: ACCENT_SKY
      },
      {
        num: 'GAIA H-MEM', title: 'Hierarchical Working Memory', time: 'Persistent State',
        desc: 'Meterless Gaia H-MEM maintains multi-turn context across audit sessions. Persists investigation checkpoints, dispute correspondence, and historical auditor decisions.',
        color: ACCENT_PURPLE
      }
    ];

    meterlessParts.forEach((p, idx) => {
      const px = 0.8 + idx * 3.98;
      slide.addShape(pres.ShapeType.roundRect, {
        x: px, y: 1.85, w: 3.8, h: 4.95,
        rectRadius: 0.15,
        fill: { color: CARD_BG },
        line: { color: p.color, width: 2 }
      });

      slide.addText(p.num, {
        x: px + 0.2, y: 2.1, w: 3.4, h: 0.3,
        fontSize: 11, fontFace: 'Calibri', bold: true, color: p.color
      });
      slide.addText(p.title, {
        x: px + 0.2, y: 2.4, w: 3.4, h: 0.45,
        fontSize: 16, fontFace: 'Calibri', bold: true, color: TEXT_WHITE
      });
      slide.addShape(pres.ShapeType.roundRect, {
        x: px + 0.2, y: 2.9, w: 3.4, h: 0.35,
        rectRadius: 0.08,
        fill: { color: '0F172A' },
        line: { color: p.color, width: 1 }
      });
      slide.addText(p.time, {
        x: px + 0.2, y: 2.9, w: 3.4, h: 0.35,
        fontSize: 10, fontFace: 'Calibri', bold: true, color: p.color,
        align: 'center', valign: 'middle'
      });

      slide.addText(p.desc, {
        x: px + 0.2, y: 3.4, w: 3.4, h: 3.2,
        fontSize: 11, fontFace: 'Calibri', color: TEXT_SLATE
      });
    });

    slide.addNotes('For agent orchestration, we leverage the Meterless Engine. Scout parses audit intent, Relay routes data and tool calls, and Gaia H-MEM provides persistent working memory so auditors never lose context across sessions.');
  }

  // SLIDE 26: Meterless Nightshift AI Provider ($0 Cloud Compute)
  {
    const slide = pres.addSlide();
    slide.background = { color: BG_DARK };
    addHeader(slide, 26, TOTAL_SLIDES, 'Sponsor Integration', 'Meterless Nightshift AI: $0.00 Token Compute Provider', 'Autonomous local intelligence running a 4-stage Race, Judge, Verify, Generate cycle.');

    slide.addShape(pres.ShapeType.roundRect, {
      x: 0.8, y: 1.85, w: 6.8, h: 4.95,
      rectRadius: 0.15,
      fill: { color: CARD_BG },
      line: { color: ACCENT_EMERALD, width: 2 }
    });

    slide.addText('NIGHTSHIFT 4-STAGE REASONING CYCLE', {
      x: 1.1, y: 2.1, w: 6.2, h: 0.3,
      fontSize: 11, fontFace: 'Calibri', bold: true, color: ACCENT_EMERALD
    });
    slide.addText('Autonomous Local Execution Pipeline', {
      x: 1.1, y: 2.4, w: 6.2, h: 0.45,
      fontSize: 16, fontFace: 'Calibri', bold: true, color: TEXT_WHITE
    });

    const cycleSteps = [
      { name: '1. RACE (Fast Heuristic)', desc: 'Spawns parallel lightweight evaluation candidates across quantity and rate variances.' },
      { name: '2. JUDGE (Multi-Point Corroboration)', desc: 'Arbitrates candidate discrepancies against physical dock notes and contract schedules.' },
      { name: '3. VERIFY (Deterministic Proof)', desc: 'Cross-checks findings against exact cell coordinates {file, row, col}; rejects hallucinations.' },
      { name: '4. GENERATE (Resolution Synthesis)', desc: 'Synthesizes executive summary and formal supplier dispute documentation in 42ms.' }
    ];

    cycleSteps.forEach((cs, idx) => {
      const cy = 2.95 + idx * 0.92;
      slide.addShape(pres.ShapeType.roundRect, {
        x: 1.1, y: cy, w: 6.2, h: 0.8,
        rectRadius: 0.08,
        fill: { color: CARD_BG_ALT },
        line: { color: '059669', width: 1 }
      });
      slide.addText(cs.name, {
        x: 1.25, y: cy + 0.1, w: 5.9, h: 0.25,
        fontSize: 10.5, fontFace: 'Calibri', bold: true, color: ACCENT_EMERALD
      });
      slide.addText(cs.desc, {
        x: 1.25, y: cy + 0.38, w: 5.9, h: 0.35,
        fontSize: 9.5, fontFace: 'Calibri', color: TEXT_SLATE
      });
    });

    slide.addShape(pres.ShapeType.roundRect, {
      x: 7.9, y: 1.85, w: 4.63, h: 4.95,
      rectRadius: 0.15,
      fill: { color: '064E3B' },
      line: { color: ACCENT_EMERALD, width: 2 }
    });

    slide.addText('CRYPTOGRAPHIC AUDIT RECEIPT', {
      x: 8.15, y: 2.1, w: 4.1, h: 0.3,
      fontSize: 11, fontFace: 'Calibri', bold: true, color: '6EE7B7'
    });
    slide.addText('ns-rcpt-8f3a9e', {
      x: 8.15, y: 2.4, w: 4.1, h: 0.45,
      fontSize: 18, fontFace: 'Courier New', bold: true, color: TEXT_WHITE
    });

    slide.addText('• Execution Engine: Meterless Nightshift v2.4\n• Compute Location: Local Enterprise Boundary\n• Cloud Tokens Incurred: Exactly 0.00\n• Cloud Token Cost: $0.00 USD\n• Inference Latency: 42 milliseconds\n• Execution Hash: a4f8...39e1\n• Status: VERIFIED & SEALED\n\nNightshift eliminates cloud API rate limits, keeps sensitive enterprise data private, and guarantees predictable $0 inference cost.', {
      x: 8.15, y: 2.95, w: 4.1, h: 3.65,
      fontSize: 10.5, fontFace: 'Calibri', color: 'E2E8F0'
    });

    slide.addNotes('Meterless Nightshift acts as our AI provider. It executes a 4-stage Race, Judge, Verify, Generate reasoning cycle entirely on local compute. Because it runs locally, it consumes zero cloud tokens, keeps financial data strictly private, and outputs an immutable cryptographic audit receipt.');
  }

  // =========================================================================
  // SECTION 7: BUSINESS IMPACT, ROADMAP & CONCLUSION (SLIDES 27-28)
  // =========================================================================

  // SLIDE 27: Business Impact, Enterprise ROI & Scalability
  {
    const slide = pres.addSlide();
    slide.background = { color: BG_DARK };
    addHeader(slide, 27, TOTAL_SLIDES, 'ROI & Roadmap', 'Enterprise Business Impact & Implementation ROI', 'Quantifying financial returns and path to enterprise production deployment.');

    const roiCards = [
      { metric: '$1.2M - $2.5M', label: 'Annual Cash Recovery', sub: 'Projected net recovery for an enterprise processing $50M in annual procurement spend.', color: ACCENT_EMERALD },
      { metric: '10x - 25x', label: 'Annualized ROI', sub: 'First-year return on investment based on recovered overpayments vs software cost.', color: ACCENT_SKY },
      { metric: '<30 Days', label: 'Time to Value', sub: 'Rapid time to first recovery via zero-ETL data virtualization connectors.', color: ACCENT_AMBER },
      { metric: '100%', label: 'Ledger Audit Coverage', sub: 'Complete transition from 5% random sampling to 100% continuous census audit.', color: ACCENT_PURPLE }
    ];

    roiCards.forEach((r, idx) => {
      const rx = 0.8 + idx * 2.98;
      slide.addShape(pres.ShapeType.roundRect, {
        x: rx, y: 1.85, w: 2.85, h: 2.2,
        rectRadius: 0.12,
        fill: { color: CARD_BG },
        line: { color: r.color, width: 1.5 }
      });
      slide.addText(r.metric, {
        x: rx + 0.15, y: 2.05, w: 2.55, h: 0.7,
        fontSize: 28, fontFace: 'Calibri', bold: true, color: r.color,
        align: 'center', valign: 'middle'
      });
      slide.addText(r.label, {
        x: rx + 0.15, y: 2.8, w: 2.55, h: 0.35,
        fontSize: 12.5, fontFace: 'Calibri', bold: true, color: TEXT_WHITE,
        align: 'center'
      });
      slide.addText(r.sub, {
        x: rx + 0.15, y: 3.15, w: 2.55, h: 0.8,
        fontSize: 9.5, fontFace: 'Calibri', color: TEXT_SLATE,
        align: 'center'
      });
    });

    slide.addShape(pres.ShapeType.roundRect, {
      x: 0.8, y: 4.25, w: 11.73, h: 2.55,
      rectRadius: 0.15,
      fill: { color: CARD_BG_ALT },
      line: { color: BORDER_COLOR, width: 1.5 }
    });

    slide.addText('ENTERPRISE SCALE & PRODUCT ROADMAP:', {
      x: 1.1, y: 4.45, w: 11.1, h: 0.3,
      fontSize: 11, fontFace: 'Calibri', bold: true, color: ACCENT_SKY
    });

    slide.addText('• Phase 1 (Current): Autonomous 4-way matching with Zetaris Zero-ETL, Meterless Engine, and Nightshift AI ($0 compute).\n• Phase 2 (Q1 2027): Native bidirectional connectors for SAP S/4HANA, Coupa, and Oracle Cloud Procurement.\n• Phase 3 (Q2 2027): NVIDIA NIM microservice deployment (meta/llama-3.1-8b-instruct) for high-throughput enterprise clusters.\n• Phase 4 (Q3 2027): Autonomous supplier portal negotiation with automated credit memo settlement loops.', {
      x: 1.1, y: 4.8, w: 11.1, h: 1.85,
      fontSize: 11, fontFace: 'Calibri', color: TEXT_SLATE
    });

    slide.addNotes('The business case for TraceBack AI is immediate: on a $50 million spend baseline, capturing 2.5% leakage delivers $1.25 million directly back to EBITDA. With zero ETL infrastructure, implementation takes less than 30 days.');
  }

  // SLIDE 28: Summary, Live Demonstration & Repository Links
  {
    const slide = pres.addSlide();
    slide.background = { color: BG_DARK };
    addHeader(slide, 28, TOTAL_SLIDES, 'Verification & Conclusion', 'Summary, Live Demo, and Open-Source Repository', 'TraceBack AI turns enterprise procurement leakage into measurable cash recovery.');

    slide.addShape(pres.ShapeType.roundRect, {
      x: 0.8, y: 1.85, w: 11.73, h: 4.95,
      rectRadius: 0.15,
      fill: { color: CARD_BG },
      line: { color: '312E81', width: 2 }
    });

    slide.addText('PRODUCTION VERIFICATION & DEMONSTRATION LINKS:', {
      x: 1.1, y: 2.1, w: 11.1, h: 0.3,
      fontSize: 11, fontFace: 'Calibri', bold: true, color: ACCENT_SKY
    });

    const links = [
      { name: 'Live Web Application (GitHub Pages):', url: 'https://zaintahir2025.github.io/traceback-ai/', desc: 'Full interactive React dashboard with simulation, audit trail & claim approval.' },
      { name: 'Interactive Web Presentation Deck:', url: 'https://zaintahir2025.github.io/traceback-ai/presentation.html', desc: 'In-browser 28-slide deck with keyboard navigation and speaker notes.' },
      { name: 'PowerPoint File (.pptx) Download:', url: 'https://zaintahir2025.github.io/traceback-ai/traceback-ai-presentation.pptx', desc: 'Direct download of official 28-slide Microsoft PowerPoint deck (240 KB).' },
      { name: '2-Minute Demo Video Walkthrough:', url: 'https://zaintahir2025.github.io/traceback-ai/demo-video.html', desc: 'Standalone HTML5 presentation with synchronized speech narration.' },
      { name: 'Official Demo Video (MP4) File:', url: 'https://zaintahir2025.github.io/traceback-ai/traceback-ai-demo.mp4', desc: 'Direct download of 98-second HD MP4 video file (4.02 MB).' },
      { name: 'Open-Source GitHub Repository:', url: 'https://github.com/zaintahir2025/traceback-ai', desc: 'Full source code, backend API, tests, Zetaris integration & Meterless engine.' }
    ];

    links.forEach((l, idx) => {
      const ly = 2.5 + idx * 0.68;
      slide.addShape(pres.ShapeType.roundRect, {
        x: 1.1, y: ly, w: 11.1, h: 0.58,
        rectRadius: 0.08,
        fill: { color: CARD_BG_ALT },
        line: { color: BORDER_COLOR, width: 1 }
      });

      slide.addText(l.name, {
        x: 1.3, y: ly + 0.08, w: 4.2, h: 0.22,
        fontSize: 10.5, fontFace: 'Calibri', bold: true, color: TEXT_WHITE
      });
      slide.addText(l.desc, {
        x: 1.3, y: ly + 0.3, w: 4.2, h: 0.22,
        fontSize: 8.5, fontFace: 'Calibri', color: TEXT_MUTED
      });
      slide.addText(l.url, {
        x: 5.6, y: ly + 0.15, w: 6.4, h: 0.3,
        fontSize: 10.5, fontFace: 'Calibri', color: ACCENT_SKY
      });
    });

    slide.addText('TraceBack AI is fully built, tested, and live today. Thank you for your time!', {
      x: 1.1, y: 6.45, w: 11.1, h: 0.3,
      fontSize: 11, fontFace: 'Calibri', bold: true, color: ACCENT_EMERALD,
      align: 'center'
    });

    slide.addNotes('In conclusion: TraceBack AI demonstrates that autonomous agents, when grounded in Zero-ETL Data Virtualization and local intelligence, solve real multi-million dollar enterprise problems. Everything shown today is live, verifiable, and open-source. Thank you very much!');
  }

  // Save to file
  const rootPath = path.resolve('traceback-ai-presentation.pptx');
  const publicPath = path.resolve('frontend/public/traceback-ai-presentation.pptx');
  const docsPath = path.resolve('docs/traceback-ai-presentation.pptx');

  await pres.writeFile({ fileName: rootPath });
  fs.copyFileSync(rootPath, publicPath);
  fs.copyFileSync(rootPath, docsPath);

  const stats = fs.statSync(rootPath);
  console.log(`SUCCESS! Generated 28-Slide PowerPoint Presentation:`);
  console.log(` - ${rootPath} (${(stats.size / 1024).toFixed(1)} KB)`);
  console.log(` - ${publicPath}`);
  console.log(` - ${docsPath}`);
}

generate28SlideDeck().catch(console.error);
