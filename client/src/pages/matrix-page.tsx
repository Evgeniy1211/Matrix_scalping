
import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { DynamicEvolutionMatrix } from "@/components/dynamic-evolution-matrix";
import { TechnologyDetails } from "@/components/technology-details";
import type { TechnologyDescription } from "@/data/technologies";

export default function MatrixPage() {
  const [selectedModule, setSelectedModule] = useState<string>("");
  const [selectedTechnologyName, setSelectedTechnologyName] = useState<string>("");
  const [selectedTech, setSelectedTech] = useState<TechnologyDescription | null>(null);

  const handleModuleClick = (moduleName: string) => {
    setSelectedModule(moduleName);
    setSelectedTechnologyName(""); // Сбрасываем выбранную технологию при выборе модуля
    setSelectedTech(null);
  };

  const handleTechnologyClick = (technologyName: string) => {
    setSelectedTechnologyName(technologyName);
    setSelectedModule(""); // Сбрасываем фильтр модуля при выборе конкретной технологии
  };

  const handleTechnologySelect = (tech: TechnologyDescription | null) => {
    setSelectedTech(tech);
  };

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

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dynamic Evolution Matrix */}
        <div className="mb-12">
          <DynamicEvolutionMatrix 
            onModuleClick={handleModuleClick}
            onTechnologyClick={handleTechnologyClick}
            selectedModule={selectedModule}
          />
        </div>

        {/* Technology Details */}
        <div className="border-t border-border pt-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              База знаний технологий
            </h2>
            <p className="text-muted-foreground">
              Подробные описания технологий, используемых в матрице эволюции
              {selectedModule && (
                <span className="block mt-1 font-medium text-blue-600">
                  Активный фильтр: {selectedModule}
                </span>
              )}
              {selectedTechnologyName && (
                <span className="block mt-1 font-medium text-green-600">
                  Выбранная технология: {selectedTechnologyName}
                </span>
              )}
            </p>
          </div>
          <TechnologyDetails 
            moduleFilter={selectedModule}
            selectedTechnologyName={selectedTechnologyName}
            onTechnologySelect={handleTechnologySelect}
          />
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
