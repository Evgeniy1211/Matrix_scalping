// Shared constants for frontend and backend. Import via alias @shared/constants
// Aliases configured in tsconfig.json: "@shared/*": ["./backend/schemas/*"]

export type RevisionKey = 'rev1' | 'rev2' | 'rev3' | 'rev4' | 'rev5';

export interface RevisionMeta {
  key: RevisionKey;
  label: string;
  period: string;
  years: [number, number];
}

// Unified revision ranges and labels (must match backend logic)
export const REVISIONS: Record<RevisionKey, RevisionMeta> = {
  rev1: { key: 'rev1', label: 'Rev 1 (2015)', period: '2000-2015', years: [2000, 2015] },
  rev2: { key: 'rev2', label: 'Rev 2 (2020)', period: '2016-2020', years: [2016, 2020] },
  rev3: { key: 'rev3', label: 'Rev 3 (2022)', period: '2021-2022', years: [2021, 2022] },
  rev4: { key: 'rev4', label: 'Rev 4 (2023)', period: '2023-2023', years: [2023, 2023] },
  rev5: { key: 'rev5', label: 'Rev 5 (2024)', period: '2024-2025', years: [2024, 2025] },
};

export const REVISION_ORDER: RevisionKey[] = ['rev1', 'rev2', 'rev3', 'rev4', 'rev5'];

// Helper to map a year to a revision key. Mirrors backend getRevisionFromPeriod rules
export function getRevisionForYear(year: number): RevisionKey {
  if (year <= REVISIONS.rev1.years[1]) return 'rev1';
  if (year <= REVISIONS.rev2.years[1]) return 'rev2';
  if (year <= REVISIONS.rev3.years[1]) return 'rev3';
  if (year <= REVISIONS.rev4.years[1]) return 'rev4';
  return 'rev5';
}

// Categories (from Technology.category)
export type TechnologyCategory =
  | 'data'
  | 'processing'
  | 'ml'
  | 'visualization'
  | 'infrastructure'
  | 'risk'
  | 'execution'
  | 'adaptation';

// Display names for matrix modules (UI rows)
export const CATEGORY_TO_MODULE: Record<TechnologyCategory, string> = {
  data: 'Сбор данных',
  processing: 'Обработка данных',
  ml: 'Генерация сигналов',
  visualization: 'Визуализация и мониторинг',
  infrastructure: 'Инфраструктура',
  risk: 'Риск-менеджмент',
  execution: 'Исполнение сделок',
  adaptation: 'Адаптация к рынку',
};

// UI module order for matrix (explicitly includes "Инфраструктура" as 9th, to avoid data loss in UI)
export const UI_MODULES: string[] = [
  'Сбор данных',
  'Обработка данных',
  'Feature Engineering', // This is a domain module present in backend modules
  'Генерация сигналов',
  'Риск-менеджмент',
  'Исполнение сделок',
  'Адаптация к рынку',
  'Визуализация и мониторинг',
  'Инфраструктура',
];

// Some UI modules aggregate multiple categories (e.g., Feature Engineering)
export const MODULE_TO_CATEGORIES: Record<string, TechnologyCategory[]> = {
  'Сбор данных': ['data'],
  'Обработка данных': ['processing'],
  'Feature Engineering': ['processing', 'ml'],
  'Генерация сигналов': ['ml'],
  'Риск-менеджмент': ['risk'],
  'Исполнение сделок': ['execution'],
  'Адаптация к рынку': ['adaptation'],
  'Визуализация и мониторинг': ['visualization'],
  'Инфраструктура': ['infrastructure'],
};

export function moduleForCategory(category: TechnologyCategory): string {
  return CATEGORY_TO_MODULE[category] ?? 'Инфраструктура';
}

export function categoriesForModule(moduleName: string): TechnologyCategory[] {
  return MODULE_TO_CATEGORIES[moduleName] ?? [];
}
