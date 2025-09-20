import type { Express, Response } from 'express';
import { createServer, type Server } from 'http';

export async function registerRoutes(app: Express): Promise<Server> {
  // helper
  function safeHandler(fn: () => Promise<void>, res: Response) {
    fn().catch((error) => {
      console.error('API error:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
  }

  // DEPRECATED: ORIGINAL evolution data
  app.get('/api/evolution-data', async (req, res) => {
    safeHandler(async () => {
      if (process.env.NODE_ENV !== 'production') {
        console.warn('[DEPRECATED] Use /api/evolution instead of /api/evolution-data');
      }
      const { evolutionData } = await import('./data/evolution-data');
      res.json(evolutionData);
    }, res);
  });

  // DEPRECATED: INTEGRATED evolution data (original + technologies + cases)
  app.get('/api/evolution-data/integrated', async (req, res) => {
    safeHandler(async () => {
      if (process.env.NODE_ENV !== 'production') {
        console.warn('[DEPRECATED] Use /api/evolution/integrated instead of /api/evolution-data/integrated');
      }
      const { integrateTechnologyDatabase } = await import('./data/evolution-data');
      const data = integrateTechnologyDatabase();
      res.json(data);
    }, res);
  });

  // DEPRECATED: DYNAMIC evolution data (each technology as a row)
  app.get('/api/evolution-data/dynamic', async (req, res) => {
    safeHandler(async () => {
      if (process.env.NODE_ENV !== 'production') {
        console.warn('[DEPRECATED] Use /api/evolution/dynamic instead of /api/evolution-data/dynamic');
      }
      const { createDynamicTechnologyMatrix } = await import('./data/evolution-data');
      const data = createDynamicTechnologyMatrix();
      res.json(data);
    }, res);
  });

  app.get('/api/tree-data', async (req, res) => {
    safeHandler(async () => {
      const { treeData } = await import('./data/evolution-data');
      res.json(treeData);
    }, res);
  });

  app.get('/api/technologies', async (req, res) => {
    safeHandler(async () => {
      const { technologyDatabase } = await import('./data/technologies');
      res.json(technologyDatabase);
    }, res);
  });

  app.get('/api/trading-machines', async (req, res) => {
    safeHandler(async () => {
      const { tradingMachineCases } = await import('./data/trading-machines');
      res.json(tradingMachineCases);
    }, res);
  });

  app.get('/api/modules', async (req, res) => {
    safeHandler(async () => {
      const { allModules } = await import('./data/modules/index');
      res.json(allModules);
    }, res);
  });

  app.get('/api/modules/:id', async (req, res) => {
    safeHandler(async () => {
      const { allModules } = await import('./data/modules/index');
      const module = allModules.find((mod) => mod.name === req.params.id);
      if (!module) {
        res.status(404).json({ error: 'Module not found' });
        return;
      }
      res.json(module);
    }, res);
  });

  app.get('/api/evolution', async (req, res) => {
    safeHandler(async () => {
      const { evolutionData } = await import('./data/evolution-data');
      res.json(evolutionData);
    }, res);
  });

  // Современные эндпоинты для эволюционных данных
  app.get('/api/evolution/integrated', async (_req, res) => {
    safeHandler(async () => {
      const { integrateTechnologyDatabase } = await import('./data/evolution-data');
      const data = integrateTechnologyDatabase();
      res.json(data);
    }, res);
  });

  app.get('/api/evolution/dynamic', async (_req, res) => {
    safeHandler(async () => {
      const { createDynamicTechnologyMatrix } = await import('./data/evolution-data');
      const data = createDynamicTechnologyMatrix();
      res.json(data);
    }, res);
  });

  const httpServer = createServer(app);
  return httpServer;
}
