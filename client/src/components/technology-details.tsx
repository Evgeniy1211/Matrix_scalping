
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { technologyDatabase, searchTechnologies, type TechnologyDescription } from "@/data/technologies";

interface TechnologyDetailsProps {
  moduleFilter?: string;
  selectedTechnologyName?: string;
  onTechnologySelect?: (tech: TechnologyDescription | null) => void;
}

export function TechnologyDetails({ 
  moduleFilter, 
  selectedTechnologyName, 
  onTechnologySelect 
}: TechnologyDetailsProps) {
  const [selectedTech, setSelectedTech] = useState<TechnologyDescription | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Эффект для автоматического выбора технологии по имени
  useState(() => {
    if (selectedTechnologyName) {
      const tech = technologyDatabase.find(t => 
        t.name.toLowerCase().includes(selectedTechnologyName.toLowerCase()) ||
        selectedTechnologyName.toLowerCase().includes(t.name.toLowerCase())
      );
      if (tech && tech.id !== selectedTech?.id) {
        setSelectedTech(tech);
        onTechnologySelect?.(tech);
      }
    }
  });

  // Маппинг модулей матрицы на категории технологий
  const getModuleCategory = (moduleName: string): string[] => {
    const moduleMapping: Record<string, string[]> = {
      'Сбор данных': ['data'],
      'Обработка данных': ['processing'],
      'Feature Engineering': ['processing', 'ml'],
      'Генерация сигналов': ['ml'],
      'Риск-менеджмент': ['risk'],
      'Исполнение сделок': ['execution'],
      'Адаптация к рынку': ['adaptation'],
      'Визуализация и мониторинг': ['visualization']
    };
    
    // Ищем точное совпадение
    const exactMatch = moduleMapping[moduleName];
    if (exactMatch) return exactMatch;
    
    // Поиск по частичному совпадению для более сложных имен модулей
    const partialMatch = Object.keys(moduleMapping).find(key => 
      moduleName.includes(key) || key.includes(moduleName)
    );
    
    if (partialMatch) return moduleMapping[partialMatch];
    
    // Дополнительные проверки для специфических случаев
    if (moduleName.toLowerCase().includes('визуализация') || 
        moduleName.toLowerCase().includes('мониторинг')) {
      return ['visualization'];
    }
    if (moduleName.toLowerCase().includes('данные') || 
        moduleName.toLowerCase().includes('сбор')) {
      return ['data'];
    }
    if (moduleName.toLowerCase().includes('обработка')) {
      return ['processing'];
    }
    if (moduleName.toLowerCase().includes('сигнал') || 
        moduleName.toLowerCase().includes('машинное') ||
        moduleName.toLowerCase().includes('обучение')) {
      return ['ml'];
    }
    if (moduleName.toLowerCase().includes('риск')) {
      return ['risk'];
    }
    if (moduleName.toLowerCase().includes('исполнение') || 
        moduleName.toLowerCase().includes('сделк')) {
      return ['execution'];
    }
    if (moduleName.toLowerCase().includes('адаптация') || 
        moduleName.toLowerCase().includes('рынок')) {
      return ['adaptation'];
    }
    
    return [];
  };

  let filteredTechs = technologyDatabase;

  // Фильтрация по модулю
  if (moduleFilter) {
    const categories = getModuleCategory(moduleFilter);
    console.log(`Фильтр модуля: "${moduleFilter}" → категории:`, categories);
    console.log('Доступные технологии:', technologyDatabase.map(t => `${t.name} (${t.category})`));
    
    if (categories.length > 0) {
      filteredTechs = filteredTechs.filter(tech => 
        categories.includes(tech.category)
      );
      console.log('Отфильтрованные технологии:', filteredTechs.map(t => t.name));
    }
  }

  // Дополнительная фильтрация по поисковому запросу
  if (searchQuery) {
    filteredTechs = filteredTechs.filter(tech =>
      tech.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      'data': 'bg-blue-100 text-blue-800',
      'processing': 'bg-green-100 text-green-800',
      'ml': 'bg-purple-100 text-purple-800',
      'visualization': 'bg-orange-100 text-orange-800',
      'infrastructure': 'bg-gray-100 text-gray-800',
      'risk': 'bg-red-100 text-red-800',
      'execution': 'bg-yellow-100 text-yellow-800',
      'adaptation': 'bg-indigo-100 text-indigo-800'
    };
    return colors[category as keyof typeof colors] || colors.infrastructure;
  };

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
                  <Badge className={getCategoryColor(tech.category)}>
                    {tech.category}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">
                  {tech.description.substring(0, 100)}...
                </p>
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
          <CardTitle>
            {selectedTech ? selectedTech.name : "Выберите технологию"}
          </CardTitle>
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
                  <div className="text-sm space-y-1">
                    {selectedTech.evolution.predecessors && (
                      <p>Предшественники: {selectedTech.evolution.predecessors.join(', ')}</p>
                    )}
                    {selectedTech.evolution.successors && (
                      <p>Последователи: {selectedTech.evolution.successors.join(', ')}</p>
                    )}
                    {selectedTech.evolution.variants && (
                      <p>Варианты: {selectedTech.evolution.variants.join(', ')}</p>
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
                      <p key={index} className="italic text-gray-600">{source}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-500">Выберите технологию из списка для просмотра подробной информации</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
