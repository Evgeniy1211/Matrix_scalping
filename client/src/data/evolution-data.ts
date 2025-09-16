export interface RevisionData {
  tech: string;
  period: 'empty' | 'early' | 'modern' | 'current';
  desc: string;
}

export interface ModuleData {
  name: string;
  revisions: {
    rev1: RevisionData;
    rev2: RevisionData;
    rev3: RevisionData;
    rev4: RevisionData;
    rev5: RevisionData;
  };
}

export interface TechnologyNode {
  name: string;
  description: string;
  children?: TechnologyNode[];
}

export const evolutionData: { modules: ModuleData[] } = {
  modules: [
    {
      name: "Сбор данных",
      revisions: {
        rev1: { tech: "Reuters API, Bloomberg", period: "early", desc: "Базовые рыночные данные через API" },
        rev2: { tech: "WebSocket, FIX, CCXT", period: "early", desc: "Данные в реальном времени + криптобиржи" },
        rev3: { tech: "Market Data Lakes", period: "modern", desc: "Централизованные хранилища рыночных данных" },
        rev4: { tech: "Streaming Analytics", period: "modern", desc: "Потоковая обработка данных" },
        rev5: { tech: "Multi-modal Data", period: "current", desc: "Объединение различных типов данных" }
      }
    },
    {
      name: "Обработка данных",
      revisions: {
        rev1: { tech: "Excel, CSV", period: "early", desc: "Ручная обработка в табличных редакторах" },
        rev2: { tech: "Pandas, NumPy", period: "early", desc: "Python библиотеки для анализа данных" },
        rev3: { tech: "Apache Spark", period: "modern", desc: "Распределённая обработка больших данных" },
        rev4: { tech: "Polars, DuckDB", period: "modern", desc: "Высокопроизводительная аналитика" },
        rev5: { tech: "Ray, Dask", period: "current", desc: "Масштабируемые вычисления" }
      }
    },
    {
      name: "Feature Engineering",
      revisions: {
        rev1: { tech: "Technical Indicators", period: "early", desc: "RSI, MACD, SMA - классические индикаторы" },
        rev2: { tech: "Statistical Features", period: "early", desc: "Волатильность, корреляции, возвраты" },
        rev3: { tech: "Auto Feature Selection", period: "modern", desc: "Автоматический отбор признаков" },
        rev4: { tech: "Graph Features", period: "modern", desc: "Признаки на основе графов" },
        rev5: { tech: "Learned Representations", period: "current", desc: "Обученные представления данных" }
      }
    },
    {
      name: "Генерация сигналов",
      revisions: {
        rev1: { tech: "Rule-based", period: "early", desc: "Системы на основе правил" },
        rev2: { tech: "SVM, Random Forest", period: "early", desc: "Классические алгоритмы ML" },
        rev3: { tech: "LSTM, CNN", period: "modern", desc: "Глубокие нейронные сети" },
        rev4: { tech: "Transformer LOB", period: "modern", desc: "Трансформеры для анализа стакана" },
        rev5: { tech: "Multi-Agent RL", period: "current", desc: "Многоагентное обучение с подкреплением" }
      }
    },
    {
      name: "Риск-менеджмент",
      revisions: {
        rev1: { tech: "Fixed Stop-Loss", period: "early", desc: "Фиксированные уровни стоп-лосс" },
        rev2: { tech: "VaR Models", period: "early", desc: "Модели стоимости под риском" },
        rev3: { tech: "Dynamic Hedging", period: "modern", desc: "Динамическое хеджирование" },
        rev4: { tech: "RL-based Risk", period: "modern", desc: "Риск-менеджмент на основе RL" },
        rev5: { tech: "Adaptive Risk Models", period: "current", desc: "Адаптивные модели управления рисками" }
      }
    },
    {
      name: "Исполнение сделок",
      revisions: {
        rev1: { tech: "Market Orders", period: "early", desc: "Простые рыночные ордера" },
        rev2: { tech: "Smart Routing", period: "early", desc: "Умная маршрутизация ордеров" },
        rev3: { tech: "TWAP/VWAP", period: "modern", desc: "Алгоритмы исполнения TWAP/VWAP" },
        rev4: { tech: "RL Execution", period: "modern", desc: "Исполнение на основе RL" },
        rev5: { tech: "Game-theoretic", period: "current", desc: "Игровые стратегии исполнения" }
      }
    },
    {
      name: "Адаптация к рынку",
      revisions: {
        rev1: { tech: "", period: "empty", desc: "Отсутствие адаптации" },
        rev2: { tech: "Regime Detection", period: "early", desc: "Детекция режимов рынка" },
        rev3: { tech: "Online Learning", period: "modern", desc: "Онлайн обучение" },
        rev4: { tech: "Meta-Learning", period: "modern", desc: "Мета-обучение" },
        rev5: { tech: "Continual Learning", period: "current", desc: "Непрерывное обучение" }
      }
    },
    {
      name: "Визуализация и мониторинг",
      revisions: {
        rev1: { tech: "Excel Charts", period: "early", desc: "Простые графики в Excel" },
        rev2: { tech: "Matplotlib, R", period: "early", desc: "Программная визуализация данных" },
        rev3: { tech: "Plotly, D3.js", period: "modern", desc: "Интерактивные веб-дашборды" },
        rev4: { tech: "Real-time Dashboards", period: "modern", desc: "Мониторинг в реальном времени" },
        rev5: { tech: "AI-powered Analytics", period: "current", desc: "ИИ-анализ паттернов и аномалий" }
      }
    }
  ]
};

