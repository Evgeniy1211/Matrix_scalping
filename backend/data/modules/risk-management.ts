import type { ModuleData } from '../evolution-data';

export const riskManagementModule: ModuleData = {
  name: 'Риск-менеджмент',
  revisions: {
    rev1: { tech: 'Fixed Stop-Loss', period: 'early', desc: 'Фиксированные уровни стоп-лосс' },
    rev2: { tech: 'VaR Models', period: 'early', desc: 'Модели стоимости под риском' },
    rev3: { tech: 'Dynamic Hedging', period: 'modern', desc: 'Динамическое хеджирование' },
    rev4: { tech: 'RL-based Risk', period: 'modern', desc: 'Риск-менеджмент на основе RL' },
    rev5: {
      tech: 'Adaptive Risk Models',
      period: 'current',
      desc: 'Адаптивные модели управления рисками',
    },
  },
};
