import { useQuery } from "@tanstack/react-query";
import { 
  technologyArraySchema, 
  type Technology, 
  tradingMachineArraySchema, 
  type TradingMachine,
  evolutionDataSchema,
  type EvolutionData,
  treeNodeSchema,
  type TreeNode
} from "@shared/schema";

// Base fetch helper with validation
async function fetchAndValidate<T>(url: string, schema: any): Promise<T> {
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
    queryKey: ["/api/technologies"],
    queryFn: () => fetchAndValidate<Technology[]>("/api/technologies", technologyArraySchema)
  });
}

export function useTradingMachines() {
  return useQuery({
    queryKey: ["/api/trading-machines"],
    queryFn: () => fetchAndValidate<TradingMachine[]>("/api/trading-machines", tradingMachineArraySchema)
  });
}

// Generic evolution data hook with source selection
export function useEvolutionData(source: 'original' | 'integrated' | 'dynamic' = 'original') {
  const endpoint = source === 'original'
    ? '/api/evolution-data'
    : source === 'integrated'
      ? '/api/evolution-data/integrated'
      : '/api/evolution-data/dynamic';

  return useQuery({
    queryKey: [endpoint],
    queryFn: () => fetchAndValidate<EvolutionData>(endpoint, evolutionDataSchema)
  });
}

export function useTreeData() {
  return useQuery({
    queryKey: ["/api/tree-data"],
    queryFn: () => fetchAndValidate<TreeNode>("/api/tree-data", treeNodeSchema)
  });
}

export function createTechnologyMaps(technologies: Technology[]) {
  const byId = new Map<string, Technology>();
  const byName = new Map<string, Technology>();
  technologies.forEach(tech => {
    byId.set(tech.id, tech);
    byName.set(tech.name, tech);
  });
  return { byId, byName };
}

export function searchTechnologies(technologies: Technology[], query: string): Technology[] {
  const q = query.toLowerCase();
  return technologies.filter(tech => 
    tech.name.toLowerCase().includes(q) ||
    tech.description.toLowerCase().includes(q)
  );
}

// Coverage: какие технологии из кейсов присутствуют в каких модулях
export function getMatrixTechnologyCoverage(tradingMachines: TradingMachine[]) {
  const coverage: Record<string, Set<string>> = {};
  tradingMachines.forEach(tm => {
    Object.entries(tm.modules).forEach(([moduleKey, techList]) => {
      if (!coverage[moduleKey]) coverage[moduleKey] = new Set<string>();
      (techList as string[]).forEach((t: string) => coverage[moduleKey].add(t));
    });
  });
  // Преобразуем в массивы
  const result: Record<string, string[]> = {};
  Object.entries(coverage).forEach(([k, v]) => {
    result[k] = Array.from(v).sort();
  });
  return result;
}