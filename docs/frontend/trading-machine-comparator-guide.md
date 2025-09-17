# Гайд: Сравнение торговых машин

## Назначение
Компонент `trading-machine-comparator.tsx` отображает кейсы торговых машин и позволяет сравнивать их технологии.

## Источник данных
API: `/api/trading-machines` (формируется из `backend/data/trading-machines.ts`).

## Структура кейса (упрощённо)
```
{
  id: string,
  name: string,
  period: string,
  description: string,
  technologies: string[],
  modules: Record<string, string[]>
}
```

## Добавление кейса
1. Добавьте объект в `backend/data/trading-machines.ts`
2. Укажите используемые технологии и распределение по модулям
3. При необходимости обновите связанные технологии в `technologies.ts`

## TODO
- Фильтр по периоду
- Диаграмма пересечения технологий
- Экспорт сравнения в Markdown
