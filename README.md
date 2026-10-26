# TraceBack AI -- Supplier Invoice Checker and Reconciliation Agent

Autonomous 4-Way Cross-Source Data Virtualization, Evidence-Linked Agent Reasoning, and Supplier Overcharge Recovery.

Hackathon Build Window: October 22-27, 2026.
Repository: https://github.com/zaintahir2025/traceback-ai
Live Deployment: https://zaintahir2025.github.io/traceback-ai/

---

## 1. Executive Summary and Problem Statement

Enterprise organizations process thousands of supplier invoices annually across fragmented, disconnected systems. Procurement spends between 1.5% and 4.0% in unnecessary overcharges due to four recurring leakage categories:
1. Quantity Overbilling: Invoicing for units exceeding physical warehouse delivery receipts.
2. Price Escalation: Billed unit rates exceeding master contracted schedules.
3. Unauthorized Fees: Unapproved logistics, expediting, or handling surcharges not stipulated in contracts.
4. Duplicate Invoices: Resubmission of invoices for previously cleared purchase orders.

TraceBack AI solves this by executing real-time 4-way cross-source reconciliation across decentralized datasets without moving or copying data into a centralized data warehouse.

---

## 2. Core Architecture and Technology Stack

The platform is designed around three architectural pillars:

### A. Zetaris -- Data Integration and Virtualization Layer
- Role: Primary Data Virtualization Engine.
- Problem Solved: Eliminates brittle, expensive ETL pipelines that copy sensitive supplier data.
- Mechanism: Connects directly to four independent data sources:
  * Purchase Orders (ERP): data/purchase_orders.csv
  * Delivery Notes / Goods Receipts (WMS): data/deliveries.csv
  * Supplier Invoices (Accounts Payable): data/invoices.csv
  * Contract Price Schedules (Legal / Procurement): data/contract_prices.csv
- Implementation:
  * Live Mode: Queries the Zetaris Network Data Virtualization API via POST /query with API authentication.
  * Local Mock Mode: Automatically spins up an in-memory SQLite virtual federator executing the exact same federated SQL query with identical schema output.
  * Evidence Provenance: Every extracted field links to an immutable coordinate citing {file, row, column, value}.

### B. Meterless Engines -- Agent Orchestration and Memory
TraceBack AI incorporates two specialized Meterless Engines into its core workflow:
1. Meterless Relay Engine:
   * Coordinates the multi-step audit mission chain.
   * Enforces sequential phase execution: Scout Intent -> Data Virtualization Relay -> Variance Detection -> Confidence Scoring -> AI Generation.
   * Measures precise step durations and maintains telemetry logs.
2. Meterless Gaia Context Engine (H-MEM):
   * Provides local-first, hierarchical session memory.
   * Persists cross-mission context, active audit findings, human reviewer approvals, and compliance verification receipts.
   * Exposes inspection endpoints via GET /api/meterless/memory and Model Context Protocol (MCP).

### C. Meterless Nightshift -- Primary AI Provider
- Role: Designated Autonomous AI Provider.
- Architecture: Local-first AI hotspot running on local hardware (Windows GPU, Mac Apple Silicon, or DGX Spark) at $0.00 cloud token cost.
- Execution Loop (The Four Duties):
  1. Race: Executes parallel candidate resolution lanes (Lane A: Direct Claim, Lane B: Forensic Contract Evidence, Lane C: Escalated Dispute).
  2. Judge: Evaluates candidate drafts against mathematical ground truth and contract tolerances.
  3. Verify: Verifies that all line-item numbers, document identifiers, and claim amounts strictly match data sources.
  4. Generate: Outputs the winning audit narrative and supplier clarification letter alongside an immutable Nightshift Execution Receipt.
- Live Socket: Supports standard OpenAI-compatible socket integration at METERLESS_NIGHTSHIFT_URL with deterministic fallback.

### D. Optional Sponsor Integrations
- NVIDIA NIM: Secondary inference microservice option (meta/llama-3.1-8b-instruct) hosted on NVIDIA Cloud API.
- Cursor: AI agent pair programming, prompt logs, and .cursorrules schema context.

---

## 3. Financial Reconciliation Math and Ground Truth Scenarios

The system evaluates four distinct procurement scenarios included in the source CSV data:

