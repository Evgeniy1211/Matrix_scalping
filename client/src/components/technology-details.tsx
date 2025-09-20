import { useEffect, useState } from 'react';
import { categoriesForModule } from '@shared/constants';
import type { Technology } from '@shared/schema';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTechnologies } from '@/hooks/use-technologies';

// Re-defining the interface based on the original component's usage and the new snippet's implied structure.
// This might need adjustment if the actual schema is different.
interface TechnologyDetailsProps {
  moduleFilter?: string;
  selectedTechnologyName?: string;
  onTechnologySelect?: (tech: Technology | null) => void;
}

export function TechnologyDetails({
  moduleFilter,
  selectedTechnologyName,
  onTechnologySelect,
}: TechnologyDetailsProps) {
  const [selectedTech, setSelectedTech] = useState<Technology | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { data: technologies, isLoading, isError } = useTechnologies();

  // Effect for automatic technology selection by name or ID
  useEffect(() => {
    if (!selectedTechnologyName || !technologies) return;

    const lower = selectedTechnologyName.toLowerCase();

    // First, search by exact ID match
    let tech = technologies.find((t) => t.id === selectedTechnologyName);

    // If not found by ID, search by name
    if (!tech) {
      tech = technologies.find((t) => t.name.toLowerCase() === lower);
    }

    // If still not found, search by partial match
    if (!tech) {
      tech = technologies.find(
        (t) => t.name.toLowerCase().includes(lower) || lower.includes(t.name.toLowerCase())
      );
    }

    // Update selectedTech and call onTechnologySelect if a new tech is found
    if (tech && tech.id !== selectedTech?.id) {
      setSelectedTech(tech);
      onTechnologySelect?.(tech);
    }
  }, [selectedTechnologyName, technologies, selectedTech?.id, onTechnologySelect]);

  // Используем общий источник правды для маппинга модуль -> категории
  const getModuleCategory = (moduleName: string): string[] => categoriesForModule(moduleName);

  let filteredTechs = technologies || [];

  // Filtering by module
  if (moduleFilter) {
  const categories = getModuleCategory(moduleFilter);
    if (categories.length > 0) {
      filteredTechs = filteredTechs.filter((tech) => categories.includes(tech.category));
    }
  }

  // Additional filtering by search query
  if (searchQuery) {
    filteredTechs = filteredTechs.filter(
      (tech) =>
        tech.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tech.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) || // Assuming fullName might exist on Technology
        tech.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      data: 'bg-blue-100 text-blue-800',
      processing: 'bg-green-100 text-green-800',
      ml: 'bg-purple-100 text-purple-800',
      visualization: 'bg-orange-100 text-orange-800',
      infrastructure: 'bg-gray-100 text-gray-800',
      risk: 'bg-red-100 text-red-800',
      execution: 'bg-yellow-100 text-yellow-800',
      adaptation: 'bg-indigo-100 text-indigo-800',
    };
    return colors[category as keyof typeof colors] || colors.infrastructure;
  };

  const handleRelatedTechnologyClick = (techId: string) => {
    let tech = (technologies || []).find((t) => t.id === techId);
    if (!tech) {
      tech = (technologies || []).find((t) => t.name.toLowerCase() === techId.toLowerCase());
    }

    if (tech) {
      setSelectedTech(tech);
      onTechnologySelect?.(tech);
    } else {
      alert(
        `Технология "${techId}" не найдена в базе данных. Необходимо добавить информацию об этой технологии.`
      );
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>База технологий</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">Загрузка данных...</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Детали технологии</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              Выберите технологию для просмотра деталей
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>База технологий</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-red-500">Ошибка загрузки данных</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Детали технологии</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              Невозможно загрузить детали
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Список технологий */}
      <Card>
        <CardHeader>
          <CardTitle>
            База технологий
            {moduleFilter && (
              <span className="text-sm font-normal text-muted-foreground ml-2">
                (фильтр: {moduleFilter})
              </span>
            )}
          </CardTitle>
          <input
            type="text"
            placeholder="Поиск технологий..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mt-2 px-3 py-2 border border-gray-300 rounded-md"
          />
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredTechs.map((tech) => (
              <div
                key={tech.id}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedTech?.id === tech.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => {
                  setSelectedTech(tech);
                  onTechnologySelect?.(tech);
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{tech.name}</h4>
                  <Badge className={getCategoryColor(tech.category)}>{tech.category}</Badge>
                </div>
                <p className="text-sm text-gray-600">{tech.description.substring(0, 100)}...</p>
                <div className="text-xs text-gray-500 mt-1">
                  {tech.periods.start} - {tech.periods.end || 'настоящее время'}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Детали выбранной технологии */}
      <Card>
        <CardHeader>
          <CardTitle>{selectedTech ? selectedTech.name : 'Выберите технологию'}</CardTitle>
          {selectedTech?.fullName && (
            <p className="text-sm text-gray-600">{selectedTech.fullName}</p>
          )}
        </CardHeader>
        <CardContent>
          {selectedTech ? (
            <div className="space-y-4">
              <div>
                <h5 className="font-medium mb-2">Описание</h5>
                <p className="text-sm">{selectedTech.description}</p>
              </div>

              <div>
                <h5 className="font-medium mb-2">Период использования</h5>
                <div className="text-sm">
                  <p>Начало: {selectedTech.periods.start}</p>
                  {selectedTech.periods.peak && <p>Пик: {selectedTech.periods.peak}</p>}
                  {selectedTech.periods.decline && <p>Спад: {selectedTech.periods.decline}</p>}
                  {selectedTech.periods.end && <p>Конец: {selectedTech.periods.end}</p>}
                </div>
              </div>

              {selectedTech.evolution && (
                <div>
                  <h5 className="font-medium mb-2">Эволюция</h5>
                  <div className="text-sm space-y-2">
                    {selectedTech.evolution.predecessors &&
                      selectedTech.evolution.predecessors.length > 0 && (
                        <p>
                          Предшественники:{' '}
                          {selectedTech.evolution.predecessors.map((predId, index) => {
                            const predTech = (technologies || []).find(
                              (t) =>
                                t.id === predId || t.name.toLowerCase() === predId.toLowerCase()
                            );
                            return (
                              <span key={predId}>
                                {index > 0 && ', '}
                                <span
                                  className={
                                    predTech
                                      ? 'text-blue-600 hover:text-blue-800 cursor-pointer underline'
                                      : 'text-gray-500'
                                  }
                                  onClick={() =>
                                    predTech ? handleRelatedTechnologyClick(predId) : null
                                  }
                                  title={
                                    predTech
                                      ? `Перейти к ${predTech.name}`
                                      : `Технология "${predId}" не найдена в базе данных`
                                  }
                                >
                                  {predTech ? predTech.name : predId}
                                </span>
                              </span>
                            );
                          })}
                        </p>
                      )}
                    {selectedTech.evolution.successors &&
                      selectedTech.evolution.successors.length > 0 && (
                        <p>
                          Последователи:{' '}
                          {selectedTech.evolution.successors.map((succId, index) => {
                            const succTech = (technologies || []).find(
                              (t) =>
                                t.id === succId || t.name.toLowerCase() === succId.toLowerCase()
                            );
                            return (
                              <span key={succId}>
                                {index > 0 && ', '}
                                <span
                                  className={
                                    succTech
                                      ? 'text-blue-600 hover:text-blue-800 cursor-pointer underline'
                                      : 'text-gray-500'
                                  }
                                  onClick={() =>
                                    succTech ? handleRelatedTechnologyClick(succId) : null
                                  }
                                  title={
                                    succTech
                                      ? `Перейти к ${succTech.name}`
                                      : `Технология "${succId}" не найдена в базе данных`
                                  }
                                >
                                  {succTech ? succTech.name : succId}
                                </span>
                              </span>
                            );
                          })}
                        </p>
                      )}
                    {selectedTech.evolution.variants &&
                      selectedTech.evolution.variants.length > 0 && (
                        <p>
                          Варианты:{' '}
                          {selectedTech.evolution.variants.map((varId, index) => {
                            const varTech = (technologies || []).find(
                              (t) => t.id === varId || t.name.toLowerCase() === varId.toLowerCase()
                            );
                            return (
                              <span key={varId}>
                                {index > 0 && ', '}
                                <span
                                  className={
                                    varTech
                                      ? 'text-blue-600 hover:text-blue-800 cursor-pointer underline'
                                      : 'text-gray-500'
                                  }
                                  onClick={() =>
                                    varTech ? handleRelatedTechnologyClick(varId) : null
                                  }
                                  title={
                                    varTech
                                      ? `Перейти к ${varTech.name}`
                                      : `Технология "${varId}" не найдена в базе данных`
                                  }
                                >
                                  {varTech ? varTech.name : varId}
                                </span>
                              </span>
                            );
                          })}
                        </p>
                      )}
                  </div>
                </div>
              )}

              <div>
                <h5 className="font-medium mb-2">Применимые модули</h5>
                <div className="flex flex-wrap gap-1">
                  {selectedTech.applicableModules.map((module, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {module}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium mb-2 text-green-700">Преимущества</h5>
                  <ul className="text-sm space-y-1">
                    {selectedTech.advantages.map((advantage, index) => (
                      <li key={index} className="flex items-start gap-1">
                        <span className="text-green-500 mt-1">+</span>
                        <span>{advantage}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="font-medium mb-2 text-red-700">Недостатки</h5>
                  <ul className="text-sm space-y-1">
                    {selectedTech.disadvantages.map((disadvantage, index) => (
                      <li key={index} className="flex items-start gap-1">
                        <span className="text-red-500 mt-1">-</span>
                        <span>{disadvantage}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h5 className="font-medium mb-2">Случаи использования</h5>
                <ul className="text-sm space-y-1">
                  {selectedTech.useCases.map((useCase, index) => (
                    <li key={index} className="flex items-start gap-1">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>{useCase}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {selectedTech.sources && (
                <div>
                  <h5 className="font-medium mb-2">Источники</h5>
                  <div className="text-sm space-y-1">
                    {selectedTech.sources.map((source, index) => (
                      <p key={index} className="italic text-gray-600">
                        {source}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-500">
              Выберите технологию из списка для просмотра подробной информации
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
