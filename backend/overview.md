# Backend: сервер, API и база данных

> **📍 Родительский документ**: [`README.md`](../README.md)
> **🔝 Вернуться к**: [`README.md`](../README.md) — главная документация проекта

## Обзор

Backend — это минимальный сервер Express, который:

- отдает статический фронтенд в продакшене
- поднимает Vite dev-middleware в разработке
- предоставляет REST API к единому источнику данных в `backend/data/*`
- использует общую схему типов/валидации в `backend/knowledge-base/schema.ts` (доступна также через алиас `@shared/schema`)

## Структура

```text
backend/
├── data/                     # Единая БД проекта (исходники данных)
│   ├── evolution-data.ts     # Матрица, дерево и интегрированные генераторы
│   ├── technologies.ts       # База технологий
│   ├── trading-machines.ts   # Кейсы торговых машин
│   └── modules/              # Описание модулей
├── knowledge-base/           # База знаний и схема данных
│   ├── schema.ts             # Zod/Drizzle схема (@shared/schema)
│   └── *.md                  # Документы предметной области
├── routes.ts                 # Определение API эндпоинтов
├── storage.ts                # Простое in-memory хранилище (пример)
└── vite.ts                   # Интеграция Vite с Express
```

## API

Базовый префикс: `/api`

- GET `/api/evolution-data` — исходная матрица и дерево
- GET `/api/evolution-data/integrated` — интегрированные данные (матрица + технологии + кейсы)
- GET `/api/evolution-data/dynamic` — «динамическая матрица» (каждая технология — отдельная строка)
- GET `/api/tree-data` — данные для дерева технологий
- GET `/api/technologies` — база технологий из `backend/data/technologies.ts`
- GET `/api/trading-machines` — кейсы торговых машин
- GET `/api/modules` — сводный список модулей

См. реализацию: `backend/routes.ts`.

## Схема данных

- Файл: `backend/knowledge-base/schema.ts`
- Используется и на фронтенде (через алиас `@shared/schema`), и на бэкенде
- Совместима с Drizzle ORM (см. `drizzle.config.ts` → `schema`)

## Сборка и запуск

- Разработка: `npm run dev` (Express + Vite middleware)
- Продакшен: `npm run build` затем `npm start`

По умолчанию сервер слушает `127.0.0.1:5000`.

## Smoke-тесты (чек-лист)

1. Сервер стартует без ошибок (`npm run dev` или `npm start` после сборки)
2. Эндпоинты `/api/*` отвечают 200 и возвращают валидные данные:
   - `/api/technologies`
   - `/api/evolution-data`
   - `/api/evolution-data/integrated`
   - `/api/evolution-data/dynamic`
   - `/api/trading-machines`
   - `/api/modules`
3. Статический фронтенд отдается в продакшене (после `npm run build` → `npm start`)
4. Нет 404/устаревших ссылок на старые пути (`shared/*`, `client/src/data/*` и т.п.)

## Заметки по миграции

- Вся схема и база знаний перемещены в `backend/knowledge-base/*`
- Источники данных централизованы в `backend/data/*`
- Алиас `@shared` указывает на `backend/knowledge-base`
- Обновлены импорты и документация, чтобы отражать новую структуру
