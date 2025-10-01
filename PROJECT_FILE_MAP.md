# PROJECT_FILE_MAP.md

## Обзор проекта Matrix_scalping

Matrix_scalping — интерактивное веб-приложение для визуализации эволюции технологий алгоритмической торговли (2000–2025). Проект объединяет матрицу эволюции технологий, дерево связей между технологиями и реальные кейсы торговых систем.

**Технологический стек:**

- Frontend: React 18, TypeScript, D3.js, TailwindCSS, shadcn/ui
- Backend: Express.js, Node.js
- Build: Vite
- Тестирование: Vitest, Supertest
- База данных: Drizzle ORM (планируется)

**Архитектура:**

- API-driven frontend: данные получаются исключительно через API.
- Централизованные данные: в `backend/data/`, валидация через Zod.
- Модульная структура: backend и client разделены.

---

## Корневые файлы

### Конфигурационные файлы

- `.env` — переменные окружения (порт, NODE_ENV, DATABASE_URL)
- `.env.example` — шаблон для .env
- `.eslintrc.json` — конфигурация ESLint для линтинга кода
- `.gitignore` — файлы, игнорируемые Git (node_modules, .env, coverage)
- `.lintstagedrc.json` — конфигурация линтинга для pre-commit хуков
- `.replit` — конфигурация для Replit (онлайн-IDE)
- `components.json` — конфигурация shadcn/ui компонентов
- `drizzle.config.ts` — конфигурация Drizzle ORM для миграций БД
- `eslint.config.js` — дополнительная конфигурация ESLint
- `package.json` — зависимости, скрипты, метаданные проекта
- `package-lock.json` — lock-файл для npm
- `postcss.config.js` — конфигурация PostCSS для CSS обработки
- `prettier.config.cjs` — конфигурация Prettier для форматирования кода
- `tailwind.config.ts` — конфигурация TailwindCSS
- `tsconfig.json` — конфигурация TypeScript компилятора
- `vite.config.ts` — конфигурация Vite для сборки и dev-сервера
- `vitest.config.ts` — конфигурация Vitest для тестирования

### Документация

- `INSTALL.md` — инструкции по установке
- `README.md` — обзор проекта, установка, запуск, архитектура
- `project-overview.md` — детальный обзор проекта
- `replit.md` — инструкции для Replit

### Основные файлы приложения

- `index.ts` — точка входа сервера, настройка Express, Vite интеграция

---

## Директория `backend/`

Backend-сервер на Express.js, API эндпоинты, данные, схемы.

### `backend/data/`

Централизованные источники данных проекта.

- `backend/data/evolution-data.ts` — матрица эволюции технологий, дерево технологий, генераторы интегрированных данных
- `backend/data/technologies.ts` — база технологий (Zod-валидируемая)
- `backend/data/trading-machines.ts` — кейсы торговых машин с примерами кода
- `backend/data/json/trading-machines.json` — JSON-версия кейсов торговых машин для API
- `backend/data/modules/` — описания модулей торговых систем
  - `backend/data/modules/data-collection.ts` — модуль сбора данных
  - `backend/data/modules/data-processing.ts` — модуль обработки данных
  - `backend/data/modules/feature-engineering.ts` — модуль feature engineering
  - `backend/data/modules/signal-generation.ts` — модуль генерации сигналов
  - `backend/data/modules/risk-management.ts` — модуль управления рисками
  - `backend/data/modules/execution.ts` — модуль исполнения сделок
  - `backend/data/modules/market-adaptation.ts` — модуль адаптации к рынку
  - `backend/data/modules/visualization.ts` — модуль визуализации
  - `backend/data/modules/index.ts` — экспорт всех модулей

### `backend/docs/`

Документация backend.

- `backend/docs/methodology.md` — методология сбора данных
- `backend/docs/overview.md` — обзор backend

### `backend/import/`

Инструменты импорта данных.

- `backend/import/process-import.ts` — скрипт обработки импорта
- `backend/import/logs/` — логи импорта
- `backend/import/processed/` — обработанные файлы
- `backend/import/raw/` — сырые данные для импорта

