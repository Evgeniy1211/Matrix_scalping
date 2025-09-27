# Matrix_scalping — Project Audit (2025-09-27)

Этот отчёт отражает фактическое состояние репозитория на момент анализа. Основан исключительно на реальных файлах и конфигурации проекта.

## 1) Фактическая структура проекта (до 3 уровней)

- .github/
  - copilot-instructions.md
  - workflows/
    - ci.yml
- .husky/
  - pre-commit
  - \_/
- attached_assets/
  - ... (скриншоты, артефакты)
- backend/
  - data/
    - evolution-data.ts
    - technologies.ts
    - trading-machines.ts
    - modules/
      - data-collection.ts
      - data-processing.ts
      - execution.ts
      - feature-engineering.ts
      - index.ts
      - market-adaptation.ts
      - risk-management.ts
      - signal-generation.ts
      - visualization.ts
  - docs/
    - methodology.md
    - overview.md
    - technologies-overview.md
  - import/
    - logs/
    - processed/
    - raw/
    - process-import.ts
  - knowledge-base/
    - methodology.md
    - overview.md
    - schema.ts (stub, deprecated)
    - technologies-overview.md
    - trading-cases.md
    - trading-modules.md
  - public/
    - index.html
    - assets/
      - index-\*.css/js
  - routes.ts
  - schemas/
    - constants.ts
    - schema.ts
  - storage.ts
  - vite.ts
- client/
  - index.html
  - src/
    - App.tsx
    - index.css
    - main.tsx
    - components/
      - dynamic-evolution-matrix.tsx
      - ErrorBoundary.tsx
      - evolution-matrix.tsx
      - navigation.tsx
      - revision-explanations.tsx
      - technology-details.tsx
      - technology-importer.tsx
      - technology-tree.tsx
      - trading-machine-comparator.tsx
      - ui/ (шадсн компоненты)
    - hooks/
      - use-mobile.tsx
      - use-technologies.ts
      - use-toast.ts
    - lib/
      - buildTechnologyRows.ts
      - queryClient.ts
      - utils.ts
    - pages/
      - cases-page.tsx
      - evolution-matrix.tsx
      - matrix-page.tsx
      - not-found.tsx
      - tree-page.tsx
- coverage/ (HTML отчёт покрытия)
- dist/ (сборка server bundle)
- docs/
  - frontend/
    - evolution-matrix-guide.md
    - technology-tree-guide.md
    - trading-machine-comparator-guide.md
- tests/
  - api.e2e.test.ts
  - buildTechnologyRows.test.ts
  - evolution-matrix.component.test.tsx
  - setup.ts
  - technology-details.component.test.tsx
  - technology-tree.component.test.tsx
- components.json
- drizzle.config.ts
- eslint.config.js (flat)
- .eslintrc.json (legacy)
- index.ts (server entry)
- INSTALL.md
- package.json
- package-lock.json
- postcss.config.js
- prettier.config.cjs
- project-overview.md
- README.md
- replit.md
- tailwind.config.ts
- tsconfig.json
- vite.config.ts
- vitest.config.ts

## 2) Главные файлы и их назначение

- Входные точки приложения
  - index.ts — запуск Express-сервера, регистрация API (backend/routes.ts), интеграция с Vite dev middleware (backend/vite.ts) и раздача статики в продакшне.
  - client/src/main.tsx — монтирование React-приложения, корневой рендер App.tsx.

- Конфигурационные файлы
  - package.json — скрипты (dev/build/start/check/lint/format/prepare), зависимости.
  - tsconfig.json — настройки TypeScript (paths: '@/', '@shared/_' → backend/schemas/_; include ограничен, см. «Гэпсы»).
  - eslint.config.js — основной flat-конфиг ESLint v9.
  - .eslintrc.json — наследуемый (legacy) конфиг, дублирует часть правил (см. «Несоответствия»).
  - vitest.config.ts — конфигурация тестов (jsdom, coverage ≥70%, алиасы '@', '@shared').
  - vite.config.ts — сборка фронтенда, алиасы, вывод в backend/public.
  - tailwind.config.ts — темы, плагины, content-глоб.
  - drizzle.config.ts — конфиг Drizzle Kit (ожидает DATABASE_URL в среде).
  - .husky/pre-commit — pre-commit hook: eslint --fix + lint-staged.
  - .lintstagedrc.json — правила для staged файлов (eslint --fix, prettier).
  - .github/workflows/ci.yml — CI: lint → tsc → build → audit → test.

