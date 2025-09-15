# Документация: Матрица эволюции торговых машин

## Обзор

Матрица эволюции представляет собой интерактивную таблицу, показывающую развитие технологий скальпинга с 2000 по 2025 год. Каждая строка - это модуль торговой системы, каждая колонка - временной период (ревизия).

## Структура файлов

### Основные файлы матрицы:
- **`client/src/data/evolution-data.ts`** - данные матрицы (JSON-подобная структура)
- **`client/src/components/evolution-matrix.tsx`** - компонент отображения матрицы
- **`client/src/index.css`** - стили для цветового кодирования ячеек

## Структура данных матрицы

### Основной объект данных:
```typescript
export const evolutionData: { modules: ModuleData[] } = {
  modules: [
    {
      name: "Название модуля", // Например: "Сбор данных"
      revisions: {
        rev1: { tech: "Технология", period: "тип", desc: "Описание" },
        rev2: { tech: "Технология", period: "тип", desc: "Описание" },
        // ... остальные ревизии
      }
    }
  ]
}
```

### Типы данных:
```typescript
interface RevisionData {
  tech: string;        // Название технологии (отображается в ячейке)
  period: 'empty' | 'early' | 'modern' | 'current'; // Определяет цвет ячейки
  desc: string;        // Описание для всплывающей подсказки
}
```

### Цветовое кодирование периодов:
- **`empty`** - серый фон (пустая ячейка, технология отсутствует)
- **`early`** - светло-зелёный фон (ранние технологии 2000-2015)
- **`modern`** - синий фон (современные технологии 2015-2022)
- **`current`** - оранжевый фон (актуальные технологии 2022-2025)

## Как добавить новые данные

### 1. Добавить новый модуль торговой системы:
```typescript
// В файле client/src/data/evolution-data.ts
{
  name: "Новый модуль", // Название модуля (отображается в левой колонке)
  revisions: {
    rev1: { tech: "", period: "empty", desc: "Технология отсутствовала" },
    rev2: { tech: "Первая версия", period: "early", desc: "Появление базовой технологии" },
    rev3: { tech: "Улучшенная версия", period: "modern", desc: "Развитие технологии" },
    rev4: { tech: "Продвинутая версия", period: "modern", desc: "Существенные улучшения" },
    rev5: { tech: "Современная версия", period: "current", desc: "Текущее состояние" }
  }
}
```

### 2. Изменить существующие технологии:
Найдите нужный модуль в массиве `modules` и измените:
- **`tech`** - название технологии
- **`period`** - тип периода (влияет на цвет)
- **`desc`** - описание для tooltip

### 3. Добавить новую ревизию (временной период):
1. Добавьте новую ревизию в интерфейс `ModuleData`:
```typescript
revisions: {
  rev1: RevisionData;
  rev2: RevisionData;
  rev3: RevisionData;
  rev4: RevisionData;
  rev5: RevisionData;
  rev6: RevisionData; // Новая ревизия
};
```

2. Обновите `revisionLabels` в файле `evolution-matrix.tsx`:
```typescript
const revisionLabels = {
  // ... существующие
  rev6: { label: "Rev.6", period: "(2025–2030)" }
};
```

3. Добавьте данные для новой ревизии во все модули

## Функции фильтрации

### Существующие фильтры:
- **"Показать только Rev.5"** - отображает только последнюю ревизию
- **"Показать все ревизии"** - показывает всю матрицу
- **"Скрыть модули без изменений"** - скрывает модули, где технологии не менялись

### Добавление новых фильтров:
В файле `evolution-matrix.tsx` измените тип `FilterType` и добавьте логику:
```typescript
type FilterType = 'all' | 'rev5' | 'hideUnchanged' | 'новый_фильтр';
```

## Настройка стилей

### Цвета ячеек определяются в файле `client/src/index.css`:
```css
.empty-cell {
  background: hsl(var(--muted));
  color: hsl(var(--muted-foreground));
}

.early-tech {
  background: hsl(var(--accent));          /* Зелёный */
  color: hsl(var(--accent-foreground));
}

.modern-tech {
  background: hsl(var(--primary));         /* Синий */
  color: hsl(var(--primary-foreground));
}

.current-tech {
  background: hsl(var(--secondary));       /* Оранжевый */
  color: hsl(var(--secondary-foreground));
}
```

### Интерактивные эффекты:
```css
.evolution-cell {
  transition: all 0.2s ease;
  cursor: pointer;
}

.evolution-cell:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
```

## Адаптивность

Матрица автоматически адаптируется к размеру экрана:
- На мобильных устройствах доступна горизонтальная прокрутка
- Левая колонка (названия модулей) закреплена при прокрутке
- Заголовки ревизий тоже закреплены

## Tooltip система

### Настройка всплывающих подсказок:
- Tooltip появляется при наведении на ячейку
- Содержимое берётся из поля `desc` в данных
- Стили tooltip настраиваются в компоненте `evolution-matrix.tsx`

## Пример полного добавления модуля

```typescript
// В client/src/data/evolution-data.ts добавить в массив modules:
{
  name: "Мониторинг производительности",
  revisions: {
    rev1: { 
      tech: "", 
      period: "empty", 
      desc: "Мониторинг отсутствовал в ранних системах" 
    },
    rev2: { 
      tech: "Простые метрики", 
      period: "early", 
      desc: "Базовый мониторинг P&L и количества сделок" 
    },
    rev3: { 
      tech: "Dashboards", 
      period: "modern", 
      desc: "Графические панели мониторинга в реальном времени" 
    },
    rev4: { 
      tech: "ML Monitoring", 
      period: "modern", 
      desc: "Автоматическое обнаружение аномалий в работе системы" 
    },
    rev5: { 
      tech: "Predictive Analytics", 
      period: "current", 
      desc: "Предсказательная аналитика для предотвращения проблем" 
    }
  }
}
```

Этот новый модуль автоматически появится в матрице с правильным цветовым кодированием и интерактивными подсказками.