
# Frontend Overview

> **📍 Родительский документ**: [`README.md`](../../README.md) → **Документация фронтенда**

## 🎨 Обзор фронтенда

Фронтенд приложения построен на React 18 + TypeScript и предоставляет интерактивные визуализации для изучения эволюции технологий алгоритмической торговли.

## 🏗️ Архитектура фронтенда

### Технологический стек
- **React 18** + TypeScript - основа приложения
- **D3.js** - визуализация дерева технологий
- **shadcn/ui** - компоненты интерфейса
- **Tailwind CSS** - стилизация
- **Wouter** - клиентский роутинг
- **TanStack Query** - управление состоянием сервера

### Структура файлов
```
client/src/
├── components/           # React компоненты
│   ├── ui/              # shadcn/ui компоненты
│   ├── evolution-matrix.tsx
│   ├── technology-tree.tsx
│   ├── trading-machine-comparator.tsx
│   └── navigation.tsx
├── data/                # Статические данные
│   ├── modules/         # Модули торговых систем
│   ├── evolution-data.ts
│   ├── technologies.ts
│   └── trading-machines.ts
├── pages/               # Страницы приложения
│   ├── matrix-page.tsx
│   ├── tree-page.tsx
│   ├── cases-page.tsx
│   └── not-found.tsx
├── hooks/               # React hooks
├── lib/                 # Утилиты
└── App.tsx             # Корневой компонент
```

## 📚 Документация компонентов

### Основные компоненты
- **[Матрица эволюции](evolution-matrix-guide.md)** - интерактивная таблица развития технологий
- **[Дерево технологий](technology-tree-guide.md)** - D3.js визуализация связей
- **[Кейсы торговых машин](trading-machine-comparator-guide.md)** - детальные примеры систем

### UI компоненты
- **Navigation** - навигационное меню между страницами
- **UI компоненты** - переиспользуемые элементы интерфейса

## 🎯 Основные страницы

### `/matrix` - Матрица эволюции
Главная страница с интерактивной матрицей развития технологий по модулям и временным периодам.

### `/tree` - Дерево технологий
Иерархическая D3.js визуализация связей между технологиями машинного обучения.

### `/cases` - Кейсы торговых машин
Детальные описания реальных торговых систем с примерами кода и метриками.

## 🔄 Управление данными

### Статические данные
Все данные хранятся в TypeScript файлах в папке `client/src/data/`:
- `evolution-data.ts` - основная матрица эволюции
- `technologies.ts` - база технологий
- `trading-machines.ts` - кейсы торговых систем

### Типы данных
```typescript
interface EvolutionModule {
  name: string;
  revisions: Record<string, RevisionData>;
}

interface TechnologyNode {
  name: string;
  description: string;
  children?: TechnologyNode[];
}

interface TradingMachineCase {
  id: string;
  name: string;
  period: string;
  description: string;
  technologies: Technology[];
  modules: ModuleMapping;
}
```

## 🎨 Стилизация

### Система дизайна
- **CSS переменные** в `client/src/index.css`
- **Tailwind CSS** для utility-классов
- **Темная тема** через класс `dark`
- **Адаптивный дизайн** для мобильных устройств

### Цветовая схема
```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  /* ... */
}
```

## 🔧 Разработка

### Команды разработки
```bash
# Запуск dev-сервера
npm run dev

# Сборка для продакшена
npm run build

# Проверка типов
npm run type-check
```

### Hot Reload
- Изменения в данных применяются мгновенно
- Изменения в компонентах перезагружают страницу
- CSS изменения применяются без перезагрузки

## 📖 Гайды по компонентам

Детальная документация по каждому компоненту:

1. **[Матрица эволюции](evolution-matrix-guide.md)** - управление матрицей технологий
2. **[Дерево технологий](technology-tree-guide.md)** - D3.js визуализация
3. **[Кейсы торговых машин](trading-machine-comparator-guide.md)** - работа с примерами

---

> **🔝 Вернуться к**: [`README.md`](../../README.md) - главная документация проекта
