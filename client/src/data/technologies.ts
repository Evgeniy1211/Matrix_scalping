
export interface TechnologyDescription {
  id: string;
  name: string;
  fullName?: string;
  description: string;
  category: 'data' | 'processing' | 'ml' | 'visualization' | 'infrastructure' | 'risk' | 'execution' | 'adaptation';
  
  // Периоды использования
  periods: {
    start: number;        // Год начала использования
    peak?: number;        // Год пика популярности
    decline?: number;     // Год начала упадка (если есть)
    end?: number;         // Год окончания использования (если технология устарела)
  };
  
  // Эволюция технологии
  evolution?: {
    predecessors?: string[];  // Предшественники (ID других технологий)
    successors?: string[];   // Последователи
    variants?: string[];     // Варианты/модификации
  };
  
  // Модули торговых систем, где используется
  applicableModules: string[];
  
  // Дополнительная информация
  advantages: string[];
  disadvantages: string[];
  useCases: string[];
  
  // Ссылки на источники
  sources?: string[];
}

export const technologyDatabase: TechnologyDescription[] = [
  {
    id: 'random-forest',
    name: 'Random Forest',
    fullName: 'Random Forest Ensemble',
    description: 'Алгоритм машинного обучения, использующий ансамбль решающих деревьев для классификации и регрессии',
    category: 'ml',
    periods: {
      start: 2001,
      peak: 2015,
      decline: 2020
    },
    evolution: {
      predecessors: ['decision-trees'],
      successors: ['gradient-boosting', 'xgboost'],
      variants: ['extra-trees', 'random-subspace']
    },
    applicableModules: ['signalGeneration', 'featureEngineering'],
    advantages: [
      'Устойчивость к переобучению',
      'Работа с пропущенными данными',
      'Оценка важности признаков',
      'Быстрое обучение'
    ],
    disadvantages: [
      'Плохо работает с линейными зависимостями',
      'Может переобучаться на шумных данных',
      'Сложность интерпретации отдельных деревьев'
    ],
    useCases: [
      'Классификация направления движения цены',
      'Скальпинг стратегии',
      'Отбор признаков'
    ],
    sources: ['Breiman (2001)', 'Chan et al. (2015-2017)']
  },
  
  {
    id: 'lstm',
    name: 'LSTM',
    fullName: 'Long Short-Term Memory',
    description: 'Рекуррентная нейронная сеть, способная изучать долгосрочные зависимости во временных рядах',
    category: 'ml',
    periods: {
      start: 1997,
      peak: 2018,
      decline: 2022
    },
    evolution: {
      predecessors: ['rnn', 'vanilla-rnn'],
      successors: ['transformer', 'attention-mechanisms'],
      variants: ['gru', 'bi-lstm', 'attention-lstm']
    },
    applicableModules: ['signalGeneration', 'marketAdaptation'],
    advantages: [
      'Память о долгосрочных зависимостях',
      'Работа с последовательностями переменной длины',
      'Устойчивость к проблеме исчезающего градиента'
    ],
    disadvantages: [
      'Медленное обучение',
      'Требовательность к объему данных',
      'Сложность настройки гиперпараметров'
    ],
    useCases: [
      'Предсказание временных рядов',
      'Анализ последовательностей сделок',
      'Моделирование рыночных режимов'
    ],
    sources: ['Hochreiter & Schmidhuber (1997)', 'Zhang et al. (2017-2020)']
  },

  {
    id: 'ccxt',
    name: 'CCXT',
    fullName: 'CryptoCurrency eXchange Trading Library',
    description: 'JavaScript/Python/PHP библиотека для подключения к криптовалютным биржам',
    category: 'data',
    periods: {
      start: 2017,
      peak: 2021
    },
    evolution: {
      predecessors: ['exchange-apis'],
      variants: ['ccxt-pro', 'ccxt-rest']
    },
    applicableModules: ['dataCollection', 'execution'],
    advantages: [
      'Единый интерфейс для множества бирж',
      'Поддержка WebSocket',
      'Активное сообщество',
      'Регулярные обновления'
    ],
    disadvantages: [
      'Зависимость от API бирж',
      'Различия в реализации между биржами',
      'Возможные лимиты на запросы'
    ],
    useCases: [
      'Получение рыночных данных',
      'Исполнение ордеров',
      'Мониторинг портфеля'
    ],
    sources: ['CCXT Documentation', 'Random Forest Scalper (2015-2017)']
  },

  {
    id: 'transformer',
    name: 'Transformer',
    fullName: 'Transformer Architecture',
    description: 'Архитектура нейронных сетей на основе механизма внимания, революционизировавшая NLP и временные ряды',
    category: 'ml',
    periods: {
      start: 2017,
      peak: 2023
    },
    evolution: {
      predecessors: ['attention-mechanisms', 'lstm'],
      successors: ['gpt-models', 'bert-models'],
      variants: ['vision-transformer', 'lob-transformer', 'time-series-transformer']
    },
    applicableModules: ['signalGeneration', 'marketAdaptation', 'featureEngineering'],
    advantages: [
      'Параллелизация обучения',
      'Эффективная работа с длинными последовательностями',
      'Механизм внимания для интерпретируемости'
    ],
    disadvantages: [
      'Высокие вычислительные требования',
      'Квадратичная сложность по длине последовательности',
      'Требует больших объемов данных'
    ],
    useCases: [
      'Анализ стакана ордеров (LOB)',
      'Многомодальный анализ данных',
      'Предсказание временных рядов'
    ],
    sources: ['Vaswani et al. (2017)', 'LOB-Transformer (2022-2023)']
  }
];

// Функция для получения технологий по периоду
export function getTechnologiesByPeriod(startYear: number, endYear: number): TechnologyDescription[] {
  return technologyDatabase.filter(tech => {
    const techStart = tech.periods.start;
    const techEnd = tech.periods.end || new Date().getFullYear();
    
    // Проверяем пересечение периодов
    return techStart <= endYear && techEnd >= startYear;
  });
}

// Функция для получения технологий по модулю
export function getTechnologiesByModule(module: string): TechnologyDescription[] {
  return technologyDatabase.filter(tech => 
    tech.applicableModules.includes(module)
  );
}

// Функция для автоматического определения ревизии по технологии
export function getRevisionForTechnology(technologyId: string): keyof any {
  const tech = technologyDatabase.find(t => t.id === technologyId);
  if (!tech) return 'rev5';
  
  const peakYear = tech.periods.peak || tech.periods.start;
  
  if (peakYear <= 2015) return 'rev1';
  if (peakYear <= 2020) return 'rev2';
  if (peakYear <= 2022) return 'rev3';
  if (peakYear <= 2023) return 'rev4';
  return 'rev5';
}

// Функция для поиска технологий
export function searchTechnologies(query: string): TechnologyDescription[] {
  const lowerQuery = query.toLowerCase();
  return technologyDatabase.filter(tech =>
    tech.name.toLowerCase().includes(lowerQuery) ||
    tech.fullName?.toLowerCase().includes(lowerQuery) ||
    tech.description.toLowerCase().includes(lowerQuery)
  );
}
