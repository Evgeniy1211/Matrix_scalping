import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Technology schemas for evolution matrix
export const technologySchema = z.object({
  id: z.string(),
  name: z.string(),
  fullName: z.string().optional(),
  description: z.string(),
  category: z.enum(['data', 'processing', 'ml', 'visualization', 'infrastructure', 'risk', 'execution', 'adaptation']),
  
  periods: z.object({
    start: z.number(),
    peak: z.number().optional(),
    decline: z.number().optional(),
    end: z.number().optional(),
  }),
  
  evolution: z.object({
    predecessors: z.array(z.string()).optional(),
    successors: z.array(z.string()).optional(),
    variants: z.array(z.string()).optional(),
  }).optional(),
  
  applicableModules: z.array(z.string()),
  advantages: z.array(z.string()),
  disadvantages: z.array(z.string()),
  useCases: z.array(z.string()),
  sources: z.array(z.string()).optional(),
});

export type Technology = z.infer<typeof technologySchema>;
export const technologyArraySchema = z.array(technologySchema);

// Trading machine schemas
export const tradingMachineSchema = z.object({
  id: z.string(),
  name: z.string(),
  period: z.string(),
  description: z.string(),
  technologies: z.array(z.string()),
  modules: z.record(z.any()),
  performance: z.record(z.any()),
  codeExample: z.string(),
  advantages: z.array(z.string()),
  disadvantages: z.array(z.string()),
  implementationDetails: z.string(),
});

export type TradingMachine = z.infer<typeof tradingMachineSchema>;
export const tradingMachineArraySchema = z.array(tradingMachineSchema);

// Evolution data schemas
export const moduleSchema = z.object({
  name: z.string(),
  rev1: z.string(),
  rev2: z.string(),
  rev3: z.string(),
  rev4: z.string(),
  rev5: z.string(),
});

export const evolutionDataSchema = z.record(moduleSchema);
export type EvolutionData = z.infer<typeof evolutionDataSchema>;

// Tree data schema
export const treeNodeSchema: z.ZodType<any> = z.lazy(() => z.object({
  name: z.string(),
  children: z.array(treeNodeSchema).optional(),
  value: z.number().optional(),
  type: z.string().optional(),
}));

export type TreeNode = z.infer<typeof treeNodeSchema>;
