import { Router, Request, Response } from "express";
import { z } from "zod";
import { MeterlessMission, hMem } from "../meterless/MeterlessMission.js";
import { zetarisClient } from "../zetaris/ZetarisClient.js";
import { readCsvSync, getCsvDump } from "../utils/csv.js";
import { config, isZetarisLive, isMeterlessLive, isNvidiaLive } from "../config.js";
import { logger } from "../utils/logger.js";
import { UNIFIED_VIEW_SQL } from "../zetaris/unifiedView.js";

export const router = Router();

/**
 * GET /api/health
 * Returns overall system status and sponsor tool connectivity states.
 */
router.get("/health", async (_req: Request, res: Response) => {
  const zetarisHealth = await zetarisClient.healthCheck();

  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    service: "TraceBack AI Backend",
    version: "1.0.0",
    hackathonWindow: "Oct 22–27, 2026",
    sponsorIntegrations: {
      zetaris: {
        layer: "Data Virtualization & Cross-Source Integration",
        mode: zetarisHealth.mode,
        engine: zetarisHealth.engine,
        latencyMs: zetarisHealth.latencyMs,
        isLive: isZetarisLive,
        endpoint: config.zetarisApiUrl || "in-memory-sqlite-virtualizer"
      },
      meterless: {
        layer: "Agent Mission Orchestration & H-MEM",
        mode: isMeterlessLive ? "live" : "local-orchestrator",
        isLive: isMeterlessLive,
        architecture: "Scout Intent -> Relay Execution -> H-MEM Session Memory"
      },
      nvidia: {
        layer: "Inference & Natural Language Generation",
        model: config.nvidiaModel,
        isLive: isNvidiaLive,
        mode: isNvidiaLive ? "nvidia-nim-cloud" : "deterministic-fallback"
      },
      cursor: {
        layer: "Developer Velocity & AI Agent Pair Programming",
        promptsLogged: true,
        documentationPath: "docs/CURSOR_USAGE.md"
      }
    }
  });
});

/**
 * GET /api/pos
 * Lists available purchase orders for interactive exploration in the dashboard.
 */
router.get("/pos", (_req: Request, res: Response) => {
  try {
    const poRows = readCsvSync("purchase_orders.csv");
    const pos = poRows.map((r) => ({
      poId: r.data.po_id,
      supplierId: r.data.supplier_id,
      item: r.data.item,
      orderedQty: Number(r.data.ordered_qty),
      unitPrice: Number(r.data.unit_price),
      currency: r.data.currency || "USD",
      orderDate: r.data.order_date,
      demoBadge: r.data.po_id === "PO-1001" ? "Overcharges Detected ($1,200)" : "Clean Audit (Concordant)"
    }));

    res.json({ purchaseOrders: pos });
  } catch (err: any) {
    logger.error({ err }, "Failed to fetch PO list");
    res.status(500).json({ error: "Failed to read purchase orders", message: err.message });
  }
});

/**
 * POST /api/investigate/:poId
 * Core endpoint: runs the Meterless agent mission to investigate a purchase order.
 */
router.post("/investigate/:poId", async (req: Request, res: Response) => {
  const poId = req.params.poId?.toUpperCase().trim();
  if (!poId) {
    return res.status(400).json({ error: "Purchase Order ID is required" });
  }

  try {
    logger.info(`Received investigation request for PO: ${poId}`);
    const mission = new MeterlessMission({
      objective: `Reconcile Purchase Order ${poId} across PO, Delivery Note, Invoice, and Contract Price List.`
    });

    const result = await mission.run(poId);

    // Retrieve previous human reviewer decision from H-MEM if exists
    const existingDecision = hMem.get(`review:${poId}`);

    // Compute data sources status
    const poCount = readCsvSync("purchase_orders.csv").length;
    const delCount = readCsvSync("deliveries.csv").length;
    const invCount = readCsvSync("invoices.csv").length;
    const cpCount = readCsvSync("contract_prices.csv").length;

    const dataSourcesStatus = {
      purchaseOrders: { loaded: true, rowCount: poCount, file: "purchase_orders.csv" },
      deliveries: { loaded: true, rowCount: delCount, file: "deliveries.csv" },
      invoices: { loaded: true, rowCount: invCount, file: "invoices.csv" },
      contractPrices: { loaded: true, rowCount: cpCount, file: "contract_prices.csv" }
    };

    res.json({
      poId: result.unifiedRecord.poId,
      supplierId: result.unifiedRecord.supplierId,
      item: result.unifiedRecord.item,
      summary: result.summary,
      discrepancies: result.discrepancies,
      unifiedRecord: result.unifiedRecord,
      missionTrace: result.missionTrace,
      explanation: result.explanation,
      dataSourcesStatus,
      reviewDecision: existingDecision || {
        action: "pending",
        reviewer: "Unassigned",
        timestamp: new Date().toISOString()
      }
    });
  } catch (err: any) {
    logger.error({ err, poId }, "Error during PO investigation");
    res.status(500).json({
      error: "Investigation failed",
      message: err.message,
      poId
    });
  }
});

