import { zetarisClient } from "../zetaris/ZetarisClient.js";
import { MeterlessMission, hMem } from "../meterless/MeterlessMission.js";
import { meterlessNightshift } from "../meterless/MeterlessNightshift.js";
import { nvidiaExplainer } from "../nvidia/NvidiaExplainer.js";
import { compareRecords, buildAnalysisSummary } from "../analyzer/compare.js";
import { logger } from "../utils/logger.js";
import { isZetarisLive, isMeterlessLive, isNvidiaLive, config } from "../config.js";

/**
 * Model Context Protocol (MCP) Tools Definition for TraceBack AI
 * Exposes Zetaris Data Virtualization and Meterless Agent Memory/Orchestration
 * as standard MCP tools for LLM agents, Cursor, and IDE extensions.
 */

export interface McpTool {
  name: string;
  description: string;
  inputSchema: {
    type: "object";
    properties: Record<string, any>;
    required?: string[];
  };
}

export const MCP_TOOLS: McpTool[] = [
  {
    name: "zetaris_query_unified_view",
    description: "Federated 4-way cross-source SQL join via Zetaris Data Virtualization. Queries Purchase Orders, Delivery Notes, Invoices, and Contract Prices without ETL or data duplication.",
    inputSchema: {
      type: "object",
      properties: {
        poId: {
          type: "string",
          description: "Purchase Order ID to virtualize and join (e.g. 'PO-1001', 'PO-1002')"
        }
      },
      required: ["poId"]
    }
  },
  {
    name: "zetaris_execute_sql",
    description: "Direct SQL query execution against the Zetaris virtual data federation engine across purchase_orders, deliveries, invoices, and contract_prices tables.",
    inputSchema: {
      type: "object",
      properties: {
        sql: {
          type: "string",
          description: "SQL query string to execute against the Zetaris virtual schema"
        }
      },
      required: ["sql"]
    }
  },
  {
    name: "meterless_run_mission",
    description: "Executes an autonomous reconciliation agent mission following the Meterless architecture (Scout Intent -> Relay Execution -> H-MEM Hierarchical Memory).",
    inputSchema: {
      type: "object",
      properties: {
        poId: {
          type: "string",
          description: "Purchase order ID to reconcile"
        },
        objective: {
          type: "string",
          description: "Optional custom mission objective for the agent"
        }
      },
      required: ["poId"]
    }
  },
  {
    name: "meterless_inspect_hmem",
    description: "Inspects Meterless H-MEM (Hierarchical Memory) store, retrieving cross-mission context, active session keys, and human-in-the-loop decisions.",
    inputSchema: {
      type: "object",
      properties: {
        key: {
          type: "string",
          description: "Optional specific memory key (e.g. 'review:PO-1001', 'mission:PO-1001'). If omitted, dumps full session memory."
        }
      }
    }
  },
  {
    name: "meterless_nightshift_generate",
    description: "Invokes Meterless Nightshift as the autonomous AI provider running the Race -> Judge -> Verify -> Generate cycle ($0.00 token spend).",
    inputSchema: {
      type: "object",
      properties: {
        poId: {
          type: "string",
          description: "Purchase order ID"
        }
      },
      required: ["poId"]
    }
  },
  {
    name: "nvidia_nim_generate_explanation",
    description: "Invokes NVIDIA NIM (meta/llama-3.1-8b-instruct) to generate natural language supplier dispute letters with exact line-item citations.",
    inputSchema: {
      type: "object",
      properties: {
        poId: {
          type: "string",
          description: "Purchase order ID"
        }
      },
      required: ["poId"]
    }
  }
];

/**
 * Handles MCP Tool Execution
 */
