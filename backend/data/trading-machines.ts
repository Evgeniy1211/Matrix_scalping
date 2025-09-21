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
        category: 'data',
      },
      {
        name: 'pandas',
        purpose: 'Работа с временными рядами и создание DataFrame',
        category: 'processing',
      },
      {
        name: 'numpy',
        purpose: 'Быстрые математические операции и создание признаков',
        category: 'processing',
      },
      {
        name: 'scikit-learn',
        purpose: 'RandomForestClassifier и метрики качества',
        category: 'ml',
      },
      {
        name: 'matplotlib',
        purpose: 'Визуализация сигналов и графиков цены',
        category: 'visualization',
      },
    ],

    modules: {
      dataCollection: ['Binance API', 'CCXT', 'OHLCV данные'],
      dataProcessing: ['pandas DataFrame', 'временные ряды'],
      featureEngineering: [
        'return (pct_change)',
        'volatility (rolling std)',
        'SMA5',
        'SMA20',
        'sma_diff',
      ],
      signalGeneration: ['RandomForestClassifier', 'n_estimators=100'],
      riskManagement: ['Простые BUY/SELL сигналы'],
      execution: ['Дискретные торговые сигналы'],
      marketAdaptation: ['train_test_split', 'переодическое переобучение'],
      visualization: ['matplotlib графики', 'цена + точки сигналов'],
    },

    performance: {
      accuracy: 0.55,
      precision: 0.52,
      recall: 0.58,
      f1Score: 0.55,
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
      'Интерпретируемые признаки',
    ],

    disadvantages: [
      'Требует регулярного переобучения',
      'Не учитывает глубину рынка',
      'Чувствителен к внезапным новостям',
      'Простые признаки могут быть недостаточными',
      'Отсутствие управления рисками',
    ],
  },
  {
    id: 'rl-ppo-scalper-2020',
    name: 'RL Scalper (PPO Agent)',
    period: '2020+',
    author: 'Open-source demos, arXiv, courses',
    description:
      'Современная торговая машина со скальпингом на Reinforcement Learning (PPO). Агент учится максимизировать прибыль, работает в backtest и live, учитывает комиссии и риски.',
    strategy: 'Reinforcement Learning (PPO): BUY/SELL/HOLD',
    timeframe: '1 минута',
    marketType: 'Криптовалюты (BTC/USDT)',

    technologies: [
      { name: 'ccxt', purpose: 'Сбор исторических данных (REST)', category: 'data' },
      { name: 'ccxt.pro', purpose: 'Live-данные через WebSocket', category: 'data' },
      { name: 'pandas', purpose: 'Обработка временных рядов', category: 'processing' },
      { name: 'numpy', purpose: 'Численные расчёты', category: 'processing' },
      { name: 'gym-anytrading', purpose: 'RL-среда для трейдинга', category: 'ml' },
      { name: 'stable-baselines3', purpose: 'RL-алгоритмы (PPO, MlpPolicy)', category: 'ml' },
      { name: 'matplotlib', purpose: 'Визуализация результатов/сделок', category: 'visualization' },
    ],

    modules: {
      dataCollection: ['Binance API', 'CCXT', 'CCXT.pro', 'OHLCV'],
      dataProcessing: [
        'Индекс timestamp',
        'float64 типы',
        'Очистка NaN',
        'Фильтр выбросов',
        'Нормализация',
      ],
      featureEngineering: ['Окно последних N свечей', 'RSI (опционально)', 'EMA (опционально)'],
      signalGeneration: ['PPO (Stable-Baselines3)', 'MlpPolicy', 'Gym-anytrading среда'],
      riskManagement: [
        'Учёт комиссий 0.1%',
        'TP/SL (через правила/награду)',
        'Штраф за просадку (reward)',
      ],
      execution: ['create_market_order', 'WebSocket streaming', 'Рыночные ордера'],
      marketAdaptation: ['Переобучение агента', 'Тюнинг гиперпараметров', 'Transfer learning'],
      visualization: ['matplotlib', 'Сделки поверх цены'],
    },

    codeExample: `
# PPO RL Scalper — код-скелет
import ccxt
import pandas as pd
import gym
import gym_anytrading
from gym_anytrading.envs import StocksEnv
from stable_baselines3 import PPO
import matplotlib.pyplot as plt

exchange = ccxt.binance()
ohlcv = exchange.fetch_ohlcv('BTC/USDT', '1m', limit=1000)
df = pd.DataFrame(ohlcv, columns=['timestamp','open','high','low','close','volume'])
df['timestamp'] = pd.to_datetime(df['timestamp'], unit='ms')
df.set_index('timestamp', inplace=True)

class CustomEnv(StocksEnv):
    _process_data = StocksEnv._process_data
    _calculate_reward = StocksEnv._calculate_reward
    _take_action = StocksEnv._take_action

env = CustomEnv(df=df, window_size=30, frame_bound=(30, len(df)))
model = PPO('MlpPolicy', env, verbose=1)
model.learn(total_timesteps=10000)

obs = env.reset()
while True:
    action, _ = model.predict(obs)
    obs, reward, done, info = env.step(action)
    if done:
        print('Total reward:', info)
        break

plt.figure(figsize=(15,6))
env.render_all()
plt.show()
`,

    advantages: [
      'Не нужны размеченные данные',
      'Агент учится напрямую на прибыли',
      'Современный RL‑алгоритм (PPO)',
      'Гибкая настройка награды и наблюдений',
    ],
    disadvantages: [
      'Длительное обучение',
      'Риск переобучения (нужны разные периоды)',
      'Требуется тюнинг гиперпараметров',
    ],
  },
];

// Функция для извлечения всех технологий из кейсов
export function extractAllTechnologies(): string[] {
  const allTechs = new Set<string>();

  tradingMachineCases.forEach((case_) => {
    case_.technologies.forEach((tech) => {
      allTechs.add(tech.name);
    });

    Object.values(case_.modules).forEach((moduleArray) => {
      moduleArray.forEach((tech) => {
        allTechs.add(tech);
      });
    });
  });

  return Array.from(allTechs).sort();
}

// Функция для поиска кейсов по технологии
export function findCasesByTechnology(technology: string): TradingMachineCase[] {
  return tradingMachineCases.filter(
    (case_) =>
      case_.technologies.some((tech) =>
        tech.name.toLowerCase().includes(technology.toLowerCase())
      ) ||
      Object.values(case_.modules).some((moduleArray) =>
        moduleArray.some((tech) => tech.toLowerCase().includes(technology.toLowerCase()))
      )
  );
}

// Функция для проверки связи между матрицей и кейсами
export function getMatrixTechnologyCoverage(): Record<string, string[]> {
  const coverage: Record<string, string[]> = {};

  const moduleMapping: Record<string, string> = {
    dataCollection: 'Сбор данных',
    dataProcessing: 'Обработка данных',
    featureEngineering: 'Feature Engineering',
    signalGeneration: 'Генерация сигналов',
    riskManagement: 'Риск-менеджмент',
    execution: 'Исполнение сделок',
    marketAdaptation: 'Адаптация к рынку',
    visualization: 'Визуализация и мониторинг',
  };

  Object.entries(moduleMapping).forEach(([caseModule, matrixModule]) => {
    const technologies = new Set<string>();

    tradingMachineCases.forEach((case_) => {
      const caseTechnologies = case_.modules[caseModule as keyof typeof case_.modules];
      caseTechnologies.forEach((tech) => technologies.add(tech));
    });

    coverage[matrixModule] = Array.from(technologies);
  });

  return coverage;
}
