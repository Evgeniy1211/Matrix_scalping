import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { evolutionData, type RevisionData } from "@/data/evolution-data";

type FilterType = 'all' | 'rev5' | 'hideUnchanged';

export function EvolutionMatrix() {
  const [filter, setFilter] = useState<FilterType>('all');
  const [tooltip, setTooltip] = useState<{ content: string; x: number; y: number; visible: boolean }>({
    content: '',
    x: 0,
    y: 0,
    visible: false
  });

  const showTooltip = (event: React.MouseEvent, content: string) => {
    setTooltip({
      content,
      x: event.pageX + 10,
      y: event.pageY - 10,
      visible: true
    });
  };

  const hideTooltip = () => {
    setTooltip(prev => ({ ...prev, visible: false }));
  };

  const getVisibleRevisions = () => {
    if (filter === 'rev5') return ['rev5'];
    return ['rev1', 'rev2', 'rev3', 'rev4', 'rev5'];
  };

  const getVisibleModules = () => {
    if (filter === 'hideUnchanged') {
      return evolutionData.modules.filter(module => {
        const revisions = ['rev1', 'rev2', 'rev3', 'rev4', 'rev5'] as const;
        for (let i = 1; i < revisions.length; i++) {
          const current = module.revisions[revisions[i]];
          const previous = module.revisions[revisions[i - 1]];
          if (current.tech !== previous.tech && current.tech.trim() !== '') {
            return true;
          }
        }
        return false;
      });
    }
    return evolutionData.modules;
  };

  const getCellClass = (data: RevisionData) => {
    const baseClasses = "evolution-cell p-3 text-center text-xs font-medium border-r border-border";
    if (data.tech === '') return `${baseClasses} empty-cell`;
    return `${baseClasses} ${data.period}-tech`;
  };

  const revisionLabels = {
    rev1: { label: "Rev.1", period: "(2000–2015)" },
    rev2: { label: "Rev.2", period: "(2015–2020)" },
    rev3: { label: "Rev.3", period: "(2020–2022)" },
    rev4: { label: "Rev.4", period: "(2022–2023)" },
    rev5: { label: "Rev.5", period: "(2023–2025)" }
  };

  const visibleRevisions = getVisibleRevisions();
  const visibleModules = getVisibleModules();

  return (
    <div className="lg:col-span-7">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Матрица эволюции</CardTitle>
          <div className="flex flex-wrap gap-3">
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
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="sticky left-0 bg-muted text-muted-foreground p-3 text-left font-semibold min-w-[200px]">
                    Модуль
                  </th>
                  {visibleRevisions.map(rev => (
                    <th key={rev} className="p-3 text-center font-semibold text-muted-foreground min-w-[120px]">
                      {revisionLabels[rev as keyof typeof revisionLabels].label}
                      <br />
                      <span className="text-xs">
                        {revisionLabels[rev as keyof typeof revisionLabels].period}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visibleModules.map((module, moduleIndex) => (
                  <tr key={moduleIndex} className="border-b border-border">
                    <td className="sticky left-0 bg-muted text-foreground p-3 font-medium border-r border-border">
                      {module.name}
                    </td>
                    {visibleRevisions.map(rev => {
                      const data = module.revisions[rev as keyof typeof module.revisions];
                      return (
                        <td
                          key={rev}
                          className={getCellClass(data)}
                          onMouseEnter={(e) => showTooltip(e, data.desc)}
                          onMouseLeave={hideTooltip}
                          data-testid={`cell-${moduleIndex}-${rev}`}
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
