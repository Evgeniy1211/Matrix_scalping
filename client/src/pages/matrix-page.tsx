
import { EvolutionMatrix } from "@/components/evolution-matrix";
import { TechnologyDetails } from "@/components/technology-details";

export default function MatrixPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header Section */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Матрица эволюции технологий
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Динамическая матрица показывает как технологии развиваются по поколениям
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Evolution Matrix */}
        <div className="mb-12">
          <EvolutionMatrix />
        </div>

        {/* Technology Details */}
        <div className="border-t border-border pt-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              База знаний технологий
            </h2>
            <p className="text-muted-foreground">
              Подробные описания технологий, используемых в матрице эволюции
            </p>
          </div>
          <TechnologyDetails />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-muted mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-muted-foreground">
            Матрица составлена на основе обзора технологий 2000–2025 гг.
          </p>
        </div>
      </footer>
    </div>
  );
}
