import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoints for evolution data
  app.get("/api/evolution-data", async (req, res) => {
    try {
      const { evolutionData } = await import("./data/evolution-data");
      res.json(evolutionData);
    } catch (error) {
      res.status(500).json({ error: "Failed to load evolution data" });
    }
  });

  app.get("/api/tree-data", async (req, res) => {
    try {
      const { treeData } = await import("./data/evolution-data");
      res.json(treeData);
    } catch (error) {
      res.status(500).json({ error: "Failed to load tree data" });
    }
  });

  app.get("/api/technologies", async (req, res) => {
    try {
      const { technologyDatabase } = await import("./data/technologies");
      res.json(technologyDatabase);
    } catch (error) {
      res.status(500).json({ error: "Failed to load technologies" });
    }
  });

  app.get("/api/trading-machines", async (req, res) => {
    try {
      const { tradingMachineCases } = await import("./data/trading-machines");
      res.json(tradingMachineCases);
    } catch (error) {
      res.status(500).json({ error: "Failed to load trading machines" });
    }
  });

  app.get("/api/modules", async (req, res) => {
    try {
      const { modules } = await import("./data/modules/index");
      res.json(modules);
    } catch (error) {
      res.status(500).json({ error: "Failed to load modules" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
