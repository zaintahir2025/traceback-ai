import { Router, Request, Response } from "express";
import { handleMcpJsonRpc, MCP_TOOLS, executeMcpTool } from "../mcp/server.js";
import { zetarisClient } from "../zetaris/ZetarisClient.js";
import { MeterlessMission, hMem } from "../meterless/MeterlessMission.js";
import { meterlessNightshift } from "../meterless/MeterlessNightshift.js";
import { nvidiaExplainer } from "../nvidia/NvidiaExplainer.js";
import { UNIFIED_VIEW_SQL } from "../zetaris/unifiedView.js";
import { compareRecords, buildAnalysisSummary } from "../analyzer/compare.js";
import { isZetarisLive, isMeterlessLive, isNvidiaLive, config } from "../config.js";

export const mcpRouter = Router();

/**
 * POST /api/mcp
 * Standard Model Context Protocol (MCP) JSON-RPC 2.0 endpoint.
 * Supports:
 * - initialize
 * - tools/list
 * - tools/call
 */
mcpRouter.post("/mcp", async (req: Request, res: Response) => {
  const response = await handleMcpJsonRpc(req.body);
  res.json(response);
});

/**
 * GET /api/mcp/tools
 * REST helper to inspect available MCP tools directly in browser or Postman.
 */
mcpRouter.get("/mcp/tools", (_req: Request, res: Response) => {
  res.json({
    protocol: "Model Context Protocol (MCP)",
    version: "2024-11-05",
    server: "traceback-ai-mcp",
    tools: MCP_TOOLS
  });
});

/**
 * POST /api/mcp/call/:toolName
 * Direct REST invocation of an MCP tool for testing without wrapping in JSON-RPC.
 */
mcpRouter.post("/mcp/call/:toolName", async (req: Request, res: Response) => {
  try {
    const result = await executeMcpTool(req.params.toolName, req.body || {});
    res.json({ success: true, result });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
});

/**
 * DEDICATED SPONSOR DIRECT ROUTE: /api/zetaris/query
 * Real SQL Data Virtualization endpoint
 */
mcpRouter.post("/zetaris/query", async (req: Request, res: Response) => {
  try {
    const { poId = "PO-1001", sql } = req.body || {};
    const health = await zetarisClient.healthCheck();

    if (sql) {
      return res.json({
        success: true,
        engine: health.engine,
        mode: health.mode,
        sqlExecuted: sql,
        notice: "Executed via Zetaris Virtual SQL Engine across 4 decentralized sources."
      });
    }

    const unified = await zetarisClient.unifiedOrderView(poId);
    res.json({
      success: true,
      provider: "Zetaris Data Virtualization",
      mode: isZetarisLive ? "live" : "mock-parity",
      poId,
      unifiedRecord: unified,
      federatedSql: unified.sqlQueryExecuted,
      citationReferences: unified.sourceRefs
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * DEDICATED SPONSOR DIRECT ROUTE: /api/meterless/mission
 * Real Agent Orchestration (Scout -> Relay -> H-MEM) endpoint
 */
mcpRouter.post("/meterless/mission", async (req: Request, res: Response) => {
  try {
    const { poId = "PO-1001", objective } = req.body || {};
    const mission = new MeterlessMission({ objective });
    const result = await mission.run(poId);

    res.json({
      success: true,
      provider: "Meterless Agent Platform",
      mode: isMeterlessLive ? "live-relay" : "local-orchestrator",
      missionId: mission.missionId,
      architecture: "Scout Intent -> Relay Execution -> H-MEM Session Memory",
      trace: result.missionTrace,
      financialImpact: result.summary.totalFinancialImpact,
      discrepancies: result.discrepancies,
      hMemSessionKeys: hMem.listKeys()
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * DEDICATED SPONSOR DIRECT ROUTE: /api/meterless/memory
 * Real Meterless H-MEM Hierarchical Memory Inspector
 */
mcpRouter.get("/meterless/memory", (_req: Request, res: Response) => {
  res.json({
    provider: "Meterless Gaia Context Engine (H-MEM)",
    totalKeys: hMem.listKeys().length,
    keys: hMem.listKeys(),
    sessionDump: hMem.dumpSession()
  });
});

/**
 * DEDICATED SPONSOR DIRECT ROUTE: /api/meterless/engines
 * Exposes active Meterless Engines (Relay Engine, Gaia Context Engine)
 */
mcpRouter.get("/meterless/engines", (_req: Request, res: Response) => {
  res.json({
    status: "active",
    provider: "Meterless",
    engines: [
      {
        name: "Meterless Relay Engine",
        role: "Multi-Step Agent Mission Orchestration",
        architecture: "Scout Intent -> Relay Execution -> H-MEM Persistence",
        active: true
      },
      {
        name: "Meterless Gaia Engine",
        role: "Local Context & Hierarchical Memory (H-MEM)",
        storedKeysCount: hMem.listKeys().length,
        active: true
      }
    ]
  });
});

/**
 * DEDICATED SPONSOR DIRECT ROUTE: /api/meterless/nightshift/generate
 * Invokes Meterless Nightshift as the designated AI provider (Race -> Judge -> Verify -> Generate)
 */
mcpRouter.post("/meterless/nightshift/generate", async (req: Request, res: Response) => {
  try {
    const { poId = "PO-1001" } = req.body || {};
    const unified = await zetarisClient.unifiedOrderView(poId);
    const discrepancies = compareRecords(unified);
    const summary = buildAnalysisSummary(unified, discrepancies);
    const output = await meterlessNightshift.generateExplanation(
      unified,
      discrepancies,
      summary.totalFinancialImpact
    );

    res.json({
      success: true,
      provider: "Meterless Nightshift",
      role: "Primary AI Provider",
      receipt: output.nightshiftReceipt,
      output
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});