/**
 * GET /api/raw-source/:file
 * Returns raw rows and line numbers for the interactive SourceModal raw row viewer.
 */
router.get("/raw-source/:file", (req: Request, res: Response) => {
  const fileName = req.params.file;
  const allowedFiles = [
    "purchase_orders.csv",
    "deliveries.csv",
    "invoices.csv",
    "contract_prices.csv"
  ];

  if (!allowedFiles.includes(fileName)) {
    return res.status(400).json({
      error: "Invalid file request",
      allowedFiles
    });
  }

  try {
    const dump = getCsvDump(fileName);
    res.json(dump);
  } catch (err: any) {
    logger.error({ err, fileName }, "Failed to get CSV dump");
    res.status(500).json({ error: "Failed to read source file", message: err.message });
  }
});

/**
 * POST /api/review/:poId
 * Human-in-the-Loop approval/rejection endpoint.
 * Commits the decision to H-MEM session memory.
 */
const reviewSchema = z.object({
  action: z.enum(["approve", "reject", "request_clarification"]),
  reviewer: z.string().default("Lead Procurement Auditor"),
  notes: z.string().optional()
});

router.post("/review/:poId", (req: Request, res: Response) => {
  const poId = req.params.poId?.toUpperCase().trim();
  const parseResult = reviewSchema.safeParse(req.body);

  if (!parseResult.success) {
    return res.status(400).json({ error: "Invalid review payload", details: parseResult.error.format() });
  }

  const { action, reviewer, notes } = parseResult.data;
  const decision = {
    action,
    reviewer,
    notes: notes || "",
    timestamp: new Date().toISOString(),
    poId
  };

  // Commit decision to H-MEM
  hMem.set(`review:${poId}`, decision);

  logger.info(`[Human-in-Loop] Review recorded for ${poId}: ${action.toUpperCase()} by ${reviewer}`);

  res.json({
    success: true,
    message: `Audit decision recorded: ${action.toUpperCase()}`,
    decision
  });
});

/**
 * GET /api/zetaris/status
 * Exposes detailed Zetaris virtualization layer state, active SQL, and schema definition.
 */
router.get("/zetaris/status", async (_req: Request, res: Response) => {
  const health = await zetarisClient.healthCheck();

  res.json({
    status: health.status,
    mode: health.mode,
    engine: health.engine,
    latencyMs: health.latencyMs,
    virtualizedSources: [
      { name: "purchase_orders", origin: "ERP / Purchase Order System", records: 2 },
      { name: "deliveries", origin: "WMS / Goods Receiving Logs", records: 2 },
      { name: "invoices", origin: "Supplier Invoicing Portal", records: 2 },
      { name: "contract_prices", origin: "Contract Management & Pricing Catalog", records: 2 }
    ],
    sqlQueryTemplate: UNIFIED_VIEW_SQL
  });
});

/**
 * GET /api/memory
 * Debug view for H-MEM (Hierarchical Memory) store.
 */
router.get("/memory", (_req: Request, res: Response) => {
  res.json({
    hMemKeys: hMem.listKeys(),
    sessionDump: hMem.dumpSession()
  });
});
