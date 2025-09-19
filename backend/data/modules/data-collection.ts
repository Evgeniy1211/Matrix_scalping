import type { ModuleData } from '../evolution-data';

export const dataCollectionModule: ModuleData = {
  name: 'Сбор данных',
  revisions: {
    rev1: {
      tech: 'Reuters API, Bloomberg',
      period: 'early',
      desc: 'Базовые рыночные данные через API',
    },
    rev2: {
      tech: 'WebSocket, FIX, CCXT',
      period: 'early',
      desc: 'Данные в реальном времени + криптобиржи',
    },
    rev3: {
      tech: 'Market Data Lakes',
      period: 'modern',
      desc: 'Централизованные хранилища рыночных данных',
    },
    rev4: { tech: 'Streaming Analytics', period: 'modern', desc: 'Потоковая обработка данных' },
    rev5: {
      tech: 'Multi-modal Data',
      period: 'current',
      desc: 'Объединение различных типов данных',
    },
  },
};