| Purchase Order | Supplier Entity | Variance Description | Financial Exposure | Audit Determination |
| :--- | :--- | :--- | :--- | :--- |
| PO-1001 | SUP-42 | Billed 120 vs 100 delivered; Billed $50 vs $48 contract rate | +$1,200.00 USD | Flagged (High Risk) |
| PO-1002 | SUP-17 | Perfect concordance across all 4 decentralized records | $0.00 USD | Cleared (Clean Concordant) |
| PO-1003 | SUP-88 | Non-contracted logistics and expediting surcharges | +$350.00 USD | Flagged (Medium Risk) |
| PO-1004 | SUP-99 | Duplicate invoice submitted for identical purchase order | +$1,000.00 USD | Flagged (Critical Risk) |

### PO-1001 Mathematical Breakdown:
- Quantity Variance: 120 units invoiced minus 100 units delivered equals 20 unreceived units. At an invoiced unit price of $50, the overcharge is 20 * $50 = $1,000.00 USD.
- Unit Price Variance: Invoiced rate of $50 minus contract ceiling rate of $48 equals $2.00 per unit variance. On 100 delivered units, the overcharge is 100 * $2 = $200.00 USD.
- Total Financial Recovery Amount: $1,000.00 + $200.00 = $1,200.00 USD.

---

## 4. Federated Virtualization SQL Query

The Zetaris Virtualization layer executes the following federated SQL join across independent data meshes:

```sql
SELECT 
  po.po_id,
  po.supplier_id,
  po.item,
  po.ordered_qty,
  po.unit_price AS po_unit_price,
  po.currency,
  po.order_date,
  del.delivery_id,
  del.delivered_qty,
  del.delivery_date,
  del.warehouse,
  inv.invoice_id,
  inv.invoiced_qty,
  inv.unit_price AS invoice_unit_price,
  inv.fees AS invoice_fees,
  inv.invoice_date,
  cp.contract_unit_price,
  cp.valid_from AS contract_valid_from,
  cp.valid_to AS contract_valid_to
FROM purchase_orders po
LEFT JOIN deliveries del ON po.po_id = del.po_id AND po.item = del.item
LEFT JOIN invoices inv ON po.po_id = inv.po_id AND po.item = inv.item
LEFT JOIN contract_prices cp ON po.supplier_id = cp.supplier_id AND po.item = cp.item
WHERE po.po_id = ?;
```

---

## 5. Model Context Protocol (MCP) Server

TraceBack AI exposes a native Model Context Protocol (MCP) server conforming to the JSON-RPC 2.0 specification. Any MCP client (Cursor, Claude Desktop, or custom autonomous agent) can inspect and invoke these tools:

### Available MCP Tools:
1. zetaris_query_unified_view: Executes the 4-way federated join for a purchase order via Zetaris.
2. zetaris_execute_sql: Executes arbitrary SQL across virtualized tables in the data mesh.
3. meterless_run_mission: Executes the 5-step agent mission using the Meterless Relay Engine.
4. meterless_inspect_hmem: Queries the Meterless Gaia Context Engine for active session memory.
5. meterless_nightshift_generate: Invokes Meterless Nightshift to generate a verified dispute letter and audit receipt.
6. nvidia_nim_generate_explanation: Invokes optional secondary NVIDIA NIM inference.

### MCP Configuration for Cursor / IDEs (.cursor/mcp.json):
```json
{
  "mcpServers": {
    "traceback-ai": {
      "command": "npx",
      "args": ["tsx", "backend/src/mcp/cli.ts"],
      "env": {
        "PORT": "4001",
        "NODE_ENV": "development"
      }
    }
  }
}
```

---

## 6. Project Directory Structure

