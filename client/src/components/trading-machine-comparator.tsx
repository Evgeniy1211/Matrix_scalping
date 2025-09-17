
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTradingMachines } from "@/hooks/use-technologies";
import type { TradingMachine } from "@shared/schema";

export function TradingMachineComparator() {
  const [selectedCase, setSelectedCase] = useState<TradingMachineCase>(tradingMachineCases[0]);

  const getCategoryColor = (category: string) => {
    const colors = {
      data: 'bg-blue-100 text-blue-800',
      processing: 'bg-green-100 text-green-800',
      ml: 'bg-purple-100 text-purple-800',
      visualization: 'bg-orange-100 text-orange-800',
      infrastructure: 'bg-gray-100 text-gray-800'
    };
    return colors[category as keyof typeof colors] || colors.infrastructure;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Список кейсов */}
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Кейсы торговых машин</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {tradingMachineCases.map((case_) => (
              <Button
                key={case_.id}
                variant={selectedCase.id === case_.id ? "default" : "outline"}
                className="w-full justify-start text-left h-auto p-3"
                onClick={() => setSelectedCase(case_)}
              >
                <div>
                  <div className="font-medium">{case_.name}</div>
                  <div className="text-xs text-muted-foreground">{case_.period}</div>
                </div>
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Детали выбранного кейса */}
      <div className="lg:col-span-3">
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Обзор</TabsTrigger>
            <TabsTrigger value="technologies">Технологии</TabsTrigger>
            <TabsTrigger value="modules">Модули</TabsTrigger>
            <TabsTrigger value="performance">Результаты</TabsTrigger>
            <TabsTrigger value="code">Код</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {selectedCase.name}
                  <Badge variant="outline">{selectedCase.period}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Описание</h4>
                  <p className="text-muted-foreground">{selectedCase.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-1">Стратегия</h4>
                    <p className="text-sm text-muted-foreground">{selectedCase.strategy}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Таймфрейм</h4>
                    <p className="text-sm text-muted-foreground">{selectedCase.timeframe}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Рынок</h4>
                    <p className="text-sm text-muted-foreground">{selectedCase.marketType}</p>
                  </div>
                  {selectedCase.author && (
                    <div>
                      <h4 className="font-medium mb-1">Автор</h4>
                      <p className="text-sm text-muted-foreground">{selectedCase.author}</p>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2 text-green-600">Преимущества</h4>
                    <ul className="space-y-1">
                      {selectedCase.advantages.map((advantage, index) => (
                        <li key={index} className="text-sm flex items-start gap-2">
                          <span className="text-green-500 mt-1">✓</span>
                          {advantage}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 text-red-600">Недостатки</h4>
                    <ul className="space-y-1">
                      {selectedCase.disadvantages.map((disadvantage, index) => (
                        <li key={index} className="text-sm flex items-start gap-2">
                          <span className="text-red-500 mt-1">✗</span>
                          {disadvantage}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="technologies">
            <Card>
              <CardHeader>
                <CardTitle>Матрица технологий кейса</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Технологии, используемые в кейсе "{selectedCase.name}", представленные в формате матрицы
                </p>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="sticky left-0 bg-muted text-muted-foreground p-3 text-left font-semibold min-w-[200px]">
                          Модуль
                        </th>
                        <th className="p-3 text-center font-semibold text-muted-foreground min-w-[200px]">
                          Технологии в кейсе
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(selectedCase.modules).map(([moduleName, technologies]) => (
                        <tr key={moduleName} className="border-b border-border">
                          <td className="sticky left-0 bg-muted text-foreground p-3 font-medium border-r border-border">
                            {moduleName.replace(/([A-Z])/g, ' $1').trim().replace(/^./, str => str.toUpperCase())}
                          </td>
                          <td className="p-3 text-center border-r border-border">
                            <div className="flex flex-wrap gap-1 justify-center">
                              {technologies.length > 0 ? (
                                technologies.map((tech, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    {tech}
                                  </Badge>
                                ))
                              ) : (
                                <span className="text-muted-foreground text-sm italic">Не используется</span>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* Отдельная секция для детального технологического стека */}
                <div className="mt-6 pt-6 border-t border-border">
                  <h4 className="font-semibold mb-4">Детальный технологический стек</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {selectedCase.technologies.map((tech, index) => (
                      <div key={index} className="border rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <h5 className="font-medium text-sm">{tech.name}</h5>
                          {tech.version && (
                            <Badge variant="outline" className="text-xs">{tech.version}</Badge>
                          )}
                          <Badge className={getCategoryColor(tech.category) + " text-xs"}>
                            {tech.category}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{tech.purpose}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="modules">
            <Card>
              <CardHeader>
                <CardTitle>Модули системы</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(selectedCase.modules).map(([moduleName, technologies]) => (
                    <div key={moduleName} className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2 capitalize">
                        {moduleName.replace(/([A-Z])/g, ' $1').trim()}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {technologies.map((tech, index) => (
                          <Badge key={index} variant="secondary">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance">
            <Card>
              <CardHeader>
                <CardTitle>Результаты производительности</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedCase.performance ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(selectedCase.performance).map(([metric, value]) => (
                      <div key={metric} className="text-center p-4 border rounded-lg">
                        <div className="text-2xl font-bold text-primary">
                          {typeof value === 'number' ? 
                            (metric.includes('Ratio') || metric.includes('Drawdown') ? 
                              value.toFixed(2) : 
                              (value * 100).toFixed(1) + '%'
                            ) : 
                            value
                          }
                        </div>
                        <div className="text-sm text-muted-foreground capitalize">
                          {metric.replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">Данные о производительности недоступны</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="code">
            <Card>
              <CardHeader>
                <CardTitle>Пример кода</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedCase.codeExample ? (
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{selectedCase.codeExample}</code>
                  </pre>
                ) : (
                  <p className="text-muted-foreground">Код не предоставлен</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