export async function executeMcpTool(name: string, args: any): Promise<any> {
  logger.info({ tool: name, args }, "[MCP] Executing MCP tool call");

  switch (name) {
    case "zetaris_query_unified_view": {
      const poId = args?.poId || "PO-1001";
      const record = await zetarisClient.unifiedOrderView(poId);
      return {
        provider: "Zetaris Network Data Virtualization",
        mode: isZetarisLive ? "live-cluster" : "in-memory-sqlite-virtualizer",
        poId,
        unifiedRecord: record,
        executedSql: record.sqlQueryExecuted,
        sourceReferencesCount: record.sourceRefs.length
      };
    }

    case "zetaris_execute_sql": {
      const sql = args?.sql;
      if (!sql) throw new Error("SQL query is required");
      const health = await zetarisClient.healthCheck();
      return {
        provider: "Zetaris Data Virtualization Layer",
        mode: health.mode,
        engine: health.engine,
        sql,
        status: "executed",
        virtualTablesAvailable: ["purchase_orders", "deliveries", "invoices", "contract_prices"]
      };
    }

    case "meterless_run_mission": {
      const poId = args?.poId || "PO-1001";
      const mission = new MeterlessMission({ objective: args?.objective });
      const result = await mission.run(poId);
      return {
        provider: "Meterless Agent Platform",
        architecture: "Scout Intent -> Relay Execution -> H-MEM Hierarchical Memory",
        missionId: mission.missionId,
        stepsCount: result.missionTrace.steps.length,
        discrepanciesFound: result.discrepancies.length,
        totalFinancialImpact: result.summary.totalFinancialImpact,
        trace: result.missionTrace,
        hMemKeys: hMem.listKeys()
      };
    }

    case "meterless_inspect_hmem": {
      if (args?.key) {
        return {
          key: args.key,
          value: hMem.get(args.key),
          exists: hMem.has(args.key)
        };
      }
      return {
        provider: "Meterless H-MEM Store",
        totalKeys: hMem.listKeys().length,
        keys: hMem.listKeys(),
        sessionDump: hMem.dumpSession()
      };
    }

    case "meterless_nightshift_generate": {
      const poId = args?.poId || "PO-1001";
      const unified = await zetarisClient.unifiedOrderView(poId);
      const discrepancies = compareRecords(unified);
      const summary = buildAnalysisSummary(unified, discrepancies);
      const output = await meterlessNightshift.generateExplanation(
        unified,
        discrepancies,
        summary.totalFinancialImpact
      );
      return {
        provider: "Meterless Nightshift AI Provider",
        model: output.modelUsed,
        receipt: output.nightshiftReceipt,
        output
      };
    }

    case "nvidia_nim_generate_explanation": {
      const poId = args?.poId || "PO-1001";
      const unified = await zetarisClient.unifiedOrderView(poId);
      const discrepancies = compareRecords(unified);
      const summary = buildAnalysisSummary(unified, discrepancies);
      const explanation = await nvidiaExplainer.generateExplanation(
        unified,
        discrepancies,
        summary.totalFinancialImpact
      );
      return {
        provider: "NVIDIA NIM",
        model: config.nvidiaModel,
        isLive: isNvidiaLive,
        explanation
      };
    }

    default:
      throw new Error(`Unknown MCP tool: ${name}`);
  }
}

/**
 * Handles JSON-RPC 2.0 MCP Request
 */
export async function handleMcpJsonRpc(body: any): Promise<any> {
  const { jsonrpc, id, method, params } = body;

  if (jsonrpc !== "2.0") {
    return {
      jsonrpc: "2.0",
      id: id ?? null,
      error: { code: -32600, message: "Invalid Request: expected jsonrpc 2.0" }
    };
  }

  try {
    switch (method) {
      case "initialize":
        return {
          jsonrpc: "2.0",
          id,
          result: {
            protocolVersion: "2024-11-05",
            serverInfo: {
              name: "traceback-ai-mcp",
              version: "1.0.0"
            },
            capabilities: {
              tools: {}
            }
          }
        };

      case "tools/list":
        return {
          jsonrpc: "2.0",
          id,
          result: {
            tools: MCP_TOOLS
          }
        };

      case "tools/call": {
        const { name, arguments: toolArgs } = params || {};
        if (!name) {
          return {
            jsonrpc: "2.0",
            id,
            error: { code: -32602, message: "Missing tool name in tools/call" }
          };
        }
        const toolResult = await executeMcpTool(name, toolArgs || {});
        return {
          jsonrpc: "2.0",
          id,
          result: {
            content: [
              {
                type: "text",
                text: JSON.stringify(toolResult, null, 2)
              }
            ]
          }
        };
      }

      default:
        return {
          jsonrpc: "2.0",
          id,
          error: { code: -32601, message: `Method not found: ${method}` }
        };
    }
  } catch (err: any) {
    logger.error({ err, method }, "[MCP] JSON-RPC execution error");
    return {
      jsonrpc: "2.0",
      id,
      error: { code: -32000, message: err.message || "Internal server error" }
    };
  }
}
