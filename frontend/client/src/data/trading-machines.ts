
export interface TechnologyStack {
  name: string;
  version?: string;
  purpose: string;
  category: 'data' | 'processing' | 'ml' | 'visualization' | 'infrastructure';
}

export interface TradingMachineCase {
  id: string;
  name: string;
  period: string;
  author?: string;
  description: string;
  strategy: string;
  timeframe: string;
  marketType: string;
  
  // Технологический стек
  technologies: TechnologyStack[];
  
  // Модули системы (соответствуют строкам матрицы)
  modules: {
    dataCollection: string[];
    dataProcessing: string[];
    featureEngineering: string[];
    signalGeneration: string[];
    riskManagement: string[];
    execution: string[];
    marketAdaptation: string[];
    visualization: string[];
  };
  
  // Результаты
  performance?: {
    accuracy?: number;
    precision?: number;
    recall?: number;
    f1Score?: number;
    sharpeRatio?: number;
    maxDrawdown?: number;
  };
  
  // Код и примеры
  codeExample?: string;
  advantages: string[];
  disadvantages: string[];
}

export const tradingMachineCases: TradingMachineCase[] = [
  {
    id: 'random-forest-scalper-2015',
    name: 'Random Forest Scalper',
    period: '2015-2017',
    author: 'Chan et al.',
    description: 'Простая торговая машина для скальпинга на основе Random Forest',
    strategy: 'Скальпинг с предсказанием направления движения цены',
    timeframe: '1 минута',
    marketType: 'Криптовалюты (BTC/USDT)',
    
    technologies: [
      {
        name: 'ccxt',
        version: '1.x',
        purpose: 'Подключение к Binance API для получения OHLCV данных',
        category: 'data'
      },
      {
        name: 'pandas',
        purpose: 'Работа с временными рядами и создание DataFrame',
        category: 'processing'
      },
      {
        name: 'numpy',
        purpose: 'Быстрые математические операции и создание признаков',
        category: 'processing'
      },
      {
        name: 'scikit-learn',
        purpose: 'RandomForestClassifier и метрики качества',
        category: 'ml'
      },
      {
        name: 'matplotlib',
        purpose: 'Визуализация сигналов и графиков цены',
        category: 'visualization'
      }
    ],
    
    modules: {
      dataCollection: ['Binance API', 'CCXT', 'OHLCV данные'],
      dataProcessing: ['pandas DataFrame', 'временные ряды'],
      featureEngineering: [
        'return (pct_change)', 
        'volatility (rolling std)', 
        'SMA5', 
        'SMA20', 
        'sma_diff'
      ],
      signalGeneration: ['RandomForestClassifier', 'n_estimators=100'],
      riskManagement: ['Простые BUY/SELL сигналы'],
      execution: ['Дискретные торговые сигналы'],
      marketAdaptation: ['train_test_split', 'переодическое переобучение'],
      visualization: ['matplotlib графики', 'цена + точки сигналов']
    },
    
    performance: {
      accuracy: 0.55,
      precision: 0.52,
      recall: 0.58,
      f1Score: 0.55
    },
    
    codeExample: `
# Основной код Random Forest Scalper
import ccxt
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report

# Получение данных
exchange = ccxt.binance()
ohlcv = exchange.fetch_ohlcv('BTC/USDT', '1m', limit=1000)
df = pd.DataFrame(ohlcv, columns=['timestamp','open','high','low','close','volume'])

# Feature engineering
df['return'] = df['close'].pct_change()
df['volatility'] = df['return'].rolling(5).std()
df['sma5'] = df['close'].rolling(5).mean()
df['sma20'] = df['close'].rolling(20).mean()
df['sma_diff'] = df['sma5'] - df['sma20']

# Target
df['target'] = (df['close'].shift(-1) > df['close']).astype(int)

# Обучение модели
X = df[['return','volatility','sma5','sma20','sma_diff']]
y = df['target']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, shuffle=False)

model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)
`,
    
    advantages: [
      'Простая реализация и понимание',
      'Быстрое обучение модели',
      'Работает на минутных данных',
      'Хорошая отправная точка для скальпинга',
      'Интерпретируемые признаки'
    ],
    
    disadvantages: [
      'Требует регулярного переобучения',
      'Не учитывает глубину рынка',
      'Чувствителен к внезапным новостям',
      'Простые признаки могут быть недостаточными',
      'Отсутствие управления рисками'
    ]
  }
];

// Функция для извлечения всех технологий из кейсов
export function extractAllTechnologies(): string[] {
  const allTechs = new Set<string>();
  
  tradingMachineCases.forEach(case_ => {
    case_.technologies.forEach(tech => {
      allTechs.add(tech.name);
    });
    
    Object.values(case_.modules).forEach(moduleArray => {
      moduleArray.forEach(tech => {
        allTechs.add(tech);
      });
    });
  });
  
  return Array.from(allTechs).sort();
}

// Функция для поиска кейсов по технологии
export function findCasesByTechnology(technology: string): TradingMachineCase[] {
  return tradingMachineCases.filter(case_ =>
    case_.technologies.some(tech => 
      tech.name.toLowerCase().includes(technology.toLowerCase())
    ) ||
    Object.values(case_.modules).some(moduleArray =>
      moduleArray.some(tech => 
        tech.toLowerCase().includes(technology.toLowerCase())
      )
    )
  );
}

// Функция для проверки связи между матрицей и кейсами
export function getMatrixTechnologyCoverage(): Record<string, string[]> {
  const coverage: Record<string, string[]> = {};
  
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

  Object.entries(moduleMapping).forEach(([caseModule, matrixModule]) => {
    const technologies = new Set<string>();
    
    tradingMachineCases.forEach(case_ => {
      const caseTechnologies = case_.modules[caseModule as keyof typeof case_.modules];
      caseTechnologies.forEach(tech => technologies.add(tech));
    });
    
    coverage[matrixModule] = Array.from(technologies);
  });
  
  return coverage;
}
