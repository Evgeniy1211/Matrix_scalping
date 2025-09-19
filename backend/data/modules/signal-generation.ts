import type { ModuleData } from '../evolution-data';

export const signalGenerationModule: ModuleData = {
  name: 'Генерация сигналов',
  revisions: {
    rev1: { tech: 'Rule-based', period: 'early', desc: 'Системы на основе правил' },
    rev2: { tech: 'SVM, Random Forest', period: 'early', desc: 'Классические алгоритмы ML' },
    rev3: { tech: 'LSTM, CNN', period: 'modern', desc: 'Глубокие нейронные сети' },
    rev4: { tech: 'Transformer LOB', period: 'modern', desc: 'Трансформеры для анализа стакана' },
    rev5: {
      tech: 'Multi-Agent RL',
      period: 'current',
      desc: 'Многоагентное обучение с подкреплением',
    },
  },
};
