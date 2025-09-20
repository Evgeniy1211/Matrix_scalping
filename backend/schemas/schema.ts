import { sql } from 'drizzle-orm';
import { pgTable, text, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

// ===================== Auth (placeholder) =====================
export const users = pgTable('users', {
	id: varchar('id')
		.primaryKey()
		.default(sql`gen_random_uuid()`),
	username: text('username').notNull(),
	password: text('password').notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
	username: true,
	password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// ===================== Evolution Matrix Schemas =====================
// Актуальная контрактная модель evolutionData соответствует backend/data/evolution-data.ts
// evolutionData: { modules: EvolutionModule[] }
// EvolutionModule: { name: string; revisions: { rev1..rev5: RevisionData } }

export const revisionDataSchema = z.object({
	tech: z.string(),
	period: z.enum(['empty', 'early', 'modern', 'current']),
	desc: z.string(),
});

export const moduleRevisionsSchema = z.object({
	rev1: revisionDataSchema,
	rev2: revisionDataSchema,
	rev3: revisionDataSchema,
	rev4: revisionDataSchema,
	rev5: revisionDataSchema,
});

export const evolutionModuleSchema = z.object({
	name: z.string(),
	revisions: moduleRevisionsSchema,
});

export const evolutionDataSchema = z.object({
	modules: z.array(evolutionModuleSchema),
});
export type EvolutionModule = z.infer<typeof evolutionModuleSchema>;
export type EvolutionData = z.infer<typeof evolutionDataSchema>;

// Convenience schemas for standalone modules array responses (e.g., GET /api/modules)
export const moduleArraySchema = z.array(evolutionModuleSchema);
export type Module = z.infer<typeof evolutionModuleSchema>;

// ===================== Tree (Technology Tree) =====================
export type TreeNode = {
	name: string;
	children?: TreeNode[];
	value?: number;
	type?: string;
	description?: string;
};

export const treeNodeSchema: z.ZodType<TreeNode> = z.lazy(() =>
	z.object({
		name: z.string(),
		children: z.array(treeNodeSchema).optional(),
		value: z.number().optional(),
		type: z.string().optional(),
		description: z.string().optional(),
	})
);

// ===================== Trading Machine Schemas =====================
export const technologyStackSchema = z.object({
	name: z.string(),
	version: z.string().optional(),
	purpose: z.string(),
	category: z.enum(['data', 'processing', 'ml', 'visualization', 'infrastructure']),
});
export type TechnologyStack = z.infer<typeof technologyStackSchema>;

export const tradingMachineSchema = z.object({
	id: z.string(),
	name: z.string(),
	period: z.string(),
	author: z.string().optional(),
	description: z.string(),
	strategy: z.string(),
	timeframe: z.string(),
	marketType: z.string(),

	// Технологический стек — массив объектов (синхронизирован с backend/data/trading-machines.ts)
	technologies: z.array(technologyStackSchema),

	// Явное описание модулей, соответствующих строкам матрицы
	modules: z.object({
		dataCollection: z.array(z.string()),
		dataProcessing: z.array(z.string()),
		featureEngineering: z.array(z.string()),
		signalGeneration: z.array(z.string()),
		riskManagement: z.array(z.string()),
		execution: z.array(z.string()),
		marketAdaptation: z.array(z.string()),
		visualization: z.array(z.string()),
	}),

	performance: z
		.object({
			accuracy: z.number().optional(),
			precision: z.number().optional(),
			recall: z.number().optional(),
			f1Score: z.number().optional(),
			sharpeRatio: z.number().optional(),
			maxDrawdown: z.number().optional(),
		})
		.optional(),

	codeExample: z.string().optional(),
	advantages: z.array(z.string()).optional(),
	disadvantages: z.array(z.string()).optional(),
});
export type TradingMachine = z.infer<typeof tradingMachineSchema>;
export const tradingMachineArraySchema = z.array(tradingMachineSchema);

// ===================== Technology Schemas =====================
export const technologySchema = z.object({
	id: z.string(),
	name: z.string(),
	fullName: z.string().optional(),
	description: z.string(),
	category: z.enum([
		'data',
		'processing',
		'ml',
		'visualization',
		'infrastructure',
		'risk',
		'execution',
		'adaptation',
	]),
	periods: z.object({
		start: z.number(),
		peak: z.number().optional(),
		decline: z.number().optional(),
		end: z.number().optional(),
	}),
	evolution: z
		.object({
			predecessors: z.array(z.string()).optional(),
			successors: z.array(z.string()).optional(),
			variants: z.array(z.string()).optional(),
		})
		.optional(),
	applicableModules: z.array(z.string()),
	advantages: z.array(z.string()),
	disadvantages: z.array(z.string()),
	useCases: z.array(z.string()),
	sources: z.array(z.string()).optional(),
});
export type Technology = z.infer<typeof technologySchema>;
export const technologyArraySchema = z.array(technologySchema);

// ===================== (Deprecated) =====================
// Ранее существовавшая record-структура evolutionData была удалена.
// Убедитесь, что нигде не импортируется устаревшая схема moduleSchema/evolutionDataSchema (record).

