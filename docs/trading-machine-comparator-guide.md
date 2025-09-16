
# Документация: Модуль сравнения кейсов торговых машин

## Обзор

Модуль сравнения торговых машин позволяет изучать конкретные реальные кейсы алгоритмических торговых систем, их технологические стеки, архитектуру и результаты.

## Структура файлов

### Основные файлы:
- **`client/src/data/trading-machines.ts`** - данные кейсов торговых машин
- **`client/src/components/trading-machine-comparator.tsx`** - компонент сравнения
- **`client/src/pages/evolution-matrix.tsx`** - интеграция с главной страницей

## Структура данных кейса

### Основной интерфейс:
```typescript
interface TradingMachineCase {
  id: string;                    // Уникальный идентификатор
  name: string;                  // Название системы
  period: string;                // Период разработки/использования
  author?: string;               // Автор или источник
  description: string;           // Описание системы
  strategy: string;              // Торговая стратегия
  timeframe: string;             // Временной интервал торговли
  marketType: string;            // Тип рынка
  
  technologies: TechnologyStack[]; // Технологический стек
  modules: ModuleMapping;         // Привязка к модулям матрицы
  performance?: PerformanceData;  // Метрики производительности
  codeExample?: string;          // Пример кода
  advantages: string[];          // Преимущества
  disadvantages: string[];       // Недостатки
}
```

### Технологический стек:
```typescript
interface TechnologyStack {
  name: string;         // Название технологии
  version?: string;     // Версия (опционально)
  purpose: string;      // Назначение в системе
  category: 'data' | 'processing' | 'ml' | 'visualization' | 'infrastructure';
}
```

### Привязка к модулям матрицы:
```typescript
modules: {
  dataCollection: string[];      // Сбор данных
  dataProcessing: string[];      // Обработка данных
  featureEngineering: string[];  // Feature Engineering
  signalGeneration: string[];    // Генерация сигналов
  riskManagement: string[];      // Риск-менеджмент
  execution: string[];           // Исполнение сделок
  marketAdaptation: string[];    // Адаптация к рынку
  visualization: string[];       // Визуализация и мониторинг
}
```

## Добавление нового кейса

### 1. Добавить кейс в массив:
```typescript
// В файле client/src/data/trading-machines.ts
export const tradingMachineCases: TradingMachineCase[] = [
  // ... существующие кейсы
  {
    id: 'your-new-case-id',
    name: 'Название вашей системы',
    period: '2020-2023',
    description: 'Подробное описание...',
    // ... остальные поля
  }
];
```

### 2. Заполнить технологический стек:
```typescript
technologies: [
  {
    name: 'Python',
    version: '3.9+',
    purpose: 'Основной язык разработки',
    category: 'infrastructure'
  },
  {
    name: 'TensorFlow',
    version: '2.8',
    purpose: 'Обучение нейронных сетей',
    category: 'ml'
  }
]
```

### 3. Привязать к модулям матрицы:
```typescript
modules: {
  dataCollection: ['Alpha Vantage API', 'WebSocket'],
  featureEngineering: ['LSTM features', 'Technical indicators'],
  signalGeneration: ['Deep Neural Network', 'Ensemble methods'],
  // ... остальные модули
}
```

## Связь с основной матрицей

### Автоматическое извлечение технологий:
```typescript
// Функция для получения всех технологий из кейсов
export function extractAllTechnologies(): string[] {
  // Извлекает уникальные технологии для интеграции с матрицей
}
```

### Поиск кейсов по технологии:
```typescript
// Найти кейсы, использующие конкретную технологию
export function findCasesByTechnology(technology: string): TradingMachineCase[] {
  // Возвращает кейсы, содержащие указанную технологию
}
```

## Компоненты интерфейса

### Основные вкладки:
1. **Обзор** - общая информация, преимущества/недостатки
2. **Технологии** - детальный технологический стек
3. **Модули** - привязка к компонентам торговой системы
4. **Результаты** - метрики производительности
5. **Код** - примеры реализации

### Цветовая схема категорий:
- **Data** - синий (сбор и хранение данных)
- **Processing** - зелёный (обработка данных)
- **ML** - фиолетовый (машинное обучение)
- **Visualization** - оранжевый (визуализация)
- **Infrastructure** - серый (инфраструктура)

## Метрики производительности

### Стандартные метрики:
```typescript
performance: {
  accuracy?: number;      // Точность предсказаний (0-1)
  precision?: number;     // Точность (0-1)
  recall?: number;        // Полнота (0-1)
  f1Score?: number;       // F1-мера (0-1)
  sharpeRatio?: number;   // Коэффициент Шарпа
  maxDrawdown?: number;   // Максимальная просадка (0-1)
}
```

## Интеграция с матрицей эволюции

Кейсы торговых машин связаны с основной матрицей через:

1. **Общие технологии** - технологии из кейсов отражаются в матрице
2. **Модульная структура** - модули кейсов соответствуют строкам матрицы
3. **Временная привязка** - период кейса определяет ревизию в матрице

Это позволяет:
- Видеть эволюцию конкретных технологий
- Понимать, какие кейсы использовали технологии каждой эпохи
- Сравнивать подходы разных периодов

## Пример полного кейса

```typescript
{
  id: 'lstm-momentum-2019',
  name: 'LSTM Momentum Strategy',
  period: '2019-2021',
  author: 'Goldman Sachs Research',
  description: 'Система на основе LSTM для предсказания моментума',
  strategy: 'Momentum following с глубоким обучением',
  timeframe: '5 минут',
  marketType: 'Forex (EUR/USD)',
  
  technologies: [
    {
      name: 'TensorFlow',
      version: '2.3',
      purpose: 'Обучение LSTM сетей',
      category: 'ml'
    }
  ],
  
  modules: {
    dataCollection: ['Interactive Brokers API'],
    featureEngineering: ['Price sequences', 'Volume profiles'],
    signalGeneration: ['LSTM', 'Attention mechanism']
  },
  
  performance: {
    accuracy: 0.67,
    sharpeRatio: 1.8,
    maxDrawdown: 0.12
  },
  
  advantages: ['Адаптация к рыночным режимам'],
  disadvantages: ['Высокие вычислительные требования']
}
```
