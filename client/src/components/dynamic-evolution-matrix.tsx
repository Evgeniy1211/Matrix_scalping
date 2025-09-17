
import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTechnologies } from "@/hooks/use-technologies";
import { buildTechnologyRows, type TechnologyRow } from "@/lib/buildTechnologyRows";
import type { Technology } from "@shared/schema";

interface DynamicEvolutionMatrixProps {
  onModuleClick?: (moduleName: string) => void;
  onTechnologyClick?: (technologyName: string) => void;
  selectedModule?: string;
}


export function DynamicEvolutionMatrix({ 
  onModuleClick, 
  onTechnologyClick, 
  selectedModule 
}: DynamicEvolutionMatrixProps) {
  const [filter, setFilter] = useState<'all' | 'category'>('all');
  const { data: technologies, isLoading, isError } = useTechnologies();

  const revisionPeriods = {
    rev1: { label: "Rev.1", period: "(2000–2015)", years: [2000, 2015] as [number, number] },
    rev2: { label: "Rev.2", period: "(2015–2020)", years: [2015, 2020] as [number, number] },
    rev3: { label: "Rev.3", period: "(2020–2022)", years: [2020, 2022] as [number, number] },
    rev4: { label: "Rev.4", period: "(2022–2023)", years: [2022, 2023] as [number, number] },
    rev5: { label: "Rev.5", period: "(2023–2025)", years: [2023, 2025] as [number, number] }
  };

  // All hooks ALWAYS called - no conditional early returns
  // Создаем строки для матрицы
  const technologyRows = useMemo((): TechnologyRow[] => {
    if (!technologies) return [];
    return buildTechnologyRows(technologies, revisionPeriods);
  }, [technologies]);

  // Фильтруем строки
  const filteredRows = useMemo(() => {
    if (!selectedModule) return technologyRows;
    return technologyRows.filter(row => row.module === selectedModule);
  }, [technologyRows, selectedModule]);

  // Группируем по модулям для отображения
  const groupedRows = useMemo(() => {
    const groups: Record<string, TechnologyRow[]> = {};
    filteredRows.forEach(row => {
      if (!groups[row.module]) {
        groups[row.module] = [];
      }
      groups[row.module].push(row);
    });
    return groups;
  }, [filteredRows]);

  const getCellClass = (cellContent: string, isConnected: boolean = false) => {
    let baseClasses = "p-2 text-center text-xs font-medium border border-border transition-all cursor-pointer hover:bg-blue-50";
    
    if (!cellContent) {
      return `${baseClasses} bg-muted text-muted-foreground`;
    }
    
    if (cellContent.includes('→')) {
      return `${baseClasses} bg-gradient-to-r from-blue-100 to-green-100 text-blue-800`;
    }
    
    if (isConnected) {
      return `${baseClasses} bg-blue-100 text-blue-800 border-blue-300 border-2`;
    }
    
    return `${baseClasses} bg-primary/10 text-primary`;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'data': 'bg-blue-500',
      'processing': 'bg-green-500',
      'ml': 'bg-purple-500',
      'visualization': 'bg-orange-500',
      'infrastructure': 'bg-gray-500',
      'risk': 'bg-red-500',
      'execution': 'bg-yellow-500',
      'adaptation': 'bg-indigo-500'
    };
    return colors[category as keyof typeof colors] || colors.infrastructure;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Динамическая матрица технологий</CardTitle>
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={() => setFilter('all')}
            variant={filter === 'all' ? 'default' : 'secondary'}
            size="sm"
          >
            Все технологии
          </Button>
          <Button
            onClick={() => setFilter('category')}
            variant={filter === 'category' ? 'default' : 'secondary'}
            size="sm"
          >
            Группировать по категориям
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center py-8">Загрузка данных...</div>
        ) : isError ? (
          <div className="text-center py-8 text-red-500">Ошибка загрузки данных</div>
        ) : (
          <div className="overflow-auto max-h-[800px]">
            <table className="w-full border-collapse">
              <thead className="sticky top-0 bg-background z-10">
                <tr>
                  <th className="sticky left-0 bg-muted text-muted-foreground p-3 text-left font-semibold min-w-[200px] border border-border">
                    Модуль / Технология
                  </th>
                  {Object.entries(revisionPeriods).map(([rev, data]) => (
                    <th key={rev} className="p-3 text-center font-semibold text-muted-foreground min-w-[150px] border border-border">
                      {data.label}
                      <br />
                      <span className="text-xs">{data.period}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
              {Object.entries(groupedRows).map(([module, rows]) => (
                <React.Fragment key={module}>
                  {/* Заголовок модуля */}
                  <tr className="border-b-2 border-border">
                    <td 
                      className={`sticky left-0 bg-primary text-primary-foreground p-3 font-bold cursor-pointer hover:bg-primary/80 transition-colors ${selectedModule === module ? 'ring-2 ring-offset-2 ring-primary' : ''}`}
                      colSpan={6}
                      onClick={() => onModuleClick?.(module)}
                    >
                      <div className="flex items-center gap-2">
                        {module}
                        <Badge variant="secondary">{rows.length} технологий</Badge>
                      </div>
                    </td>
                  </tr>
                  
                  {/* Строки технологий */}
                  {rows.map((row, rowIndex) => (
                    <tr key={row.id} className="border-b border-border hover:bg-muted/50">
                      <td className="sticky left-0 bg-background border-r border-border p-2">
                        <div className="flex items-center gap-2">
                          <div 
                            className={`w-3 h-3 rounded-full ${getCategoryColor(row.category)}`} 
                            title={row.category}
                          />
                          <span 
                            className="font-medium cursor-pointer hover:text-primary transition-colors"
                            onClick={() => onTechnologyClick?.(row.name)}
                          >
                            {row.name}
                          </span>
                        </div>
                        {/* Показываем связи */}
                        {row.predecessors.length > 0 && (
                          <div className="text-xs text-muted-foreground mt-1">
                            ← {row.predecessors.join(', ')}
                          </div>
                        )}
                      </td>
                      {Object.entries(revisionPeriods).map(([rev]) => {
                        const cellContent = row.revisions[rev as keyof typeof row.revisions];
                        const isConnected = row.predecessors.length > 0 || row.successors.length > 0;
                        
                        return (
                          <td
                            key={rev}
                            className={getCellClass(cellContent, isConnected)}
                            onClick={() => {
                              if (cellContent && !cellContent.includes('→')) {
                                onTechnologyClick?.(cellContent);
                              }
                            }}
                            title={cellContent || ''}
                          >
                            {cellContent}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        )}
      </CardContent>
    </Card>
  );
}
