# Архитектура системы Matrix Scalping

## 🏗️ Общий обзор архитектуры

Matrix Scalping — это полнофункциональное веб-приложение для визуализации эволюции технологий алгоритмической торговли, построенное на современном технологическом стеке с четким разделением ответственности между клиентом и сервером.

## 📊 Архитектурная диаграмма

```mermaid
graph TB
    subgraph "Frontend (client/)"
        A[React App] --> B[Pages]
        A --> C[Components]
        A --> D[Hooks/API]
        B --> E[Evolution Matrix]
        B --> F[Technology Tree]
        C --> G[UI Components]
        C --> H[shadcn/ui]
        D --> I[TanStack Query]
    end

    subgraph "Backend (backend/)"
        J[Express Server] --> K[API Routes]
        J --> L[Static Serving]
        K --> M[Data Sources]
        M --> N[evolution-data.ts]
        M --> O[technologies.ts]
        M --> P[trading-machines.ts]
        M --> Q[modules/]
    end

    subgraph "Shared Schema"
        R[schema.ts] --> S[@shared/schema]
    end

    subgraph "Build System"
        T[Vite] --> U[Development]
        T --> V[Production Build]
        W[ESLint] --> X[Code Quality]
        Y[TypeScript] --> Z[Type Safety]
    end

    A --> |HTTP API| K
    R --> A
    R --> K
    T --> A
    T --> J
```

## 🎯 Модульная структура системы

### Frontend Модули

#### 1. **Страницы (Pages)**

- **Основная страница**: Матрица эволюции технологий
- **404 страница**: Обработка неизвестных маршрутов
- **Роутинг**: Wouter для клиентской навигации

#### 2. **Компоненты визуализации**

- **EvolutionMatrix**: Интерактивная таблица эволюции технологий
- **TechnologyTree**: D3.js дерево связей между технологиями
- **TradingMachineComparator**: Сравнение торговых систем
- **RevisionExplanations**: Объяснения временных периодов

#### 3. **UI Система**

- **shadcn/ui**: Комплект готовых компонентов
- **Radix UI**: Accessibility-первые примитивы
- **Tailwind CSS**: Utility-first стилизация

#### 4. **Управление состоянием**

- **React Hooks**: useState, useEffect для локального состояния
- **TanStack Query**: Кэширование и синхронизация серверного состояния
- **API Layer**: Типизированные запросы к бэкенду

### Backend Модули

#### 1. **Сервер (Express.js)**

- **API Routes**: RESTful эндпоинты для данных
- **Static Serving**: Раздача фронтенда в продакшене
- **Vite Integration**: Middleware для разработки

#### 2. **Источники данных**

