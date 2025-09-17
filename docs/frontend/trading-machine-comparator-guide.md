
# Руководство по кейсам торговых машин

> **📍 Путь навигации**: [`README.md`](../../README.md) → [`docs/frontend/overview.md`](overview.md) → **Кейсы торговых машин**

> Это подробное руководство по компоненту `TradingMachineComparator` - детальному отображению реальных торговых систем.

## Символ для копирования: 🎯

Это основной гайд по работе с кейсами торговых машин.

## Быстрый доступ к разделам

- **Добавление нового кейса** → [`docs/trading-machine-comparator-guide.md#добавление-нового-кейса`](../trading-machine-comparator-guide.md#добавление-нового-кейса)
- **Структура данных кейса** → [`docs/trading-machine-comparator-guide.md#структура-кейса`](../trading-machine-comparator-guide.md#структура-кейса)
- **Связь с матрицей** → [`docs/trading-machine-comparator-guide.md#связь-с-матрицей`](../trading-machine-comparator-guide.md#связь-с-матрицей)

## Frontend специфичные особенности

### React компонент структура
```typescript
// client/src/components/trading-machine-comparator.tsx
export default function TradingMachineComparator() {
  const [selectedCase, setSelectedCase] = useState<string>('');
  
  // Логика отображения кейсов
}
```

### Карточки кейсов
- Использует `Card` компоненты из shadcn/ui
- Табы для переключения между разделами
- Синтакс highlighting для примеров кода

### Интеграция с данными
- Автоматическая загрузка из `trading-machines.ts`
- Связь с технологиями из основной базы
- Привязка к модулям матрицы эволюции
