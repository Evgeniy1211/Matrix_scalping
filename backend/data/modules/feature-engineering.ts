import type { ModuleData } from '../evolution-data';

export const featureEngineeringModule: ModuleData = {
  name: 'Feature Engineering',
  revisions: {
    rev1: {
      tech: 'Technical Indicators',
      period: 'early',
      desc: 'RSI, MACD, SMA - классические индикаторы',
    },
    rev2: {
      tech: 'Statistical Features',
      period: 'early',
      desc: 'Волатильность, корреляции, возвраты',
    },
    rev3: {
      tech: 'Auto Feature Selection',
      period: 'modern',
      desc: 'Автоматический отбор признаков',
    },
    rev4: { tech: 'Graph Features', period: 'modern', desc: 'Признаки на основе графов' },
    rev5: {
      tech: 'Learned Representations',
      period: 'current',
      desc: 'Обученные представления данных',
    },
  },
};