- **evolution-data.ts**: Матрица эволюции и дерево технологий
- **technologies.ts**: База технологий с категоризацией
- **trading-machines.ts**: Кейсы торговых систем
- **modules/**: Детальные описания модулей

#### 3. **Схема и валидация**

- **schema.ts**: Zod схемы для валидации данных
- **@shared/schema**: Общие типы для фронтенда и бэкенда
- **Type Safety**: Полная типизация на TypeScript

## 🔄 Поток данных

### Разработка (Development Flow)

```
1. Backend данные (backend/data/*)
   ↓
2. API эндпоинты (backend/routes.ts)
   ↓
3. HTTP запросы (client/hooks)
   ↓
4. TanStack Query кэширование
   ↓
5. React компоненты (client/components)
   ↓
6. Пользовательский интерфейс
```

### Продакшн (Production Flow)

```
1. Static assets (backend/public)
   ↓
2. Express server (dist/index.js)
   ↓
3. API + Static serving
   ↓
4. Клиентское приложение
```

## 🗄️ Структура данных

### Основные типы данных

#### ModuleRevision

```typescript
{
  tech: string; // Технологии (через запятую)
  period: 'empty' | 'early' | 'modern' | 'current';
  desc: string; // Описание
}
```

#### Module

```typescript
{
  name: string;
  revisions: {
    rev1: ModuleRevision;
    rev2: ModuleRevision;
    rev3: ModuleRevision;
    rev4: ModuleRevision;
    rev5: ModuleRevision;
  }
}
```

#### Technology

```typescript
{
  name: string;
  category: string;
  periods: string[];
  evolution: string;
  applicableModules: string[];
}
```

#### TradingMachine (Кейс)

```typescript
{
  name: string;
  period: string;
  technologies: string[];
  modules: string[];
  description: string;
  code?: string;
  metrics?: Record<string, any>;
}
```

## 🔧 Инфраструктура разработки

### Система сборки

- **Vite**: Быстрая разработка и сборка
- **TypeScript**: Статическая типизация
- **ESBuild**: Серверная сборка для продакшена

### Качество кода

- **ESLint**: Статический анализ кода
- **Prettier**: Форматирование кода
- **Husky**: Git hooks для автоматизации
- **lint-staged**: Проверка только изменённых файлов

### CI/CD

- **GitHub Actions**: Автоматическое тестирование и сборка
- **Автоматическая проверка**: Lint + Build на каждый PR
- **Node.js 18**: Целевая версия для CI

## 🎨 Дизайн-система

### Цветовая схема

- **Темная/светлая тема**: Автоматическое переключение
- **CSS переменные**: Консистентная цветовая палитра
- **Интерактивные состояния**: Hover, focus, active

### Типографика

- **Системные шрифты**: Оптимизация производительности
- **Размерная шкала**: Tailwind CSS utilities
- **Responsive**: Адаптивная типографика

### Компонентная система

- **Атомарный дизайн**: Переиспользуемые компоненты
- **Композиция**: Гибкие интерфейсы через компоненты
- **Accessibility**: WCAG совместимость через Radix UI

## 🚀 API Documentation

### Эндпоинты

#### GET `/api/evolution-data`

Возвращает основные данные матрицы эволюции

```typescript
Response: {
  modules: Module[];
}
```

#### GET `/api/evolution-data/integrated`

Интегрированные данные (матрица + технологии + кейсы)

```typescript
Response: {
  modules: Module[];
  appliedTechnologies: Set<string>;
  coverage: Record<string, number>;
}
```

#### GET `/api/evolution-data/dynamic`

Динамическая матрица (каждая технология — отдельная строка)

```typescript
Response: {
  modules: Module[];
}
```

#### GET `/api/tree-data`

Данные для дерева технологий (D3.js format)

```typescript
Response: {
  name: string;
  children: TreeNode[];
}
```

#### GET `/api/technologies`

База технологий

```typescript
Response: Technology[]
```

#### GET `/api/trading-machines`

Кейсы торговых систем

```typescript
Response: TradingMachine[]
```

#### GET `/api/modules`

Список всех модулей

```typescript
Response: string[]
```

## 📦 Зависимости

### Runtime Dependencies

- **React 18**: Основной UI фреймворк
- **D3.js**: Визуализация данных
- **Express.js**: Веб-сервер
- **Zod**: Валидация данных
- **TanStack Query**: Управление серверным состоянием

### Development Dependencies

- **Vite**: Инструмент сборки
- **TypeScript**: Статическая типизация
- **ESLint/Prettier**: Качество кода
- **Tailwind CSS**: CSS фреймворк

## 🔐 Безопасность

### Принципы безопасности

- **Валидация входных данных**: Zod схемы
- **Типобезопасность**: TypeScript строгий режим
- **Санитизация**: Безопасная обработка пользовательского ввода
- **CORS**: Настроенные политики для API

### Аудит безопасности

- **npm audit**: Регулярная проверка уязвимостей
- **Dependabot**: Автоматические обновления зависимостей
- **ESLint security rules**: Статический анализ безопасности

## 📈 Производительность

### Оптимизации фронтенда

- **Code splitting**: Автоматическое разделение кода Vite
- **Tree shaking**: Удаление неиспользуемого кода
- **Asset optimization**: Сжатие изображений и файлов
- **Caching**: TanStack Query кэширование API

### Оптимизации бэкенда

- **Static serving**: Эффективная раздача статических файлов
- **Gzip compression**: Сжатие HTTP ответов
- **Memory management**: Оптимизированная работа с данными

## 🧪 Тестирование

### Стратегия тестирования

- **Lint testing**: ESLint проверки в CI
- **Build testing**: Проверка успешной сборки
- **Type checking**: TypeScript компиляция
- **Integration testing**: Полная сборка и запуск

### CI Pipeline

```yaml
1. Checkout code
2. Setup Node.js 18
3. Install dependencies (npm ci)
4. Run linting (npm run lint)
5. Build project (npm run build)
```

## 📋 Расширяемость

### Добавление новых данных

1. **Технологии**: Редактировать `backend/data/technologies.ts`
2. **Кейсы**: Добавить в `backend/data/trading-machines.ts`
3. **Модули**: Обновить `backend/data/modules/*.ts`
4. **API**: Расширить `backend/routes.ts`

### Добавление новых компонентов

1. **UI компоненты**: `client/src/components/ui/`
2. **Страницы**: `client/src/pages/`
3. **Хуки**: `client/src/hooks/`
4. **Утилиты**: `client/src/lib/`

## 🗺️ Планы развития

### Краткосрочные улучшения

- [ ] Кэширование API на сервере
- [ ] Добавление больше кейсов торговых систем
- [ ] Улучшение мобильной адаптации
- [ ] Оптимизация производительности D3.js

### Долгосрочные цели

- [ ] Интеграция с реальными API бирж
- [ ] Система аутентификации пользователей
- [ ] Персональные дашборды
- [ ] Экспорт данных в различные форматы

---

**Последнее обновление**: Январь 2025  
**Версия архитектуры**: 1.0.0
