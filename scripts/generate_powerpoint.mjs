import pptxgen from 'pptxgenjs';
import fs from 'node:fs';
import path from 'node:path';

async function generateSlideDeck() {
  const pres = new pptxgen();

  pres.layout = 'LAYOUT_16x9';
  pres.author = 'Zain Tahir';
  pres.company = 'TraceBack AI';
  pres.title = 'TraceBack AI — Executive Presentation Deck';
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
  function addHeader(slide, category, title, subtitle) {
    // Top category pill
    slide.addShape(pres.ShapeType.roundRect, {
      x: 0.8, y: 0.45, w: 2.8, h: 0.32,
      rectRadius: 0.16,
      fill: { color: '1E1B4B' },
      line: { color: '4338CA', width: 1 }
    });
    slide.addText(category.toUpperCase(), {
      x: 0.8, y: 0.45, w: 2.8, h: 0.32,
      fontSize: 10, fontFace: 'Calibri', bold: true, color: 'A5B4FC',
      align: 'center', valign: 'middle'
    });

    // Main slide title
    slide.addText(title, {
      x: 0.8, y: 0.85, w: 11.7, h: 0.6,
      fontSize: 22, fontFace: 'Calibri', bold: true, color: TEXT_WHITE,
      valign: 'top'
    });

    // Optional subtitle
    if (subtitle) {
      slide.addText(subtitle, {
        x: 0.8, y: 1.4, w: 11.7, h: 0.35,
        fontSize: 13, fontFace: 'Calibri', color: TEXT_MUTED,
        valign: 'top'
      });
    }

    // Top Right Sponsor Pills
    slide.addShape(pres.ShapeType.roundRect, {
      x: 8.9, y: 0.45, w: 1.8, h: 0.32,
      rectRadius: 0.16,
      fill: { color: '082F49' },
      line: { color: '0284C7', width: 1 }
    });
    slide.addText('ZETARIS FEDERATED', {
      x: 8.9, y: 0.45, w: 1.8, h: 0.32,
      fontSize: 8.5, fontFace: 'Calibri', bold: true, color: '7DD3FC',
      align: 'center', valign: 'middle'
    });

    slide.addShape(pres.ShapeType.roundRect, {
      x: 10.8, y: 0.45, w: 1.7, h: 0.32,
      rectRadius: 0.16,
      fill: { color: '064E3B' },
      line: { color: '059669', width: 1 }
    });
    slide.addText('METERLESS NIGHTSHIFT', {
      x: 10.8, y: 0.45, w: 1.7, h: 0.32,
      fontSize: 8.5, fontFace: 'Calibri', bold: true, color: '6EE7B7',
      align: 'center', valign: 'middle'
    });
  }

  // =========================================================================
  // SLIDE 0: TITLE & COVER SLIDE
  // =========================================================================
  {
    const slide = pres.addSlide();
    slide.background = { color: BG_DARK };

    // Outer decorative glow card
    slide.addShape(pres.ShapeType.roundRect, {
      x: 0.8, y: 0.8, w: 11.73, h: 5.6,
      rectRadius: 0.2,
      fill: { color: CARD_BG },
      line: { color: '312E81', width: 2 }
    });

    // Hackathon Pill
    slide.addShape(pres.ShapeType.roundRect, {
      x: 1.3, y: 1.3, w: 3.4, h: 0.36,
      rectRadius: 0.18,
      fill: { color: '1E1B4B' },
      line: { color: '6366F1', width: 1.5 }
    });
    slide.addText('GLOBAL AI HACKATHON 2026', {
      x: 1.3, y: 1.3, w: 3.4, h: 0.36,
      fontSize: 11, fontFace: 'Calibri', bold: true, color: 'C7D2FE',
      align: 'center', valign: 'middle'
    });

    // Big Main Title
    slide.addText('TraceBack AI', {
      x: 1.3, y: 1.85, w: 10.5, h: 0.9,
      fontSize: 44, fontFace: 'Calibri', bold: true, color: TEXT_WHITE,
      valign: 'middle'
    });

    // Gradient Subtitle Line
    slide.addText('Autonomous 4-Way Cross-Source Data Virtualization & Supplier Spend Recovery Agent', {
      x: 1.3, y: 2.75, w: 10.5, h: 0.5,
      fontSize: 18, fontFace: 'Calibri', bold: true, color: ACCENT_SKY,
      valign: 'top'
    });

    slide.addText('Unifying ERP purchase orders, warehouse delivery receipts, AP invoices, and master contracts with zero ETL, cell-level audit trails, and zero dollar local AI execution.', {
      x: 1.3, y: 3.3, w: 10.5, h: 0.6,
      fontSize: 14, fontFace: 'Calibri', color: TEXT_SLATE,
      valign: 'top'
    });

    // 3 Feature Highlight Badges
    const pillars = [
      { label: 'ZETARIS VIRTUALIZATION', desc: 'Zero-ETL federated queries across 4 live datasets in 12ms', color: ACCENT_SKY, bg: '082F49' },
      { label: 'METERLESS RELAY & H-MEM', desc: 'Scout intent, relay coordination, and persistent Gaia memory', color: ACCENT_EMERALD, bg: '064E3B' },
      { label: 'METERLESS NIGHTSHIFT AI', desc: '4-stage Race/Judge/Verify/Generate cycle at $0 cloud token cost', color: ACCENT_PURPLE, bg: '2E1065' }
    ];

    pillars.forEach((p, idx) => {
      const px = 1.3 + idx * 3.6;
      slide.addShape(pres.ShapeType.roundRect, {
        x: px, y: 4.15, w: 3.4, h: 1.25,
        rectRadius: 0.15,
        fill: { color: p.bg },
        line: { color: p.color, width: 1.5 }
      });
      slide.addText(p.label, {
        x: px + 0.15, y: 4.25, w: 3.1, h: 0.3,
        fontSize: 11, fontFace: 'Calibri', bold: true, color: p.color
      });
      slide.addText(p.desc, {
        x: px + 0.15, y: 4.55, w: 3.1, h: 0.75,
        fontSize: 11, fontFace: 'Calibri', color: TEXT_SLATE
      });
    });

    // Footer Info
    slide.addText('Live Deployment: https://zaintahir2025.github.io/traceback-ai/   |   Lead Developer: Zain Tahir', {
      x: 1.3, y: 5.7, w: 10.5, h: 0.3,
      fontSize: 10.5, fontFace: 'Calibri', color: TEXT_MUTED
    });

    slide.addNotes('Welcome everyone. Today we present TraceBack AI, an autonomous multi-agent platform designed to eradicate enterprise procurement leakage. In Fortune 500 supply chains, companies quietly lose 1.5% to 4% of total procurement spend due to uncoordinated enterprise silos. By combining Zetaris Zero-ETL Data Virtualization, Meterless Relay Orchestration, and Meterless Nightshift local intelligence, TraceBack AI reconciles purchase orders, delivery notes, supplier invoices, and legal contracts in under 200 milliseconds with an immutable, cell-level audit trail.');
  }

  // =========================================================================
  // SLIDE 1: THE PROBLEM
  // =========================================================================
  {
    const slide = pres.addSlide();
    slide.background = { color: BG_DARK };

    addHeader(slide, 'Problem Statement', 'The $1.5M Enterprise Spend Leakage: 4 Disconnected Silos', 'Why global procurement operations quietly lose 1.5% to 4.0% of total spend every year.');

    // Stat Callout Card (Left)
    slide.addShape(pres.ShapeType.roundRect, {
      x: 0.8, y: 1.9, w: 3.5, h: 4.8,
      rectRadius: 0.15,
      fill: { color: '1C1917' },
      line: { color: ACCENT_ROSE, width: 2 }
    });

    slide.addText('ANNUAL LEAKAGE', {
      x: 1.0, y: 2.1, w: 3.1, h: 0.3,
      fontSize: 11, fontFace: 'Calibri', bold: true, color: ACCENT_ROSE
    });
    slide.addText('1.5% - 4.0%', {
      x: 1.0, y: 2.4, w: 3.1, h: 0.8,
      fontSize: 38, fontFace: 'Calibri', bold: true, color: TEXT_WHITE
    });
    slide.addText('of total enterprise procurement spend is paid in unverified supplier overcharges.', {
      x: 1.0, y: 3.2, w: 3.1, h: 0.6,
      fontSize: 12, fontFace: 'Calibri', color: TEXT_SLATE
    });

    slide.addShape(pres.ShapeType.line, {
      x: 1.0, y: 3.9, w: 3.1, h: 0,
      line: { color: '44403C', width: 1 }
    });

    slide.addText('THE AUDIT REALITY:', {
      x: 1.0, y: 4.1, w: 3.1, h: 0.3,
      fontSize: 11, fontFace: 'Calibri', bold: true, color: ACCENT_AMBER
    });
    slide.addText('• 10,000+ invoices received per month\n• 2-way manual matching misses delivery notes\n• Contract ceiling prices stored in separate PDFs\n• Human fatigue causes 85%+ overcharges to clear\n• Post-payment recovery audits cost 30% in fees', {
      x: 1.0, y: 4.4, w: 3.1, h: 2.1,
      fontSize: 11, fontFace: 'Calibri', color: TEXT_SLATE
    });

    // 4 Disconnected Enterprise Silos (Right 2x2 Grid)
    const silos = [
      {
        code: 'SILO 1: SAP ERP', title: 'Purchase Orders',
        desc: 'PO-1001 authorized 120 units at $50/ea ($6,000.00). Knows what was approved to buy, but has no live confirmation of what the warehouse actually accepted.',
        tag: 'ERP SYSTEM', color: ACCENT_SKY, bg: '082F49'
      },
      {
        code: 'SILO 2: WMS LOGISTICS', title: 'Warehouse Receiving Notes',
        desc: 'Goods receipt DN-045 logged only 100 units physically delivered at the receiving dock. 20 damaged or backordered units were never physically received.',
        tag: 'PHYSICAL INVENTORY', color: ACCENT_AMBER, bg: '451A03'
      },
      {
        code: 'SILO 3: ACCOUNTS PAYABLE', title: 'Supplier Invoices',
        desc: 'Supplier bills for the full 120 units on INV-9001 ($6,000.00). Accounts Payable verifies against the PO and clears payment without cross-checking the WMS dock note.',
        tag: 'ACCOUNTS PAYABLE', color: ACCENT_ROSE, bg: '4C0519'
      },
      {
        code: 'SILO 4: LEGAL & SOURCING', title: 'Master Agreements',
        desc: 'Master Contract Schedule sets ceiling price at $48.00/unit. Invoice billed at $50.00/unit. A $2.00 rate escalation ($200.00 leakage) goes completely undetected.',
        tag: 'LEGAL CONTRACTS', color: ACCENT_PURPLE, bg: '2E1065'
      }
    ];

    silos.forEach((silo, idx) => {
      const col = idx % 2;
      const row = Math.floor(idx / 2);
      const sx = 4.6 + col * 3.95;
      const sy = 1.9 + row * 2.45;

      slide.addShape(pres.ShapeType.roundRect, {
        x: sx, y: sy, w: 3.8, h: 2.3,
        rectRadius: 0.12,
        fill: { color: CARD_BG },
        line: { color: silo.color, width: 1.5 }
      });

      slide.addText(silo.code, {
        x: sx + 0.2, y: sy + 0.15, w: 3.4, h: 0.25,
        fontSize: 10, fontFace: 'Calibri', bold: true, color: silo.color
      });
      slide.addText(silo.title, {
        x: sx + 0.2, y: sy + 0.42, w: 3.4, h: 0.35,
        fontSize: 15, fontFace: 'Calibri', bold: true, color: TEXT_WHITE
      });
      slide.addText(silo.desc, {
        x: sx + 0.2, y: sy + 0.8, w: 3.4, h: 1.35,
        fontSize: 10.5, fontFace: 'Calibri', color: TEXT_SLATE
      });
    });

    slide.addNotes('Here is the core problem: procurement data does not live in one place. Silo 1 is the ERP where purchase orders are cut. Silo 2 is the warehouse management system where dock workers log actual physical receipts. Silo 3 is accounts payable where supplier invoices are received. And Silo 4 is legal and contract repositories containing negotiated discount rates. When an invoice arrives, AP checks the purchase order and sees 120 units approved at $50. They pay it. But the warehouse only accepted 100 units! That is a $1,000 quantity loss. Furthermore, the master contract specifies a $48 rate, not $50. That is an extra $200 price creep. In a typical $50 million spend company, this leakage accounts for $1.5 million in wasted cash each year.');
  }

  // =========================================================================
  // SLIDE 2: THE USERS
  // =========================================================================
  {
    const slide = pres.addSlide();
    slide.background = { color: BG_DARK };

    addHeader(slide, 'Target Personas', 'Built for Procurement, Finance, and Audit Leadership', 'Delivering role-tailored automation, audit defensibility, and cash recovery across the enterprise.');

    const personas = [
      {
        role: 'Chief Procurement Officer (CPO)',
        sub: 'Strategic Sourcing & Vendor Governance',
        pain: 'Supplier Price Creep & Contract Non-Compliance',
        gain: 'Automated contract rate enforcement across 100% of purchase orders with vendor scorecards.',
        impact: '3.2% Spend Reduction',
        color: ACCENT_SKY, bg: '082F49'
      },
      {
        role: 'Lead Financial Auditor',
        sub: 'Internal Controls & Sarbanes-Oxley Compliance',
        pain: 'Sample-Based Auditing & Lack of Granular Evidence',
        gain: '100% census reconciliation with deterministic cell-level citations {file, row, col} and confidence scores.',
        impact: '100% Audit Defensibility',
        color: ACCENT_EMERALD, bg: '064E3B'
      },
      {
        role: 'Accounts Payable Controller',
        sub: 'Disbursements & Invoice Matching',
        pain: 'Manual Matching Backlogs & Vendor Invoice Friction',
        gain: 'Pre-payment overcharge alerts in under 200ms; pre-drafted supplier dispute letters citing delivery notes.',
        impact: '80% Manual Effort Eliminated',
        color: ACCENT_AMBER, bg: '451A03'
      },
      {
        role: 'Supply Chain Operations VP',
        sub: 'Logistics, Dock Receiving & Inventory Control',
        pain: 'Dock Receipt Mismatches & Damaged Goods Billing',
        gain: 'Instant cross-dock reconciliation proving warehouse note DN-045 logged only 100 units accepted.',
        impact: 'Zero Unreceived Billing',
        color: ACCENT_PURPLE, bg: '2E1065'
      }
    ];

    personas.forEach((p, idx) => {
      const px = 0.8 + idx * 2.98;
      slide.addShape(pres.ShapeType.roundRect, {
        x: px, y: 1.9, w: 2.85, h: 4.8,
        rectRadius: 0.15,
        fill: { color: CARD_BG },
        line: { color: p.color, width: 1.5 }
      });

      // Role Header Box
      slide.addShape(pres.ShapeType.roundRect, {
        x: px + 0.15, y: 2.05, w: 2.55, h: 0.95,
        rectRadius: 0.1,
        fill: { color: p.bg },
        line: { color: p.color, width: 1 }
      });
      slide.addText(p.role, {
        x: px + 0.25, y: 2.12, w: 2.35, h: 0.5,
        fontSize: 12, fontFace: 'Calibri', bold: true, color: TEXT_WHITE
      });
      slide.addText(p.sub, {
        x: px + 0.25, y: 2.62, w: 2.35, h: 0.3,
        fontSize: 9.5, fontFace: 'Calibri', color: p.color
      });

      // Pain Point Section
      slide.addText('PRIMARY PAIN POINT:', {
        x: px + 0.2, y: 3.15, w: 2.45, h: 0.25,
        fontSize: 9, fontFace: 'Calibri', bold: true, color: ACCENT_ROSE
      });
      slide.addText(p.pain, {
        x: px + 0.2, y: 3.4, w: 2.45, h: 0.6,
        fontSize: 10.5, fontFace: 'Calibri', color: TEXT_SLATE
      });

      // Gain / Value Realized
      slide.addText('TRACEBACK AI VALUE:', {
        x: px + 0.2, y: 4.15, w: 2.45, h: 0.25,
        fontSize: 9, fontFace: 'Calibri', bold: true, color: ACCENT_EMERALD
      });
      slide.addText(p.gain, {
        x: px + 0.2, y: 4.4, w: 2.45, h: 1.3,
        fontSize: 10.5, fontFace: 'Calibri', color: TEXT_LIGHT
      });

      // Impact Metric Tag
      slide.addShape(pres.ShapeType.roundRect, {
        x: px + 0.2, y: 5.85, w: 2.45, h: 0.55,
        rectRadius: 0.1,
        fill: { color: '0F172A' },
        line: { color: p.color, width: 1 }
      });
      slide.addText(p.impact, {
        x: px + 0.2, y: 5.85, w: 2.45, h: 0.55,
        fontSize: 11, fontFace: 'Calibri', bold: true, color: p.color,
        align: 'center', valign: 'middle'
      });
    });

    slide.addNotes('Who uses TraceBack AI? We address four key enterprise stakeholders: First, the Chief Procurement Officer, who gains 100% contract compliance and prevents supplier price creep. Second, the Lead Financial Auditor, who replaces random 5% sample audits with a 100% census audit with cell-level legal evidence. Third, the Accounts Payable controller, who catches overcharges in 184ms before money leaves the bank and dispatches automated dispute letters. And fourth, Supply Chain and Warehouse managers, who ensure inventory receipts strictly govern payments.');
  }

  // =========================================================================
  // SLIDE 3: THE SOLUTION
  // =========================================================================
  {
    const slide = pres.addSlide();
    slide.background = { color: BG_DARK };

    addHeader(slide, 'Core Solution', 'Autonomous 4-Way Reconciliation with Cell-Level Evidence', 'TraceBack AI correlates all 4 sources in 184ms, uncovering overcharges with 96.5% confidence.');

    // PO-1001 Audit Card (Left)
    slide.addShape(pres.ShapeType.roundRect, {
      x: 0.8, y: 1.9, w: 7.2, h: 4.8,
      rectRadius: 0.15,
      fill: { color: CARD_BG },
      line: { color: ACCENT_EMERALD, width: 1.5 }
    });

    slide.addText('LIVE RECONCILIATION BENCHMARK: PO-1001 (SUPPLIER SUP-42)', {
      x: 1.1, y: 2.1, w: 6.6, h: 0.3,
      fontSize: 11, fontFace: 'Calibri', bold: true, color: ACCENT_EMERALD
    });
    slide.addText('Total Overcharge Flagged: $1,200.00 USD   (Confidence: 96.5% | 184ms)', {
      x: 1.1, y: 2.4, w: 6.6, h: 0.4,
      fontSize: 15, fontFace: 'Calibri', bold: true, color: TEXT_WHITE
    });

    // Discrepancy 1 Box
    slide.addShape(pres.ShapeType.roundRect, {
      x: 1.1, y: 2.9, w: 6.6, h: 1.55,
      rectRadius: 0.1,
      fill: { color: '1C1917' },
      line: { color: ACCENT_ROSE, width: 1.5 }
    });
    slide.addText('DISCREPANCY 1: QUANTITY OVERBILLING (+$1,000.00 USD)', {
      x: 1.3, y: 3.0, w: 6.2, h: 0.25,
      fontSize: 11, fontFace: 'Calibri', bold: true, color: ACCENT_ROSE
    });
    slide.addText('• Invoiced for 120 units on INV-9001; warehouse receiving note DN-045 logged only 100 units physically delivered.\n• Exact calculation: (120 billed - 100 received) = 20 unreceived units x $50.00 unit price = $1,000.00 overcharge.\n• Evidence coordinates: invoices.csv [Row 2, col 3] vs deliveries.csv [Row 2, col 3]', {
      x: 1.3, y: 3.3, w: 6.2, h: 1.05,
      fontSize: 10, fontFace: 'Calibri', color: TEXT_SLATE
    });

    // Discrepancy 2 Box
    slide.addShape(pres.ShapeType.roundRect, {
      x: 1.1, y: 4.6, w: 6.6, h: 1.55,
      rectRadius: 0.1,
      fill: { color: '1C1917' },
      line: { color: ACCENT_AMBER, width: 1.5 }
    });
    slide.addText('DISCREPANCY 2: CONTRACT RATE ESCALATION (+$200.00 USD)', {
      x: 1.3, y: 4.7, w: 6.2, h: 0.25,
      fontSize: 11, fontFace: 'Calibri', bold: true, color: ACCENT_AMBER
    });
    slide.addText('• Supplier billed $50.00/unit on invoice, breaching Master Contract schedule ceiling price of $48.00/unit.\n• Exact calculation: 100 valid delivered units x ($50.00 billed - $48.00 contract) = $200.00 rate escalation.\n• Evidence coordinates: invoices.csv [Row 2, col 4] vs contract_prices.csv [Row 2, col 2]', {
      x: 1.3, y: 5.0, w: 6.2, h: 1.05,
      fontSize: 10, fontFace: 'Calibri', color: TEXT_SLATE
    });

    // Credibility & Benchmark Cards (Right)
    slide.addShape(pres.ShapeType.roundRect, {
      x: 8.3, y: 1.9, w: 4.2, h: 2.3,
      rectRadius: 0.12,
      fill: { color: CARD_BG },
      line: { color: ACCENT_INDIGO, width: 1.5 }
    });
    slide.addText('CLEAN ORDER BENCHMARK (PO-1002)', {
      x: 8.5, y: 2.05, w: 3.8, h: 0.25,
      fontSize: 10.5, fontFace: 'Calibri', bold: true, color: ACCENT_INDIGO
    });
    slide.addText('Zero False Positive Verification', {
      x: 8.5, y: 2.3, w: 3.8, h: 0.35,
      fontSize: 14, fontFace: 'Calibri', bold: true, color: TEXT_WHITE
    });
    slide.addText('• 50 units ordered in SAP ERP\n• 50 units physically received in Warehouse\n• 50 units billed at exact $20.00 contract rate\n• Result: $0.00 Overcharge (100% Concordance)\n• Confirms agents do NOT flag false alarms', {
      x: 8.5, y: 2.7, w: 3.8, h: 1.35,
      fontSize: 10.5, fontFace: 'Calibri', color: TEXT_SLATE
    });

    // Human-in-the-Loop Card (Right Bottom)
    slide.addShape(pres.ShapeType.roundRect, {
      x: 8.3, y: 4.4, w: 4.2, h: 2.3,
      rectRadius: 0.12,
      fill: { color: CARD_BG },
      line: { color: ACCENT_PURPLE, width: 1.5 }
    });
    slide.addText('HUMAN-IN-THE-LOOP GOVERNANCE', {
      x: 8.5, y: 4.55, w: 3.8, h: 0.25,
      fontSize: 10.5, fontFace: 'Calibri', bold: true, color: ACCENT_PURPLE
    });
    slide.addText('Auditor Approval & Dispute Dispatch', {
      x: 8.5, y: 4.8, w: 3.8, h: 0.35,
      fontSize: 14, fontFace: 'Calibri', bold: true, color: TEXT_WHITE
    });
    slide.addText('• Lead Auditor retains final 1-click claim authority\n• Generates formal supplier dispute notice\n• Attaches exact delivery note & contract clauses\n• Formats claim packet with itemized $1,200 total\n• Ready for instant email dispatch to SUP-42', {
      x: 8.5, y: 5.2, w: 3.8, h: 1.35,
      fontSize: 10.5, fontFace: 'Calibri', color: TEXT_SLATE
    });

    slide.addNotes('Here is TraceBack AI in action. On Purchase Order PO-1001, TraceBack AI reconciles all four sources in 184 milliseconds. It uncovers two distinct discrepancies totaling $1,200.00. Discrepancy 1 is quantity overbilling: the supplier billed for 120 units, but warehouse receiving note DN-045 logged only 100 units physically received. That is 20 unreceived units billed at $50, or a $1,000 loss. Discrepancy 2 is contract rate escalation: the invoice charged $50 per unit versus our contracted rate of $48. That is $2 per unit across 100 received units, adding $200. Every single finding links directly to the exact file, row, and column. And crucially, to prove credibility, testing clean order PO-1002 returns zero overcharges and 100% concordance, proving our agents do not trigger false alarms.');
  }

  // =========================================================================
  // SLIDE 4: SYSTEM ARCHITECTURE
  // =========================================================================
  {
    const slide = pres.addSlide();
    slide.background = { color: BG_DARK };

    addHeader(slide, 'System Architecture', 'High-Throughput Layered Multi-Agent Architecture', 'Deterministic data virtualization combined with asynchronous multi-stage agent orchestration.');

    const layers = [
      {
        num: 'LAYER 1', name: 'Data Virtualization Layer (Zetaris Engine)',
        tech: 'Zetaris Federated SQL • Zero ETL • SQLite Cross-Source Mock',
        desc: 'Connects directly to SAP ERP (purchase_orders), WMS Logistics (deliveries), AP Invoices (invoices), and Legal Contracts (contract_prices). Executes federated cross-source joins on the fly without duplicating data or creating fragile ETL pipelines.',
        color: ACCENT_SKY, bg: '082F49'
      },
      {
        num: 'LAYER 2', name: 'Agent Orchestration Pipeline (Meterless Architecture)',
        tech: 'Meterless Scout • Relay Engine • Nightshift AI Provider • Gaia H-MEM',
        desc: '5-Stage Mission Execution:\n1. Scout Intent (12ms): Configures tolerances ($0 threshold) & audit parameters.\n2. Relay Zetaris (18ms): Queries federated tables across all 4 enterprise systems.\n3. Reconciliation (8ms): Deterministic mathematical 4-way matching engine.\n4. Confidence Scoring (14ms): Multi-point corroboration yielding 96.5% confidence.\n5. Meterless Nightshift (42ms): 4-stage local AI reasoning (Race > Judge > Verify > Generate).',
        color: ACCENT_EMERALD, bg: '064E3B'
      },
      {
        num: 'LAYER 3', name: 'Evidence Index & Dispute Synthesis',
        tech: 'Immutable Cell Provenance • Cell Citation Index • Claim Formatter',
        desc: 'Every financial discrepancy maps to {file, row, column, value}. Generates formal supplier dispute claim packets with itemized proof, contract clause citations, and delivery note cross-references ready for executive signing.',
        color: ACCENT_AMBER, bg: '451A03'
      },
      {
        num: 'LAYER 4', name: 'Human-in-the-Loop Audit UI & Dashboard',
        tech: 'React 18 • TypeScript • Tailwind CSS • Vite • Lucide Icons',
        desc: 'Auditor workspace with real-time spend analytics, 4-way evidence inspector, interactive 2-min demo video player, 1-click claim approval modal, and full CSV/JSON export capabilities.',
        color: ACCENT_PURPLE, bg: '2E1065'
      }
    ];

    layers.forEach((lyr, idx) => {
      const ly = 1.9 + idx * 1.22;
      slide.addShape(pres.ShapeType.roundRect, {
        x: 0.8, y: ly, w: 11.73, h: 1.12,
        rectRadius: 0.1,
        fill: { color: CARD_BG },
        line: { color: lyr.color, width: 1.5 }
      });

      // Layer Tag
      slide.addShape(pres.ShapeType.roundRect, {
        x: 1.0, y: ly + 0.15, w: 1.5, h: 0.35,
        rectRadius: 0.08,
        fill: { color: lyr.bg },
        line: { color: lyr.color, width: 1 }
      });
      slide.addText(lyr.num, {
        x: 1.0, y: ly + 0.15, w: 1.5, h: 0.35,
        fontSize: 10, fontFace: 'Calibri', bold: true, color: lyr.color,
        align: 'center', valign: 'middle'
      });

      // Name & Tech Stack
      slide.addText(lyr.name, {
        x: 2.7, y: ly + 0.12, w: 5.5, h: 0.35,
        fontSize: 13, fontFace: 'Calibri', bold: true, color: TEXT_WHITE
      });
      slide.addText(lyr.tech, {
        x: 8.3, y: ly + 0.12, w: 4.0, h: 0.35,
        fontSize: 9.5, fontFace: 'Calibri', bold: true, color: lyr.color,
        align: 'right'
      });

      // Description
      slide.addText(lyr.desc, {
        x: 2.7, y: ly + 0.45, w: 9.6, h: 0.62,
        fontSize: 9.5, fontFace: 'Calibri', color: TEXT_SLATE
      });
    });

    slide.addNotes('Our system architecture is structured in four high-performance layers. Layer 1 is the Data Virtualization Layer powered by Zetaris, which connects directly to ERP, WMS, AP, and Contract stores without data copying. Layer 2 is the Agent Orchestration Pipeline built on Meterless. It runs a 5-stage mission: Scout parses audit intent, Relay coordinates queries, the reconciliation engine calculates discrepancies, confidence scoring evaluates audit strength, and Meterless Nightshift performs autonomous local reasoning. Layer 3 is the Evidence Index that locks down immutable cell coordinates. And Layer 4 is the interactive React frontend where auditors approve claims and export dispute letters.');
  }

  // =========================================================================
  // SLIDE 5: SPONSOR TECH INTEGRATION
  // =========================================================================
  {
    const slide = pres.addSlide();
    slide.background = { color: BG_DARK };

    addHeader(slide, 'Sponsor Technology', 'Deep Sponsor Integration: Zetaris & Meterless', 'First-class implementation of Zetaris Data Virtualization and the Meterless Agent Engine.');

    // Zetaris Box (Left Half)
    slide.addShape(pres.ShapeType.roundRect, {
      x: 0.8, y: 1.9, w: 5.7, h: 4.8,
      rectRadius: 0.15,
      fill: { color: CARD_BG },
      line: { color: ACCENT_SKY, width: 2 }
    });

    slide.addShape(pres.ShapeType.roundRect, {
      x: 1.05, y: 2.1, w: 5.2, h: 0.65,
      rectRadius: 0.1,
      fill: { color: '082F49' },
      line: { color: ACCENT_SKY, width: 1 }
    });
    slide.addText('ZETARIS DATA VIRTUALIZATION', {
      x: 1.2, y: 2.15, w: 4.9, h: 0.3,
      fontSize: 13, fontFace: 'Calibri', bold: true, color: TEXT_WHITE
    });
    slide.addText('Live Federated Querying & Cross-Source Data Virtualization', {
      x: 1.2, y: 2.45, w: 4.9, h: 0.25,
      fontSize: 9.5, fontFace: 'Calibri', color: ACCENT_SKY
    });

    slide.addText('1. Zero-ETL Virtual Join:\n   Executes single federated SQL join across 4 disparate databases on the fly:\n   SELECT po.*, del.*, inv.*, cp.* FROM sap_erp.purchase_orders\n   LEFT JOIN wms.deliveries ... LEFT JOIN ap.invoices ...\n\n2. Dual Mode (Live Network & Cross-Source Mock):\n   • Live Mode: Queries Zetaris Network API via POST /query with token auth.\n   • Cross-Source Mock: In-memory SQLite federator mirroring exact Zetaris SQL schema for 100% offline hackathon testability.\n\n3. Immutable Evidence Provenance:\n   Data remains at source; findings link directly to exact cell coordinates {file, row, col}.', {
      x: 1.05, y: 2.9, w: 5.2, h: 3.6,
      fontSize: 10.5, fontFace: 'Calibri', color: TEXT_SLATE
    });

    // Meterless Box (Right Half)
    slide.addShape(pres.ShapeType.roundRect, {
      x: 6.8, y: 1.9, w: 5.7, h: 4.8,
      rectRadius: 0.15,
      fill: { color: CARD_BG },
      line: { color: ACCENT_EMERALD, width: 2 }
    });

    slide.addShape(pres.ShapeType.roundRect, {
      x: 7.05, y: 2.1, w: 5.2, h: 0.65,
      rectRadius: 0.1,
      fill: { color: '064E3B' },
      line: { color: ACCENT_EMERALD, width: 1 }
    });
    slide.addText('METERLESS ENGINE & NIGHTSHIFT AI', {
      x: 7.2, y: 2.15, w: 4.9, h: 0.3,
      fontSize: 13, fontFace: 'Calibri', bold: true, color: TEXT_WHITE
    });
    slide.addText('Multi-Agent Orchestration & $0.00 Token Compute Provider', {
      x: 7.2, y: 2.45, w: 4.9, h: 0.25,
      fontSize: 9.5, fontFace: 'Calibri', color: ACCENT_EMERALD
    });

    slide.addText('1. Meterless Scout Engine:\n   Audit intent extraction, tolerance configuration ($0 threshold), and risk profile mapping in 12ms.\n\n2. Meterless Relay Engine:\n   Asynchronous coordination of Zetaris federated queries and deterministic reconciliation tool execution.\n\n3. Meterless Nightshift AI Provider ($0 Cloud Compute):\n   Autonomous 4-stage local AI reasoning cycle: Race > Judge > Verify > Generate. Produces immutable audit receipt (ns-rcpt-8f3a9e) at $0.00 cloud token cost.\n\n4. Meterless Gaia H-MEM:\n   Hierarchical working memory committing mission checkpoints and dispute correspondence for persistent multi-turn context.', {
      x: 7.05, y: 2.9, w: 5.2, h: 3.6,
      fontSize: 10.5, fontFace: 'Calibri', color: TEXT_SLATE
    });

    slide.addNotes('This slide details our deep integration with the required hackathon sponsors. On the left is Zetaris: rather than building slow, fragile ETL pipelines that copy sensitive financial data, Zetaris allows our agents to execute federated SQL joins across ERP, WMS, invoice, and contract datasets on the fly in 12 milliseconds. We support both the live Zetaris Network API and an identical in-memory cross-source mock for seamless offline execution. On the right is the Meterless Engine: Scout establishes audit rules; Relay coordinates agents and data queries; Meterless Nightshift serves as our AI provider, running a 4-stage Race, Judge, Verify, Generate local reasoning cycle that eliminates cloud token costs and produces an immutable cryptographic receipt; and Gaia H-MEM persists audit state across sessions.');
  }

  // =========================================================================
  // SLIDE 6: BUSINESS IMPACT & CONCLUSION
  // =========================================================================
  {
    const slide = pres.addSlide();
    slide.background = { color: BG_DARK };

    addHeader(slide, 'Business Impact', 'Measurable ROI, Defensible Audits, and Live Verification', 'TraceBack AI turns enterprise procurement leakage into measurable cash recovery.');

    // 4 Big Metric Cards
    const metrics = [
      { num: '184ms', label: 'Audit Latency', sub: 'Sub-second reconciliation per purchase order', color: ACCENT_SKY },
      { num: '$1,200', label: 'Recovered / PO', sub: 'Direct cash recovery flagged on PO-1001', color: ACCENT_EMERALD },
      { num: '96.5%', label: 'Audit Confidence', sub: 'Multi-point cross-source corroboration', color: ACCENT_AMBER },
      { num: '0.00%', label: 'False Positives', sub: 'Verified clean on PO-1002 benchmark ($0)', color: ACCENT_PURPLE }
    ];

    metrics.forEach((m, idx) => {
      const mx = 0.8 + idx * 2.98;
      slide.addShape(pres.ShapeType.roundRect, {
        x: mx, y: 1.9, w: 2.85, h: 1.9,
        rectRadius: 0.15,
        fill: { color: CARD_BG },
        line: { color: m.color, width: 1.5 }
      });

      slide.addText(m.num, {
        x: mx + 0.15, y: 2.05, w: 2.55, h: 0.7,
        fontSize: 32, fontFace: 'Calibri', bold: true, color: m.color,
        align: 'center', valign: 'middle'
      });
      slide.addText(m.label, {
        x: mx + 0.15, y: 2.8, w: 2.55, h: 0.3,
        fontSize: 13, fontFace: 'Calibri', bold: true, color: TEXT_WHITE,
        align: 'center'
      });
      slide.addText(m.sub, {
        x: mx + 0.15, y: 3.12, w: 2.55, h: 0.5,
        fontSize: 10, fontFace: 'Calibri', color: TEXT_SLATE,
        align: 'center'
      });
    });

    // Bottom Links & Summary Card
    slide.addShape(pres.ShapeType.roundRect, {
      x: 0.8, y: 4.05, w: 11.73, h: 2.65,
      rectRadius: 0.15,
      fill: { color: CARD_BG_ALT },
      line: { color: '312E81', width: 2 }
    });

    slide.addText('PRODUCTION DEPLOYMENT & VERIFICATION LINKS', {
      x: 1.1, y: 4.25, w: 11.1, h: 0.3,
      fontSize: 11, fontFace: 'Calibri', bold: true, color: ACCENT_SKY
    });

    const links = [
      { name: 'Live Web App (GitHub Pages):', url: 'https://zaintahir2025.github.io/traceback-ai/' },
      { name: 'Interactive Slide Deck:', url: 'https://zaintahir2025.github.io/traceback-ai/presentation.html' },
      { name: '2-Minute Demo Video Walkthrough:', url: 'https://zaintahir2025.github.io/traceback-ai/demo-video.html' },
      { name: 'Full Video MP4 Direct Download:', url: 'https://zaintahir2025.github.io/traceback-ai/traceback-ai-demo.mp4' },
      { name: 'GitHub Source Repository:', url: 'https://github.com/zaintahir2025/traceback-ai' }
    ];

    links.forEach((link, idx) => {
      const ly = 4.65 + idx * 0.36;
      slide.addText(link.name, {
        x: 1.1, y: ly, w: 3.5, h: 0.32,
        fontSize: 11, fontFace: 'Calibri', bold: true, color: TEXT_WHITE
      });
      slide.addText(link.url, {
        x: 4.6, y: ly, w: 7.6, h: 0.32,
        fontSize: 11, fontFace: 'Calibri', color: ACCENT_SKY
      });
    });

    slide.addNotes('To conclude: TraceBack AI converts passive invoice processing into proactive, cash-generating spend defense. With 184-millisecond audit speed, $1,200 recovered per 100 purchase orders, 96.5% audit confidence, and zero false positives, it delivers immediate ROI to procurement organizations. Everything demonstrated is fully open-source, deployed live on GitHub Pages, and verifiable right now. Thank you!');
  }

  // Save to file
  const rootPath = path.resolve('traceback-ai-presentation.pptx');
  const publicPath = path.resolve('frontend/public/traceback-ai-presentation.pptx');
  const docsPath = path.resolve('docs/traceback-ai-presentation.pptx');

  await pres.writeFile({ fileName: rootPath });
  fs.copyFileSync(rootPath, publicPath);
  fs.copyFileSync(rootPath, docsPath);

  const stats = fs.statSync(rootPath);
  console.log('SUCCESS! Generated PowerPoint Presentation:');
  console.log(' - ' + rootPath + ' (' + (stats.size / 1024).toFixed(1) + ' KB)');
  console.log(' - ' + publicPath);
  console.log(' - ' + docsPath);
}

generateSlideDeck().catch(console.error);
