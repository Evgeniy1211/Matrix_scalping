import {
  evolutionDataSchema,
  technologyArraySchema,
  tradingMachineArraySchema,
  treeNodeSchema,
} from '@shared/schema';
import { useQuery } from '@tanstack/react-query';
import type { z, ZodTypeAny } from 'zod';

// Base fetch helper with validation
type InferFromSchema<S extends ZodTypeAny> = z.infer<S>;
async function fetchAndValidate<S extends ZodTypeAny>(
  url: string,
  schema: S
): Promise<InferFromSchema<S>> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }
  const data = await response.json();
  try {
    return schema.parse(data);
  } catch (error) {
    console.error(`Validation failed for ${url}:`, error);
    throw new Error(`Invalid data received from ${url}`);
  }
}

export function useTechnologies() {
  return useQuery({
    queryKey: ['/api/modules'],
    queryFn: () => fetchAndValidate('/api/modules', technologyArraySchema),
  });
}

export function useTradingMachines() {
  return useQuery({
    queryKey: ['/api/trading-machines'],
    queryFn: () => fetchAndValidate('/api/trading-machines', tradingMachineArraySchema),
  });
}

// Generic evolution data hook with source selection
export function useEvolutionData(source: 'original' | 'integrated' | 'dynamic' = 'original') {
  const endpoint =
    source === 'original'
      ? '/api/evolution'
      : source === 'integrated'
        ? '/api/evolution/integrated'
        : '/api/evolution/dynamic';

  return useQuery({
    queryKey: [endpoint],
    queryFn: () => fetchAndValidate(endpoint, evolutionDataSchema),
  });
}

export function useTreeData() {
  return useQuery({
    queryKey: ['/api/tree-data'],
    queryFn: () => fetchAndValidate('/api/tree-data', treeNodeSchema),
  });
}

export function createTechnologyMaps(technologies: { id: string; name: string }[]) {
  const byId = new Map<string, { id: string; name: string }>();
  const byName = new Map<string, { id: string; name: string }>();
  technologies.forEach((tech) => {
    byId.set(tech.id, tech);
    byName.set(tech.name, tech);
  });
  return { byId, byName };
}

export function searchTechnologies(
  technologies: { name: string; description: string }[],
  query: string
) {
  const q = query.toLowerCase();
  return technologies.filter(
    (tech) => tech.name.toLowerCase().includes(q) || tech.description.toLowerCase().includes(q)
  );
}

// Coverage: какие технологии из кейсов присутствуют в каких модулях
export function getMatrixTechnologyCoverage(
  tradingMachines: { modules: Record<string, string[]> }[]
) {
  const coverage: Record<string, Set<string>> = {};
  tradingMachines.forEach((tm) => {
    Object.entries(tm.modules).forEach(([moduleKey, techList]) => {
      if (!coverage[moduleKey]) coverage[moduleKey] = new Set<string>();
      techList.forEach((t) => coverage[moduleKey].add(t));
    });
  });
  // Преобразуем в массивы
  const result: Record<string, string[]> = {};
  Object.entries(coverage).forEach(([k, v]) => {
    result[k] = Array.from(v).sort();
  });
  return result;
}
