import type { ModuleData } from '../evolution-data';

export const visualizationModule: ModuleData = {
  name: 'Визуализация и мониторинг',
  revisions: {
    rev1: { tech: 'Excel Charts', period: 'early', desc: 'Простые графики в Excel' },
    rev2: { tech: 'Matplotlib, R', period: 'early', desc: 'Программная визуализация данных' },
    rev3: { tech: 'Plotly, D3.js', period: 'modern', desc: 'Интерактивные веб-дашборды' },
    rev4: { tech: 'Real-time Dashboards', period: 'modern', desc: 'Мониторинг в реальном времени' },
    rev5: {
      tech: 'AI-powered Analytics',
      period: 'current',
      desc: 'ИИ-анализ паттернов и аномалий',
    },
  },
};
