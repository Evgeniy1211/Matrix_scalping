import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import EvolutionMatrixPage from "@/pages/evolution-matrix";
import MatrixPage from "./pages/matrix-page";
import TreePage from "./pages/tree-page";
import CasesPage from "./pages/cases-page";
import NotFoundPage from "./pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/tree" component={TreePage} />
      <Route path="/cases" component={CasesPage} />
      <Route path="/" component={MatrixPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;