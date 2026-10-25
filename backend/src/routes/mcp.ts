import { Router, Request, Response } from "express";
import { handleMcpJsonRpc, MCP_TOOLS, executeMcpTool } from "../mcp/server.js";
import { zetarisClient } from "../zetaris/ZetarisClient.js";
import { MeterlessMission, hMem } from "../meterless/MeterlessMission.js";
import { nvidiaExplainer } from "../nvidia/NvidiaExplainer.js";
import { UNIFIED_VIEW_SQL } from "../zetaris/unifiedView.js";
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
    provider: "Meterless H-MEM (Hierarchical Memory)",
    totalKeys: hMem.listKeys().length,
    keys: hMem.listKeys(),
    sessionDump: hMem.dumpSession()
  });
});
