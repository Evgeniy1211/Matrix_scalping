import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTechnologies } from "@/hooks/use-technologies";
import { buildTechnologyRows, type TechnologyRow } from "@/lib/buildTechnologyRows";
import type { Technology } from "@shared/schema";

interface DynamicEvolutionMatrixProps {
  onModuleClick?: (module: string) => void;
  onTechnologyClick?: (technology: string) => void;
  selectedModule?: string;
}

export function DynamicEvolutionMatrix({
  onModuleClick,
  onTechnologyClick,
  selectedModule
}: DynamicEvolutionMatrixProps) {
  const [selectedRevision, setSelectedRevision] = useState("rev5");
  const { data: technologies, isLoading, isError } = useTechnologies();

  // Всегда вызываем хуки в одном порядке
  const technologyRows = useMemo(() => {
    return technologies ? buildTechnologyRows(technologies) : [];
  }, [technologies]);

  const modules = [
    "Сбор данных",
    "Обработка данных", 
    "Feature Engineering",
    "Генерация сигналов",
    "Риск-менеджмент",
    "Исполнение сделок",
    "Адаптация к рынку",
    "Визуализация и мониторинг"
  ];

  const revisions = [
    { key: "rev1", label: "Rev 1 (2015)" },
    { key: "rev2", label: "Rev 2 (2020)" },
    { key: "rev3", label: "Rev 3 (2022)" },
    { key: "rev4", label: "Rev 4 (2023)" },
    { key: "rev5", label: "Rev 5 (2024)" }
  ];

  if (isLoading) {
    return (
      <div className="w-full p-8">
        <Card>
          <CardHeader>
            <CardTitle>Динамическая матрица эволюции</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">Загрузка данных...</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError || !technologies) {
    return (
      <div className="w-full p-8">
        <Card>
          <CardHeader>
            <CardTitle>Динамическая матрица эволюции</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-red-500">
              Ошибка загрузки данных
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Динамическая матрица эволюции торговых технологий
          </CardTitle>
          <div className="flex flex-wrap gap-2 mt-4">
            {revisions.map((rev) => (
              <Button
                key={rev.key}
                variant={selectedRevision === rev.key ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedRevision(rev.key)}
              >
                {rev.label}
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-3 text-left min-w-[200px]">
                    Модуль торговой системы
                  </th>
                  <th className="border border-gray-300 p-3 text-center min-w-[150px]">
                    {revisions.find(r => r.key === selectedRevision)?.label}
                  </th>
                </tr>
              </thead>
              <tbody>
                {modules.map((module, index) => {
                  const isSelected = selectedModule === module;
                  return (
                    <tr
                      key={index}
                      className={`hover:bg-gray-50 ${isSelected ? 'bg-blue-50 border-blue-300' : ''}`}
                    >
                      <td 
                        className={`border border-gray-300 p-3 font-medium cursor-pointer ${
                          isSelected ? 'text-blue-700' : ''
                        }`}
                        onClick={() => onModuleClick?.(module)}
                      >
                        {module}
                      </td>
                      <td className="border border-gray-300 p-3">
                        <div className="flex flex-wrap gap-2">
                          {technologyRows
                            .filter(tech => tech.applicableModules.includes(module))
                            .map((tech, techIndex) => (
                              <Badge
                                key={techIndex}
                                variant="outline"
                                className="cursor-pointer hover:bg-blue-100"
                                onClick={() => onTechnologyClick?.(tech.name)}
                              >
                                {tech.name}
                              </Badge>
                            ))}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-6 text-sm text-gray-600">
            <p>💡 <strong>Как пользоваться:</strong></p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Нажмите на модуль торговой системы для фильтрации технологий</li>
              <li>Кликните на технологию для просмотра подробной информации</li>
              <li>Используйте кнопки ревизий для просмотра эволюции во времени</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}