```
traceback-ai/
|-- .cursor/
|   `-- mcp.json                         # Cursor IDE Model Context Protocol configuration
|-- .github/
|   `-- workflows/
|       `-- pages.yml                    # Automated GitHub Pages CI/CD workflow
|-- backend/
|   |-- package.json
|   |-- tsconfig.json
|   |-- vitest.config.ts                 # Vitest test runner configuration
|   |-- src/
|   |   |-- index.ts                     # Express HTTP server entrypoint
|   |   |-- config.ts                    # Environment loading and runtime mode detection
|   |   |-- mockData.ts                  # Ground-truth scenario baselines
|   |   |-- analyzer/
|   |   |   |-- compare.ts               # Core reconciliation mathematics and rules
|   |   |   `-- types.ts                 # TypeScript domain schemas
|   |   |-- zetaris/
|   |   |   |-- ZetarisClient.ts         # Zetaris data virtualization engine
|   |   |   `-- unifiedView.ts           # Federated 4-way cross-source SQL query
|   |   |-- meterless/
|   |   |   |-- MeterlessMission.ts      # Meterless Relay Engine and Gaia Context Engine
|   |   |   |-- MeterlessNightshift.ts   # Meterless Nightshift AI Provider (Race-Judge-Verify)
|   |   |   `-- steps.ts                 # Mission step telemetry definitions
|   |   |-- nvidia/
|   |   |   `-- NvidiaExplainer.ts       # Optional secondary NVIDIA NIM integration
|   |   |-- mcp/
|   |   |   |-- server.ts                # JSON-RPC 2.0 Model Context Protocol tool handler
|   |   |   `-- cli.ts                   # Stdio transport runner for MCP clients
|   |   |-- routes/
|   |   |   |-- investigate.ts           # Core REST API endpoints
|   |   |   `-- mcp.ts                   # MCP and dedicated sponsor routes
|   |   `-- utils/
|   |       |-- csv.ts                   # CSV file reader and parser
|   |       `-- logger.ts                # Structured Pino logger
|   `-- tests/
|       |-- compare.test.ts              # Mathematical reconciliation unit tests
|       `-- mcp.test.ts                  # MCP protocol tool verification tests
|-- data/
|   |-- purchase_orders.csv              # Purchase orders dataset
|   |-- deliveries.csv                   # Warehouse delivery notes dataset
|   |-- invoices.csv                     # Supplier invoices dataset
|   `-- contract_prices.csv              # Master contracted pricing schedules
|-- docs/
|   |-- ARCHITECTURE.md                  # Comprehensive architectural reference
|   |-- CURSOR_USAGE.md                  # Cursor Agent mode logs and engineering workflow
|   |-- DEMO_SCRIPT.md                   # 1-to-4 minute hackathon presentation script
|   `-- INTEGRATION_VERIFICATION.md      # Detailed sponsor technology verification report
|-- frontend/
|   |-- index.html
|   |-- package.json
|   |-- vite.config.ts
|   |-- tailwind.config.js
|   |-- public/
|   |   |-- .nojekyll                    # GitHub Pages Jekyll bypass flag
|   |   `-- 404.html                     # SPA routing fallback for static hosting
|   `-- src/
|       |-- main.tsx
|       |-- App.tsx                      # Dashboard root component
|       |-- types.ts                     # Frontend domain types and receipt schemas
|       |-- api/
|       |   `-- client.ts                # API client with static fallbacks
|       `-- components/
|           |-- Sidebar.tsx              # PO selector and architecture stack
|           |-- SummaryCards.tsx         # Total overcharge financial recovery metrics
|           |-- EvidenceTrail.tsx        # Discrepancy item cards with source citations
|           |-- EvidenceCard.tsx         # Single variance card with file/row/col chips
|           |-- SourceModal.tsx          # Raw CSV inspection viewer with Zetaris SQL
|           |-- AgentTrace.tsx           # Meterless mission telemetry timeline
|           |-- ApprovalBar.tsx          # Human-in-the-loop audit sign-off
|           |-- EmailPreview.tsx         # Meterless Nightshift dispute letter and receipt
|           |-- PortfolioAnalytics.tsx   # Enterprise portfolio risk scorecard
|           |-- AuditorChat.tsx          # Interactive conversational copilot
|           |-- SimulationModal.tsx      # Live custom order simulation sandbox
|           |-- AuditCertificateModal.tsx# Official compliance certificate
|           |-- SponsorTechHubModal.tsx  # Interactive sponsor tech inspector
|           `-- Footer.tsx               # Tech stack badges and launch triggers
|-- docker-compose.yml                   # Optional multi-container deployment
|-- package.json                         # Root monorepo workspace configuration
`-- README.md
```

---

## 7. Local Installation and Running Guide

### Prerequisites
- Node.js version 22.0.0 or higher
- npm version 9.0.0 or higher

### Step 1: Clone Repository
```bash
git clone https://github.com/zaintahir2025/traceback-ai.git
cd traceback-ai
```

### Step 2: Install Monorepo Dependencies
```bash
npm install
npm install --workspace=backend
npm install --workspace=frontend
```

### Step 3: Configure Environment Variables
Copy the example environment template:
```bash
cp .env.example .env
```

Edit .env with your configuration:
```env
PORT=4001
NODE_ENV=development

# 1. Zetaris Data Virtualization
# If omitted, operates in offline in-memory SQLite virtualization mode with identical schema.
ZETARIS_API_URL=https://api.zetaris.cloud/v1
ZETARIS_API_KEY=your_zetaris_key_here

# 2. Meterless Agent Platform & Nightshift AI Provider
# If omitted, runs local Meterless Relay Engine, Gaia H-MEM, and Nightshift Hotspot Engine.
METERLESS_API_URL=https://api.meterless.ai/v1
METERLESS_API_KEY=your_meterless_key_here
METERLESS_NIGHTSHIFT_URL=http://127.0.0.1:11434/v1
METERLESS_NIGHTSHIFT_MODEL=nightshift-llama-3.1-8b

