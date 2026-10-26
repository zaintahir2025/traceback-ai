import pptxgen from 'pptxgenjs';
import fs from 'node:fs';
import path from 'node:path';

async function generateExecutive28SlideDeck() {
  const pres = new pptxgen();

  // Widescreen 16:9 modern format: 13.333 x 7.5 inches
  pres.layout = 'LAYOUT_WIDE';
  pres.author = 'Zain Tahir';
  pres.company = 'TraceBack AI';
  pres.title = 'TraceBack AI — Enterprise 28-Slide Presentation Deck';
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

  const TOTAL_SLIDES = 28;

  // Helper 1: Content Slide Header
  function addHeader(slide, slideNum, sectionTag, title, subtitle) {
    // Top Section Pill
    slide.addShape(pres.ShapeType.roundRect, {
      x: 0.8, y: 0.42, w: 2.9, h: 0.32,
      rectRadius: 0.16,
      fill: { color: '1E1B4B' },
      line: { color: '4338CA', width: 1.2 }
    });
    slide.addText(sectionTag.toUpperCase(), {
      x: 0.8, y: 0.42, w: 2.9, h: 0.32,
      fontSize: 9.5, fontFace: 'Calibri', bold: true, color: 'C7D2FE',
      align: 'center', valign: 'middle'
    });

    // Slide Counter Pill
    slide.addShape(pres.ShapeType.roundRect, {
      x: 3.85, y: 0.42, w: 1.5, h: 0.32,
      rectRadius: 0.16,
      fill: { color: '0F172A' },
      line: { color: '334155', width: 1 }
    });
    slide.addText(`SLIDE ${slideNum} OF ${TOTAL_SLIDES}`, {
      x: 3.85, y: 0.42, w: 1.5, h: 0.32,
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
      x: 10.8, y: 0.42, w: 1.73, h: 0.32,
      rectRadius: 0.16,
      fill: { color: '064E3B' },
      line: { color: '059669', width: 1 }
    });
    slide.addText('METERLESS NIGHTSHIFT', {
      x: 10.8, y: 0.42, w: 1.73, h: 0.32,
      fontSize: 8.5, fontFace: 'Calibri', bold: true, color: '6EE7B7',
      align: 'center', valign: 'middle'
    });

    // Main slide title
    slide.addText(title, {
      x: 0.8, y: 0.82, w: 11.73, h: 0.55,
      fontSize: 21, fontFace: 'Calibri', bold: true, color: TEXT_WHITE,
      valign: 'top'
    });

    // Subtitle
    if (subtitle) {
      slide.addText(subtitle, {
        x: 0.8, y: 1.35, w: 11.73, h: 0.35,
        fontSize: 12.5, fontFace: 'Calibri', color: TEXT_MUTED,
        valign: 'top'
      });
    }
  }

  // Helper 2: Dedicated Section Divider Slide
  function addSectionDivider(slide, sectionNum, totalSections, sectionName, subtitle, pillars, accentColor) {
    slide.background = { color: BG_DARK };

    // Outer framing card
    slide.addShape(pres.ShapeType.roundRect, {
      x: 0.8, y: 0.8, w: 11.73, h: 5.9,
      rectRadius: 0.2,
      fill: { color: CARD_BG },
      line: { color: accentColor, width: 2 }
    });

    // Section Pill
    slide.addShape(pres.ShapeType.roundRect, {
      x: 1.3, y: 1.3, w: 3.2, h: 0.38,
      rectRadius: 0.19,
      fill: { color: '1E1B4B' },
      line: { color: accentColor, width: 1.5 }
    });
    slide.addText(`SECTION 0${sectionNum} / 0${totalSections}`, {
      x: 1.3, y: 1.3, w: 3.2, h: 0.38,
      fontSize: 11, fontFace: 'Calibri', bold: true, color: accentColor,
      align: 'center', valign: 'middle'
    });

    // Big Section Title
    slide.addText(sectionName, {
      x: 1.3, y: 1.85, w: 10.7, h: 0.85,
      fontSize: 36, fontFace: 'Calibri', bold: true, color: TEXT_WHITE,
      valign: 'middle'
    });

    // Subtitle
    slide.addText(subtitle, {
      x: 1.3, y: 2.75, w: 10.7, h: 0.5,
      fontSize: 14, fontFace: 'Calibri', color: TEXT_SLATE,
      valign: 'top'
    });

    // 3 Pillar cards
    pillars.forEach((p, idx) => {
      const px = 1.3 + idx * 3.65;
      slide.addShape(pres.ShapeType.roundRect, {
        x: px, y: 3.5, w: 3.4, h: 2.8,
        rectRadius: 0.12,
        fill: { color: CARD_BG_ALT },
        line: { color: BORDER_COLOR, width: 1.2 }
      });
      slide.addText(p.num, {
        x: px + 0.25, y: 3.75, w: 2.9, h: 0.35,
        fontSize: 16, fontFace: 'Calibri', bold: true, color: accentColor,
        valign: 'top'
      });
      slide.addText(p.title, {
        x: px + 0.25, y: 4.15, w: 2.9, h: 0.45,
        fontSize: 14, fontFace: 'Calibri', bold: true, color: TEXT_WHITE,
        valign: 'top'
      });
      slide.addText(p.desc, {
        x: px + 0.25, y: 4.65, w: 2.9, h: 1.45,
        fontSize: 11, fontFace: 'Calibri', color: TEXT_MUTED,
        valign: 'top'
      });
    });
  }

  // =========================================================================
  // SLIDE 1: Title Slide (Cover)
  // =========================================================================
  {
    const slide = pres.addSlide();
    slide.background = { color: BG_DARK };

    slide.addShape(pres.ShapeType.roundRect, {
      x: 0.8, y: 0.8, w: 11.73, h: 5.9,
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
      { label: 'METERLESS RELAY & H-MEM', desc: 'Scout intent, relay coordination, and persistent Gaia working memory', color: ACCENT_EMERALD, bg: '064E3B' },
      { label: 'NIGHTSHIFT AI PROVIDER', desc: '4-stage Race/Judge/Verify/Generate cycle at $0 cloud token cost', color: ACCENT_PURPLE, bg: '2E1065' }
    ];

    pillars.forEach((p, idx) => {
      const px = 1.3 + idx * 3.65;
      slide.addShape(pres.ShapeType.roundRect, {
        x: px, y: 4.25, w: 3.4, h: 1.35,
        rectRadius: 0.15,
        fill: { color: p.bg },
        line: { color: p.color, width: 1.5 }
      });
      slide.addText(p.label, {
        x: px + 0.15, y: 4.4, w: 3.1, h: 0.3,
        fontSize: 10.5, fontFace: 'Calibri', bold: true, color: p.color,
        valign: 'top'
      });
      slide.addText(p.desc, {
        x: px + 0.15, y: 4.75, w: 3.1, h: 0.75,
        fontSize: 10.5, fontFace: 'Calibri', color: TEXT_SLATE,
        valign: 'top'
      });
    });

    slide.addText('Live Deployment: https://zaintahir2025.github.io/traceback-ai/   |   Lead Developer: Zain Tahir', {
      x: 1.3, y: 6.0, w: 10.5, h: 0.3,
      fontSize: 10, fontFace: 'Calibri', color: TEXT_MUTED,
      valign: 'top'
    });

    slide.addNotes('Welcome everyone. Today we are presenting TraceBack AI, an autonomous multi-agent platform designed to eliminate enterprise procurement spend leakage. By combining Zetaris Zero-ETL Data Virtualization, Meterless Relay Orchestration, and Meterless Nightshift local intelligence, TraceBack AI reconciles purchase orders, delivery notes, supplier invoices, and legal contracts in under 200 milliseconds with an immutable, cell-level audit trail.');
  }

  // =========================================================================
  // SLIDE 2: Executive Summary & Mission
  // =========================================================================
  {
    const slide = pres.addSlide();
    slide.background = { color: BG_DARK };
    addHeader(slide, 2, 'Executive Brief', 'Mission & Core Value Proposition', 'Eliminating enterprise procurement leakage through autonomous cross-source data virtualization.');

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
        fontSize: 16, fontFace: 'Calibri', bold: true, color: p.color,
        valign: 'top'
      });
      slide.addText(p.title, {
        x: px + 1.0, y: py + 0.15, w: 4.2, h: 0.35,
        fontSize: 14, fontFace: 'Calibri', bold: true, color: TEXT_WHITE,
        valign: 'top'
      });
      slide.addText(p.body, {
        x: px + 0.2, y: py + 0.55, w: 5.0, h: 1.35,
        fontSize: 11, fontFace: 'Calibri', color: TEXT_SLATE,
        valign: 'top'
      });
    });

    slide.addNotes('Our mission is simple: transform procurement auditing from a slow, sample-based, manual retrospective into a real-time, 100% census spend defense system. Traditional systems fail because data is siloed across ERP, warehouse, accounts payable, and legal contracts. TraceBack AI connects these systems virtually, analyzes discrepancies deterministically, and prepares ready-to-send dispute claims in seconds.');
  }

  // =========================================================================
  // SLIDE 3: Agenda / Table of Contents
  // =========================================================================
  {
    const slide = pres.addSlide();
    slide.background = { color: BG_DARK };
    addHeader(slide, 3, 'Deck Structure', 'Presentation Agenda: 5 Strategic Dimensions', 'Comprehensive roadmap covering problem, users, solution, architecture, and sponsor tech.');

    const sections = [
      { num: '01', title: 'The Problem', tag: 'SLIDES 4-8', desc: '$14T B2B spend volume, 4 disconnected silos, structural failure of 2-way/3-way matching, and why brittle ETL pipelines fail.', color: ACCENT_ROSE },
      { num: '02', title: 'Target Users', tag: 'SLIDES 9-13', desc: 'Chief Procurement Officer, Lead Financial Auditor, Accounts Payable Controller, and Warehouse Receiving Dock Operations.', color: ACCENT_SKY },
      { num: '03', title: 'The Solution', tag: 'SLIDES 14-18', desc: 'TraceBack AI 4-way reconciliation, live PO-1001 audit uncovering $1,200 leakage, and clean PO-1002 zero false-positive proof.', color: ACCENT_EMERALD },
      { num: '04', title: 'System Architecture', tag: 'SLIDES 19-23', desc: '4-tier enterprise system pipeline, 5-stage Meterless mission workflow, cell-level evidence index, and human-in-the-loop governance.', color: ACCENT_AMBER },
      { num: '05', title: 'Sponsor Tech', tag: 'SLIDES 24-28', desc: 'Zetaris Zero-ETL Data Virtualization, Meterless Scout & Relay Router, Meterless Nightshift ($0.00 local AI), and enterprise ROI.', color: ACCENT_PURPLE }
    ];

    sections.forEach((sec, idx) => {
      const sy = 1.85 + idx * 0.98;
      slide.addShape(pres.ShapeType.roundRect, {
        x: 0.8, y: sy, w: 11.73, h: 0.88,
        rectRadius: 0.1,
        fill: { color: CARD_BG },
        line: { color: sec.color, width: 1.5 }
      });

      slide.addText(sec.num, {
        x: 1.1, y: sy + 0.15, w: 0.9, h: 0.45,
        fontSize: 18, fontFace: 'Calibri', bold: true, color: sec.color,
        valign: 'top'
      });
      slide.addText(sec.title, {
        x: 2.1, y: sy + 0.15, w: 3.2, h: 0.35,
        fontSize: 14, fontFace: 'Calibri', bold: true, color: TEXT_WHITE,
        valign: 'top'
      });
      slide.addText(sec.tag, {
        x: 2.1, y: sy + 0.5, w: 3.2, h: 0.25,
        fontSize: 9.5, fontFace: 'Calibri', bold: true, color: sec.color,
        valign: 'top'
      });
      slide.addText(sec.desc, {
        x: 5.5, y: sy + 0.18, w: 6.8, h: 0.55,
        fontSize: 10.5, fontFace: 'Calibri', color: TEXT_SLATE,
        valign: 'top'
      });
    });

    slide.addNotes('Here is the master roadmap for our presentation. We will walk through five clear sections: first, the enterprise procurement problem; second, the four key personas who benefit; third, our autonomous reconciliation solution with live benchmark data; fourth, our four-tier architecture and governance model; and fifth, deep integration with our sponsor technologies: Zetaris, Meterless Engine, and Meterless Nightshift.');
  }

  // =========================================================================
  // SLIDE 4: SECTION 1 DIVIDER — THE PROBLEM
  // =========================================================================
  {
    const slide = pres.addSlide();
    addSectionDivider(
      slide, 1, 5,
      'The Enterprise Procurement Problem',
      'Why Fortune 500 enterprises lose billions annually to uncaptured procurement spend leakage.',
      [
        { num: '01', title: '$14T B2B Spend Volume', desc: 'Overwhelming annual invoice velocity prevents exhaustive manual auditing across enterprise accounts payable.' },
        { num: '02', title: '4 Fractured Data Silos', desc: 'ERP purchase orders, warehouse dock notes, AP invoices, and legal contracts do not talk to each other.' },
        { num: '03', title: 'Legacy Matching Failure', desc: 'Traditional 2-way and 3-way matching rules leave massive loopholes for uncontracted rate creep and short shipments.' }
      ],
      ACCENT_ROSE
    );
    slide.addNotes('Section One focuses on the Problem. We examine why modern enterprise finance departments fail to catch invoice overpayments. With fourteen trillion dollars in annual business-to-business commerce, the sheer volume overwhelms accounts payable teams. Data lives in disconnected silos, and legacy matching tools leave gaping blind spots.');
  }

  // =========================================================================
  // SLIDE 5: The $14 Trillion Global Procurement Challenge
  // =========================================================================
  {
    const slide = pres.addSlide();
    slide.background = { color: BG_DARK };
    addHeader(slide, 5, '1. Problem', 'The $14 Trillion Global Procurement Challenge', 'Massive transaction velocity overwhelms traditional financial controls.');

    const stats = [
      { val: '$14T', label: 'Global B2B Spend', desc: 'Annual goods and services procured by commercial enterprises worldwide.', color: ACCENT_SKY },
      { val: '4.0%', label: 'Max Spend Leakage', desc: 'Observed variance between contracted rates, dock receipts, and paid invoices.', color: ACCENT_ROSE },
      { val: '100K+', label: 'Invoices / Year', desc: 'Average enterprise transaction volume processed by Accounts Payable teams.', color: ACCENT_AMBER },
      { val: '<5%', label: 'Audit Coverage', desc: 'Typical percentage of invoices audited in depth before disbursement.', color: ACCENT_PURPLE }
    ];

    stats.forEach((s, idx) => {
      const px = 0.8 + idx * 2.98;
      slide.addShape(pres.ShapeType.roundRect, {
        x: px, y: 1.85, w: 2.8, h: 2.45,
        rectRadius: 0.12,
        fill: { color: CARD_BG },
        line: { color: s.color, width: 1.5 }
      });
      slide.addText(s.val, {
        x: px + 0.15, y: 2.05, w: 2.5, h: 0.65,
        fontSize: 32, fontFace: 'Calibri', bold: true, color: s.color,
        align: 'center', valign: 'top'
      });
      slide.addText(s.label, {
        x: px + 0.15, y: 2.75, w: 2.5, h: 0.35,
        fontSize: 12, fontFace: 'Calibri', bold: true, color: TEXT_WHITE,
        align: 'center', valign: 'top'
      });
      slide.addText(s.desc, {
        x: px + 0.15, y: 3.15, w: 2.5, h: 1.0,
        fontSize: 10, fontFace: 'Calibri', color: TEXT_MUTED,
        align: 'center', valign: 'top'
      });
    });

    slide.addShape(pres.ShapeType.roundRect, {
      x: 0.8, y: 4.5, w: 11.73, h: 2.3,
      rectRadius: 0.12,
      fill: { color: CARD_BG_ALT },
      line: { color: BORDER_COLOR, width: 1.2 }
    });
    slide.addText('WHY ENTERPRISES FAIL TO CAPTURE OVERCHARGES TODAY:', {
      x: 1.1, y: 4.65, w: 11.1, h: 0.3,
      fontSize: 11, fontFace: 'Calibri', bold: true, color: ACCENT_AMBER,
      valign: 'top'
    });
    slide.addText('1. Disconnected Software Systems: SAP ERP, Blue Yonder WMS, Coupa AP, and DocuSign contracts do not share a common query model.\n2. Fragile Data Pipelines: Traditional ETL data lakehouse projects take 6-12 months and $500K+ in engineering before returning insights.\n3. Human Bottlenecks: Clerks match PO totals against invoice headers, ignoring line-item rate escalations and warehouse receipt exceptions.\n4. Commercial Erosion: Suppliers quietly test rate increases; when unflagged on the first invoice, higher rates become the de facto baseline.', {
      x: 1.1, y: 5.0, w: 11.1, h: 1.65,
      fontSize: 10.5, fontFace: 'Calibri', color: TEXT_SLATE,
      valign: 'top'
    });

    slide.addNotes('To put this in perspective: Global B2B spend exceeds fourteen trillion dollars. Leading industry research from Gartner and APQC shows that enterprises lose up to four percent of addressable spend to uncaptured discrepancies. For a company spending five hundred million dollars annually, that represents twenty million dollars in pure cash leakage every year.');
  }

  // =========================================================================
  // SLIDE 6: The Anatomy of Spend Leakage: 4 Primary Vectors
  // =========================================================================
  {
    const slide = pres.addSlide();
    slide.background = { color: BG_DARK };
    addHeader(slide, 6, '1. Problem', 'The Anatomy of Spend Leakage: 4 Primary Vectors', 'Quantifying where enterprise cash disappears in procurement cycles.');

    const vectors = [
      {
        num: '1. Quantity Overbilling', share: '45% of Total Leakage', color: ACCENT_ROSE,
        desc: 'Suppliers invoice for ordered quantities rather than delivered quantities. When warehouse dock receiving logs damaged, short, or backordered units, the AP payment loop rarely reflects the decrement.',
        example: 'PO-1001: 120 units invoiced vs 100 units physically received. 20 units paid for nothing = $1,000.00 loss.'
      },
      {
        num: '2. Contract Rate Escalation', share: '30% of Total Leakage', color: ACCENT_AMBER,
        desc: 'Suppliers quietly bill standard catalogue prices instead of negotiated master contract schedules. Over time, price creep accumulates across thousands of line items unnoticed by AP clerks.',
        example: 'PO-1001: Billed $50.00/unit vs $48.00 contract schedule cap. $2.00 rate creep on 100 units = $200.00 loss.'
      },
      {
        num: '3. Phantom & Unapproved Fees', share: '15% of Total Leakage', color: ACCENT_SKY,
        desc: 'Invoices add unapproved handling fees, logistics surcharges, fuel indexing, or expediting tariffs that violate master contract terms prohibiting auxiliary billing without pre-authorization.',
        example: 'Unapproved $150 logistics fee appended to invoice without prior written CPO authorization.'
      },
      {
        num: '4. Duplicate / Stale Invoicing', share: '10% of Total Leakage', color: ACCENT_PURPLE,
        desc: 'Resubmitted invoices for previously cleared purchase orders, altered invoice numbers, or cross-entity double billing that evade simple relational uniqueness constraints.',
        example: 'Supplier resubmits invoice with suffix "-A" after 60 days, triggering double disbursement.'
      }
    ];

    vectors.forEach((v, idx) => {
      const px = 0.8 + idx * 2.98;
      slide.addShape(pres.ShapeType.roundRect, {
        x: px, y: 1.85, w: 2.8, h: 4.95,
        rectRadius: 0.12,
        fill: { color: CARD_BG },
        line: { color: v.color, width: 1.5 }
      });
      slide.addText(v.num, {
        x: px + 0.15, y: 2.05, w: 2.5, h: 0.45,
        fontSize: 12.5, fontFace: 'Calibri', bold: true, color: TEXT_WHITE,
        valign: 'top'
      });
      slide.addShape(pres.ShapeType.roundRect, {
        x: px + 0.15, y: 2.55, w: 2.5, h: 0.35,
        rectRadius: 0.08,
        fill: { color: '0F172A' },
        line: { color: v.color, width: 1 }
      });
      slide.addText(v.share, {
        x: px + 0.15, y: 2.55, w: 2.5, h: 0.35,
        fontSize: 10, fontFace: 'Calibri', bold: true, color: v.color,
        align: 'center', valign: 'middle'
      });
      slide.addText(v.desc, {
        x: px + 0.15, y: 3.05, w: 2.5, h: 1.85,
        fontSize: 10, fontFace: 'Calibri', color: TEXT_SLATE,
        valign: 'top'
      });

      slide.addShape(pres.ShapeType.roundRect, {
        x: px + 0.15, y: 5.0, w: 2.5, h: 1.65,
        rectRadius: 0.08,
        fill: { color: '020617' },
        line: { color: BORDER_COLOR, width: 1 }
      });
      slide.addText('REAL-WORLD EXAMPLE:', {
        x: px + 0.25, y: 5.15, w: 2.3, h: 0.25,
        fontSize: 8.5, fontFace: 'Calibri', bold: true, color: ACCENT_AMBER,
        valign: 'top'
      });
      slide.addText(v.example, {
        x: px + 0.25, y: 5.45, w: 2.3, h: 1.1,
        fontSize: 9.5, fontFace: 'Calibri', color: TEXT_SLATE,
        valign: 'top'
      });
    });

    slide.addNotes('Where exactly does this money leak? Our taxonomy identifies four distinct vectors: Forty-five percent is quantity overbilling, where vendors bill the purchase order quantity rather than the dock receipt quantity. Thirty percent is contract rate escalation, where prices quietly drift above contract caps. Fifteen percent is phantom fees. And ten percent is duplicate billing.');
  }

  // =========================================================================
  // SLIDE 7: The 4 Enterprise Silos: Root Cause of Blind Spots
  // =========================================================================
  {
    const slide = pres.addSlide();
    slide.background = { color: BG_DARK };
    addHeader(slide, 7, '1. Problem', 'The 4 Enterprise Silos: Root Cause of Blind Spots', 'Procurement truth is fragmented across four isolated enterprise architectures.');

    const silos = [
      {
        tag: 'SILO A', name: 'SAP ERP Purchase Orders',
        format: 'Relational SQL / RFC / BAPI',
        role: 'Commercial Intent',
        records: 'PO Number, Line Items, Authorized Quantities, Target Sourcing Vendor',
        friction: 'Establishes initial purchase permission, but possesses zero real-time knowledge of what the warehouse actually unloads at the receiving dock.',
        color: ACCENT_SKY
      },
      {
        tag: 'SILO B', name: 'Warehouse WMS Logistics',
        format: 'Dock Manifests / EDI 856 / CSV',
        role: 'Physical Ground Truth',
        records: 'Delivery Notes, Packing Slips, Damaged Unit Decrements, Serialized Dock Scans',
        friction: 'Maintained by physical logistics teams in isolated warehouse databases. Discrepancies and damaged goods notes rarely propagate back to finance.',
        color: ACCENT_AMBER
      },
      {
        tag: 'SILO C', name: 'Accounts Payable Invoices',
        format: 'PDF OCR / Coupa / EDI 810',
        role: 'Vendor Payment Demand',
        records: 'Invoice ID, Billing Date, Billed Quantities, Unit Prices, Remittance Bank Info',
        friction: 'AP clerks operate under heavy invoice throughput quotas. Matching is performed at header total levels rather than granular line-item unit rates.',
        color: ACCENT_ROSE
      },
      {
        tag: 'SILO D', name: 'Legal Master Contracts',
        format: 'DocuSign / Ironclad / Rate Schedules',
        role: 'Legal Price Ceilings',
        records: 'Master Services Agreement, Tiered Volume Discounts, Fixed Price Schedules, Surcharges',
        friction: 'Trapped in legal repositories or unstructured PDF agreements. Almost never cross-referenced during daily accounts payable invoice disbursement runs.',
        color: ACCENT_PURPLE
      }
    ];

    silos.forEach((s, idx) => {
      const col = idx % 2;
      const row = Math.floor(idx / 2);
      const px = 0.8 + col * 5.95;
      const py = 1.85 + row * 2.45;

      slide.addShape(pres.ShapeType.roundRect, {
        x: px, y: py, w: 5.78, h: 2.35,
        rectRadius: 0.12,
        fill: { color: CARD_BG },
        line: { color: s.color, width: 1.5 }
      });

      slide.addText(s.tag, {
        x: px + 0.2, y: py + 0.15, w: 1.0, h: 0.3,
        fontSize: 10, fontFace: 'Calibri', bold: true, color: s.color,
        valign: 'top'
      });
      slide.addText(s.name, {
        x: px + 1.2, y: py + 0.15, w: 4.3, h: 0.3,
        fontSize: 13, fontFace: 'Calibri', bold: true, color: TEXT_WHITE,
        valign: 'top'
      });

      slide.addText(`Role: ${s.role} | Format: ${s.format}`, {
        x: px + 0.2, y: py + 0.45, w: 5.3, h: 0.25,
        fontSize: 9.5, fontFace: 'Calibri', bold: true, color: s.color,
        valign: 'top'
      });
      slide.addText(`Key Data: ${s.records}`, {
        x: px + 0.2, y: py + 0.75, w: 5.3, h: 0.45,
        fontSize: 9.5, fontFace: 'Calibri', color: TEXT_SLATE,
        valign: 'top'
      });
      slide.addText(`Systemic Friction: ${s.friction}`, {
        x: px + 0.2, y: py + 1.25, w: 5.3, h: 0.95,
        fontSize: 9.5, fontFace: 'Calibri', color: TEXT_MUTED,
        valign: 'top'
      });
    });

    slide.addNotes('Why does spend leak so reliably? Because enterprise data is trapped in four distinct architectural silos. Silo A: SAP ERP holds purchase orders. Silo B: Warehouse WMS holds receiving logs. Silo C: Accounts Payable holds incoming vendor invoices. Silo D: Legal holds master contract rate schedules. None of these four systems communicate in real time.');
  }

  // =========================================================================
  // SLIDE 8: Why Traditional 2-Way and 3-Way Matching Fails
  // =========================================================================
  {
    const slide = pres.addSlide();
    slide.background = { color: BG_DARK };
    addHeader(slide, 8, '1. Problem', 'Why Traditional 2-Way and 3-Way Matching Fails', 'Traditional automated matching rules leave glaring loopholes.');

    const comparisons = [
      {
        title: 'Legacy 2-Way Matching (PO vs Invoice)',
        status: 'CRITICAL FLAWS', statusColor: ACCENT_ROSE,
        points: [
          'Only checks if Invoice total matches the original Purchase Order total.',
          'Completely ignores physical warehouse delivery receipts (DN-045).',
          'Pays 100% of the invoice even if 50% of goods were damaged or unreceived.',
          'Result: $1,000.00 quantity overbilling on PO-1001 passes completely undetected.'
        ]
      },
      {
        title: 'Legacy 3-Way Matching (PO vs Receipt vs Invoice)',
        status: 'SUBTLE FAILURES', statusColor: ACCENT_AMBER,
        points: [
          'Checks header totals across PO, Receipt, and Invoice, but ignores line-item rate caps.',
          'Fails to cross-reference legal contract schedules ($48/unit cap).',
          'If supplier bills for 100 received units at $50 instead of contracted $48, 3-way match clears it.',
          'Result: $200.00 contract price escalation on PO-1001 passes undetected.'
        ]
      },
      {
        title: 'TraceBack AI 4-Way Cross-Source Audit',
        status: 'ZERO LEAKAGE DEFENSE', statusColor: ACCENT_EMERALD,
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
        x: 0.8, y: cy, w: 11.73, h: 1.52,
        rectRadius: 0.1,
        fill: { color: CARD_BG },
        line: { color: c.statusColor, width: 1.5 }
      });

      slide.addText(c.title, {
        x: 1.1, y: cy + 0.15, w: 7.5, h: 0.35,
        fontSize: 13.5, fontFace: 'Calibri', bold: true, color: TEXT_WHITE,
        valign: 'top'
      });

      slide.addShape(pres.ShapeType.roundRect, {
        x: 9.3, y: cy + 0.15, w: 2.9, h: 0.32,
        rectRadius: 0.08,
        fill: { color: '0F172A' },
        line: { color: c.statusColor, width: 1 }
      });
      slide.addText(c.status, {
        x: 9.3, y: cy + 0.15, w: 2.9, h: 0.32,
        fontSize: 9.5, fontFace: 'Calibri', bold: true, color: c.statusColor,
        align: 'center', valign: 'middle'
      });

      const bulletText = c.points.map(p => `• ${p}`).join('\n');
      slide.addText(bulletText, {
        x: 1.1, y: cy + 0.52, w: 11.1, h: 0.9,
        fontSize: 10, fontFace: 'Calibri', color: TEXT_SLATE,
        valign: 'top'
      });
    });

    slide.addNotes('Standard ERP matching is fundamentally broken. Two-way matching checks only the PO and invoice, paying for phantom goods that never arrived. Three-way matching adds the dock receipt, but completely ignores contract price schedules! If the vendor bills fifty dollars instead of the contracted forty-eight, standard three-way matching approves the invoice. Only TraceBack AI executes true four-way cross-source reconciliation.');
  }

  // =========================================================================
  // SLIDE 9: SECTION 2 DIVIDER — TARGET USERS & STAKEHOLDERS
  // =========================================================================
  {
    const slide = pres.addSlide();
    addSectionDivider(
      slide, 2, 5,
      'Enterprise User Personas & Stakeholders',
      'Aligning incentives across procurement, internal audit, accounts payable, and supply chain operations.',
      [
        { num: '01', title: 'Strategic Procurement', desc: 'Chief Procurement Officers defending negotiated supplier discounts and enforcing contractual pricing adherence.' },
        { num: '02', title: 'Financial Governance', desc: 'Lead Auditors and Controllers requiring 100% census SOX compliance with zero LLM hallucination risk.' },
        { num: '03', title: 'Operational AP & Ops', desc: 'Accounts Payable specialists and Warehouse Dock Managers eliminating manual matching backlogs.' }
      ],
      ACCENT_SKY
    );
    slide.addNotes('Section Two covers our Users and Stakeholders. TraceBack AI serves four key personas across the enterprise: the Chief Procurement Officer who negotiates contracts, the Lead Financial Auditor who guarantees governance, the Accounts Payable Controller who disburses cash, and the Warehouse Dock Manager who physically receives goods.');
  }

  // =========================================================================
  // SLIDE 10: Executive Stakeholder Alignment Matrix
  // =========================================================================
  {
    const slide = pres.addSlide();
    slide.background = { color: BG_DARK };
    addHeader(slide, 10, '2. Users', 'Executive Stakeholder Value Alignment', 'How TraceBack AI aligns incentives across procurement, finance, and logistics.');

    const matrix = [
      {
        role: 'Chief Procurement Officer', focus: 'Contract Spend Compliance',
        metric: '3.2% Spend Reduction', benefit: 'Automated contract ceiling enforcement & supplier compliance scorecards.',
        color: ACCENT_SKY
      },
      {
        role: 'Lead Financial Auditor', focus: 'SOX Controls & Defensibility',
        metric: '100% Audit Coverage', benefit: 'Deterministic cell-level proof eliminating sample-based audit risk.',
        color: ACCENT_EMERALD
      },
      {
        role: 'Accounts Payable Controller', focus: 'Operational Throughput',
        metric: '80% Manual Effort Cut', benefit: 'Pre-payment automated dispute packets; elimination of invoice backlogs.',
        color: ACCENT_AMBER
      },
      {
        role: 'Supply Chain Operations VP', focus: 'Receiving Dock Integrity',
        metric: 'Zero Dock Leakage', benefit: 'Instant dock receipt synchronization ensuring only accepted goods are billed.',
        color: ACCENT_PURPLE
      }
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
        fontSize: 13, fontFace: 'Calibri', bold: true, color: TEXT_WHITE,
        valign: 'top'
      });
      slide.addText(m.focus, {
        x: 1.1, y: my + 0.5, w: 3.2, h: 0.3,
        fontSize: 10, fontFace: 'Calibri', color: m.color,
        valign: 'top'
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
        fontSize: 10.5, fontFace: 'Calibri', color: TEXT_SLATE,
        valign: 'top'
      });
    });

    slide.addNotes('TraceBack AI serves the complete enterprise financial hierarchy. The CPO gains contract compliance. The Financial Auditor gains a bulletproof audit trail. The AP Controller eliminates manual verification backlogs. And the Supply Chain VP ensures that warehouse receiving dock records govern financial disbursements.');
  }

  // =========================================================================
  // SLIDE 11: Persona 1 — Chief Procurement Officer (CPO)
  // =========================================================================
  {
    const slide = pres.addSlide();
    slide.background = { color: BG_DARK };
    addHeader(slide, 11, '2. Users', 'Persona 1: Chief Procurement Officer (CPO)', 'Strategic sourcing, supplier rate enforcement, and commercial discipline.');

    slide.addShape(pres.ShapeType.roundRect, {
      x: 0.8, y: 1.85, w: 5.7, h: 4.95,
      rectRadius: 0.15,
      fill: { color: CARD_BG },
      line: { color: ACCENT_SKY, width: 2 }
    });
    slide.addText('CPO STRATEGIC OBJECTIVES', {
      x: 1.1, y: 2.1, w: 5.1, h: 0.3,
      fontSize: 11, fontFace: 'Calibri', bold: true, color: ACCENT_SKY,
      valign: 'top'
    });
    slide.addText('Defending Negotiated Contract Terms', {
      x: 1.1, y: 2.45, w: 5.1, h: 0.45,
      fontSize: 16, fontFace: 'Calibri', bold: true, color: TEXT_WHITE,
      valign: 'top'
    });
    slide.addText('• Sourcing teams spend months negotiating 5% to 8% contract discounts, only to have suppliers quietly bill uncontracted list prices.\n• Lack of real-time visibility prevents procurement from holding suppliers accountable during quarterly business reviews (QBRs).\n• Supplier performance scorecards are based on subjective surveys rather than factual dispute histories.', {
      x: 1.1, y: 3.0, w: 5.1, h: 3.5,
      fontSize: 11, fontFace: 'Calibri', color: TEXT_SLATE,
      valign: 'top'
    });

    slide.addShape(pres.ShapeType.roundRect, {
      x: 6.8, y: 1.85, w: 5.7, h: 4.95,
      rectRadius: 0.15,
      fill: { color: CARD_BG_ALT },
      line: { color: ACCENT_SKY, width: 2 }
    });
    slide.addText('TRACEBACK AI DELIVERABLES FOR CPOs', {
      x: 7.1, y: 2.1, w: 5.1, h: 0.3,
      fontSize: 11, fontFace: 'Calibri', bold: true, color: ACCENT_SKY,
      valign: 'top'
    });
    slide.addText('Automated Contract Enforcement', {
      x: 7.1, y: 2.45, w: 5.1, h: 0.45,
      fontSize: 16, fontFace: 'Calibri', bold: true, color: TEXT_WHITE,
      valign: 'top'
    });
    slide.addText('• 100% Rate Schedule Adherence: Flags every line item exceeding master contract price caps in real time.\n• Empirical Supplier Scorecards: Tracks dispute frequency, quantity variance rates, and pricing compliance by vendor.\n• Sourcing Leverage: Provides hard data during contract renewals, transforming anecdotal complaints into verifiable leverage.\n• Projected Impact: Recovers 1.5% to 3.2% of total addressable procurement spend directly to company operating margins.', {
      x: 7.1, y: 3.0, w: 5.1, h: 3.5,
      fontSize: 11, fontFace: 'Calibri', color: TEXT_LIGHT,
      valign: 'top'
    });

    slide.addNotes('For the Chief Procurement Officer, TraceBack AI ensures that every negotiated dollar actually reaches the bottom line. It stops supplier price creep and provides factual vendor scorecards based on real reconciliation history.');
  }

  // =========================================================================
  // SLIDE 12: Persona 2 — Lead Financial Auditor & Controller
  // =========================================================================
  {
    const slide = pres.addSlide();
    slide.background = { color: BG_DARK };
    addHeader(slide, 12, '2. Users', 'Persona 2: Lead Financial Auditor & Controller', 'Sarbanes-Oxley compliance, internal controls, and audit defensibility.');

    slide.addShape(pres.ShapeType.roundRect, {
      x: 0.8, y: 1.85, w: 5.7, h: 4.95,
      rectRadius: 0.15,
      fill: { color: CARD_BG },
      line: { color: ACCENT_EMERALD, width: 2 }
    });
    slide.addText('AUDIT & CONTROL CHALLENGES', {
      x: 1.1, y: 2.1, w: 5.1, h: 0.3,
      fontSize: 11, fontFace: 'Calibri', bold: true, color: ACCENT_EMERALD,
      valign: 'top'
    });
    slide.addText('The High Risk of Sample-Based Auditing', {
      x: 1.1, y: 2.45, w: 5.1, h: 0.45,
      fontSize: 16, fontFace: 'Calibri', bold: true, color: TEXT_WHITE,
      valign: 'top'
    });
    slide.addText('• SOX 404 Compliance Burden: Internal audit teams must verify internal controls over financial reporting without full visibility.\n• Hallucination & Risk in Generic AI: LLMs that guess or hallucinate financial numbers cannot be used in formal accounting work.\n• Lack of Provenance: When auditors challenge a vendor, they need the exact document coordinates, row numbers, and contract clause numbers.', {
      x: 1.1, y: 3.0, w: 5.1, h: 3.5,
      fontSize: 11, fontFace: 'Calibri', color: TEXT_SLATE,
      valign: 'top'
    });

    slide.addShape(pres.ShapeType.roundRect, {
      x: 6.8, y: 1.85, w: 5.7, h: 4.95,
      rectRadius: 0.15,
      fill: { color: CARD_BG_ALT },
      line: { color: ACCENT_EMERALD, width: 2 }
    });
    slide.addText('TRACEBACK AI DELIVERABLES FOR AUDITORS', {
      x: 7.1, y: 2.1, w: 5.1, h: 0.3,
      fontSize: 11, fontFace: 'Calibri', bold: true, color: ACCENT_EMERALD,
      valign: 'top'
    });
    slide.addText('Deterministic Proof & Zero Hallucination', {
      x: 7.1, y: 2.45, w: 5.1, h: 0.45,
      fontSize: 16, fontFace: 'Calibri', bold: true, color: TEXT_WHITE,
      valign: 'top'
    });
    slide.addText('• Immutable Cell Coordinates: Every financial claim cites {file, row, column, value} with absolute precision.\n• Deterministic Corroboration: Variances are calculated via exact mathematics, not statistical approximations.\n• Audit Defensibility Certificate: Generates cryptographic, timestamped audit certificates verifying reconciliation integrity.\n• Complete Census Audit: Eliminates sampling risk by validating 100% of purchase orders in sub-second cycles.', {
      x: 7.1, y: 3.0, w: 5.1, h: 3.5,
      fontSize: 11, fontFace: 'Calibri', color: TEXT_LIGHT,
      valign: 'top'
    });

    slide.addNotes('For Financial Auditors and Controllers, TraceBack AI provides the gold standard of audit defensibility: zero hallucination. Every claim cites the exact file, row, and column. It replaces random sampling with a 100% census audit.');
  }

  // =========================================================================
  // SLIDE 13: Personas 3 & 4 — AP Operations & Supply Chain Leads
  // =========================================================================
  {
    const slide = pres.addSlide();
    slide.background = { color: BG_DARK };
    addHeader(slide, 13, '2. Users', 'Personas 3 & 4: AP Operations & Supply Chain Leads', 'Operational velocity, invoice clearing throughput, and receiving dock integrity.');

    slide.addShape(pres.ShapeType.roundRect, {
      x: 0.8, y: 1.85, w: 5.7, h: 4.95,
      rectRadius: 0.15,
      fill: { color: CARD_BG },
      line: { color: ACCENT_AMBER, width: 2 }
    });
    slide.addText('PERSONA 3: AP CONTROLLER & CLERKS', {
      x: 1.1, y: 2.1, w: 5.1, h: 0.3,
      fontSize: 11, fontFace: 'Calibri', bold: true, color: ACCENT_AMBER,
      valign: 'top'
    });
    slide.addText('High-Volume Invoice Processing', {
      x: 1.1, y: 2.45, w: 5.1, h: 0.45,
      fontSize: 16, fontFace: 'Calibri', bold: true, color: TEXT_WHITE,
      valign: 'top'
    });
    slide.addText('• Processing Pressure: AP teams process tens of thousands of invoices under strict 30-day payment terms.\n• Manual Exception Handling: Investigating a single discrepancy takes 45 to 90 minutes across emails and spreadsheets.\n• Automated Dispute Synthesis: TraceBack AI drafts ready-to-send dispute emails citing line items, dock notes, and contract rates.\n• Operational Impact: Reduces manual matching overhead by 80%, allowing staff to focus on strategic exceptions.', {
      x: 1.1, y: 3.0, w: 5.1, h: 3.5,
      fontSize: 11, fontFace: 'Calibri', color: TEXT_SLATE,
      valign: 'top'
    });

    slide.addShape(pres.ShapeType.roundRect, {
      x: 6.8, y: 1.85, w: 5.7, h: 4.95,
      rectRadius: 0.15,
      fill: { color: CARD_BG_ALT },
      line: { color: ACCENT_PURPLE, width: 2 }
    });
    slide.addText('PERSONA 4: SUPPLY CHAIN & LOGISTICS LEAD', {
      x: 7.1, y: 2.1, w: 5.1, h: 0.3,
      fontSize: 11, fontFace: 'Calibri', bold: true, color: ACCENT_PURPLE,
      valign: 'top'
    });
    slide.addText('Receiving Dock Ground Truth', {
      x: 7.1, y: 2.45, w: 5.1, h: 0.45,
      fontSize: 16, fontFace: 'Calibri', bold: true, color: TEXT_WHITE,
      valign: 'top'
    });
    slide.addText('• Dock Exception Reality: Shipments arrive damaged, short, or with delayed backorders logged in local WMS receipts.\n• Frustration: Warehouse managers report discrepancies, but finance pays the vendor in full regardless.\n• Closing the Loop: TraceBack AI enforces that dock receipt quantities (e.g. DN-045) strictly govern payment authorization.\n• Vendor Accountability: Suppliers cannot exploit delivery discrepancies when dock receiving logs are linked directly to invoice clearing.', {
      x: 7.1, y: 3.0, w: 5.1, h: 3.5,
      fontSize: 11, fontFace: 'Calibri', color: TEXT_LIGHT,
      valign: 'top'
    });

    slide.addNotes('For Accounts Payable, TraceBack AI eliminates the manual grind of tracking down delivery tickets. For Warehouse managers, it ensures that when they log damaged or short goods on the receiving dock, finance actually protects company cash.');
  }

  // =========================================================================
  // SLIDE 14: SECTION 3 DIVIDER — THE SOLUTION
  // =========================================================================
  {
    const slide = pres.addSlide();
    addSectionDivider(
      slide, 3, 5,
      'The Solution: Autonomous 4-Way Reconciliation',
      'Zero-ETL virtualization, multi-agent reasoning, and mathematical spend recovery in sub-second cycles.',
      [
        { num: '01', title: '4-Way Virtualization', desc: 'Federated cross-source queries across SAP ERP, WMS dock notes, AP invoices, and legal contracts in 12ms.' },
        { num: '02', title: 'Deterministic AI Proof', desc: 'Exact mathematical variance calculations with calibrated 96.5% confidence and cell-level evidence citations.' },
        { num: '03', title: '1-Click Dispute Recovery', desc: 'Human-in-the-loop audit approvals with automated professional supplier dispute notices and credit memo requests.' }
      ],
      ACCENT_EMERALD
    );
    slide.addNotes('Section Three presents the Solution. TraceBack AI introduces an autonomous reconciliation agent powered by Zero-ETL data virtualization and local AI reasoning. Let us walk through the architecture and a live audit case study.');
  }

  // =========================================================================
  // SLIDE 15: TraceBack AI: Solution Overview & Capabilities
  // =========================================================================
  {
    const slide = pres.addSlide();
    slide.background = { color: BG_DARK };
    addHeader(slide, 15, '3. Solution', 'TraceBack AI: Solution Overview & Core Capabilities', 'Autonomous cross-source spend defense with zero data movement.');

    const pillars = [
      {
        num: '01', title: 'Zero-ETL Virtualization',
        body: 'Powered by Zetaris. Queries SAP ERP, warehouse receipts, AP invoices, and contracts where they live in 12ms without pipelines or data movement.',
        color: ACCENT_SKY
      },
      {
        num: '02', title: 'Deterministic 4-Way Matching',
        body: 'Simultaneously cross-references ordered quantities, received dock units, billed amounts, and contracted price schedules with exact math.',
        color: ACCENT_EMERALD
      },
      {
        num: '03', title: 'Cell-Level Evidence Index',
        body: 'Every detected overcharge cites exact immutable coordinates: {file, row, column, value}, guaranteeing 100% audit defensibility.',
        color: ACCENT_AMBER
      },
      {
        num: '04', title: 'Human Governance & Dispute Notice',
        body: 'Auditors retain 1-click claim endorsement, generating formal supplier dispute letters and cryptographic audit certificates.',
        color: ACCENT_PURPLE
      }
    ];

    pillars.forEach((p, idx) => {
      const col = idx % 2;
      const row = Math.floor(idx / 2);
      const px = 0.8 + col * 5.95;
      const py = 1.85 + row * 2.45;

      slide.addShape(pres.ShapeType.roundRect, {
        x: px, y: py, w: 5.78, h: 2.35,
        rectRadius: 0.12,
        fill: { color: CARD_BG },
        line: { color: p.color, width: 1.5 }
      });

      slide.addText(p.num, {
        x: px + 0.2, y: py + 0.15, w: 0.8, h: 0.35,
        fontSize: 16, fontFace: 'Calibri', bold: true, color: p.color,
        valign: 'top'
      });
      slide.addText(p.title, {
        x: px + 1.0, y: py + 0.15, w: 4.5, h: 0.35,
        fontSize: 14, fontFace: 'Calibri', bold: true, color: TEXT_WHITE,
        valign: 'top'
      });
      slide.addText(p.body, {
        x: px + 0.2, y: py + 0.55, w: 5.3, h: 1.65,
        fontSize: 11, fontFace: 'Calibri', color: TEXT_SLATE,
        valign: 'top'
      });
    });

    slide.addNotes('Here is the core capability stack of TraceBack AI. It unifies four critical innovations: Zero-ETL data virtualization via Zetaris, deterministic four-way matching algorithms, cell-level evidence indexing, and human-in-the-loop dispute synthesis.');
  }

  // =========================================================================
  // SLIDE 16: Live Audit Case Study: PO-1001 Overview
  // =========================================================================
  {
    const slide = pres.addSlide();
    slide.background = { color: BG_DARK };
    addHeader(slide, 16, '3. Solution', 'Case Study: PO-1001 Audit Overview', 'Supplier SUP-42 billed $6,000.00; TraceBack AI uncovers $1,200.00 in overcharges in 184ms.');

    slide.addShape(pres.ShapeType.roundRect, {
      x: 0.8, y: 1.85, w: 4.5, h: 4.95,
      rectRadius: 0.12,
      fill: { color: CARD_BG },
      line: { color: ACCENT_ROSE, width: 2 }
    });
    slide.addText('BENCHMARK ORDER DETAILS', {
      x: 1.1, y: 2.1, w: 3.9, h: 0.3,
      fontSize: 10, fontFace: 'Calibri', bold: true, color: ACCENT_ROSE,
      valign: 'top'
    });
    slide.addText('PO-1001 Investigation', {
      x: 1.1, y: 2.45, w: 3.9, h: 0.45,
      fontSize: 16, fontFace: 'Calibri', bold: true, color: TEXT_WHITE,
      valign: 'top'
    });
    slide.addText('• Purchase Order ID: PO-1001\n• Supplier: Apex Industrial (SUP-42)\n• Total Invoiced Amount: $6,000.00 USD\n• Total Physical Received Value: $4,800.00 USD\n• Total Recoverable Overcharge: $1,200.00 USD\n• Total Audit Latency: 184 milliseconds\n• Overall Audit Confidence: 96.5%\n• Audit Recommendation: DISPUTE & WITHHOLD', {
      x: 1.1, y: 3.0, w: 3.9, h: 3.5,
      fontSize: 11, fontFace: 'Calibri', color: TEXT_SLATE,
      valign: 'top'
    });

    slide.addShape(pres.ShapeType.roundRect, {
      x: 5.6, y: 1.85, w: 6.93, h: 4.95,
      rectRadius: 0.12,
      fill: { color: CARD_BG_ALT },
      line: { color: BORDER_COLOR, width: 1.5 }
    });
    slide.addText('4-WAY SOURCE RECONCILIATION SUMMARY:', {
      x: 5.9, y: 2.1, w: 6.3, h: 0.3,
      fontSize: 10, fontFace: 'Calibri', bold: true, color: ACCENT_SKY,
      valign: 'top'
    });

    const sources = [
      { name: 'SAP ERP (purchase_orders.csv)', desc: '120 units ordered @ $50.00/unit', val: '$6,000.00', color: ACCENT_SKY },
      { name: 'WMS Warehouse (deliveries.csv)', desc: '100 units physically received (DN-045)', val: '$5,000.00', color: ACCENT_AMBER },
      { name: 'AP Invoices (invoices.csv)', desc: '120 units billed on INV-9001', val: '$6,000.00', color: ACCENT_ROSE },
      { name: 'Legal Contracts (contract_prices.csv)', desc: 'Master Agreement schedule cap @ $48.00/unit', val: '$4,800.00', color: ACCENT_PURPLE }
    ];

    sources.forEach((src, idx) => {
      const sy = 2.45 + idx * 0.92;
      slide.addShape(pres.ShapeType.roundRect, {
        x: 5.9, y: sy, w: 6.33, h: 0.8,
        rectRadius: 0.08,
        fill: { color: CARD_BG },
        line: { color: src.color, width: 1.2 }
      });
      slide.addText(src.name, {
        x: 6.1, y: sy + 0.12, w: 4.2, h: 0.25,
        fontSize: 10.5, fontFace: 'Calibri', bold: true, color: src.color,
        valign: 'top'
      });
      slide.addText(src.desc, {
        x: 6.1, y: sy + 0.4, w: 4.2, h: 0.3,
        fontSize: 9.5, fontFace: 'Calibri', color: TEXT_SLATE,
        valign: 'top'
      });
      slide.addText(src.val, {
        x: 10.3, y: sy + 0.22, w: 1.7, h: 0.35,
        fontSize: 12, fontFace: 'Calibri', bold: true, color: TEXT_WHITE,
        align: 'right', valign: 'top'
      });
    });

    slide.addShape(pres.ShapeType.roundRect, {
      x: 5.9, y: 6.15, w: 6.33, h: 0.52,
      rectRadius: 0.08,
      fill: { color: '064E3B' },
      line: { color: ACCENT_EMERALD, width: 1.5 }
    });
    slide.addText('RECONCILIATION RESULT: $1,200.00 DISCREPANCY DETECTED', {
      x: 6.1, y: 6.22, w: 5.9, h: 0.2,
      fontSize: 10, fontFace: 'Calibri', bold: true, color: '6EE7B7',
      valign: 'top'
    });
    slide.addText('Discrepancy 1 ($1,000 qty overcharge) + Discrepancy 2 ($200 price escalation)', {
      x: 6.1, y: 6.42, w: 5.9, h: 0.2,
      fontSize: 8.5, fontFace: 'Calibri', color: TEXT_SLATE,
      valign: 'top'
    });

    slide.addNotes('Let us examine benchmark Purchase Order PO-1001. The supplier invoiced six thousand dollars. But when TraceBack AI executes four-way cross-source reconciliation in one hundred eighty-four milliseconds, it exposes two distinct overcharges totaling twelve hundred dollars.');
  }

  // =========================================================================
  // SLIDE 17: PO-1001 Discrepancies: Quantity Overbilling & Rate Creep
  // =========================================================================
  {
    const slide = pres.addSlide();
    slide.background = { color: BG_DARK };
    addHeader(slide, 17, '3. Solution', 'PO-1001 Discrepancy Deep-Dive: 2 Distinct Vectors', 'Cell-level mathematical proof for quantity overbilling and contract rate escalation.');

    // Left Column: Discrepancy 1
    slide.addShape(pres.ShapeType.roundRect, {
      x: 0.8, y: 1.85, w: 5.7, h: 4.95,
      rectRadius: 0.12,
      fill: { color: CARD_BG },
      line: { color: ACCENT_ROSE, width: 2 }
    });
    slide.addText('DISCREPANCY 1: QUANTITY OVERBILLING', {
      x: 1.1, y: 2.1, w: 5.1, h: 0.3,
      fontSize: 10.5, fontFace: 'Calibri', bold: true, color: ACCENT_ROSE,
      valign: 'top'
    });
    slide.addText('+$1,000.00 Overcharge', {
      x: 1.1, y: 2.45, w: 5.1, h: 0.45,
      fontSize: 18, fontFace: 'Calibri', bold: true, color: TEXT_WHITE,
      valign: 'top'
    });
    slide.addText('Invoiced 120 units vs Delivered 100 units (20 units × $50.00)', {
      x: 1.1, y: 2.95, w: 5.1, h: 0.35,
      fontSize: 10.5, fontFace: 'Calibri', color: ACCENT_ROSE,
      valign: 'top'
    });

    const disc1Cards = [
      { label: 'Invoiced Quantity (INV-9001)', val: '120 units' },
      { label: 'Warehouse Delivered (DN-045)', val: '100 units' },
      { label: 'Unreceived Billed Units', val: '20 units' },
      { label: 'Variance Math', val: '20 × $50.00 = $1,000.00' }
    ];
    disc1Cards.forEach((c, idx) => {
      const cy = 3.4 + idx * 0.65;
      slide.addShape(pres.ShapeType.roundRect, {
        x: 1.1, y: cy, w: 5.1, h: 0.55,
        rectRadius: 0.08,
        fill: { color: CARD_BG_ALT },
        line: { color: BORDER_COLOR, width: 1 }
      });
      slide.addText(c.label, {
        x: 1.3, y: cy + 0.15, w: 3.2, h: 0.25,
        fontSize: 9.5, fontFace: 'Calibri', color: TEXT_MUTED,
        valign: 'top'
      });
      slide.addText(c.val, {
        x: 4.2, y: cy + 0.15, w: 1.8, h: 0.25,
        fontSize: 10, fontFace: 'Calibri', bold: true, color: TEXT_WHITE,
        align: 'right', valign: 'top'
      });
    });
    slide.addText('Evidence Citations: invoices.csv:Row 2:Col 3 | deliveries.csv:Row 2:Col 3', {
      x: 1.1, y: 6.2, w: 5.1, h: 0.4,
      fontSize: 9, fontFace: 'Calibri', bold: true, color: ACCENT_SKY,
      valign: 'top'
    });

    // Right Column: Discrepancy 2
    slide.addShape(pres.ShapeType.roundRect, {
      x: 6.8, y: 1.85, w: 5.7, h: 4.95,
      rectRadius: 0.12,
      fill: { color: CARD_BG_ALT },
      line: { color: ACCENT_AMBER, width: 2 }
    });
    slide.addText('DISCREPANCY 2: CONTRACT RATE ESCALATION', {
      x: 7.1, y: 2.1, w: 5.1, h: 0.3,
      fontSize: 10.5, fontFace: 'Calibri', bold: true, color: ACCENT_AMBER,
      valign: 'top'
    });
    slide.addText('+$200.00 Overcharge', {
      x: 7.1, y: 2.45, w: 5.1, h: 0.45,
      fontSize: 18, fontFace: 'Calibri', bold: true, color: TEXT_WHITE,
      valign: 'top'
    });
    slide.addText('Billed $50.00/unit vs Contract $48.00/unit ($2.00 rate creep on 100 units)', {
      x: 7.1, y: 2.95, w: 5.1, h: 0.35,
      fontSize: 10.5, fontFace: 'Calibri', color: ACCENT_AMBER,
      valign: 'top'
    });

    const disc2Cards = [
      { label: 'Billed Unit Price (INV-9001)', val: '$50.00 / unit' },
      { label: 'Contract Rate Cap (Schedule A)', val: '$48.00 / unit' },
      { label: 'Rate Creep per Unit', val: '+$2.00 / unit' },
      { label: 'Variance Math', val: '100 units × $2.00 = $200.00' }
    ];
    disc2Cards.forEach((c, idx) => {
      const cy = 3.4 + idx * 0.65;
      slide.addShape(pres.ShapeType.roundRect, {
        x: 7.1, y: cy, w: 5.1, h: 0.55,
        rectRadius: 0.08,
        fill: { color: CARD_BG },
        line: { color: BORDER_COLOR, width: 1 }
      });
      slide.addText(c.label, {
        x: 7.3, y: cy + 0.15, w: 3.2, h: 0.25,
        fontSize: 9.5, fontFace: 'Calibri', color: TEXT_MUTED,
        valign: 'top'
      });
      slide.addText(c.val, {
        x: 10.2, y: cy + 0.15, w: 1.8, h: 0.25,
        fontSize: 10, fontFace: 'Calibri', bold: true, color: TEXT_WHITE,
        align: 'right', valign: 'top'
      });
    });
    slide.addText('Evidence Citations: invoices.csv:Row 2:Col 4 | contract_prices.csv:Row 2:Col 3', {
      x: 7.1, y: 6.2, w: 5.1, h: 0.4,
      fontSize: 9, fontFace: 'Calibri', bold: true, color: ACCENT_SKY,
      valign: 'top'
    });

    slide.addNotes('Here is the exact mathematical breakdown of PO-1001. Discrepancy One is quantity overbilling: the vendor billed for twenty units that warehouse note DN-045 confirms were never received. Discrepancy Two is contract rate creep: the vendor charged fifty dollars instead of the contracted forty-eight dollar ceiling.');
  }

  // =========================================================================
  // SLIDE 18: Credibility Benchmark: PO-1002 (Zero False Positives)
  // =========================================================================
  {
    const slide = pres.addSlide();
    slide.background = { color: BG_DARK };
    addHeader(slide, 18, '3. Solution', 'Zero False Positive Benchmark: Clean Order PO-1002', 'Proving system credibility: clean orders produce zero false alarms and 100% concordance.');

    slide.addShape(pres.ShapeType.roundRect, {
      x: 0.8, y: 1.85, w: 5.7, h: 4.95,
      rectRadius: 0.15,
      fill: { color: CARD_BG },
      line: { color: ACCENT_INDIGO, width: 2 }
    });
    slide.addText('BENCHMARK ORDER PO-1002', {
      x: 1.1, y: 2.1, w: 5.1, h: 0.3,
      fontSize: 11, fontFace: 'Calibri', bold: true, color: ACCENT_INDIGO,
      valign: 'top'
    });
    slide.addText('Clean Transaction Validation', {
      x: 1.1, y: 2.45, w: 5.1, h: 0.45,
      fontSize: 16, fontFace: 'Calibri', bold: true, color: TEXT_WHITE,
      valign: 'top'
    });
    slide.addText('• Order ID: PO-1002 | Supplier: Beacon Industrial (SUP-18)\n• Ordered: 50 units @ $20.00/unit ($1,000.00 authorized)\n• Received: 50 units verified at dock (DN-048)\n• Invoiced: 50 units @ $20.00/unit (INV-9002)\n• Contract Schedule: $20.00/unit agreed contract cap\n• Audit Latency: 162 milliseconds across 4 virtual tables\n• System Assessment: CLEAN TRANSACTION — DISBURSEMENT APPROVED', {
      x: 1.1, y: 3.0, w: 5.1, h: 3.5,
      fontSize: 11, fontFace: 'Calibri', color: TEXT_SLATE,
      valign: 'top'
    });

    slide.addShape(pres.ShapeType.roundRect, {
      x: 6.8, y: 1.85, w: 5.7, h: 4.95,
      rectRadius: 0.15,
      fill: { color: CARD_BG_ALT },
      line: { color: ACCENT_EMERALD, width: 2 }
    });
    slide.addText('CREDIBILITY & FALSE-POSITIVE DEFENSE', {
      x: 7.1, y: 2.1, w: 5.1, h: 0.3,
      fontSize: 11, fontFace: 'Calibri', bold: true, color: ACCENT_EMERALD,
      valign: 'top'
    });
    slide.addText('Zero False Alarms (100% Concordance)', {
      x: 7.1, y: 2.45, w: 5.1, h: 0.45,
      fontSize: 16, fontFace: 'Calibri', bold: true, color: TEXT_WHITE,
      valign: 'top'
    });
    slide.addText('• Zero Hallucinated Claims: The system does not invent overcharges where none exist.\n• 100% Quantity Concordance: Ordered (50) == Delivered (50) == Billed (50).\n• 100% Rate Compliance: Billed rate ($20.00) matches contract cap ($20.00).\n• Frictionless Clearance: Clean invoices pass straight through to automated AP payment clearance with zero auditor intervention required.\n• Critical Proof: An enterprise spend agent is only as good as its precision; zero false alarms build trusted operational adoption.', {
      x: 7.1, y: 3.0, w: 5.1, h: 3.5,
      fontSize: 11, fontFace: 'Calibri', color: TEXT_LIGHT,
      valign: 'top'
    });

    slide.addNotes('Credibility is everything in financial systems. If an AI agent flags false alarms, auditors will turn it off. On benchmark order PO-1002, where the order, delivery, invoice, and contract all match perfectly, TraceBack AI returns exactly zero overcharge with one hundred percent concordance.');
  }

  // =========================================================================
  // SLIDE 19: SECTION 4 DIVIDER — SYSTEM ARCHITECTURE & GOVERNANCE
  // =========================================================================
  {
    const slide = pres.addSlide();
    addSectionDivider(
      slide, 4, 5,
      'System Architecture & Audit Governance',
      'High-performance 4-tier pipeline combining data virtualization, agent orchestration, and immutable provenance.',
      [
        { num: '01', title: 'Virtualization Tier', desc: 'Zetaris federated SQL engine querying across SAP ERP, WMS, and contracts in place with zero data movement.' },
        { num: '02', title: 'Agent Orchestration', desc: 'Meterless mission architecture orchestrating Scout intent parsing, Relay routing, and Nightshift AI.' },
        { num: '03', title: 'Defensible Governance', desc: 'Cell-level citation provenance index, cryptographic audit certificates, and human approval workflow.' }
      ],
      ACCENT_AMBER
    );
    slide.addNotes('Section Four details our System Architecture. We examine the four-tier architectural pipeline, our five-stage Meterless mission workflow, cell-level coordinate indexing, and human-in-the-loop governance.');
  }

  // =========================================================================
  // SLIDE 20: End-to-End Enterprise System Architecture
  // =========================================================================
  {
    const slide = pres.addSlide();
    slide.background = { color: BG_DARK };
    addHeader(slide, 20, '4. Architecture', 'End-to-End Enterprise System Architecture', 'A 4-tier pipeline combining data virtualization, agent orchestration, and audit governance.');

    const layers = [
      { num: 'TIER 1', name: 'Data Virtualization Layer (Zetaris Engine)', tech: 'Zetaris Federated SQL • SQLite Mock • Zero ETL', desc: 'Queries SAP ERP, WMS Logistics, AP Invoices, and Legal Contracts in place. Eliminates data copying and staging databases with 12ms query response.', color: ACCENT_SKY },
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
        x: 1.1, y: ly + 0.15, w: 1.5, h: 0.35,
        fontSize: 10, fontFace: 'Calibri', bold: true, color: l.color,
        valign: 'top'
      });
      slide.addText(l.name, {
        x: 2.8, y: ly + 0.12, w: 5.5, h: 0.35,
        fontSize: 13, fontFace: 'Calibri', bold: true, color: TEXT_WHITE,
        valign: 'top'
      });
      slide.addText(l.tech, {
        x: 8.5, y: ly + 0.12, w: 3.8, h: 0.35,
        fontSize: 9.5, fontFace: 'Calibri', bold: true, color: l.color,
        align: 'right', valign: 'top'
      });
      slide.addText(l.desc, {
        x: 2.8, y: ly + 0.48, w: 9.5, h: 0.6,
        fontSize: 10, fontFace: 'Calibri', color: TEXT_SLATE,
        valign: 'top'
      });
    });

    slide.addNotes('Our system architecture is structured in four high-performance tiers. Tier 1 is Data Virtualization powered by Zetaris. Tier 2 is Multi-Agent Orchestration powered by Meterless. Tier 3 is the Evidence Index that locks down immutable coordinates. And Tier 4 is our interactive React dashboard.');
  }

  // =========================================================================
  // SLIDE 21: The 5-Stage Meterless Mission Pipeline
  // =========================================================================
  {
    const slide = pres.addSlide();
    slide.background = { color: BG_DARK };
    addHeader(slide, 21, '4. Architecture', 'The 5-Stage Meterless Mission Pipeline', 'From audit intent extraction to local AI reasoning and dispute generation.');

    const stages = [
      { step: 'STAGE 1', name: 'Scout Intent', latency: '12ms', desc: 'Parses audit parameters, sets $0 discrepancy tolerance threshold, and identifies required data entities.', color: ACCENT_INDIGO },
      { step: 'STAGE 2', name: 'Relay Zetaris', latency: '18ms', desc: 'Dispatches federated SQL queries across ERP, warehouse, invoices, and contracts via Zetaris virtualization.', color: ACCENT_SKY },
      { step: 'STAGE 3', name: 'Reconciliation', latency: '8ms', desc: 'Executes deterministic 4-way matching algorithms to quantify quantity, rate, fee, and duplicate variances.', color: ACCENT_AMBER },
      { step: 'STAGE 4', name: 'Confidence Score', latency: '14ms', desc: 'Evaluates cross-source corroboration strength, generating a calibrated confidence score (96.5% on PO-1001).', color: ACCENT_EMERALD },
      { step: 'STAGE 5', name: 'Meterless Nightshift', latency: '42ms', desc: 'Executes Race/Judge/Verify/Generate local AI reasoning cycle; outputs cryptographic receipt at $0 token cost.', color: ACCENT_PURPLE }
    ];

    stages.forEach((stg, idx) => {
      const sy = 1.85 + idx * 0.95;
      slide.addShape(pres.ShapeType.roundRect, {
        x: 0.8, y: sy, w: 11.73, h: 0.86,
        rectRadius: 0.1,
        fill: { color: CARD_BG },
        line: { color: stg.color, width: 1.5 }
      });

      slide.addText(stg.step, {
        x: 1.1, y: sy + 0.15, w: 1.5, h: 0.3,
        fontSize: 10, fontFace: 'Calibri', bold: true, color: stg.color,
        valign: 'top'
      });
      slide.addText(stg.name, {
        x: 2.8, y: sy + 0.12, w: 4.5, h: 0.3,
        fontSize: 13, fontFace: 'Calibri', bold: true, color: TEXT_WHITE,
        valign: 'top'
      });
      slide.addText(`Latency: ${stg.latency}`, {
        x: 9.8, y: sy + 0.12, w: 2.5, h: 0.3,
        fontSize: 10, fontFace: 'Calibri', bold: true, color: stg.color,
        align: 'right', valign: 'top'
      });
      slide.addText(stg.desc, {
        x: 2.8, y: sy + 0.44, w: 9.5, h: 0.38,
        fontSize: 9.5, fontFace: 'Calibri', color: TEXT_SLATE,
        valign: 'top'
      });
    });

    slide.addShape(pres.ShapeType.roundRect, {
      x: 0.8, y: 6.75, w: 11.73, h: 0.42,
      rectRadius: 0.08,
      fill: { color: '0F172A' },
      line: { color: '334155', width: 1 }
    });
    slide.addText('TOTAL PIPELINE DURATION: 184ms   |   CLOUD TOKENS CONSUMED: 0   |   IMMUTABLE AUDIT RECEIPT: ns-rcpt-8f3a9e', {
      x: 1.0, y: 6.75, w: 11.33, h: 0.42,
      fontSize: 9.5, fontFace: 'Calibri', bold: true, color: ACCENT_EMERALD,
      align: 'center', valign: 'middle'
    });

    slide.addNotes('Every audit executes as a five-stage Meterless mission pipeline. Stage 1 is Scout Intent parsing. Stage 2 is Relay Zetaris querying. Stage 3 is algorithmic reconciliation. Stage 4 is confidence scoring. And Stage 5 is Meterless Nightshift local reasoning. The entire cycle finishes in 184 milliseconds.');
  }

  // =========================================================================
  // SLIDE 22: Cell-Level Evidence Provenance Index
  // =========================================================================
  {
    const slide = pres.addSlide();
    slide.background = { color: BG_DARK };
    addHeader(slide, 22, '4. Architecture', 'Cell-Level Evidence Provenance Index', 'Absolute audit proof: every financial claim is anchored in {file, row, col, value}.');

    const cards = [
      {
        title: 'Precise Coordinate Citations',
        desc: 'Every single variance is tied directly to an immutable data cell coordinate:\n• Discrepancy 1: invoices.csv:Row 2:Col 3 (invoiced_qty = 120)\n• Corroborating: deliveries.csv:Row 2:Col 3 (delivered_qty = 100)\n• Discrepancy 2: invoices.csv:Row 2:Col 4 (unit_price = $50.00)\n• Corroborating: contract_prices.csv:Row 2:Col 3 (contract_unit_price = $48.00)',
        color: ACCENT_SKY
      },
      {
        title: 'Cryptographic Audit Certificate',
        desc: 'When an audit completes, TraceBack AI generates an immutable audit receipt:\n• Cryptographic receipt hash: sha256:8f3a9e...21b0\n• Timestamped with zero-tamper verification\n• Bound to auditor digital signature upon approval\n• Directly exportable for internal SOX controllers and external Big 4 audit review',
        color: ACCENT_EMERALD
      },
      {
        title: 'Mathematical Defensibility',
        desc: 'No black-box probability or hallucinated calculations:\n• Overcharge amounts are calculated via deterministic integer/float arithmetic\n• Variance = (invoiced_qty - delivered_qty) * unit_price\n• Rate Creep = delivered_qty * (invoiced_price - contract_price)\n• 100% reproducible and legally binding',
        color: ACCENT_AMBER
      },
      {
        title: 'Supplier Dispute Package',
        desc: 'Dispute notices are not generic complaints:\n• Fully synthesized supplier letter generated in seconds\n• Formatted with exact contract clause citations (Section 4.2)\n• Cross-referenced with warehouse dock note numbers (DN-045)\n• Ready for immediate dispatch to vendor accounts team',
        color: ACCENT_PURPLE
      }
    ];

    cards.forEach((c, idx) => {
      const col = idx % 2;
      const row = Math.floor(idx / 2);
      const px = 0.8 + col * 5.95;
      const py = 1.85 + row * 2.45;

      slide.addShape(pres.ShapeType.roundRect, {
        x: px, y: py, w: 5.78, h: 2.35,
        rectRadius: 0.12,
        fill: { color: CARD_BG },
        line: { color: c.color, width: 1.5 }
      });
      slide.addText(c.title, {
        x: px + 0.2, y: py + 0.15, w: 5.3, h: 0.35,
        fontSize: 13.5, fontFace: 'Calibri', bold: true, color: c.color,
        valign: 'top'
      });
      slide.addText(c.desc, {
        x: px + 0.2, y: py + 0.55, w: 5.3, h: 1.65,
        fontSize: 10, fontFace: 'Calibri', color: TEXT_SLATE,
        valign: 'top'
      });
    });

    slide.addNotes('Audit defensibility is what separates TraceBack AI from toy LLM wrappers. When an enterprise auditor challenges a vendor, they cannot quote an AI summary. They need the exact row, column, and file coordinates. Our Evidence Provenance Index guarantees 100% citation precision.');
  }

  // =========================================================================
  // SLIDE 23: Human-in-the-Loop Governance & Dispute Synthesis
  // =========================================================================
  {
    const slide = pres.addSlide();
    slide.background = { color: BG_DARK };
    addHeader(slide, 23, '4. Architecture', 'Human-in-the-Loop Governance & Dispute Synthesis', 'Empowering human auditors with 1-click approvals and automated supplier notices.');

    slide.addShape(pres.ShapeType.roundRect, {
      x: 0.8, y: 1.85, w: 5.7, h: 4.95,
      rectRadius: 0.15,
      fill: { color: CARD_BG },
      line: { color: ACCENT_PURPLE, width: 2 }
    });
    slide.addText('HUMAN GOVERNANCE WORKFLOW', {
      x: 1.1, y: 2.1, w: 5.1, h: 0.3,
      fontSize: 11, fontFace: 'Calibri', bold: true, color: ACCENT_PURPLE,
      valign: 'top'
    });
    slide.addText('Auditor In Full Control', {
      x: 1.1, y: 2.45, w: 5.1, h: 0.45,
      fontSize: 16, fontFace: 'Calibri', bold: true, color: TEXT_WHITE,
      valign: 'top'
    });
    slide.addText('• AI as Copilot, Human as Authority: Agents discover and corroborate discrepancies, but human auditors hold final claim approval authority.\n• 1-Click Decision Actions:\n  1. APPROVE CLAIM: Endorses $1,200.00 recovery and generates formal dispute notice.\n  2. OVERRIDE TOLERANCE: Flags transaction as acceptable commercial concession.\n  3. REQUEST RE-AUDIT: Triggers re-verification against updated vendor notes.', {
      x: 1.1, y: 3.0, w: 5.1, h: 3.5,
      fontSize: 11, fontFace: 'Calibri', color: TEXT_SLATE,
      valign: 'top'
    });

    slide.addShape(pres.ShapeType.roundRect, {
      x: 6.8, y: 1.85, w: 5.7, h: 4.95,
      rectRadius: 0.15,
      fill: { color: CARD_BG_ALT },
      line: { color: ACCENT_EMERALD, width: 2 }
    });
    slide.addText('SYNTHESIZED DISPUTE NOTICE', {
      x: 7.1, y: 2.1, w: 5.1, h: 0.3,
      fontSize: 11, fontFace: 'Calibri', bold: true, color: ACCENT_EMERALD,
      valign: 'top'
    });
    slide.addText('Ready-to-Dispatch Supplier Email', {
      x: 7.1, y: 2.45, w: 5.1, h: 0.45,
      fontSize: 16, fontFace: 'Calibri', bold: true, color: TEXT_WHITE,
      valign: 'top'
    });
    slide.addText('Subject: Notice of Invoice Discrepancy — PO-1001 / INV-9001\n\nDear Apex Industrial Accounts Team,\n\nOur automated audit of PO-1001 has identified $1,200.00 in discrepancies requiring adjustment prior to payment:\n1. Quantity Overbilling ($1,000.00): Invoiced 120 units; warehouse dock note DN-045 logged 100 units physically received.\n2. Rate Escalation ($200.00): Invoiced unit price of $50.00 exceeds Master Agreement ceiling of $48.00 (Section 4.2).\n\nPlease issue an amended invoice or credit memo for $1,200.00.', {
      x: 7.1, y: 3.0, w: 5.1, h: 3.5,
      fontSize: 10, fontFace: 'Calibri', color: TEXT_LIGHT,
      valign: 'top'
    });

    slide.addNotes('Crucially, TraceBack AI keeps a human in the loop. The AI discovers and documents the leakages, but the human auditor endorses the claim. With one click, the system synthesizes a professional supplier dispute notice citing every dock note and contract section.');
  }

  // =========================================================================
  // SLIDE 24: SECTION 5 DIVIDER — SPONSOR TECH INTEGRATION
  // =========================================================================
  {
    const slide = pres.addSlide();
    addSectionDivider(
      slide, 5, 5,
      'Sponsor Tech Integration: Zetaris & Meterless',
      'How cutting-edge virtualization and agent infrastructure power TraceBack AI core capabilities.',
      [
        { num: '01', title: 'Zetaris Virtualization', desc: 'Zero-ETL federated queries executing across 4 enterprise datasets in 12ms without pipelines or data movement.' },
        { num: '02', title: 'Meterless Engine', desc: 'Scout intent parsing, Relay asynchronous routing, and Gaia H-MEM persistent working memory.' },
        { num: '03', title: 'Meterless Nightshift AI', desc: '4-stage local reasoning provider (Race, Judge, Verify, Generate) delivering cryptographic receipts at $0.00 cloud token cost.' }
      ],
      ACCENT_PURPLE
    );
    slide.addNotes('Section Five details our deep integration with Sponsor Technologies. We demonstrate how Zetaris Data Virtualization, Meterless Engine orchestration, and Meterless Nightshift AI make this platform lightning fast, private, and cost-effective.');
  }

  // =========================================================================
  // SLIDE 25: Zetaris Data Virtualization: Zero-ETL Federated SQL Architecture
  // =========================================================================
  {
    const slide = pres.addSlide();
    slide.background = { color: BG_DARK };
    addHeader(slide, 25, '5. Sponsor Tech', 'Zetaris Data Virtualization: Zero-ETL Federated SQL', 'Querying enterprise data where it lives without data movement or pipeline lag.');

    slide.addShape(pres.ShapeType.roundRect, {
      x: 0.8, y: 1.85, w: 5.7, h: 4.95,
      rectRadius: 0.15,
      fill: { color: CARD_BG },
      line: { color: ACCENT_SKY, width: 2 }
    });
    slide.addText('ZETARIS VIRTUALIZATION ENGINE', {
      x: 1.1, y: 2.1, w: 5.1, h: 0.3,
      fontSize: 11, fontFace: 'Calibri', bold: true, color: ACCENT_SKY,
      valign: 'top'
    });
    slide.addText('Zero-ETL Federated SQL Join', {
      x: 1.1, y: 2.45, w: 5.1, h: 0.45,
      fontSize: 16, fontFace: 'Calibri', bold: true, color: TEXT_WHITE,
      valign: 'top'
    });
    slide.addText('• Direct Virtualization: Zetaris connects directly to SAP ERP tables, WMS dock logs, AP invoices, and contract schedules.\n• 12ms Query Latency: Executes cross-table joins on the fly across heterogeneous schemas without staging databases.\n• Zero Data Duplication: Financial and banking data never leaves its original security perimeter, satisfying enterprise data residency.\n• Zero Pipeline Maintenance: Eliminates brittle ETL jobs that break whenever a schema changes.', {
      x: 1.1, y: 3.0, w: 5.1, h: 3.5,
      fontSize: 11, fontFace: 'Calibri', color: TEXT_SLATE,
      valign: 'top'
    });

    slide.addShape(pres.ShapeType.roundRect, {
      x: 6.8, y: 1.85, w: 5.7, h: 4.95,
      rectRadius: 0.15,
      fill: { color: CARD_BG_ALT },
      line: { color: ACCENT_SKY, width: 2 }
    });
    slide.addText('ENTERPRISE RESILIENCE & HYBRID MODE', {
      x: 7.1, y: 2.1, w: 5.1, h: 0.3,
      fontSize: 11, fontFace: 'Calibri', bold: true, color: ACCENT_SKY,
      valign: 'top'
    });
    slide.addText('Seamless Cloud & Offline Fallback', {
      x: 7.1, y: 2.45, w: 5.1, h: 0.45,
      fontSize: 16, fontFace: 'Calibri', bold: true, color: TEXT_WHITE,
      valign: 'top'
    });
    slide.addText('• Live Cloud Connection: When Zetaris endpoints are available, queries route through the enterprise virtualization gateway.\n• In-Memory SQLite Fallback: When offline or in air-gapped dev environments, our SQLite mock replicates identical SQL federation semantics.\n• 100% High Availability: Financial audits never fail due to network interruptions.\n• Verifiable Telemetry: Every query returns latency metrics and data lineage logs for full operational observability.', {
      x: 7.1, y: 3.0, w: 5.1, h: 3.5,
      fontSize: 11, fontFace: 'Calibri', color: TEXT_LIGHT,
      valign: 'top'
    });

    slide.addNotes('Zetaris is the foundation of our data tier. Instead of copying sensitive financial data across ETL pipelines, Zetaris queries data where it lives. Federated joins execute across four disparate datasets in just twelve milliseconds with zero replication.');
  }

  // =========================================================================
  // SLIDE 26: Meterless Engine Architecture: Scout, Relay & Gaia H-MEM
  // =========================================================================
  {
    const slide = pres.addSlide();
    slide.background = { color: BG_DARK };
    addHeader(slide, 26, '5. Sponsor Tech', 'Meterless Engine Architecture: Scout, Relay & H-MEM', 'Autonomous multi-agent orchestration, intent parsing, and hierarchical memory.');

    const components = [
      {
        tag: 'SCOUT INTENT', title: 'Meterless Scout Engine', latency: '12ms Latency', color: ACCENT_INDIGO,
        desc: 'Analyzes user prompts, audit directives, and compliance policies. Configures audit tolerances ($0 threshold) and translates natural language queries into structured execution plans.'
      },
      {
        tag: 'RELAY ENGINE', title: 'Meterless Relay Router', latency: '18ms Latency', color: ACCENT_SKY,
        desc: 'Asynchronous multi-agent dispatcher that coordinates tool execution. Routes queries to Zetaris, triggers reconciliation algorithms, and monitors execution telemetry.'
      },
      {
        tag: 'GAIA H-MEM', title: 'Hierarchical Working Memory', latency: 'Persistent State', color: ACCENT_PURPLE,
        desc: 'Meterless Gaia H-MEM maintains multi-turn context across audit sessions. Persists investigation checkpoints, dispute correspondence, and historical auditor decisions.'
      }
    ];

    components.forEach((c, idx) => {
      const px = 0.8 + idx * 3.98;
      slide.addShape(pres.ShapeType.roundRect, {
        x: px, y: 1.85, w: 3.8, h: 4.95,
        rectRadius: 0.15,
        fill: { color: CARD_BG },
        line: { color: c.color, width: 2 }
      });
      slide.addText(c.tag, {
        x: px + 0.2, y: 2.1, w: 3.4, h: 0.3,
        fontSize: 10, fontFace: 'Calibri', bold: true, color: c.color,
        valign: 'top'
      });
      slide.addText(c.title, {
        x: px + 0.2, y: 2.45, w: 3.4, h: 0.45,
        fontSize: 15, fontFace: 'Calibri', bold: true, color: TEXT_WHITE,
        valign: 'top'
      });
      slide.addShape(pres.ShapeType.roundRect, {
        x: px + 0.2, y: 2.95, w: 3.4, h: 0.35,
        rectRadius: 0.08,
        fill: { color: '0F172A' },
        line: { color: c.color, width: 1 }
      });
      slide.addText(c.latency, {
        x: px + 0.2, y: 2.95, w: 3.4, h: 0.35,
        fontSize: 10, fontFace: 'Calibri', bold: true, color: c.color,
        align: 'center', valign: 'middle'
      });
      slide.addText(c.desc, {
        x: px + 0.2, y: 3.45, w: 3.4, h: 3.1,
        fontSize: 10.5, fontFace: 'Calibri', color: TEXT_SLATE,
        valign: 'top'
      });
    });

    slide.addNotes('For agent orchestration, we leverage the Meterless Engine. Scout extracts audit intent. Relay coordinates tool execution and data queries. And Gaia H-MEM provides hierarchical memory so multi-turn audit investigations maintain state seamlessly.');
  }

  // =========================================================================
  // SLIDE 27: Meterless Nightshift AI: $0.00 Token Compute Provider
  // =========================================================================
  {
    const slide = pres.addSlide();
    slide.background = { color: BG_DARK };
    addHeader(slide, 27, '5. Sponsor Tech', 'Meterless Nightshift AI: $0.00 Token Compute Provider', 'Local AI reasoning cycle: Race, Judge, Verify, and Generate.');

    const stages = [
      { num: 'STAGE 1', title: 'RACE', status: 'Parallel Run', color: ACCENT_SKY, desc: 'Nightshift initiates parallel local inference threads to evaluate discrepancy patterns against enterprise policies.' },
      { num: 'STAGE 2', title: 'JUDGE', status: 'Tolerance Check', color: ACCENT_AMBER, desc: 'Threshold evaluator applies corporate tolerance rules (strict $0 allowance) to eliminate immaterial noise.' },
      { num: 'STAGE 3', title: 'VERIFY', status: 'Math Prover', color: ACCENT_EMERALD, desc: 'Deterministic math prover checks calculations: quantity variance, price differential, and invoice sum.' },
      { num: 'STAGE 4', title: 'GENERATE', status: '$0.00 Tokens', color: ACCENT_PURPLE, desc: 'Generates immutable cryptographic audit receipt and dispute letter at zero dollar cloud token cost.' }
    ];

    stages.forEach((s, idx) => {
      const px = 0.8 + idx * 2.98;
      slide.addShape(pres.ShapeType.roundRect, {
        x: px, y: 1.85, w: 2.8, h: 4.95,
        rectRadius: 0.12,
        fill: { color: CARD_BG },
        line: { color: s.color, width: 1.5 }
      });
      slide.addText(s.num, {
        x: px + 0.15, y: 2.1, w: 2.5, h: 0.3,
        fontSize: 10, fontFace: 'Calibri', bold: true, color: s.color,
        valign: 'top'
      });
      slide.addText(s.title, {
        x: px + 0.15, y: 2.45, w: 2.5, h: 0.45,
        fontSize: 16, fontFace: 'Calibri', bold: true, color: TEXT_WHITE,
        valign: 'top'
      });
      slide.addShape(pres.ShapeType.roundRect, {
        x: px + 0.15, y: 2.95, w: 2.5, h: 0.35,
        rectRadius: 0.08,
        fill: { color: '0F172A' },
        line: { color: s.color, width: 1 }
      });
      slide.addText(s.status, {
        x: px + 0.15, y: 2.95, w: 2.5, h: 0.35,
        fontSize: 10, fontFace: 'Calibri', bold: true, color: s.color,
        align: 'center', valign: 'middle'
      });
      slide.addText(s.desc, {
        x: px + 0.15, y: 3.45, w: 2.5, h: 3.1,
        fontSize: 10, fontFace: 'Calibri', color: TEXT_SLATE,
        valign: 'top'
      });
    });

    slide.addNotes('Our AI provider is Meterless Nightshift. Nightshift executes a four-stage local reasoning cycle: Race, Judge, Verify, and Generate. Because it runs locally, it incurs zero cloud token costs, avoids vendor API rate limits, and produces cryptographically verifiable audit receipts.');
  }

  // =========================================================================
  // SLIDE 28: Summary, Live Demonstration & Open-Source Repository
  // =========================================================================
  {
    const slide = pres.addSlide();
    slide.background = { color: BG_DARK };
    addHeader(slide, 28, '5. Sponsor Tech / Conclusion', 'Summary, Live Demo, and Open-Source Repository', 'TraceBack AI turns enterprise procurement leakage into measurable cash recovery.');

    slide.addShape(pres.ShapeType.roundRect, {
      x: 0.8, y: 1.85, w: 11.73, h: 4.95,
      rectRadius: 0.15,
      fill: { color: CARD_BG },
      line: { color: '312E81', width: 2 }
    });

    slide.addText('PRODUCTION VERIFICATION & DEMONSTRATION LINKS:', {
      x: 1.1, y: 2.05, w: 11.1, h: 0.3,
      fontSize: 11, fontFace: 'Calibri', bold: true, color: ACCENT_SKY,
      valign: 'top'
    });

    const links = [
      { name: 'Live Web Application (GitHub Pages):', url: 'https://zaintahir2025.github.io/traceback-ai/', desc: 'Full interactive React dashboard with simulation, audit trail & claim approval.' },
      { name: 'Interactive Web Presentation Deck:', url: 'https://zaintahir2025.github.io/traceback-ai/presentation.html', desc: 'In-browser 28-slide deck with keyboard navigation and speaker notes.' },
      { name: 'PowerPoint File (.pptx) Download:', url: 'https://zaintahir2025.github.io/traceback-ai/traceback-ai-presentation.pptx', desc: 'Direct download of official 28-slide Microsoft PowerPoint deck.' },
      { name: '2-Minute Demo Video Walkthrough:', url: 'https://zaintahir2025.github.io/traceback-ai/demo-video.html', desc: 'Standalone HTML5 presentation with synchronized speech narration.' },
      { name: 'Official Demo Video (MP4) File:', url: 'https://zaintahir2025.github.io/traceback-ai/traceback-ai-demo.mp4', desc: 'Direct download of 107-second HD MP4 video file (4.22 MB).' },
      { name: 'Open-Source GitHub Repository:', url: 'https://github.com/zaintahir2025/traceback-ai', desc: 'Full source code, backend API, tests, Zetaris integration & Meterless engine.' }
    ];

    links.forEach((l, idx) => {
      const ly = 2.4 + idx * 0.65;
      slide.addShape(pres.ShapeType.roundRect, {
        x: 1.1, y: ly, w: 11.1, h: 0.58,
        rectRadius: 0.08,
        fill: { color: CARD_BG_ALT },
        line: { color: BORDER_COLOR, width: 1 }
      });

      slide.addText(l.name, {
        x: 1.3, y: ly + 0.08, w: 4.2, h: 0.22,
        fontSize: 10.5, fontFace: 'Calibri', bold: true, color: TEXT_WHITE,
        valign: 'top'
      });
      slide.addText(l.desc, {
        x: 1.3, y: ly + 0.3, w: 4.2, h: 0.22,
        fontSize: 8.5, fontFace: 'Calibri', color: TEXT_MUTED,
        valign: 'top'
      });
      slide.addText(l.url, {
        x: 5.6, y: ly + 0.15, w: 6.4, h: 0.3,
        fontSize: 10.5, fontFace: 'Calibri', color: ACCENT_SKY,
        valign: 'top'
      });
    });

    slide.addText('TraceBack AI is fully built, tested, and live today. Thank you for your time!', {
      x: 1.1, y: 6.45, w: 11.1, h: 0.3,
      fontSize: 11, fontFace: 'Calibri', bold: true, color: ACCENT_EMERALD,
      align: 'center', valign: 'middle'
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

generateExecutive28SlideDeck().catch(console.error);
