import type { Technology } from "@shared/schema";

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

interface RevisionPeriods {
  [key: string]: {
    label: string;
    period: string;
    years: [number, number];
  };
}

// Маппинг категорий на модули
export const getCategoryModule = (category: string): string => {
  const mapping: Record<string, string> = {
    'data': 'Сбор данных',
    'processing': 'Обработка данных',
    'ml': 'Генерация сигналов',
    'visualization': 'Визуализация и мониторинг',
    'risk': 'Риск-менеджмент',
    'execution': 'Исполнение сделок',
    'adaptation': 'Адаптация к рынку',
    'infrastructure': 'Инфраструктура'
  };
  return mapping[category] || 'Другое';
};

// Определяем в какой ревизии появилась технология
export const getTechnologyRevision = (tech: Technology, revisionPeriods: RevisionPeriods): string => {
  const startYear = tech.periods.start;
  const peakYear = tech.periods.peak || startYear;
  
  if (peakYear <= 2015) return 'rev1';
  if (peakYear <= 2020) return 'rev2';
  if (peakYear <= 2022) return 'rev3';
  if (peakYear <= 2023) return 'rev4';
  return 'rev5';
};

const defaultRevisionPeriods: RevisionPeriods = {
  rev1: { label: "Rev 1 (2015)", period: "2000-2015", years: [2000, 2015] },
  rev2: { label: "Rev 2 (2020)", period: "2016-2020", years: [2016, 2020] },
  rev3: { label: "Rev 3 (2022)", period: "2021-2022", years: [2021, 2022] },
  rev4: { label: "Rev 4 (2023)", period: "2023-2023", years: [2023, 2023] },
  rev5: { label: "Rev 5 (2024)", period: "2024-2025", years: [2024, 2025] }
};

// Основная функция buildTechnologyRows - поддерживает разные случаи использования
export function buildTechnologyRows(
  technologies: Technology[],
  moduleFilter?: string
): TechnologyRow[] {
  if (!technologies || technologies.length === 0) return [];

  // Простой случай - только список технологий с фильтрацией по модулю
  if (moduleFilter) {
    return technologies
      .filter(tech => {
        const techModule = getCategoryModule(tech.category);
        return techModule === moduleFilter || tech.applicableModules.includes(moduleFilter);
      })
      .map(tech => ({
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
          rev5: ''
        },
        predecessors: tech.evolution?.predecessors || [],
        successors: tech.evolution?.successors || []
      }));
  }

  // Сложный случай - полная обработка с ревизиями
  const rows: TechnologyRow[] = [];
  const processedTechs = new Set<string>();
  
  // Создаем индексы для быстрого поиска
  const techById = new Map<string, Technology>();
  const techByName = new Map<string, Technology>();
  
  technologies.forEach(tech => {
    techById.set(tech.id, tech);
    techByName.set(tech.name, tech);
  });

  // Группируем технологии по модулям
  const techsByModule: Record<string, Technology[]> = {};
  technologies.forEach(tech => {
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

    sortedTechs.forEach(tech => {
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
          rev5: ''
        },
        predecessors: tech.evolution?.predecessors || [],
        successors: tech.evolution?.successors || []
      };

      // Определяем где показать технологию
      const startRevision = getTechnologyRevision(tech, defaultRevisionPeriods);
      const endYear = tech.periods.end || new Date().getFullYear();

      // Заполняем ревизии
      Object.entries(defaultRevisionPeriods).forEach(([revKey, revData]) => {
        const [revStart, revEnd] = revData.years;
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
        tech.evolution.successors.forEach(successorId => {
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
                rev5: ''
              },
              predecessors: successor.evolution?.predecessors || [tech.id],
              successors: successor.evolution?.successors || []
            };

            const successorRevision = getTechnologyRevision(successor, defaultRevisionPeriods);
            successorRow.revisions[successorRevision as keyof typeof successorRow.revisions] = successor.name;

            rows.push(successorRow);
            processedTechs.add(successor.id);
          }
        });
      }
    });
  });

  return rows;
}
