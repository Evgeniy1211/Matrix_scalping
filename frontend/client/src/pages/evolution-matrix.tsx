
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function EvolutionMatrixPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header Section */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-2" data-testid="title-main">
              Эволюция торговых машин (скальпинг)
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto" data-testid="subtitle">
              От ML 2000-х до гибридных AI-систем 2025 года
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Matrix Card */}
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl">📊 Матрица эволюции</CardTitle>
              <CardDescription>
                Динамическая матрица показывает как технологии развиваются и разветвляются по поколениям
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                • Каждая новая технология - отдельная строка<br/>
                • Технологии-потомки создают новые ветви<br/>
                • Показывает эволюцию от 2000 до 2025 года
              </p>
              <Link href="/matrix">
                <Button className="w-full">
                  Открыть матрицу →
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Tree Card */}
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl">🌳 Дерево технологий</CardTitle>
              <CardDescription>
                Интерактивное дерево показывает связи и происхождение технологий
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                • Визуализация связей "родитель-потомок"<br/>
                • Интерактивное масштабирование<br/>
                • Наглядно видно что из чего выросло
              </p>
              <Link href="/tree">
                <Button className="w-full">
                  Открыть дерево →
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Cases Card */}
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl">📋 Кейсы систем</CardTitle>
              <CardDescription>
                Реальные примеры торговых систем с детальным анализом технологий
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                • Практические примеры применения<br/>
                • Подробный технологический стек<br/>
                • Связь с матрицей и деревом
              </p>
              <Link href="/cases">
                <Button className="w-full">
                  Открыть кейсы →
                </Button>
              </Link>
            </CardContent>
          </Card>

        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold mb-4">Как это работает</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-muted-foreground">
            <div className="space-y-2">
              <h3 className="font-medium text-foreground">📊 Матрица</h3>
              <p>Показывает эволюцию технологий по временным периодам. Каждая технология получает свою строку, а её развитие отражается в колонках-ревизиях.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-foreground">🌳 Дерево</h3>
              <p>Отображает иерархические связи между технологиями. Видно какие технологии породили другие и как формировались целые семейства подходов.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-foreground">📋 Кейсы</h3>
              <p>Реальные примеры торговых систем показывают как технологии применяются на практике. Данные из кейсов автоматически попадают в матрицу и дерево.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-muted mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-muted-foreground" data-testid="footer-text">
            Система составлена на основе обзора технологий 2000–2025 гг.
          </p>
        </div>
      </footer>
    </div>
  );
}
