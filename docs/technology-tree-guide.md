# Документация: Дерево эволюции технологий

> **📍 Родительский документ**: [`README.md`](../README.md) → **Дерево технологий (общая документация)**

## Обзор

Дерево эволюции представляет собой интерактивную древовидную визуализацию с использованием D3.js, показывающую иерархические связи между технологиями машинного обучения в скальпинг-системах.

## Файлы, влияющие на дерево технологий

### 🎯 Основные файлы:
1. **`client/src/data/evolution-data.ts`** - данные дерева (объект `treeData`)
2. **`client/src/components/technology-tree.tsx`** - компонент с логикой D3.js
3. **`client/src/index.css`** - стили для узлов, связей и tooltip

### 🔗 Связанные файлы:
- **`client/src/pages/evolution-matrix.tsx`** - главная страница, где используется компонент
- **`package.json`** - зависимость D3.js

## Структура данных дерева

### Основной объект данных:
```typescript
// В файле client/src/data/evolution-data.ts
export const treeData: TechnologyNode = {
  name: "ML",                    // Корневой узел
  description: "Описание...",    // Описание для tooltip
  children: [                    // Дочерние узлы (массив)
    {
      name: "Traditional ML",
      description: "Классические алгоритмы...",
      children: [
        { name: "SVM", description: "Метод опорных векторов..." },
        { name: "Random Forest", description: "Ансамбль деревьев..." }
      ]
    }
  ]
}
```

### Интерфейс узла:
```typescript
export interface TechnologyNode {
  name: string;                    // Название технологии (отображается на узле)
  description: string;             // Описание (показывается в tooltip при hover)
  children?: TechnologyNode[];     // Массив дочерних узлов (опционально)
}
```

## Как изменить данные дерева

### 1. Добавить новую технологию в существующую ветку:
```typescript
// Найдите нужную ветку в treeData и добавьте в children:
{
  name: "Deep Learning",
  description: "...",
  children: [
    // ... существующие узлы
    {
      name: "Новая технология",
      description: "Описание новой технологии"
    }
  ]
}
```

### 2. Создать новую главную ветку:
```typescript
// В корневом узле ML добавьте новую ветку:
export const treeData: TechnologyNode = {
  name: "ML",
  description: "...",
  children: [
    // ... существующие ветки
    {
      name: "Новое направление",
      description: "Описание нового направления",
      children: [
        { name: "Технология 1", description: "..." },
        { name: "Технология 2", description: "..." }
      ]
    }
  ]
}
```

### 3. Изменить существующие узлы:
- **`name`** - изменяет текст на узле
- **`description`** - изменяет текст в tooltip
- **`children`** - добавить/удалить дочерние узлы

## Визуальное представление и стилизация

### 🎨 Цвета узлов (задаются в `technology-tree.tsx`):
```typescript
.style('fill', d => {
  if (!d.children && !d._children) return 'hsl(38 92% 50%)';  // Листовые узлы - оранжевый
  return d.depth === 0 ? 'hsl(221 83% 53%)' : 'hsl(142 76% 36%)'; // Корень: синий, внутренние: зелёный
});
```

### 📐 Размеры и позиционирование:
```typescript
// В technology-tree.tsx:
const tree = d3.tree<any>()
  .size([height - 40, width - 100]);  // Размер области дерева

node.append('circle')
  .attr('r', 6);  // Радиус узлов
```

### ✍️ Стили текста и связей (в `index.css`):
```css
/* Узлы дерева */
.node {
  cursor: pointer;
  stroke: hsl(var(--border));
  stroke-width: 2px;
}

.node:hover {
  stroke: hsl(var(--primary));
  stroke-width: 3px;
}

/* Связи между узлами */
.link {
  stroke: hsl(var(--muted-foreground));
  stroke-opacity: 0.6;
  stroke-width: 2px;
}

/* Подписи узлов */
.node-label {
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  font-weight: 500;
  fill: hsl(var(--foreground));
  pointer-events: none;
}
```

## Настройка интерактивности

