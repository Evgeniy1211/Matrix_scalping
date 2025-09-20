# Обзор проекта: Эволюция торговых машин

> **ВАЖНО**: База данных унифицирована! Единый источник данных: `backend/data/*`. Фронтенд получает данные только через REST API (`/api/*`). Схемы типов в `@shared/schema` (`backend/knowledge-base/schema.ts`).

> **📍 Родительский документ**: [`README.md`](README.md) → **Архитектура проекта**

## Назначение проекта

Это интерактивное веб-приложение для создания наглядного пособия по развитию технологий скальпинг-систем с 2000 по 2025 год. Проект объединяет в себе:

- Матрицу эволюции — таблицу развития технологий по модулям и временным периодам
- Дерево технологий — иерархическую визуализацию связей между технологиями
- Кейсы торговых машин — реальные примеры с детальным анализом
- Базу технологий — 17 технологий с описаниями, периодами, преимуществами

## Архитектура проекта

### 🗺️ Общая структура

```text
client/src/
├── components/            # React компоненты (UI)
├── pages/                 # Страницы
├── hooks/                 # React hooks и запросы к API
├── lib/                   # Утилиты
└── index.css              # Стили

backend/
├── data/                  # ЕДИНЫЙ источник данных проекта (истина)
│   ├── evolution-data.ts  # Матрица/дерево и интеграторы
│   ├── technologies.ts    # База технологий
│   ├── trading-machines.ts# Кейсы торговых машин
│   └── modules/           # Описания модулей
├── knowledge-base/        # Схема и документация предметной области
│   └── schema.ts          # Zod/Drizzle схема (алиас @shared/schema)
├── routes.ts              # REST API (/api/*)
└── vite.ts                # Интеграция Vite (dev) / статика (prod)
```

### 🔄 Поток данных (теперь через API)

```text
backend/data/* (источники) → backend/routes.ts (API) → client (React) через fetch/React Query
```

## Ключевые файлы для редактирования

### 🎯 Данные (источники правды)

- `backend/data/evolution-data.ts` — матрица, дерево, интегрированные представления
- `backend/data/technologies.ts` — централизованная база технологий
- `backend/data/trading-machines.ts` — кейсы торговых машин

Фронтенд не импортирует эти файлы напрямую — только обращается к API:

- GET `/api/evolution-data`
- GET `/api/evolution-data/integrated`
- GET `/api/evolution-data/dynamic`
- GET `/api/tree-data`
- GET `/api/technologies`
- GET `/api/trading-machines`
- GET `/api/modules`

### 🎨 Стили и визуал

- `client/src/index.css` — CSS переменные, стили матрицы и дерева

### ⚙️ Логика компонентов

- `client/src/components/evolution-matrix.tsx`
- `client/src/components/technology-tree.tsx`
- `client/src/components/revision-explanations.tsx`

## Технологический стек

### Frontend

- React 18 + TypeScript
- D3.js (дерево технологий)
- shadcn/ui + Tailwind CSS
- Wouter (роутинг)

### Development

- Vite (dev/build)
- Express.js (сервер API/статики)
- TypeScript

## Интерактивные функции

### 🔍 Матрица эволюции

- Фильтры, hover-tooltip, цветовая кодировка ревизий, адаптивность

### 🌳 Дерево технологий

- Zoom & Pan, подсказки, авто layout (D3)

## Процесс добавления контента

1. Определить тип данных и обновить соответствующий файл в `backend/data/*`:

- Новая технология → `technologies.ts`
- Новый модуль/ревизия → `evolution-data.ts` (+ при необходимости `modules/*`)
- Новый кейс → `trading-machines.ts`

2. Проверить API-эндпоинты (`/api/*`) и UI-отображение.

## Отладка

- Dev: `npm run dev` (Vite middleware + Express)
- Prod: `npm run build` → `npm start`

### Переменные окружения

- PORT — порт HTTP сервера (по умолчанию 5000)
- NODE_ENV — development включает Vite, production — раздачу статики
- Хост — сервер слушает 127.0.0.1 (см. `index.ts`)

### Быстрые проверки

- Открывается <http://localhost:5000>
- Эндпоинты `/api/*` отвечают 200 (см. `backend/routes.ts`)

## Документация

- Матрица: `docs/frontend/evolution-matrix-guide.md`
- Дерево: `docs/frontend/technology-tree-guide.md`
- Обзор проекта: `project-overview.md`
