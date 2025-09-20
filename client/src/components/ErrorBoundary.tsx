import React from 'react';

type Props = { children: React.ReactNode };
type State = { hasError: boolean; error?: Error };

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
     
    if (import.meta.env.DEV) console.error('Unhandled error:', error, errorInfo);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-[50vh] flex items-center justify-center text-center p-6">
          <div>
            <h1 className="text-2xl font-semibold mb-2">Произошла ошибка приложения</h1>
            <p className="text-muted-foreground">Попробуйте перезагрузить страницу.</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
