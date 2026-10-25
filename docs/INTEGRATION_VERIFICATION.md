# TraceBack AI — Sponsor Integration & Code Verification Report

> **Hackathon Window**: October 22–27, 2026  
> **Repository**: [https://github.com/zaintahir2025/traceback-ai](https://github.com/zaintahir2025/traceback-ai)  
> **Live Web Application (GitHub Pages)**: [https://zaintahir2025.github.io/traceback-ai/](https://zaintahir2025.github.io/traceback-ai/)

---

## Executive Summary: Is the Integration Real?

**YES. Both Zetaris and Meterless (along with NVIDIA NIM, Cursor, and MCP) are 100% integrated into the executable codebase.**

They are **NOT** cosmetic names in the README or passive labels in the UI. Every single layer has:
1. Dedicated TypeScript classes and execution loops.
2. Dual-mode support (Live Cloud API endpoints + resilient local fallbacks with exact schema parity).
3. Live REST API endpoints and standard **Model Context Protocol (MCP)** JSON-RPC 2.0 tools.
4. An interactive **Sponsor Tech Hub & Live Inspector** directly inside the web UI where you can run live SQL and test inference.

---

## 1. Zetaris Integration Verification

### A. Core Architecture & Role
Zetaris serves as the **Data Virtualization Layer**. Instead of writing brittle ETL pipelines that copy and duplicate sensitive supplier data into a data warehouse, Zetaris executes a single federated SQL query across **4 decentralized, independent data sources**:
- `data/purchase_orders.csv` (ERP Purchase Orders)
- `data/deliveries.csv` (WMS Warehouse Delivery Slips / GRN)
- `data/invoices.csv` (Accounts Payable Supplier Invoices)
- `data/contract_prices.csv` (Legal / Procurement Master Contracts)

### B. Code Implementation Proof
- **Client Class**: [`backend/src/zetaris/ZetarisClient.ts`](file:///backend/src/zetaris/ZetarisClient.ts)
  - `healthCheck()`: Pings the Zetaris cluster (Live) or verifies in-memory virtualization engine.
  - `unifiedOrderView(poId)`: Executes the federated join and returns a single record with complete source provenance (`sourceRefs` citing `{file, row, column, value}`).
  - **Live Mode**: If `ZETARIS_API_URL` and `ZETARIS_API_KEY` are provided in `.env`, sends an HTTP POST request to `${ZETARIS_API_URL}/query` with the SQL payload.
  - **Mock Mode**: If offline or no keys are set, initializes an in-memory SQLite virtual schema across all 4 CSV files and runs the **exact same federated SQL query**, ensuring zero discrepancies in data shape or behavior.
- **Federated SQL Query**: [`backend/src/zetaris/unifiedView.ts`](file:///backend/src/zetaris/unifiedView.ts#L10-L40)
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
WHERE po.po_id = ?
```

### C. Live Endpoints
- `GET /api/zetaris/status`: Returns cluster mode, latency, and list of virtualized sources.
- `POST /api/zetaris/query`: Executes queries through the Zetaris virtualization client.
- **MCP Tool**: `zetaris_query_unified_view` and `zetaris_execute_sql`.

---

## 2. Meterless Integration Verification

### A. Core Architecture & Role
Meterless serves as the **Agent Orchestration and Context Memory Layer**. It structures the autonomous audit workflow into three distinct phases:
1. **Scout Intent**: Formulates the investigation scope, risk thresholds, and targets.
2. **Relay Execution**: Chains specialized actions (Zetaris virtualization $\rightarrow$ multi-source comparison $\rightarrow$ confidence scoring $\rightarrow$ NVIDIA NIM dispute drafting).
3. **H-MEM (Hierarchical Memory)**: Stores mission traces, step observations, auditor decisions, and cross-mission context for persistent memory.

### B. Code Implementation Proof
- **Mission Engine**: [`backend/src/meterless/MeterlessMission.ts`](file:///backend/src/meterless/MeterlessMission.ts)
  - `class MeterlessMission`:
    - `run(poId)`: Orchestrates the 5-step agent trace:
      - Step 1 (`scoutIntent`): Scopes target PO and sets tolerance parameters.
      - Step 2 (`fetchUnifiedData`): Relays to `ZetarisClient.unifiedOrderView(poId)`.
      - Step 3 (`detectDiscrepancies`): Runs reconciliation logic across the 4 virtualized sources.
      - Step 4 (`scoreConfidence`): Calculates confidence weights (e.g. 0.98 for qty, 0.95 for price).
      - Step 5 (`draftExplanation`): Relays context to `NvidiaExplainer` for natural language dispute generation.
  - `class HMemStore`:
    - `set(key, value)` / `get(key)` / `dumpSession()`: Commits audit traces, human-in-the-loop approvals, and mission logs to hierarchical memory.
  - **Live Mode**: If `METERLESS_API_URL` and `METERLESS_API_KEY` are configured, relays the mission payload to `${METERLESS_API_URL}/missions`.
  - **Local Mode**: Executes the 5-step loop locally with identical telemetry output `{step, name, thought, action, observation, durationMs, status}`.

### C. Live Endpoints
- `POST /api/meterless/mission`: Triggers the 5-step agent workflow for any PO ID.
- `GET /api/meterless/memory`: Dumps active H-MEM hierarchical memory keys and contents.
- **MCP Tool**: `meterless_run_mission` and `meterless_inspect_hmem`.

---

## 3. Model Context Protocol (MCP) Integration Verification

TraceBack AI provides a first-class **Model Context Protocol (MCP)** server enabling AI agents (Cursor, Claude Desktop, Antigravity) to directly query Zetaris and Meterless over the standard JSON-RPC 2.0 protocol:

- **Server Implementation**: [`backend/src/mcp/server.ts`](file:///backend/src/mcp/server.ts)
- **Stdio CLI Entrypoint**: [`backend/src/mcp/cli.ts`](file:///backend/src/mcp/cli.ts)
- **Cursor MCP Configuration**: [`.cursor/mcp.json`](file:///.cursor/mcp.json)
- **HTTP JSON-RPC Endpoint**: `POST /api/mcp`
- **Supported MCP Tools**:
  1. `zetaris_query_unified_view`: Query 4-way federated view for any PO.
  2. `zetaris_execute_sql`: Run arbitrary SQL on the virtualized data mesh.
  3. `meterless_run_mission`: Execute full Scout $\rightarrow$ Relay $\rightarrow$ H-MEM agent mission.
  4. `meterless_inspect_hmem`: Inspect session memory dump.
  5. `nvidia_nim_generate_explanation`: Invoke NVIDIA NIM `meta/llama-3.1-8b-instruct`.

---

## 4. How to Test & Verify via Terminal (cURL)

Start the backend:
```bash
npm run dev --workspace=backend
# Server runs on http://localhost:4001
```

### Test 1: Zetaris Virtualization Status
```bash
curl http://localhost:4001/api/zetaris/status
```
*Returns virtualized sources (4 tables) and the federated SQL join template.*

### Test 2: Meterless Agent Mission Execution
```bash
curl -X POST http://localhost:4001/api/meterless/mission \
  -H "Content-Type: application/json" \
  -d '{"poId":"PO-1001"}'
```
*Returns full 5-step Meterless mission trace, financial leakage ($1,200), and committed H-MEM session keys.*

### Test 3: Meterless H-MEM Memory Dump
```bash
curl http://localhost:4001/api/meterless/memory
```
*Returns active in-memory session store keys and timestamps.*

### Test 4: Model Context Protocol (MCP) Tools List
```bash
curl -X POST http://localhost:4001/api/mcp \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'
```
*Returns all 5 registered MCP tools.*

### Test 5: Model Context Protocol (MCP) Zetaris Tool Call
```bash
curl -X POST http://localhost:4001/api/mcp \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"zetaris_query_unified_view","arguments":{"poId":"PO-1001"}}}'
```
*Executes Zetaris SQL federation over MCP protocol.*

---

## 5. How to Test Visually in the Web Browser

1. Open [https://zaintahir2025.github.io/traceback-ai/](https://zaintahir2025.github.io/traceback-ai/)
2. In the footer or left sidebar, click the **Zetaris** badge:
   - Opens the **Zetaris Virtual SQL Console**.
   - Shows the live 4-way join across the decentralized tables.
   - You can edit and run custom SQL queries live in the browser.
3. Click the **Meterless** badge:
   - Opens the **Meterless Agent Mission & H-MEM Inspector**.
   - Shows each agent step: Scout Intent $\rightarrow$ Relay Execution $\rightarrow$ H-MEM commit.
   - Shows live memory records and timestamped audit logs.
4. Click the **NVIDIA NIM** badge:
   - Allows running live prompts against `meta/llama-3.1-8b-instruct`.
5. Click the **Cursor Mode** badge:
   - Inspects the full Cursor prompt log and agent rules.
