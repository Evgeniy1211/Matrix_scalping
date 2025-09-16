
import { TechnologyTree } from "@/components/technology-tree";

export default function TreePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header Section */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Дерево эволюции технологий
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Интерактивное дерево показывает связи и происхождение технологий
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="w-full">
          <TechnologyTree />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-muted mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-muted-foreground">
            Дерево показывает эволюционные связи между технологиями
          </p>
        </div>
      </footer>
    </div>
  );
}
