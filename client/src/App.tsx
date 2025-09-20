import { QueryClientProvider } from '@tanstack/react-query';
import { Route, Switch } from 'wouter';

import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';

import { queryClient } from './lib/queryClient';
import CasesPage from './pages/cases-page';
import MatrixPage from './pages/matrix-page';
import NotFoundPage from './pages/not-found';
import TreePage from './pages/tree-page';

function Router() {
  return (
    <Switch>
      <Route path="/tree" component={TreePage} />
      <Route path="/cases" component={CasesPage} />
      <Route path="/matrix" component={MatrixPage} />
      <Route path="/" component={MatrixPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ErrorBoundary>
          <Toaster />
          <Router />
        </ErrorBoundary>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
