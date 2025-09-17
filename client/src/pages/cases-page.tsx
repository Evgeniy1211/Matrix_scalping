
import { Navigation } from "@/components/navigation";
import { TradingMachineComparator } from "@/components/trading-machine-comparator";

export default function CasesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header Section */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Кейсы торговых машин
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Реальные примеры торговых систем с детальным анализом технологий
            </p>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TradingMachineComparator />
      </main>

      {/* Footer */}
      <footer className="bg-muted mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-muted-foreground">
            Кейсы показывают практическое применение технологий
          </p>
        </div>
      </footer>
    </div>
  );
}
