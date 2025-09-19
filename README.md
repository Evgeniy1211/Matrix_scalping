# Matrix_scalping

[![CI](https://github.com/Evgeniy1211/Matrix_scalping/actions/workflows/ci.yml/badge.svg)](https://github.com/Evgeniy1211/Matrix_scalping/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18-brightgreen)](https://nodejs.org/)
[![npm Version](https://img.shields.io/badge/npm-%3E%3D9-brightgreen)](https://www.npmjs.com/)

Визуализация эволюции технологий алгоритмической торговли (2000–2025).

## 🚀 Стек

- Frontend: React 18, TypeScript, D3.js, TailwindCSS, shadcn/ui
- Backend: Express.js
- Build: Vite

## 📋 Системные требования

- **Node.js**: ≥ 18.0.0 (проверить: `node --version`)
- **npm**: ≥ 9.0.0 (проверить: `npm --version`)
- **ОС**: Windows, macOS, Linux
- **Браузер**: Chrome/Firefox/Safari/Edge (современные версии)

## ⚙️ Установка и запуск

```bash
git clone https://github.com/Evgeniy1211/Matrix_scalping.git
cd Matrix_scalping
npm install
npm run dev
```

---

## Эволюция торговых машин: Интерактивная матрица технологий

### 📋 Обзор проекта

Интерактивное веб-приложение для визуализации эволюции технологий алгоритмической торговли с 2000 по 2025 год. Проект объединяет матрицу эволюции технологий, дерево связей между технологиями и реальные кейсы торговых систем.

### 🎯 Цели проекта

- **Образовательный ресурс** - наглядное пособие по развитию технологий скальпинг-систем
- **Систематизация знаний** - структурированная база данных технологий, кейсов и модулей
- **Интерактивная визуализация** - удобный интерфейс для изучения связей между технологиями
- **Практические примеры** - реальные кейсы использования технологий в торговых системах

### 🏗️ Архитектура

#### Технологический стек

- **Frontend**: React 18 + TypeScript + D3.js + Tailwind CSS
- **Backend**: Express.js (минимальный)
- **Build**: Vite
- **UI Components**: shadcn/ui

📖 **Подробная документация архитектуры**: [`docs/architecture.md`](docs/architecture.md)

#### Основные компоненты

1. **Матрица эволюции** - таблица развития технологий по модулям и временным периодам
2. **Дерево технологий** - иерархическая визуализация связей между технологиями
3. **Кейсы торговых машин** - реальные примеры систем с детальным описанием
4. **База технологий** - централизованная информация о технологиях

### 📁 Структура проекта

```
├── client/src/                # Frontend приложение
│   ├── components/            # React компоненты
│   ├── pages/                 # Страницы приложения
│   ├── hooks/                 # Хуки и работа с API
│   └── lib/                   # Утилиты
├── backend/                   # Backend сервер и данные
│   ├── data/                  # Источники данных (единая БД проекта)
│   │   ├── evolution-data.ts      # Матрица, дерево, генераторы интегрированных данных
│   │   ├── technologies.ts        # База технологий
│   │   ├── trading-machines.ts    # Кейсы торговых машин
│   │   └── modules/               # Описание модулей
│   ├── knowledge-base/        # База знаний и схема данных (Zod/Drizzle)
│   │   ├── schema.ts              # Общая схема типов/валидации (@shared/schema)
│   │   └── *.md                  # Документация предметной области
│   ├── routes.ts              # API endpoints
│   ├── vite.ts                # Интеграция Vite с Express
│   └── storage.ts             # Хранилище/заглушки
├── docs/                      # Руководства и документация
└── README.md                  # Этот файл
```

### 📚 База знаний

Вся собранная информация систематизирована в папке `backend/knowledge-base/`.

**📋 Главный документ архитектуры данных**: [`backend/knowledge-base/methodology.md`](backend/knowledge-base/methodology.md) — содержит ВСЕ правила сбора, классификации и интеграции данных.

- Общая схема данных (используется фронтендом и бэкендом через алиас `@shared`): `backend/knowledge-base/schema.ts`

#### Содержание базы знаний:

#### 🔍 Обзорные документы

- **`overview.md`** - общее описание предметной области торговых машин
- **`methodology.md`** - методология сбора и классификации данных

#### 🤖 Технологии

- **`technologies-overview.md`** - обзор всех технологий
- **`ml-algorithms.md`** - алгоритмы машинного обучения
- **`data-processing.md`** - технологии обработки данных
- **`infrastructure.md`** - инфраструктурные технологии

#### 🧩 Модули торговых систем

- **`trading-modules.md`** - описание всех модулей торговых систем
- **`module-evolution.md`** - эволюция модулей по периодам
- **`module-interactions.md`** - взаимосвязи между модулями

#### 📊 Кейсы и примеры

- **`trading-cases.md`** - описание всех кейсов торговых машин
- **`implementation-examples.md`** - примеры реализации
- **`performance-metrics.md`** - метрики производительности

#### 📖 Библиотеки и инструменты

- **`python-libraries.md`** - Python библиотеки для трейдинга
- **`javascript-tools.md`** - JavaScript инструменты
- **`data-sources.md`** - источники рыночных данных

### 🗂️ Основные файлы данных

### backend/data/

- **`evolution-data.ts`** — матрица эволюции, дерево технологий и генераторы интегрированных данных
- **`technologies.ts`** — централизованная база технологий (Zod-валидируемая)
- **`trading-machines.ts`** — кейсы торговых машин с примерами кода
- **`modules/*.ts`** — описания модулей

Фронтенд получает данные ТОЛЬКО через API, а типизацию/валидацию — через `@shared/schema`.

### 🎨 Визуальные компоненты

#### 📊 Матрица эволюции (`evolution-matrix.tsx`)

- 8 модулей торговых систем
- 5 временных периодов (ревизий)
- Цветовое кодирование по периодам
- Интерактивные фильтры и tooltip
- **📖 Документация**: [`frontend/evolution-matrix-guide.md`](frontend/evolution-matrix-guide.md)

#### 🌳 Дерево технологий (`technology-tree.tsx`)

- D3.js визуализация
- Иерархическая структура ML технологий
- Zoom & Pan интерактивность
- Hover подсказки
- **📖 Документация**: [`frontend/technology-tree-guide.md`](frontend/technology-tree-guide.md)

#### 🎯 Кейсы торговых машин (`trading-machine-comparator.tsx`)

- Детальное описание реальных систем
- Технологические стеки
- Примеры кода
- Метрики производительности
- **📖 Документация**: [`frontend/trading-machine-comparator-guide.md`](frontend/trading-machine-comparator-guide.md)

### 📈 Статистика собранных данных

### Технологии: 25+ уникальных технологий

- **ML алгоритмы**: Random Forest, LSTM, Transformer, SVM, CNN, RNN, GRU
- **Библиотеки данных**: pandas, numpy, ccxt, plotly, matplotlib
- **Инфраструктура**: Python, JavaScript, WebSocket, API

### Модули торговых систем: 8 основных модулей

1. Сбор данных
2. Обработка данных
3. Feature Engineering
4. Генерация сигналов
5. Риск-менеджмент
6. Исполнение сделок
7. Адаптация к рынку
8. Визуализация и мониторинг

### Кейсы: 1+ детальных кейса

- Random Forest Scalper (2015-2017)
- С планами расширения до 10+ кейсов

### Временные периоды: 5 ревизий

- Rev.1 (2000-2005) - Ранние технологии
- Rev.2 (2005-2010) - Развитие основ
- Rev.3 (2010-2015) - Модернизация
- Rev.4 (2015-2020) - Современные подходы
- Rev.5 (2020-2025) - Текущее состояние

## 🚀 Запуск проекта

```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev

# Сборка для продакшена
npm run build
```

Приложение доступно на http://localhost:5000

## 📖 Карта документации

### 🎯 Правила и методология

- **📋 Главные правила**: [`knowledge-base/methodology.md`](knowledge-base/methodology.md) - ВСЕ правила сбора и интеграции данных

### 🎨 Frontend документация

- **📖 Обзор фронтенда**: [`project-overview.md`](project-overview.md) - архитектура и компоненты
- **📊 Матрица эволюции**: [`frontend/evolution-matrix-guide.md`](frontend/evolution-matrix-guide.md) - как управлять матрицей
- **🌳 Дерево технологий**: [`frontend/technology-tree-guide.md`](frontend/technology-tree-guide.md) - D3.js визуализация
- **🎯 Кейсы торговых машин**: [`frontend/trading-machine-comparator-guide.md`](frontend/trading-machine-comparator-guide.md) - работа с кейсами

### 🖥️ Backend документация

- **📖 Обзор бэкенда**: [`backend/overview.md`](backend/overview.md) - сервер, API и база данных
- **🛣️ API документация**: эндпоинты `/api/*` (см. `backend/routes.ts`)
- **🗄️ База данных**: Drizzle ORM, схема: `backend/knowledge-base/schema.ts`

### 🏗️ Общий обзор

- **📋 Архитектура проекта**: [`project-overview.md`](project-overview.md) - структура и компоненты
- **🏗️ Системная архитектура**: [`docs/architecture.md`](docs/architecture.md) - полная архитектурная документация

## 📝 Как добавлять новые данные

Теперь все источники данных находятся в `backend/data/`.

### Новая технология

1. Добавить в `backend/data/technologies.ts`
2. Обновить соответствующий документ в `backend/knowledge-base/`
3. Типы/валидация доступны через `@shared/schema`

### Новый кейс торговой машины

1. Добавить в `backend/data/trading-machines.ts`
2. Создать/обновить описание в `backend/knowledge-base/trading-cases.md`

### Новый модуль системы

1. Добавить/отредактировать в `backend/data/evolution-data.ts` и/или `backend/data/modules/*`
2. Описать в `backend/knowledge-base/trading-modules.md`

## 🎯 Планы развития

### Ближайшие задачи

- [ ] Расширение базы кейсов до 10+ примеров
- [ ] Детализация технологий с примерами кода
- [ ] Добавление метрик производительности
- [ ] Создание интерактивных сравнений

### Долгосрочные цели

- [ ] Интеграция с реальными API бирж
- [ ] Система поиска по технологиям
- [ ] Экспорт данных в различных форматах
- [ ] Мультиязычная поддержка

## 🤝 Участие в проекте

Проект открыт для расширения и улучшений. Основные области для вклада:

- Добавление новых кейсов торговых машин
- Расширение базы технологий
- Улучшение документации
- Оптимизация интерфейса

## 📄 Лицензия

Проект создан в образовательных целях. Все данные собраны из открытых источников.

---

**Последнее обновление**: Январь 2025
**Версия**: 1.0.0