### `backend/knowledge-base/`

База знаний проекта.

- `backend/knowledge-base/methodology.md` — методология
- `backend/knowledge-base/overview.md` — обзор
- `backend/knowledge-base/schema.ts` — общая схема данных (Zod)
- `backend/knowledge-base/technologies-overview.md` — обзор технологий
- `backend/knowledge-base/trading-cases.md` — кейсы торговых машин
- `backend/knowledge-base/trading-modules.md` — модули торговых систем

### `backend/routes.ts`

API эндпоинты Express.js.

### `backend/schemas/`

Схемы данных Zod.

- `backend/schemas/schema.ts` — основные схемы (TradingMachine, Technology, etc.)
- `backend/schemas/constants.ts` — константы

### `backend/storage.ts`

Заглушки для хранения данных (deprecated).

### `backend/vite.ts`

Интеграция Vite с Express для dev-сервера.

---

## Директория `client/`

Frontend-приложение на React.

### `client/index.html`

HTML-шаблон для приложения.

### `client/src/`

Исходный код frontend.

- `client/src/App.tsx` — главный компонент приложения
- `client/src/index.css` — глобальные стили
- `client/src/main.tsx` — точка входа React

### `client/src/components/`

React-компоненты.

- `client/src/components/navigation.tsx` — навигация
- `client/src/components/evolution-matrix.tsx` — матрица эволюции
- `client/src/components/dynamic-evolution-matrix.tsx` — динамическая матрица
- `client/src/components/technology-tree.tsx` — дерево технологий
- `client/src/components/trading-machine-comparator.tsx` — компаратор кейсов
- `client/src/components/ErrorBoundary.tsx` — обработка ошибок
- `client/src/components/ui/` — UI-компоненты shadcn/ui

### `client/src/hooks/`

Хуки для API.

- `client/src/hooks/useEvolutionData.ts` — хук для данных эволюции
- `client/src/hooks/useTechnologies.ts` — хук для технологий
- `client/src/hooks/useTradingMachines.ts` — хук для кейсов

### `client/src/lib/`

Утилиты.

- `client/src/lib/utils.ts` — общие утилиты

### `client/src/pages/`

Страницы приложения.

- `client/src/pages/cases-page.tsx` — страница кейсов

---

## Директория `docs/`

Документация проекта.

- `docs/PROJECT_AUDIT.md` — аудит проекта
- `docs/frontend/` — документация frontend
  - `docs/frontend/evolution-matrix-guide.md` — гайд по матрице
  - `docs/frontend/technology-tree-guide.md` — гайд по дереву
  - `docs/frontend/trading-machine-comparator-guide.md` — гайд по компаратору

---

## Директория `tests/`

Тесты.

- `tests/api.e2e.test.ts` — e2e тесты API
- `tests/buildTechnologyRows.test.ts` — тест сборки рядов технологий
- `tests/evolution-matrix.component.test.tsx` — тест компонента матрицы
- `tests/technology-details.component.test.tsx` — тест деталей технологий
- `tests/technology-tree.component.test.tsx` — тест дерева технологий
- `tests/setup.ts` — настройка тестов

---

## Директория `coverage/`

Отчёты покрытия тестами (генерируется npm test -- --coverage).

---

## Директория `attached_assets/`

Прикреплённые ассеты (скриншоты, файлы).

---

## Директория `dist/`

Собранное приложение (генерируется npm run build).

---

## Директория `node_modules/`

Зависимости npm.

---

## Директория `.git/`

Git репозиторий.

---

## Директория `.github/`

GitHub конфигурации.

- `.github/copilot-instructions.md` — инструкции для GitHub Copilot

---

## Директория `.husky/`

Pre-commit хуки.

---

## Состояние Git

Текущий коммит: 8c4a428 feat: добавить возможность импорта торговых систем через API и улучшить обработку ошибок

Дата создания файла: 2025-10-01
