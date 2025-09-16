import { EvolutionMatrix } from "@/components/evolution-matrix";
import { TechnologyTree } from "@/components/technology-tree";
import { RevisionExplanations } from "@/components/revision-explanations";
import { TradingMachineComparator } from "@/components/trading-machine-comparator";
import { TechnologyDetails } from "@/components/technology-details";
import { TechnologyImporter } from "@/components/technology-importer";

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
        {/* Main Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Evolution Matrix */}
          <EvolutionMatrix />

          {/* Technology Tree */}
          <TechnologyTree />
        </div>

        {/* Детали технологий */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6 text-foreground">База знаний технологий</h2>
          <TechnologyDetails />
        </div>

        {/* Импорт новых технологий */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6 text-foreground">Добавление новых технологий</h2>
          <TechnologyImporter />
        </div>

        <RevisionExplanations />

        {/* Trading Machine Cases Comparator */}
        <section className="mt-16 pt-8 border-t border-border">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Сравнение кейсов торговых машин
            </h2>
            <p className="text-lg text-muted-foreground">
              Реальные примеры торговых систем с детальным анализом технологий
            </p>
          </div>
          <TradingMachineComparator />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-muted mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-muted-foreground" data-testid="footer-text">
            Матрица составлена на основе обзора технологий 2000–2025 гг.
          </p>
        </div>
      </footer>
    </div>
  );
}