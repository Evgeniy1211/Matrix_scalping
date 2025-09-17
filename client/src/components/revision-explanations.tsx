import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const revisionExplanations = [
  {
    title: "Rev.1-2 (2000-2020)",
    newTech: "Traditional ML, SVM, Random Forest",
    solved: "Базовая автоматизация торговли",
    limitations: "Низкая адаптивность, простые стратегии"
  },
  {
    title: "Rev.3 (2020-2022)",
    newTech: "Deep Learning, LSTM, CNN для LOB",
    solved: "Сложные паттерны данных",
    limitations: "Требовательность к данным, переобучение"
  },
  {
    title: "Rev.4-5 (2022-2025)",
    newTech: "Transformers, GNN, Multi-Agent RL",
    solved: "Адаптация в реальном времени",
    limitations: "Вычислительная сложность, интерпретируемость"
  }
];

export function RevisionExplanations() {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold mb-6 text-foreground">Пояснения по ревизиям</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {revisionExplanations.map((revision, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">{revision.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>
                <strong>Новые технологии:</strong> {revision.newTech}
              </p>
              <p>
                <strong>Устранённые проблемы:</strong> {revision.solved}
              </p>
              <p>
                <strong>Ограничения:</strong> {revision.limitations}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
