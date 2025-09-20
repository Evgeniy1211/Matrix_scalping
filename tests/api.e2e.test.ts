import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import express from 'express';
import { registerRoutes } from '../backend/routes';
import {
  evolutionDataSchema,
  technologyArraySchema,
  tradingMachineArraySchema,
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
  it('GET /api/modules returns list of modules', async () => {
    const res = await request(app).get('/api/modules');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
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
});
