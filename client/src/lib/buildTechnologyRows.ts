import {
  moduleForCategory,
  REVISION_ORDER,
  type RevisionKey,
  REVISIONS,
} from '@shared/constants';
import type { Technology } from '@shared/schema';

// Унифицированный интерфейс TechnologyRow для всех случаев использования
export interface TechnologyRow {
  id: string;
  name: string;
  category: string;
  module: string;
  applicableModules: string[];
  revisions: {
    rev1: string;
    rev2: string;
    rev3: string;
    rev4: string;
    rev5: string;
  };
  predecessors: string[];
  successors: string[];
}

// Маппинг категорий на модули
export const getCategoryModule = (category: string): string => moduleForCategory(category as any);

// Определяем в какой ревизии появилась технология
export const getTechnologyRevision = (tech: Technology): RevisionKey => {
  const startYear = tech.periods.start;
  const peakYear = tech.periods.peak || startYear;
  // Используем REVISIONS из shared, опираясь на верхние границы периодов
  if (peakYear <= REVISIONS.rev1.years[1]) return 'rev1';
  if (peakYear <= REVISIONS.rev2.years[1]) return 'rev2';
  if (peakYear <= REVISIONS.rev3.years[1]) return 'rev3';
  if (peakYear <= REVISIONS.rev4.years[1]) return 'rev4';
  return 'rev5';
};

// Ревизии берём из @shared/constants (REVISIONS/REVISION_ORDER)

// Основная функция buildTechnologyRows - поддерживает разные случаи использования
export function buildTechnologyRows(
  technologies: Technology[],
  moduleFilter?: string
): TechnologyRow[] {
  if (!technologies || technologies.length === 0) return [];

  // Простой случай - только список технологий с фильтрацией по модулю
  if (moduleFilter) {
    return technologies
      .filter((tech) => {
        const techModule = getCategoryModule(tech.category);
        return techModule === moduleFilter || tech.applicableModules.includes(moduleFilter);
      })
      .map((tech) => ({
        id: tech.id,
        name: tech.name,
        category: tech.category,
        module: getCategoryModule(tech.category),
        applicableModules: tech.applicableModules || [getCategoryModule(tech.category)],
        revisions: {
          rev1: '',
          rev2: '',
          rev3: '',
          rev4: '',
          rev5: '',
        },
        predecessors: tech.evolution?.predecessors || [],
        successors: tech.evolution?.successors || [],
      }));
  }

  // Сложный случай - полная обработка с ревизиями
  const rows: TechnologyRow[] = [];
  const processedTechs = new Set<string>();

  // Создаем индексы для быстрого поиска
  const techById = new Map<string, Technology>();
  const techByName = new Map<string, Technology>();

  technologies.forEach((tech) => {
    techById.set(tech.id, tech);
    techByName.set(tech.name, tech);
  });

  // Группируем технологии по модулям
  const techsByModule: Record<string, Technology[]> = {};
  technologies.forEach((tech) => {
    const module = getCategoryModule(tech.category);
    if (!techsByModule[module]) {
      techsByModule[module] = [];
    }
    techsByModule[module].push(tech);
  });

  // Обрабатываем каждый модуль
  Object.entries(techsByModule).forEach(([module, techs]) => {
    // Сортируем технологии по времени появления
    const sortedTechs = techs.sort((a, b) => a.periods.start - b.periods.start);

    sortedTechs.forEach((tech) => {
      if (processedTechs.has(tech.id)) return;

      const row: TechnologyRow = {
        id: tech.id,
        name: tech.name,
        category: tech.category,
        module,
        applicableModules: tech.applicableModules || [module],
        revisions: {
          rev1: '',
          rev2: '',
          rev3: '',
          rev4: '',
          rev5: '',
        },
        predecessors: tech.evolution?.predecessors || [],
        successors: tech.evolution?.successors || [],
      };

      // Определяем где показать технологию
      const startRevision = getTechnologyRevision(tech);
      const endYear = tech.periods.end || new Date().getFullYear();

      // Заполняем ревизии
      REVISION_ORDER.forEach((revKey) => {
        const [revStart, revEnd] = REVISIONS[revKey].years;
        const key = revKey as keyof typeof row.revisions;

        // Проверяем пересечение периодов
        if (tech.periods.start <= revEnd && endYear >= revStart) {
          if (revKey === startRevision) {
            row.revisions[key] = tech.name;
          } else if (revStart > tech.periods.start) {
            // Показываем продолжение или эволюцию
            if (tech.evolution?.successors && tech.evolution.successors.length > 0) {
              row.revisions[key] = `${tech.name} → ${tech.evolution.successors.join(', ')}`;
            } else {
              row.revisions[key] = tech.name;
            }
          }
        }
      });

      rows.push(row);
      processedTechs.add(tech.id);

      // Добавляем строки для эволюционировавших технологий
      if (tech.evolution?.successors) {
        tech.evolution.successors.forEach((successorId) => {
          const successor = techById.get(successorId) || techByName.get(successorId);
          if (successor && !processedTechs.has(successor.id)) {
            const successorRow: TechnologyRow = {
              id: successor.id,
              name: successor.name,
              category: successor.category,
              module,
              applicableModules: successor.applicableModules || [module],
              revisions: {
                rev1: '',
                rev2: '',
                rev3: '',
                rev4: '',
                rev5: '',
              },
              predecessors: successor.evolution?.predecessors || [tech.id],
              successors: successor.evolution?.successors || [],
            };

            const successorRevision = getTechnologyRevision(successor);
            successorRow.revisions[successorRevision as keyof typeof successorRow.revisions] =
              successor.name;

            rows.push(successorRow);
            processedTechs.add(successor.id);
          }
        });
      }
    });
  });

  return rows;
}
