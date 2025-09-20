import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import express from 'express';
import { registerRoutes } from '../backend/routes';
import {
  evolutionDataSchema,
  technologyArraySchema,
  tradingMachineArraySchema,
  moduleArraySchema,
  treeNodeSchema,
  evolutionModuleSchema,
} from '@shared/schema';

let app: express.Express;
let server: any;

beforeAll(async () => {
  app = express();
  app.use(express.json());
  server = await registerRoutes(app);
});

afterAll(async () => {
  await new Promise<void>((resolve) => server.close(() => resolve()));
});

function isModuleArray(body: any): boolean {
  return (
    body &&
    Array.isArray(body.modules) &&
    body.modules.every((m: any) => typeof m.name === 'string' && m.revisions)
  );
}

describe('API routes', () => {
  it('GET /api/modules returns list of modules (schema validated)', async () => {
    const res = await request(app).get('/api/modules');
    expect(res.status).toBe(200);
    expect(() => moduleArraySchema.parse(res.body)).not.toThrow();
  });

  it('GET /api/evolution returns base evolution data', async () => {
    const res = await request(app).get('/api/evolution');
    expect(res.status).toBe(200);
    expect(() => evolutionDataSchema.parse(res.body)).not.toThrow();
  });

  it('GET /api/evolution/integrated returns integrated data', async () => {
    const res = await request(app).get('/api/evolution/integrated');
    expect(res.status).toBe(200);
    expect(() => evolutionDataSchema.parse(res.body)).not.toThrow();
  });

  it('GET /api/evolution/dynamic returns dynamic matrix', async () => {
    const res = await request(app).get('/api/evolution/dynamic');
    expect(res.status).toBe(200);
    expect(() => evolutionDataSchema.parse(res.body)).not.toThrow();
  });

  it('GET /api/technologies returns technology list', async () => {
    const res = await request(app).get('/api/technologies');
    expect(res.status).toBe(200);
    expect(() => technologyArraySchema.parse(res.body)).not.toThrow();
  });

  it('GET /api/trading-machines returns cases', async () => {
    const res = await request(app).get('/api/trading-machines');
    expect(res.status).toBe(200);
    expect(() => tradingMachineArraySchema.parse(res.body)).not.toThrow();
  });

  it('GET /api/tree-data returns technology tree (schema validated)', async () => {
    const res = await request(app).get('/api/tree-data');
    expect(res.status).toBe(200);
    expect(() => treeNodeSchema.parse(res.body)).not.toThrow();
  });

  it('GET /api/modules/:id returns single module by name', async () => {
    // Fetch list to get a valid id
    const listRes = await request(app).get('/api/modules');
    expect(listRes.status).toBe(200);
    const modules = moduleArraySchema.parse(listRes.body);
    expect(modules.length).toBeGreaterThan(0);
    const existingId = modules[0].name; // name used as id per routes.ts

    const res = await request(app).get(`/api/modules/${encodeURIComponent(existingId)}`);
    expect(res.status).toBe(200);
    // Validate returned single module using the evolutionModuleSchema
    expect(() => evolutionModuleSchema.parse(res.body)).not.toThrow();
  });

  it('GET /api/modules/:id returns 404 for non-existent module', async () => {
    const res = await request(app).get('/api/modules/__nonexistent__');
    expect(res.status).toBe(404);
  });
});
