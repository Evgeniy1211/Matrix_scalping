# Гайд: Матрица эволюции

Цель: описывает как обновлять данные матрицы и её представления.

## Форматы данных

Основной контракт (backend/schemas/schema.ts → evolutionDataSchema):

```ts
{
  modules: Array<{
    name: string,
    revisions: {
      rev1: { tech: string, period: 'empty'|'early'|'modern'|'current', desc: string },
      rev2: {...},
      rev3: {...},
      rev4: {...},
      rev5: {...}
    }
  }>
}
```

## Источники данных (API)

Теперь доступны 3 варианта матрицы:

- original: GET `/api/evolution` – базовые 8 модулей (статическая матрица)
- integrated: GET `/api/evolution/integrated` – original + технологии из базы + интеграция кейсов
- dynamic: GET `/api/evolution/dynamic` – каждая технология отдельной строкой (построено из базы + кейсов)

На фронтенде переключение реализовано через состояние `dataSource` в `EvolutionMatrix` и вызов `useEvolutionData(source)`.

## Как добавить технологию в модуль

1. Найти файл модуля в `backend/data/modules/*.ts`
2. В нужной ревизии дописать `tech` (через запятую) и обновить `desc`
3. Если технология появляется впервые в ревизии – корректно проставить `period`
4. Сохранить – HMR обновит страницу

## Добавление технологии в интегрированные режимы

- В `backend/data/technologies.ts` добавить объект технологии (category / periods / evolution / applicableModules)
- (Опционально) Добавить кейс в `backend/data/trading-machines.ts` – технологии из кейсов тоже попадут в integrated/dynamic
- Перезапустить (или дождаться HMR)

## Динамическая матрица

Генерируется функцией `createDynamicTechnologyMatrix()` в `backend/data/evolution-data.ts`.

Особенности:

- Каждая строка = технология
- Имя строки включает модуль (через mapping category → человекочитаемое название)
- Потомки (эволюция) визуально выделяются префиксом `└─`

## Валидация

Все ответы валидируются Zod схемой `evolutionDataSchema` из `backend/schemas/schema.ts` (алиас `@shared/schema`). Несоответствие формату выдаёт ошибку React Query и fallback UI.

## Coverage (покрытие кейсами)

Функция `getMatrixTechnologyCoverage` агрегирует технологии из кейсов. Для отображения бейджей производится маппинг ключей модулей кейсов к русским названиям.

## TODO

- Расширить dynamic режим (ревизионная эволюция вместо одноразового появления)
- Добавить цветовые индикаторы источника данных
- Вынести coverage в отдельный сервис
- Добавить кеширование интегрированных вычислений
