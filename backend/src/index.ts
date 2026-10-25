import express from "express";
import cors from "cors";
import { config, logSystemModes } from "./config.js";
import { logger } from "./utils/logger.js";
import { router as investigateRouter } from "./routes/investigate.js";
import { mcpRouter } from "./routes/mcp.js";

const app = express();

app.use(cors());
app.use(express.json());

// Request logger middleware
app.use((req, _res, next) => {
  logger.debug(`${req.method} ${req.url}`);
  next();
});

// Mount API routes
app.use("/api", investigateRouter);
app.use("/api", mcpRouter);

// Root informational endpoint
app.get("/", (_req, res) => {
  res.json({
    service: "TraceBack AI Backend API",
    status: "running",
    hackathonWindow: "Oct 22–27, 2026",
    sponsorTechIntegrations: {
      zetaris: "Data Virtualization / 4-Way Cross-Source Federated SQL (ZetarisClient)",
      meterless: "Agent Mission Orchestration & H-MEM Memory (MeterlessMission)",
      nvidia: "NVIDIA NIM Inference (meta/llama-3.1-8b-instruct)",
      mcp: "Model Context Protocol JSON-RPC 2.0 Server (/api/mcp)"
    },
    endpoints: {
      health: "/api/health",
      pos: "/api/pos",
      investigate: "/api/investigate/:poId",
      rawSource: "/api/raw-source/:file",
      review: "/api/review/:poId",
      zetarisStatus: "/api/zetaris/status",
      zetarisQuery: "/api/zetaris/query",
      meterlessMission: "/api/meterless/mission",
      meterlessMemory: "/api/meterless/memory",
      mcpRpc: "/api/mcp",
      mcpTools: "/api/mcp/tools"
    }
  });
});

// Error handling middleware
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  logger.error({ err }, "Unhandled server error");
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message || "An unexpected error occurred"
  });
});

app.listen(config.port, () => {
  logSystemModes();
  logger.info(`Server listening on http://localhost:${config.port}`);
});

export default app;
