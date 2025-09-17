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

export function useTechnologies() {
  return useQuery({
    queryKey: ["/api/technologies"],
    queryFn: async (): Promise<Technology[]> => {
      const response = await fetch("/api/technologies");
      if (!response.ok) {
        throw new Error(`Failed to fetch technologies: ${response.statusText}`);
      }
      const data = await response.json();
      
      // Validate the response data with Zod
      try {
        return technologyArraySchema.parse(data);
      } catch (error) {
        console.error("Technology data validation failed:", error);
        throw new Error("Invalid technology data received from API");
      }
    },
  });
}

export function useTradingMachines() {
  return useQuery({
    queryKey: ["/api/trading-machines"],
    queryFn: async (): Promise<TradingMachine[]> => {
      const response = await fetch("/api/trading-machines");
      if (!response.ok) {
        throw new Error(`Failed to fetch trading machines: ${response.statusText}`);
      }
      const data = await response.json();
      
      try {
        return tradingMachineArraySchema.parse(data);
      } catch (error) {
        console.error("Trading machine data validation failed:", error);
        throw new Error("Invalid trading machine data received from API");
      }
    },
  });
}

export function useEvolutionData() {
  return useQuery({
    queryKey: ["/api/evolution-data"],
    queryFn: async (): Promise<EvolutionData> => {
      const response = await fetch("/api/evolution-data");
      if (!response.ok) {
        throw new Error(`Failed to fetch evolution data: ${response.statusText}`);
      }
      const data = await response.json();
      
      try {
        return evolutionDataSchema.parse(data);
      } catch (error) {
        console.error("Evolution data validation failed:", error);
        throw new Error("Invalid evolution data received from API");
      }
    },
  });
}

export function useTreeData() {
  return useQuery({
    queryKey: ["/api/tree-data"],
    queryFn: async (): Promise<TreeNode> => {
      const response = await fetch("/api/tree-data");
      if (!response.ok) {
        throw new Error(`Failed to fetch tree data: ${response.statusText}`);
      }
      const data = await response.json();
      
      try {
        return treeNodeSchema.parse(data);
      } catch (error) {
        console.error("Tree data validation failed:", error);
        throw new Error("Invalid tree data received from API");
      }
    },
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

// Helper functions for compatibility
export function searchTechnologies(technologies: Technology[], query: string): Technology[] {
  return technologies.filter(tech => 
    tech.name.toLowerCase().includes(query.toLowerCase()) ||
    tech.description.toLowerCase().includes(query.toLowerCase())
  );
}

export function getMatrixTechnologyCoverage(tradingMachines: TradingMachine[]) {
  // TODO: Implement this function if still needed
  return {};
}