- Основная логика
  - backend/data/\* — «источник правды»: матрица эволюции, дерево, БД технологий, кейсы, модули.
  - backend/routes.ts — REST API: /api/evolution, /api/technologies, /api/trading-machines, /api/modules, /api/tree-data (и deprecated-роуты с предупреждениями).
  - backend/schemas/schema.ts — Zod-схемы и типы, общие для API и фронтенда (алиас @shared/schema).
  - client/src/components/\* — визуализация: матрица, дерево, детали технологии, компаратор кейсов, UI-компоненты.
  - client/src/hooks/\* — React Query хуки и вспомогательные хелперы.
  - client/src/lib/\* — утилиты и сборка строк технологий для таблиц.
  - backend/import/process-import.ts — Stage 1 конвертер RAW → Markdown (см. README).
  - backend/vite.ts — dev middleware (Vite) и прод-статика.

- Вспомогательные утилиты
  - client/src/lib/utils.ts, queryClient.ts, buildTechnologyRows.ts.
  - backend/storage.ts — in-memory пример хранилища пользователей (не задействован в текущем API).

- Тесты
  - unit: tests/buildTechnologyRows.test.ts, component-тесты в tests/\*.component.test.tsx.
  - e2e (API): tests/api.e2e.test.ts (Supertest + Vitest) валидирует JSON контракт через @shared/schema.
  - setup: tests/setup.ts (jest-dom).

## 3) Документация

- README.md — обзор архитектуры, API-эндпоинтов, запуск (dev/prod), карта документации, гайд по добавлению данных, описание двухэтапного импорта (RAW → Markdown → БД), структура импортера.
- INSTALL.md — пошаговая установка и запуск (Windows/Linux), частые проблемы.
- backend/overview.md — дизайн бекенда, API и схемы, smoke-check лист.
- docs/frontend/\*.md — гайды по матрице, дереву, компаратору.
- .github/copilot-instructions.md — инструкции для ИИ-агентов по архитектуре и правилам изменения кода.

Примеры запуска есть (README/INSTALL). Отдельной API-спецификации (OpenAPI/Swagger) нет — эндпоинты описаны текстом и покрыты тестами.

## 4) Здоровье проекта

- Тесты
  - Наличие: да (unit + компонентные + e2e для API). Coverage настроен (V8, отчёт в coverage/). Фактический прогон в рамках этого аудита не выполнялся.

- Линт/типизация
  - ESLint v9 (flat) + плагины: react, react-hooks, import, simple-import-sort, unused-imports; Prettier для форматирования.
  - Наличие legacy .eslintrc.json (дублирует/конфликтует с flat-конфигом) — см. «Несоответствия».
  - TypeScript 5.6.3; tsc запускается скриптом "check". tsconfig.json ограниченно включает файлы (см. «Гэпсы»).

- CI/CD
  - GitHub Actions: .github/workflows/ci.yml — npm ci → lint → check → build → npm audit → test. CD (деплой) отсутствует.

- Lock-файлы
  - package-lock.json — присутствует. Python/poetry/uv — отсутствуют.

## 5) Несоответствия и пробелы (что нужно поправить)

- Дубликат конфигов ESLint
  - Имеются и eslint.config.js (flat), и .eslintrc.json (legacy). Это может приводить к расхождениям правил. Рекомендуется удалить .eslintrc.json и оставить только flat-конфиг.

- Несогласованность алиаса @shared
  - package.json содержит поле "alias": { "@shared": "./backend/knowledge-base" }, тогда как Vite/Vitest/tsconfig используют backend/schemas. Это вводит в заблуждение.
  - Действия: либо убрать поле "alias" из package.json, либо привести к backend/schemas для единообразия.

- Покрытие tsc: неполное включение исходников
  - tsconfig.json include: ["client/src/**/*", "backend/knowledge-base/**/*", "server/**/*"].
  - Отсутствуют: корневой index.ts, backend/data/**/\*, backend/import/**/_, backend/routes.ts, backend/vite.ts, backend/schemas/\*\*/_.
  - Действия: обновить include до ["index.ts", "backend/**/*.ts", "client/src/**/*"], при необходимости скорректировать exclude.

- Отсутствует .env.example
  - drizzle.config.ts требует DATABASE_URL для drizzle-kit. В репозитории нет примера .env и инструкций по переменным окружения (кроме README/INSTALL общих упоминаний PORT/NODE_ENV).
  - Действия: добавить .env.example с DATABASE_URL= и описать в README/INSTALL.