// Импорт для интеграции с кейсами
import { tradingMachineCases } from './trading-machines';

// Функция для интеграции технологий из кейсов в основную матрицу
export function integrateExampleTechnologies(): { modules: ModuleData[] } {
  const integratedData = JSON.parse(JSON.stringify(evolutionData)); // Глубокая копия
  
  // Маппинг модулей кейсов на модули матрицы
  const moduleMapping: Record<string, string> = {
    'dataCollection': 'Сбор данных',
    'dataProcessing': 'Обработка данных', 
    'featureEngineering': 'Feature Engineering',
    'signalGeneration': 'Генерация сигналов',
    'riskManagement': 'Риск-менеджмент',
    'execution': 'Исполнение сделок',
    'marketAdaptation': 'Адаптация к рынку',
    'visualization': 'Визуализация и мониторинг'
  };

  // Функция для определения ревизии по периоду кейса
  const getRevisionFromPeriod = (period: string): keyof ModuleData['revisions'] => {
    const startYear = parseInt(period.split('-')[0]);
    
    if (startYear <= 2015) return 'rev1';        // 2000-2015
    if (startYear <= 2020) return 'rev2';        // 2015-2020
    if (startYear <= 2022) return 'rev3';        // 2020-2022
    if (startYear <= 2023) return 'rev4';        // 2022-2023
    return 'rev5';                               // 2023-2025
  };

  // Собираем технологии из всех кейсов
  tradingMachineCases.forEach(case_ => {
    const targetRevision = getRevisionFromPeriod(case_.period);
    
    Object.entries(case_.modules).forEach(([moduleKey, technologies]) => {
      const matrixModuleName = moduleMapping[moduleKey];
      if (!matrixModuleName) return;

      // Находим соответствующий модуль в матрице
      const matrixModule = integratedData.modules.find(m => m.name === matrixModuleName);
      if (!matrixModule) return;

      // Получаем существующие технологии в целевой ревизии
      const existingTech = matrixModule.revisions[targetRevision].tech;
      const newTechs = technologies.filter(tech => 
        !existingTech.toLowerCase().includes(tech.toLowerCase())
      );
      
      if (newTechs.length > 0) {
        // Добавляем технологии в соответствующую ревизию
        const separator = existingTech && existingTech.trim() !== '' ? ', ' : '';
        matrixModule.revisions[targetRevision].tech = existingTech + separator + newTechs.join(', ');
        
        // Обновляем описание с указанием источника
        const caseInfo = ` (из кейса "${case_.name}")`;
        if (!matrixModule.revisions[targetRevision].desc.includes(caseInfo)) {
          matrixModule.revisions[targetRevision].desc += caseInfo;
        }
      }
    });
  });

  return integratedData;
}

export const treeData: TechnologyNode = {
  name: "ML",
  description: "Машинное обучение - основа современных торговых систем",
  children: [
    {
      name: "Traditional ML",
      description: "Классические алгоритмы машинного обучения",
      children: [
        { name: "SVM", description: "Метод опорных векторов для классификации" },
        { name: "Random Forest", description: "Ансамбль решающих деревьев" }
      ]
    },
    {
      name: "Deep Learning",
      description: "Глубокие нейронные сети",
      children: [
        {
          name: "CNN",
          description: "Сверточные нейронные сети для анализа LOB",
          children: [
            { name: "LOB-CNN", description: "Специализированные CNN для анализа стакана" }
          ]
        },
        {
          name: "RNN/LSTM",
          description: "Рекуррентные сети для временных рядов",
          children: [
            { name: "Attention LSTM", description: "LSTM с механизмом внимания" }
          ]
        },
        {
          name: "Transformers",
          description: "Архитектура трансформеров",
          children: [
            { name: "LOB-Transformer", description: "Трансформеры для анализа стакана ордеров" },
            { name: "Time-series Transformer", description: "Специализированные трансформеры для временных рядов" }
          ]
        }
      ]
    },
    {
      name: "Reinforcement Learning",
      description: "Обучение с подкреплением",
      children: [
        {
          name: "Single-Agent RL",
          description: "Одноагентное обучение с подкреплением",
          children: [
            { name: "DQN", description: "Deep Q-Networks для торговых решений" },
            { name: "PPO", description: "Proximal Policy Optimization" }
          ]
        },
        {
          name: "Multi-Agent RL",
          description: "Многоагентное обучение с подкреплением",
          children: [
            { name: "Competitive RL", description: "Соревновательное обучение агентов" },
            { name: "Cooperative RL", description: "Кооперативные стратегии" }
          ]
        },
        {
          name: "Meta-RL",
          description: "Мета-обучение с подкреплением для быстрой адаптации"
        }
      ]
    },
    {
      name: "Graph Neural Networks",
      description: "Графовые нейронные сети",
      children: [
        { name: "GNN LOB", description: "GNN для моделирования структуры стакана" },
        { name: "Market Graph", description: "Графы рыночных взаимосвязей" }
      ]
    },
    {
      name: "Hybrid Systems",
      description: "Гибридные системы",
      children: [
        { name: "Rules + AI", description: "Комбинация правил и ИИ" },
        { name: "Genetic + RL", description: "Генетические алгоритмы с RL" },
        { name: "Ensemble Models", description: "Ансамбли различных моделей" }
      ]
    }
  ]
};
