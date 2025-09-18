
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";

export function Navigation() {
  const [location] = useLocation();

  const isActive = (paths: string | string[]) => {
    const targetPaths = Array.isArray(paths) ? paths : [paths];
    return targetPaths.some((path) => path === location);
  };

  return (
    <nav className="border-b border-border bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center space-x-1 py-4">
          <Link href="/matrix">
            <Button
              variant={isActive(["/", "/matrix"]) ? "default" : "ghost"}
              className="px-6 py-2"
            >
              Матрица
            </Button>
          </Link>
          <Link href="/tree">
            <Button 
              variant={isActive("/tree") ? "default" : "ghost"}
              className="px-6 py-2"
            >
              Дерево
            </Button>
          </Link>
          <Link href="/cases">
            <Button 
              variant={isActive("/cases") ? "default" : "ghost"}
              className="px-6 py-2"
            >
              Кейсы
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
