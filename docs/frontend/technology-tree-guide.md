
# Руководство по дереву технологий

> **📍 Путь навигации**: [`README.md`](../../README.md) → [`docs/frontend/overview.md`](overview.md) → **Дерево технологий**

> Это подробное руководство по компоненту `TechnologyTree` - D3.js визуализации иерархической структуры технологий.

## Символ для копирования: 🌳

Это основной гайд по работе с деревом технологий.

## Быстрый доступ к разделам

- **Добавление новой ветки** → [`docs/technology-tree-guide.md#добавление-новой-ветки`](../technology-tree-guide.md#добавление-новой-ветки)
- **Настройка D3.js layout** → [`docs/technology-tree-guide.md#настройка-layout`](../technology-tree-guide.md#настройка-layout)
- **Изменение стилей узлов** → [`docs/technology-tree-guide.md#стилизация-узлов`](../technology-tree-guide.md#стилизация-узлов)
- **Интерактивность** → [`docs/technology-tree-guide.md#zoom-и-pan`](../technology-tree-guide.md#zoom-и-pan)

## Frontend специфичные особенности

### D3.js интеграция
```typescript
// client/src/components/technology-tree.tsx
useEffect(() => {
  const svg = d3.select(svgRef.current);
  const tree = d3.tree<TechnologyNode>();
  
  // Построение дерева
}, [treeData]);
```

### React hooks использование
- `useRef` - для получения SVG элемента
- `useEffect` - для инициализации D3.js
- `useState` - для управления состоянием tooltip

### Responsive адаптация
- Автоматическое масштабирование под размер контейнера
- Touch события для мобильных устройств
- Адаптивные размеры узлов и текста
