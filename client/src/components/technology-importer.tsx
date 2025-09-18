import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useTechnologies } from "@/hooks/use-technologies";
import type { Technology } from "@shared/schema";

// Вспомогательная утилита: грубый парсер текста в структуру технологии
function parseTechnologyDescription(text: string): Partial<Technology> {
  const lines = text.split(/\r?\n/);
  const res: Partial<Technology> = {
    description: "",
    advantages: [],
    disadvantages: [],
    useCases: [],
    periods: { start: new Date().getFullYear() },
  } as Partial<Technology>;

  let section: "desc" | "pros" | "cons" | "use" | "period" | null = null;
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;

    if (/^Преимущества/i.test(line)) { section = "pros"; continue; }
    if (/^Недостатки/i.test(line)) { section = "cons"; continue; }
    if (/^Применение/i.test(line)) { section = "use"; continue; }
    if (/^Период/i.test(line)) { section = "period"; continue; }

    if (section === "pros" && line.startsWith("-")) {
      (res.advantages as string[]).push(line.replace(/^[-•]\s*/, ""));
    } else if (section === "cons" && line.startsWith("-")) {
      (res.disadvantages as string[]).push(line.replace(/^[-•]\s*/, ""));
    } else if (section === "use" && line.startsWith("-")) {
      (res.useCases as string[]).push(line.replace(/^[-•]\s*/, ""));
    } else if (section === "period") {
      const m = line.match(/(\d{4})(?:\D+(\d{4}))?/);
      if (m) {
        const start = parseInt(m[1], 10);
        const end = m[2] ? parseInt(m[2], 10) : undefined;
        res.periods = { ...(res.periods || {}), start, end } as any;
      }
    } else {
      res.description = (res.description || "") + (res.description ? "\n" : "") + line;
    }
  }

  return res;
}

// Заглушка обогащения БД: имитация запроса, возвращает базовый объект
async function enrichTechnologyDatabase(names: string[]): Promise<Partial<Technology>[]> {
  return names.map((n) => ({
    name: n,
    description: `Автоматически собранная справка по технологии ${n}.`,
    periods: { start: new Date().getFullYear() },
    applicableModules: [],
    advantages: [],
    disadvantages: [],
    useCases: [],
    sources: []
  }));
}

export function TechnologyImporter() {
  const [importText, setImportText] = useState("");
  const [technologyName, setTechnologyName] = useState("");
  const [parsedData, setParsedData] = useState<Partial<Technology> | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleParseText = () => {
    if (!importText.trim()) return;
    
    const parsed = parseTechnologyDescription(importText);
    parsed.name = technologyName || "Новая технология";
    setParsedData(parsed);
  };

  const handleFetchExternal = async () => {
    if (!technologyName.trim()) return;
    
    setIsLoading(true);
    try {
      const enriched = await enrichTechnologyDatabase([technologyName]);
      if (enriched.length > 0) {
        setParsedData(enriched[0]);
      }
    } catch (error) {
      console.error('Ошибка загрузки:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToDatabase = () => {
    if (!parsedData || !technologyName) return;
    
    const newTech: Technology = {
      id: technologyName.toLowerCase().replace(/\s+/g, '-'),
      name: technologyName,
      description: parsedData.description || "",
      category: 'infrastructure',
      periods: parsedData.periods || { start: new Date().getFullYear() },
      applicableModules: parsedData.applicableModules || [],
      advantages: parsedData.advantages || [],
      disadvantages: parsedData.disadvantages || [],
      useCases: parsedData.useCases || [],
      sources: parsedData.sources || []
    };

    console.log('Новая технология для добавления:', newTech);
    // Здесь можно интегрировать с основной базой данных
    alert('Технология успешно обработана! Проверьте консоль для деталей.');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Импорт технологии</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Название технологии</label>
            <Input
              value={technologyName}
              onChange={(e) => setTechnologyName(e.target.value)}
              placeholder="например: TensorFlow, LSTM, WebSocket"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Описание технологии</label>
            <Textarea
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              placeholder="Вставьте описание технологии...

Преимущества:
- Высокая производительность
- Простота использования

Недостатки:
- Сложность настройки

Применение:
- Анализ временных рядов
- Предсказание цен

Период: 2015-2023"
              className="min-h-[200px]"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={handleParseText} variant="outline">
              Парсить текст
            </Button>
            <Button 
              onClick={handleFetchExternal} 
              disabled={isLoading || !technologyName}
            >
              {isLoading ? 'Загрузка...' : 'Загрузить из интернета'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Результат обработки</CardTitle>
        </CardHeader>
        <CardContent>
          {parsedData ? (
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">Название: {parsedData.name}</h4>
                <p className="text-sm text-gray-600 mt-1">
                  {parsedData.description}
                </p>
              </div>

              {parsedData.periods && (
                <div>
                  <h5 className="font-medium text-sm">Период:</h5>
                  <p className="text-sm">
                    {parsedData.periods.start} - {parsedData.periods.end || 'настоящее время'}
                  </p>
                </div>
              )}

              {parsedData.advantages && parsedData.advantages.length > 0 && (
                <div>
                  <h5 className="font-medium text-sm text-green-700">Преимущества:</h5>
                  <ul className="text-sm space-y-1">
                    {parsedData.advantages.map((adv, index) => (
                      <li key={index} className="flex items-start gap-1">
                        <span className="text-green-500">+</span>
                        <span>{adv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {parsedData.disadvantages && parsedData.disadvantages.length > 0 && (
                <div>
                  <h5 className="font-medium text-sm text-red-700">Недостатки:</h5>
                  <ul className="text-sm space-y-1">
                    {parsedData.disadvantages.map((dis, index) => (
                      <li key={index} className="flex items-start gap-1">
                        <span className="text-red-500">-</span>
                        <span>{dis}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {parsedData.useCases && parsedData.useCases.length > 0 && (
                <div>
                  <h5 className="font-medium text-sm">Применение:</h5>
                  <ul className="text-sm space-y-1">
                    {parsedData.useCases.map((use, index) => (
                      <li key={index} className="flex items-start gap-1">
                        <span className="text-blue-500">•</span>
                        <span>{use}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <Button onClick={handleAddToDatabase} className="w-full">
                Добавить в базу технологий
              </Button>
            </div>
          ) : (
            <p className="text-gray-500">Введите данные и нажмите "Парсить текст" или "Загрузить из интернета"</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
