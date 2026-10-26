import { describe, it, expect } from "vitest";
import { handleMcpJsonRpc, MCP_TOOLS } from "../src/mcp/server.js";

describe("Model Context Protocol (MCP) Server for TraceBack AI", () => {
  it("should list available MCP tools", async () => {
    const res = await handleMcpJsonRpc({
      jsonrpc: "2.0",
      id: 1,
      method: "tools/list"
    });

    expect(res.jsonrpc).toBe("2.0");
    expect(res.id).toBe(1);
    expect(res.result.tools).toBeDefined();
    expect(res.result.tools.length).toBeGreaterThanOrEqual(4);

    const toolNames = res.result.tools.map((t: any) => t.name);
    expect(toolNames).toContain("zetaris_query_unified_view");
    expect(toolNames).toContain("meterless_run_mission");
    expect(toolNames).toContain("meterless_inspect_hmem");
    expect(toolNames).toContain("nvidia_nim_generate_explanation");
  });

  it("should execute zetaris_query_unified_view via MCP call", async () => {
    const res = await handleMcpJsonRpc({
      jsonrpc: "2.0",
      id: 2,
      method: "tools/call",
      params: {
        name: "zetaris_query_unified_view",
        arguments: { poId: "PO-1001" }
      }
    });

    expect(res.jsonrpc).toBe("2.0");
    expect(res.result.content[0].type).toBe("text");
    const data = JSON.parse(res.result.content[0].text);
    expect(data.poId).toBe("PO-1001");
    expect(data.provider).toContain("Zetaris");
    expect(data.unifiedRecord.orderedQty).toBe(120);
    expect(data.unifiedRecord.deliveredQty).toBe(100);
  });

  it("should execute meterless_run_mission via MCP call", async () => {
    const res = await handleMcpJsonRpc({
      jsonrpc: "2.0",
      id: 3,
      method: "tools/call",
      params: {
        name: "meterless_run_mission",
        arguments: { poId: "PO-1001" }
      }
    });

    expect(res.jsonrpc).toBe("2.0");
    const data = JSON.parse(res.result.content[0].text);
    expect(data.provider).toContain("Meterless");
    expect(data.stepsCount).toBe(5);
    expect(data.totalFinancialImpact).toBe(1200);
  });

  it("should inspect H-MEM session memory via MCP call", async () => {
    const res = await handleMcpJsonRpc({
      jsonrpc: "2.0",
      id: 4,
      method: "tools/call",
      params: {
        name: "meterless_inspect_hmem",
        arguments: {}
      }
    });

    expect(res.jsonrpc).toBe("2.0");
    const data = JSON.parse(res.result.content[0].text);
    expect(data.provider).toContain("Meterless");
    expect(Array.isArray(data.keys)).toBe(true);
  });

  it("should execute meterless_nightshift_generate via MCP call", async () => {
    const res = await handleMcpJsonRpc({
      jsonrpc: "2.0",
      id: 5,
      method: "tools/call",
      params: {
        name: "meterless_nightshift_generate",
        arguments: { poId: "PO-1001" }
      }
    });

    expect(res.jsonrpc).toBe("2.0");
    const data = JSON.parse(res.result.content[0].text);
    expect(data.provider).toContain("Meterless Nightshift");
    expect(data.receipt).toBeDefined();
    expect(data.receipt.status).toBe("VERIFIED");
    expect(data.receipt.tokenCost).toContain("$0.00");
  });
});
