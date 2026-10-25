#!/usr/bin/env node
import * as readline from "readline";
import { handleMcpJsonRpc } from "./server.js";

/**
 * TraceBack AI — Stdio Model Context Protocol (MCP) Server
 * Can be connected directly to Cursor, Claude Desktop, or any MCP client via stdio.
 */

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on("line", async (line) => {
  if (!line.trim()) return;
  try {
    const request = JSON.parse(line);
    const response = await handleMcpJsonRpc(request);
    process.stdout.write(JSON.stringify(response) + "\n");
  } catch (err: any) {
    const errorResponse = {
      jsonrpc: "2.0",
      id: null,
      error: {
        code: -32700,
        message: "Parse error: " + (err.message || "Invalid JSON")
      }
    };
    process.stdout.write(JSON.stringify(errorResponse) + "\n");
  }
});