- Stage 1 импортер: отсутствует npm-скрипт
  - Файл backend/import/process-import.ts присутствует, но в package.json нет удобного скрипта (например, "import:process": "tsx backend/import/process-import.ts").
  - Действия: добавить скрипт и короткую секцию в README/INSTALL (если планируется активное использование).

- Документационные несоответствия
  - В отдельных документах встречаются разные формулировки источника @shared (knowledge-base vs schemas). В коде фактически используется backend/schemas. Следует унифицировать упоминания.

- Нет формальной API-спецификации
  - Эндпоинты описаны в README и покрыты тестами, но OpenAPI/Swagger отсутствует. По желанию — добавить.

- CD/Deploy
  - Нет Dockerfile/compose, нет описания деплоя, нет сред для продакшена. Если требуется — добавить.

## 6) Сравнение с «AlgoScalp» и уровень стандартизации

- В репозитории нет ссылок/артефактов проекта «AlgoScalp» — выполнить точное сопоставление невозможо. Ниже — список того, чего не хватает Matrix_scalping до уровня более «стандартизованного» проекта, исходя из best practices этого репозитория:
  - Единообразие конфигурации ESLint (убрать legacy .eslintrc.json).
  - Унификация алиасов @shared во всех инструментах (tsconfig/vite/vitest/package.json/docs).
  - Полное покрытие TypeScript-проверкой всего серверного кода и data-модулей (tsconfig include/exclude).
  - Пример .env (.env.example) и документация переменных окружения, особенно для DATABASE_URL (Drizzle).
  - Удобные npm-скрипты для импорта Markdown Stage 1 (import:process) и будущего Stage 2.
  - Формальная API-спецификация (OpenAPI) и/или Swagger UI (опционально).
  - Документы по деплою (Dockerfile/docker-compose или другой сценарий), параметризация окружений.
  - Доп. качество жизненного цикла: pre-commit/CI единообразно запускают одинаковые версии eslint/prettier/tsc; возможно добавить lint:typecheck task.

## 7) Итог: что есть vs чего не хватает

- Что есть
  - Чёткая модульная архитектура (backend/data как источник правды, API, фронтенд-хуки через React Query).
  - Богатый набор компонентов UI, страницы, хуки, утилиты.
  - Современный стек и настройка инструментов (Vite, Vitest, ESLint v9 flat, Tailwind, Drizzle/Zod схемы).
  - Наличие e2e и unit тестов с схемной валидацией ответов.
  - CI с линтом, типами, сборкой и тестами.
  - Документация: README, INSTALL, backend/overview, фронтенд-гайды.
  - Stage 1 импортер RAW → Markdown и описанная двухэтапная схема.

- Чего не хватает
  - Удалить .eslintrc.json и устранить дубли.
  - Привести алиас @shared к backend/schemas везде и поправить упоминания в документации.
  - Расширить tsconfig include, чтобы tsc покрывал сервер/данные/импорт.
  - Добавить .env.example (DATABASE_URL и прочие переменные) и раздел "Configuration" в README/INSTALL.
  - Добавить npm script "import:process".
  - (Опционально) OpenAPI-спецификация для API.
  - (Опционально) Dockerfile/compose и инструкции по деплою.

## 8) Рекомендованные next steps (без изменения поведения)

1. Консолидация ESLint

- Удалить .eslintrc.json, оставить eslint.config.js.

2. Алиасы и документация

- Удалить поле "alias" из package.json или направить "@shared" → "./backend/schemas".
- Проверить и унифицировать упоминания @shared в README/backend/overview.

3. TypeScript охват

- В tsconfig.json:
  - include: ["index.ts", "backend/**/*.ts", "client/src/**/*"]
  - exclude: ["node_modules", "dist", "coverage", "backend/public", "tests"]

4. Переменные окружения

- Добавить .env.example (DATABASE_URL, PORT), краткое описание в README/INSTALL.

5. Импортер

- В package.json добавить:
  - "import:process": "tsx backend/import/process-import.ts"
- В README/INSTALL дать команду запуска.

6. (Опционально) OpenAPI и деплой

- Сгенерировать OpenAPI (например, zod-to-openapi) и добавить Swagger UI.
- Добавить Dockerfile/compose, минимальные инструкции для продакшн-деплоя.

---

Подготовлено автоматически на основе файлов в репозитории. Если нужно, могу сразу применить безопасные правки (алиасы, tsconfig include, удаление legacy .eslintrc.json, добавление import:process и .env.example).