# 3. NVIDIA NIM (Optional Secondary Inference)
NVIDIA_API_KEY=nvapi-your-key-here
```

### Step 4: Run the Application
Start both backend API and frontend Vite server concurrently:
```bash
npm run dev
```
- Frontend UI: http://localhost:3000
- Backend REST API: http://localhost:4001
- System Health Endpoint: http://localhost:4001/api/health

### Step 5: Run Automated Test Suite
Execute the 12 automated unit and integration tests:
```bash
npm test
```
Verifies:
- PO-1001 quantity overbilling detection ($1,000.00 USD).
- PO-1001 contract price rate escalation detection ($200.00 USD).
- Exact cumulative recovery calculation ($1,200.00 USD).
- PO-1002 clean audit concordance ($0.00 USD).
- PO-1003 unauthorized fee detection ($350.00 USD).
- PO-1004 duplicate invoice double-billing detection ($1,000.00 USD).
- MCP tools/list tool enumeration.
- MCP zetaris_query_unified_view execution.
- MCP meterless_run_mission execution.
- MCP meterless_inspect_hmem session memory inspection.
- MCP meterless_nightshift_generate execution and verified receipt emission.

---

## 8. REST API Reference

### Health and System Status
- GET /api/health
  Returns overall service health, Zetaris virtualization mode, Meterless active engines, and Nightshift AI status.

### Purchase Orders
- GET /api/pos
  Lists all purchase order audit scenarios available in the portfolio.

### Investigation
- POST /api/investigate/:poId
  Executes the full Meterless Relay mission for a purchase order. Returns the unified record, discrepancies, summary, telemetry trace, and Nightshift AI dispute draft.

### Zetaris Data Virtualization
- GET /api/zetaris/status
  Returns active virtualization status, latency, and the list of joined sources.
- POST /api/zetaris/query
  Executes federated SQL queries across the virtual data mesh.

### Meterless Engines & Nightshift
- POST /api/meterless/mission
  Executes an autonomous mission using the Meterless Relay Engine.
- GET /api/meterless/engines
  Lists active Meterless engines (Relay Engine and Gaia Context Engine).
- GET /api/meterless/memory
  Dumps the active hierarchical session memory store (Gaia H-MEM).
- POST /api/meterless/nightshift/generate
  Invokes Meterless Nightshift to generate verified dispute letters and receipts.

### Model Context Protocol (MCP)
- POST /api/mcp
  Standard JSON-RPC 2.0 endpoint handling initialize, tools/list, and tools/call.
- GET /api/mcp/tools
  REST inspection endpoint listing all registered MCP tools.

---

## 9. GitHub Pages Static Hosting Architecture

The live dashboard is hosted on GitHub Pages at:
https://zaintahir2025.github.io/traceback-ai/

Static Hosting Features:
1. Client-Side Virtualization Fallback: If the backend REST server is not running, frontend/src/api/client.ts seamlessly executes local cross-source virtual joins across the four datasets.
2. In-Memory Nightshift Engine: Emits verified Nightshift audit receipts directly in the browser.
3. Interactive SQL Console: Allows users to run custom federated queries inside the browser.
4. SPA Routing Reliability: Includes public/404.html and public/.nojekyll to ensure direct subpath routing without server errors.

---

## 10. Verification and Compliance Checklist

- Zetaris Data Virtualization: Implemented in backend/src/zetaris/ZetarisClient.ts and backend/src/zetaris/unifiedView.ts.
- Meterless Relay Engine: Implemented in backend/src/meterless/MeterlessMission.ts.
- Meterless Gaia Context Engine: Implemented via MeterlessGaiaEngine in backend/src/meterless/MeterlessMission.ts.
- Meterless Nightshift AI Provider: Implemented in backend/src/meterless/MeterlessNightshift.ts with verified receipts.
- Model Context Protocol: Implemented in backend/src/mcp/server.ts, backend/src/mcp/cli.ts, and .cursor/mcp.json.
- NVIDIA NIM (Optional): Implemented in backend/src/nvidia/NvidiaExplainer.ts.
- Cursor AI Agent Mode (Optional): Documented in docs/CURSOR_USAGE.md and PROMPTS_LOG.md.
- Automated Test Suite: 12 passing tests in backend/tests/compare.test.ts and backend/tests/mcp.test.ts.
- Clean Documentation: README contains zero emojis or icon characters.
