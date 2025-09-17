
# Руководство по работе с матрицей эволюции

> **📍 Путь навигации**: [`README.md`](../../README.md) → [`docs/frontend/overview.md`](overview.md) → **Матрица эволюции**

> Это подробное руководство по компоненту `EvolutionMatrix` - интерактивной таблице развития технологий алгоритмической торговли.

## Символ для копирования: 📊

Это основной гайд по работе с матрицей эволюции технологий.

## Быстрый доступ к разделам

- **Добавление нового модуля** → [`docs/evolution-matrix-guide.md#добавление-нового-модуля`](../evolution-matrix-guide.md#добавление-нового-модуля)
- **Добавление новой ревизии** → [`docs/evolution-matrix-guide.md#добавление-новой-ревизии`](../evolution-matrix-guide.md#добавление-новой-ревизии)  
- **Изменение цветовой схемы** → [`docs/evolution-matrix-guide.md#изменение-цветовой-схемы`](../evolution-matrix-guide.md#изменение-цветовой-схемы)
- **Настройка фильтров** → [`docs/evolution-matrix-guide.md#настройка-фильтров`](../evolution-matrix-guide.md#настройка-фильтров)

## Frontend специфичные особенности

### React компонент структура
```typescript
// client/src/components/evolution-matrix.tsx
export default function EvolutionMatrix() {
  const [showOnlyLatest, setShowOnlyLatest] = useState(false);
  const [hideUnchanged, setHideUnchanged] = useState(false);
  
  // Логика фильтрации и отображения
}
```

### State management
- `showOnlyLatest` - показывать только последнюю ревизию
- `hideUnchanged` - скрывать неизменившиеся модули
- `hoveredCell` - состояние tooltip при наведении

### Интеграция с UI системой
- Использует `shadcn/ui` компоненты
- Tailwind CSS для стилизации
- Responsive дизайн для мобильных устройств
