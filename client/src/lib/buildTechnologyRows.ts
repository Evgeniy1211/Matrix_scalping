import type { Technology } from "@shared/schema";

export interface TechnologyRow {
  id: string;
  name: string;
  category: string;
  module: string;
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
const getCategoryModule = (category: string): string => {
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
const getTechnologyRevision = (tech: Technology, revisionPeriods: RevisionPeriods): string => {
  const startYear = tech.periods.start;
  const peakYear = tech.periods.peak || startYear;
  
  if (peakYear <= 2015) return 'rev1';
  if (peakYear <= 2020) return 'rev2';
  if (peakYear <= 2022) return 'rev3';
  if (peakYear <= 2023) return 'rev4';
  return 'rev5';
};

export function buildTechnologyRows(
  technologies: Technology[],
  revisionPeriods: RevisionPeriods
): TechnologyRow[] {
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
      const startRevision = getTechnologyRevision(tech, revisionPeriods);
      const endYear = tech.periods.end || new Date().getFullYear();

      // Заполняем ревизии
      Object.entries(revisionPeriods).forEach(([revKey, revData]) => {
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

            const successorRevision = getTechnologyRevision(successor, revisionPeriods);
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