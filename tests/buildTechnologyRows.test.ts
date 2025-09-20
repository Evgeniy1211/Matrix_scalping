import { describe, it, expect } from 'vitest';
import { buildTechnologyRows, getTechnologyRevision } from '@/lib/buildTechnologyRows';
import type { Technology } from '@shared/schema';
import { REVISIONS } from '@shared/constants';

function makeTech(partial: Partial<Technology>): Technology {
  // Minimal valid Technology matching schema.ts expectations
  return {
    id: partial.id ?? 'id',
    name: partial.name ?? 'Tech',
    description: partial.description ?? 'desc',
    category: (partial as any).category ?? 'infrastructure',
    periods: partial.periods ?? { start: 2024 },
    applicableModules: partial.applicableModules ?? [],
    advantages: partial.advantages ?? [],
    disadvantages: partial.disadvantages ?? [],
    useCases: partial.useCases ?? [],
    sources: partial.sources ?? [],
    evolution: partial.evolution,
  } as Technology;
}

describe('buildTechnologyRows', () => {
  it('includes infrastructure technologies in rows', () => {
    const techs: Technology[] = [
      makeTech({ id: 't1', name: 'Kubernetes', category: 'infrastructure', periods: { start: 2017 } }),
    ];

    const rows = buildTechnologyRows(techs);
    const names = rows.map((r) => r.name);
    expect(names).toContain('Kubernetes');
  });

  it('assigns rev5 for peak 2024', () => {
    const t = makeTech({ id: 't2', name: 'LLM', category: 'ml', periods: { start: 2023, peak: 2024 } });
    const rev = getTechnologyRevision(t);
    expect(rev).toBe('rev5');
    expect(REVISIONS.rev5.years[0]).toBeLessThanOrEqual(2024);
  });

  it('filters by module when moduleFilter provided', () => {
    const techs: Technology[] = [
      makeTech({ id: 't3', name: 'Pandas', category: 'processing', periods: { start: 2015 } }),
      makeTech({ id: 't4', name: 'Docker', category: 'infrastructure', periods: { start: 2014 } }),
    ];

    const rows = buildTechnologyRows(techs, 'Обработка данных');
    expect(rows.every((r) => r.module === 'Обработка данных')).toBe(true);
    const names = rows.map((r) => r.name);
    expect(names).toContain('Pandas');
    expect(names).not.toContain('Docker');
  });
});
