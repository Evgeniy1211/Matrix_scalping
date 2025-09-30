import type { Express, Response } from 'express';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { createServer, type Server } from 'http';
import path from 'path';

import {
  type TradingMachine,
  tradingMachineArraySchema,
  tradingMachineSchema,
} from './schemas/schema';

type TradingMachineCase = TradingMachine;

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
        console.warn(
          '[DEPRECATED] Use /api/evolution/integrated instead of /api/evolution-data/integrated'
        );
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
        console.warn(
          '[DEPRECATED] Use /api/evolution/dynamic instead of /api/evolution-data/dynamic'
        );
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

  app.get('/api/trading-machines', (req, res) => {
    try {
      const filePath = path.resolve(
        process.cwd(),
        'backend',
        'data',
        'json',
        'trading-machines.json'
      );
      if (!existsSync(filePath)) {
        // initialize empty store if missing
        writeFileSync(filePath, '[]', 'utf-8');
      }
      const data = JSON.parse(readFileSync(filePath, 'utf-8'));
      // Validate shape against shared schema
      const parsed = tradingMachineArraySchema.parse(data);
      res.json(parsed);
    } catch (err) {
      console.error('Failed to read trading machines JSON:', err);
      res.status(500).json({ error: 'Failed to load trading machines' });
    }
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

  const importTradingMachine = (rawText: string): TradingMachineCase => {
    // Naive parser placeholder — replace with LLM later
    const nowId = Date.now().toString();
    const fallbackName = `Imported Case ${nowId}`;
    // Build a minimal valid case according to @shared/schema
    const minimal = {
      id: nowId,
      name: fallbackName,
      period: 'unknown',
      author: undefined,
      description: rawText.slice(0, 2000),
      strategy: 'unspecified',
      timeframe: 'unspecified',
      marketType: 'unspecified',
      technologies: [],
      modules: {
        dataCollection: [],
        dataProcessing: [],
        featureEngineering: [],
        signalGeneration: [],
        riskManagement: [],
        execution: [],
        marketAdaptation: [],
        visualization: [],
      },
      advantages: [],
      disadvantages: [],
    } as TradingMachineCase;

    // Validate single object against schema (will throw if invalid)
    const validated = tradingMachineSchema.parse(minimal);

    const filePath = path.resolve(
      process.cwd(),
      'backend',
      'data',
      'json',
      'trading-machines.json'
    );
    const current: unknown = existsSync(filePath)
      ? JSON.parse(readFileSync(filePath, 'utf-8'))
      : [];
    const list = tradingMachineArraySchema.parse(current);
    list.push(validated);
    writeFileSync(filePath, JSON.stringify(list, null, 2), 'utf-8');

    return validated as unknown as TradingMachineCase;
  };

  app.post('/api/import/trading-machine', (req, res) => {
    const { rawText } = req.body;
    if (!rawText) {
      return res.status(400).json({ error: 'rawText is required' });
    }

    const newCase = importTradingMachine(rawText);
    res.status(201).json(newCase);
  });

  const httpServer = createServer(app);
  return httpServer;
}
