
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

// Функция для загрузки данных о технологии из внешних источников
export async function fetchTechnologyData(technologyName: string): Promise<Partial<TechnologyDescription> | null> {
  try {
    // Можно подключить различные API источники:
    
    // 1. Wikipedia API для базовой информации
    const wikiResponse = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(technologyName)}`
    );
    
    if (wikiResponse.ok) {
      const wikiData = await wikiResponse.json();
      return {
        name: technologyName,
        description: wikiData.extract || `${technologyName} - технология из внешнего источника`,
        sources: [`Wikipedia: ${wikiData.content_urls?.desktop?.page || ''}`]
      };
    }
    
    // 2. GitHub API для популярности и статистики
    const githubResponse = await fetch(
      `https://api.github.com/search/repositories?q=${encodeURIComponent(technologyName)}&sort=stars&order=desc&per_page=1`
    );
    
    if (githubResponse.ok) {
      const githubData = await githubResponse.json();
      const repo = githubData.items?.[0];
      
      if (repo) {
        return {
          name: technologyName,
          description: repo.description || `${technologyName} - популярная технология`,
          periods: {
            start: new Date(repo.created_at).getFullYear()
          },
          sources: [`GitHub: ${repo.html_url}`]
        };
      }
    }
    
    return null;
  } catch (error) {
    console.error('Ошибка загрузки данных о технологии:', error);
    return null;
  }
}

// Функция для автоматического обогащения базы данных
export async function enrichTechnologyDatabase(technologies: string[]): Promise<TechnologyDescription[]> {
  const enrichedTechs: TechnologyDescription[] = [];
  
  for (const techName of technologies) {
    // Проверяем, есть ли уже в базе
    const existing = technologyDatabase.find(t => 
      t.name.toLowerCase() === techName.toLowerCase()
    );
    
    if (existing) {
      enrichedTechs.push(existing);
      continue;
    }
    
    // Загружаем данные из внешних источников
    const externalData = await fetchTechnologyData(techName);
    
    if (externalData) {
      const newTech: TechnologyDescription = {
        id: techName.toLowerCase().replace(/\s+/g, '-'),
        name: techName,
        description: externalData.description || `${techName} - технология`,
        category: 'infrastructure', // По умолчанию, можно улучшить автоопределение
        periods: externalData.periods || {
          start: new Date().getFullYear()
        },
        applicableModules: [],
        advantages: ['Загружено из внешнего источника'],
        disadvantages: ['Требует дополнительного исследования'],
        useCases: ['Определяется в процессе использования'],
        sources: externalData.sources || []
      };
      
      enrichedTechs.push(newTech);
    }
  }
  
  return enrichedTechs;
}

// Функция для парсинга текстового описания технологии
export function parseTechnologyDescription(text: string): Partial<TechnologyDescription> {
  const lines = text.split('\n').map(line => line.trim()).filter(line => line);
  const result: Partial<TechnologyDescription> = {
    advantages: [],
    disadvantages: [],
    useCases: [],
    applicableModules: []
  };
  
  let currentSection = '';
  
  for (const line of lines) {
    // Определяем секции
    if (line.toLowerCase().includes('преимущества') || line.toLowerCase().includes('плюсы')) {
      currentSection = 'advantages';
      continue;
    }
    if (line.toLowerCase().includes('недостатки') || line.toLowerCase().includes('минусы')) {
      currentSection = 'disadvantages'; 
      continue;
    }
    if (line.toLowerCase().includes('применение') || line.toLowerCase().includes('использование')) {
      currentSection = 'useCases';
      continue;
    }
    if (line.toLowerCase().includes('период') || line.toLowerCase().includes('годы')) {
      const years = line.match(/(\d{4})/g);
      if (years && years.length > 0) {
        result.periods = {
          start: parseInt(years[0]),
          end: years.length > 1 ? parseInt(years[years.length - 1]) : undefined
        };
      }
      continue;
    }
    
    // Добавляем контент в текущую секцию
    if (currentSection && line.startsWith('-') || line.startsWith('•') || line.startsWith('*')) {
      const content = line.substring(1).trim();
      if (currentSection === 'advantages') result.advantages?.push(content);
      if (currentSection === 'disadvantages') result.disadvantages?.push(content);
      if (currentSection === 'useCases') result.useCases?.push(content);
    }
    
    // Извлекаем основное описание (первые несколько строк без маркеров)
    if (!result.description && !line.startsWith('-') && !line.includes(':') && line.length > 20) {
      result.description = line;
    }
  }
  
  return result;
}
