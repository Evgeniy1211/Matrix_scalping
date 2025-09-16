import { EvolutionMatrix } from "@/components/evolution-matrix";
import { TechnologyTree } from "@/components/technology-tree";
import { RevisionExplanations } from "@/components/revision-explanations";
import { TradingMachineComparator } from "@/components/trading-machine-comparator";

export default function EvolutionMatrixPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-center mb-2">
            Эволюция торговых машин
          </h1>
          <p className="text-muted-foreground text-center">
            Развитие технологий скальпинг-систем с 2000 по 2025 год
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          <div className="lg:col-span-7">
            <EvolutionMatrix />
          </div>
          <TechnologyTree />
        </div>

        <div className="mb-8">
          <TradingMachineComparator />
        </div>

        <RevisionExplanations />
      </div>
    </div>
  );
}