import { useState } from 'react';

import { Navigation } from '@/components/navigation';
import { TradingMachineComparator } from '@/components/trading-machine-comparator';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export default function CasesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header Section */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-2">Кейсы торговых машин</h1>
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

        {/* Simple importer UI */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Импорт кейса (через API)</h2>
          <ImporterWidget />
        </section>
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

function ImporterWidget() {
  const [text, setText] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch('/api/import/trading-machine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rawText: text }),
      });
      if (!res.ok) throw new Error(await res.text());
      const json = await res.json();
      setStatus(`Добавлено: ${json.name} (id=${json.id})`);
      setText('');
    } catch (e) {
      setStatus(`Ошибка: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Вставьте описание торговой системы..."
        className="min-h-[140px]"
      />
      <div className="flex items-center gap-2">
        <Button onClick={submit} disabled={loading || !text.trim()}>
          {loading ? 'Импорт...' : 'Импортировать кейс'}
        </Button>
        {status && <span className="text-sm text-muted-foreground">{status}</span>}
      </div>
      <p className="text-xs text-muted-foreground">
        Примечание: черновой импорт создает минимально валидный кейс. Структурирование текста LLM
        подключим позже.
      </p>
    </div>
  );
}
