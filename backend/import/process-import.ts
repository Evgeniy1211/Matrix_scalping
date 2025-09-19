/*
 Stage 1: RAW -> Markdown importer
 - Scans backend/import/raw for files (json, txt, md snippets)
 - Detects type: case_* or tech_* (by filename and/or content keys)
 - Validates required fields (minimal set for now)
 - Produces Markdown files in backend/import/processed
 - Logs errors to backend/import/logs/errors.log
*/

import fs from 'node:fs/promises';
import path from 'node:path';
import { z } from 'zod';

const ROOT = path.resolve(process.cwd(), 'backend', 'import');
const RAW_DIR = path.join(ROOT, 'raw');
const OUT_DIR = path.join(ROOT, 'processed');
const LOG_DIR = path.join(ROOT, 'logs');
const LOG_FILE = path.join(LOG_DIR, 'errors.log');

await fs.mkdir(RAW_DIR, { recursive: true });
await fs.mkdir(OUT_DIR, { recursive: true });
await fs.mkdir(LOG_DIR, { recursive: true });

function logError(message: string) {
  const line = `[${new Date().toISOString()}] ${message}\n`;
  return fs.appendFile(LOG_FILE, line, { encoding: 'utf8' });
}

// Minimal schemas for tech and case
const techSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  category: z.enum(['data', 'processing', 'ml', 'visualization', 'infrastructure', 'risk', 'execution', 'adaptation']),
  periods: z.object({ start: z.number().int(), peak: z.number().int().optional(), decline: z.number().int().optional(), end: z.number().int().optional() }),
}).passthrough();

const caseSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  period: z.object({ start: z.number().int(), end: z.number().int().optional() }),
  modules: z.record(z.array(z.string())),
}).passthrough();

function detectType(filename: string, json?: unknown): 'tech' | 'case' | 'unknown' {
  const base = path.basename(filename).toLowerCase();
  if (base.startsWith('tech_')) return 'tech';
  if (base.startsWith('case_')) return 'case';
  if (json && typeof json === 'object') {
    const obj = json as Record<string, unknown>;
    if ('category' in obj && 'periods' in obj) return 'tech';
    if ('modules' in obj && 'period' in obj) return 'case';
  }
  return 'unknown';
}

function toMarkdownFrontMatter(obj: Record<string, unknown>) {
  const yaml = Object.entries(obj)
    .map(([k, v]) => `${k}: ${JSON.stringify(v).replace(/\n/g, ' ')}`)
    .join('\n');
  return `---\n${yaml}\n---\n`;
}

function techToMarkdown(tech: z.infer<typeof techSchema>) {
  const meta = {
    id: tech.id,
    type: 'technology',
    name: tech.name,
    category: tech.category,
    periods: tech.periods,
  };
  const fm = toMarkdownFrontMatter(meta);
  return `${fm}
# ${tech.name}

${tech.description}
`;
}

function caseToMarkdown(c: z.infer<typeof caseSchema>) {
  const meta = {
    id: c.id,
    type: 'case',
    title: c.title,
    period: c.period,
    modules: c.modules,
  };
  const fm = toMarkdownFrontMatter(meta);
  const modulesList = Object.entries(c.modules)
    .map(([mod, items]) => `- ${mod}: ${items.join(', ')}`)
    .join('\n');
  return `${fm}
# ${c.title}

${c.description}

## Modules
${modulesList}
`;
}

async function processFile(filePath: string) {
  const ext = path.extname(filePath).toLowerCase();
  const content = await fs.readFile(filePath, 'utf8');
  let json: unknown | undefined;

  try {
    if (ext === '.json') {
      json = JSON.parse(content);
    } else if (ext === '.txt' || ext === '.md') {
      // simple JSON auto-detect from code blocks
      const match = content.match(/```json[\r\n]+([\s\S]*?)```/i);
      if (match) {
        json = JSON.parse(match[1]);
      }
    }
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    await logError(`Parse error in ${filePath}: ${msg}`);
  }

  const kind = detectType(filePath, json);
  try {
    if (kind === 'tech') {
      const data = techSchema.parse(json ?? {});
      const md = techToMarkdown(data);
      const out = path.join(OUT_DIR, `${path.parse(filePath).name}.md`);
      await fs.writeFile(out, md, 'utf8');
      return { status: 'ok', out } as const;
    }
    if (kind === 'case') {
      const data = caseSchema.parse(json ?? {});
      const md = caseToMarkdown(data);
      const out = path.join(OUT_DIR, `${path.parse(filePath).name}.md`);
      await fs.writeFile(out, md, 'utf8');
      return { status: 'ok', out } as const;
    }
    await logError(`Unknown type for ${filePath}`);
    return { status: 'skip' } as const;
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    await logError(`Validation error for ${filePath}: ${msg}`);
    return { status: 'error', error: msg } as const;
  }
}

async function main() {
  const files = await fs.readdir(RAW_DIR);
  const targets = files.filter((f) => /\.(json|txt|md)$/i.test(f));
  let ok = 0, fail = 0, skip = 0;
  for (const f of targets) {
    const res = await processFile(path.join(RAW_DIR, f));
    if (res.status === 'ok') ok++; else if (res.status === 'skip') skip++; else fail++;
  }
  console.log(`Processed: ${ok}, skipped: ${skip}, failed: ${fail}`);
}

main().catch(async (e) => {
  console.error(e);
  const msg = e instanceof Error ? e.message : String(e);
  await logError(`Fatal: ${msg}`);
  process.exit(1);
});
