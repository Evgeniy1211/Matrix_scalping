import { useState } from 'react';
import { REVISION_ORDER, REVISIONS, UI_MODULES } from '@shared/constants';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  getMatrixTechnologyCoverage,
  useEvolutionData,
  useTechnologies,
  useTradingMachines,
} from '@/hooks/use-technologies';

type FilterType = 'all' | 'rev5' | 'hideUnchanged';
type DataSourceType = 'original' | 'integrated' | 'dynamic';

interface EvolutionMatrixProps {
  onModuleClick?: (moduleName: string) => void;
  onTechnologyClick?: (technologyName: string) => void;
}

export function EvolutionMatrix({ onModuleClick, onTechnologyClick }: EvolutionMatrixProps) {
  const [filter, setFilter] = useState<FilterType>('all');
  const [dataSource, setDataSource] = useState<DataSourceType>('original');
  const [tooltip, setTooltip] = useState<{
    content: string;
    x: number;
    y: number;
    visible: boolean;
  }>({
    content: '',
    x: 0,
    y: 0,
    visible: false,
  });

  // React Query hooks
  const {
    data: evolutionData,
    isLoading: evolutionLoading,
    isError: evolutionError,
  } = useEvolutionData(dataSource);
  const { isLoading: techLoading, isError: techError } = useTechnologies();
  const {
    data: tradingMachines,
    isLoading: machinesLoading,
    isError: machinesError,
  } = useTradingMachines();

  // Loading state
  if (evolutionLoading || techLoading || machinesLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Матрица эволюции технологий</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">Загрузка данных матрицы...</div>
        </CardContent>
      </Card>
    );
  }

  // Error state
  if (evolutionError || techError || machinesError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Матрица эволюции технологий</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-red-500">Ошибка загрузки данных матрицы</div>
        </CardContent>
      </Card>
    );
  }

  // Data not available
  if (!evolutionData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Матрица эволюции технологий</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">Данные матрицы недоступны</div>
        </CardContent>
      </Card>
    );
  }

  const showTooltip = (event: React.MouseEvent, content: string) => {
    setTooltip({
      content,
      x: event.pageX + 10,
      y: event.pageY - 10,
      visible: true,
    });
  };

  const hideTooltip = () => {
    setTooltip((prev) => ({ ...prev, visible: false }));
  };

  const getVisibleRevisions = () => {
    // Используем общий порядок ревизий из shared
    return filter === 'rev5' ? (['rev5'] as const) : (REVISION_ORDER as readonly typeof REVISION_ORDER[number][]);
  };

  const getVisibleModules = () => {
    const currentData = evolutionData;

      if (import.meta.env.DEV) {
        console.log('getVisibleModules - выбран источник:', dataSource);
        console.log('getVisibleModules - количество модулей:', currentData.modules.length);
        console.log(
          'getVisibleModules - названия:',
          currentData.modules.map((m) => m.name)
        );
      }

    if (!currentData || !currentData.modules || !Array.isArray(currentData.modules)) {
      console.error('Ошибка: currentData.modules не является массивом!', currentData);
      return [] as typeof evolutionData.modules;
    }

    if (filter === 'hideUnchanged') {
      const filteredModules = currentData.modules.filter((module) => {
        const revisions = REVISION_ORDER;

        for (let i = 1; i < revisions.length; i++) {
          const current = module.revisions[revisions[i]];
          const previous = module.revisions[revisions[i - 1]];

          if (current.tech !== previous.tech && current.tech.trim() !== '') {
            return true;
          }
        }

        return (Object.values(module.revisions) as { tech: string }[]).some((rev) =>
          rev.tech.trim() !== ''
        );
      });

        if (import.meta.env.DEV) {
          console.log('Фильтр "hideUnchanged" применен. Показано модулей:', filteredModules.length);
          console.log(
            'Отфильтрованные модули:',
            filteredModules.map((m) => m.name)
          );
        }

      return filteredModules as typeof evolutionData.modules;
    }

      if (import.meta.env.DEV) console.log('Возвращаем все модулы без фильтрации:', currentData.modules.length);
    // Сортируем модули по порядку UI_MODULES для консистентного отображения
    const ordered = [...currentData.modules].sort((a, b) => {
      const ia = UI_MODULES.indexOf(a.name);
      const ib = UI_MODULES.indexOf(b.name);
      const av = ia === -1 ? Number.MAX_SAFE_INTEGER : ia;
      const bv = ib === -1 ? Number.MAX_SAFE_INTEGER : ib;
      return av - bv;
    });
    return ordered;
  };

  const getCellClass = (data: { tech: string; period?: string }) => {
    const baseClasses = 'evolution-cell p-3 text-center text-xs font-medium border-r border-border';
    if (data.tech === '') return `${baseClasses} empty-cell`;
    return `${baseClasses} ${data.period}-tech`;
  };

  // Метаданные ревизий берём из shared REVISIONS
  const revisionLabels = REVISIONS;

  const visibleRevisions = getVisibleRevisions();
  const visibleModules = getVisibleModules();

  // Отладочный вывод
  if (import.meta.env.DEV) {
    console.log('=== ОТЛАДКА EvolutionMatrix RENDER ===');
    console.log('Текущий фильтр:', filter);
    console.log('Текущий источник данных:', dataSource);
    console.log('Видимые ревизии:', visibleRevisions);
    console.log('Количество видимых модулей:', visibleModules.length);
    console.log(
      'Названия видимых модулей:',
      visibleModules.map((m) => m.name)
    );
  }

  if (import.meta.env.DEV && visibleModules.length < 8) {
    console.warn('ПРЕДУПРЕЖДЕНИЕ: Ожидалось минимум 8 модулей, получено:', visibleModules.length);
  }

  // Получаем покрытие технологий из кейсов
  const technologyCoverage = tradingMachines ? getMatrixTechnologyCoverage(tradingMachines) : {};

  return (
    <div className="lg:col-span-7">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Матрица эволюции</CardTitle>

          {/* Фильтры по ревизиям */}
          <div className="flex flex-wrap gap-3 mb-3">
            <Button
              onClick={() => setFilter('rev5')}
              variant={filter === 'rev5' ? 'default' : 'secondary'}
              size="sm"
              data-testid="button-show-rev5"
            >
              Показать только Rev.5
            </Button>
            <Button
              onClick={() => setFilter('all')}
              variant={filter === 'all' ? 'default' : 'secondary'}
              size="sm"
              data-testid="button-show-all"
            >
              Показать все ревизии
            </Button>
            <Button
              onClick={() => setFilter('hideUnchanged')}
              variant={filter === 'hideUnchanged' ? 'default' : 'secondary'}
              size="sm"
              data-testid="button-hide-unchanged"
            >
              Скрыть модули без изменений
            </Button>
          </div>

          {/* Переключатели источников данных */}
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => setDataSource('original')}
              variant={dataSource === 'original' ? 'default' : 'outline'}
              size="sm"
            >
              Оригинальная матрица
            </Button>
            <Button
              onClick={() => setDataSource('integrated')}
              variant={dataSource === 'integrated' ? 'default' : 'outline'}
              size="sm"
            >
              С технологиями из базы
            </Button>
            <Button
              onClick={() => setDataSource('dynamic')}
              variant={dataSource === 'dynamic' ? 'default' : 'outline'}
              size="sm"
            >
              Динамическая (каждая технология = строка)
            </Button>
          </div>

          <div className="text-sm text-muted-foreground">
            Найдено модулей: {visibleModules.length}
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="sticky left-0 bg-muted text-muted-foreground p-3 text-left font-semibold min-w-[200px]">
                    Модуль
                  </th>
                  {visibleRevisions.map((rev) => (
                    <th
                      key={rev}
                      className="p-3 text-center font-semibold text-muted-foreground min-w-[120px]"
                    >
                      {revisionLabels[rev].label}
                      <br />
                      <span className="text-xs">{revisionLabels[rev].period}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visibleModules.map((module, moduleIndex) => (
                  <tr key={moduleIndex} className="border-b border-border">
                    <td className="sticky left-0 bg-muted text-foreground p-3 font-medium border-r border-border">
                      <div
                        className="flex items-center gap-2 cursor-pointer hover:bg-muted/80 rounded p-1 transition-colors"
                        onClick={() => onModuleClick?.(module.name)}
                        title="Кликните для фильтрации технологий по этому модулю"
                      >
                        {module.name}
                        {Array.isArray(technologyCoverage[module.name]) &&
                          technologyCoverage[module.name].length > 0 && (
                            <span
                              className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full"
                              title={`Представлено в кейсах: ${technologyCoverage[module.name].length} технологий`}
                            >
                              {technologyCoverage[module.name].length}
                            </span>
                          )}
                      </div>
                    </td>
                    {visibleRevisions.map((rev) => {
                      const data = module.revisions[rev as keyof typeof module.revisions];
                      return (
                        <td
                          key={rev}
                          className={`${getCellClass(data)} ${data.tech ? 'cursor-pointer hover:bg-blue-50 transition-colors' : ''}`}
                          onMouseEnter={(e) => showTooltip(e, data.desc)}
                          onMouseLeave={hideTooltip}
                          onClick={() => {
                            if (data.tech && data.tech.trim() !== '') {
                              const firstTech = data.tech.split(',')[0].trim().split('→')[0].trim();
                              onTechnologyClick?.(firstTech);
                            }
                          }}
                          data-testid={`cell-${moduleIndex}-${rev}`}
                          title={
                            data.tech
                              ? `Кликните для просмотра деталей технологии: ${data.tech}`
                              : ''
                          }
                        >
                          {data.tech}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Tooltip */}
      {tooltip.visible && (
        <div
          className="fixed bg-foreground text-background p-2 rounded-md text-sm max-w-[200px] z-50 pointer-events-none transition-opacity duration-200"
          style={{ left: tooltip.x, top: tooltip.y }}
          data-testid="tooltip"
        >
          {tooltip.content}
        </div>
      )}
    </div>
  );
}