### 🖱️ Zoom и Pan:
```typescript
// В technology-tree.tsx настроена функция масштабирования:
const zoom = d3.zoom<SVGSVGElement, unknown>()
  .scaleExtent([0.5, 2])  // Минимум 50%, максимум 200%
  .on('zoom', (event) => {
    g.attr('transform', event.transform);
  });
```

### 💬 Tooltip система:
```typescript
// Tooltip создаётся динамически при hover:
node.on('mouseenter', function(event, d) {
  showTooltip(event, d.data.description || d.data.name);
}).on('mouseleave', hideTooltip);
```

## Изменение визуального представления

### 1. Изменить тип макета дерева:
```typescript
// Заменить d3.tree на другой макет:
const tree = d3.cluster<any>()    // Кластерный макет
// или
const tree = d3.pack<any>()       // Упаковочный макет (круги)
```

### 2. Изменить ориентацию дерева:
```typescript
// Поменять x и y координаты для вертикального дерева:
.attr('transform', d => `translate(${d.x + 20},${d.y + 50})`)

// И для связей:
.attr('d', d3.linkVertical<any, any>()
  .x(d => d.x + 20)
  .y(d => d.y + 50))
```

### 3. Изменить размеры узлов по важности:
```typescript
node.append('circle')
  .attr('r', d => {
    if (d.depth === 0) return 10;      // Корень больше
    if (!d.children) return 4;         // Листья меньше
    return 6;                          // Обычные узлы
  });
```

### 4. Изменить цветовую схему:
```typescript
.style('fill', d => {
  // По глубине:
  const colors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728'];
  return colors[d.depth % colors.length];
  
  // Или по типу технологии:
  if (d.data.name.includes('ML')) return '#blue';
  if (d.data.name.includes('RL')) return '#green';
  return '#gray';
});
```

## Изменение размеров и компоновки

### 📏 Настройка размеров контейнера:
```typescript
// В technology-tree.tsx:
const width = container.clientWidth;   // Автоматическая ширина
const height = 400;                    // Фиксированная высота

// Изменить высоту в JSX:
<svg 
  ref={svgRef} 
  className="w-full h-96"  // Изменить h-96 на нужную высоту
/>
```

### 🔄 Адаптивность:
```typescript
// Дерево автоматически перестраивается при изменении размера окна
useEffect(() => {
  const handleResize = () => {
    // Логика пересчёта размеров
  };
  window.addEventListener('resize', handleResize);
}, []);
```

## Альтернативные типы визуализации

### 1. Радиальное дерево:
```typescript
// Заменить tree на radial tree:
const tree = d3.tree<any>()
  .size([2 * Math.PI, Math.min(width, height) / 2 - 100])
  .separation((a, b) => (a.parent == b.parent ? 1 : 2) / a.depth);

// Изменить позиционирование:
.attr('transform', d => `rotate(${d.x * 180 / Math.PI - 90}) translate(${d.y},0)`)
```

### 2. Граф с силовым макетом:
```typescript
// Заменить tree layout на force simulation:
const simulation = d3.forceSimulation(nodes)
  .force("link", d3.forceLink(links).id(d => d.id))
  .force("charge", d3.forceManyBody())
  .force("center", d3.forceCenter(width / 2, height / 2));
```

## Пример добавления новой ветки технологий

```typescript
// В client/src/data/evolution-data.ts добавить в children корневого узла:
{
  name: "Quantum ML",
  description: "Квантовое машинное обучение для торговых систем",
  children: [
    {
      name: "QAOA Trading",
      description: "Quantum Approximate Optimization Algorithm для портфельной оптимизации",
      children: [
        { 
          name: "QAOA Risk Management", 
          description: "Квантовые алгоритмы для управления рисками" 
        }
      ]
    },
    {
      name: "Quantum RL",
      description: "Квантовое обучение с подкреплением",
      children: [
        { 
          name: "VQE Trading", 
          description: "Variational Quantum Eigensolver для поиска оптимальных стратегий" 
        }
      ]
    }
  ]
}
```

После добавления новая ветка автоматически появится в дереве с правильным позиционированием и интерактивностью.