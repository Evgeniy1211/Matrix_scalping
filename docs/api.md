# API Documentation

## Overview

The Matrix_scalping project provides a REST API for accessing unified technology and trading data. All data is served from the single source of truth located in `backend/data/`.

## Base URL

```
http://localhost:5000/api
```

## Endpoints

### Technologies

#### `GET /api/technologies`

Returns the complete database of trading technologies.

**Response:** Array of technology objects

```json
[
  {
    "id": "random-forest",
    "name": "Random Forest",
    "fullName": "Random Forest Ensemble",
    "description": "Алгоритм машинного обучения, использующий ансамбль решающих деревьев для классификации и регрессии",
    "category": "ml",
    "periods": {
      "start": 2001,
      "peak": 2015,
      "decline": 2020
    },
    "evolution": {
      "predecessors": ["decision-trees"],
      "successors": ["transformer"],
      "variants": ["extra-trees"]
    },
    "applicableModules": ["signalGeneration", "featureEngineering"],
    "advantages": [...],
    "disadvantages": [...],
    "useCases": [...],
    "sources": [...]
  }
]
```

**Count:** 17 technologies

### Evolution Data

#### `GET /api/evolution-data`

Returns the base evolution matrix data.

**Response:** Object with modules array

```json
{
  "modules": [
    {
      "name": "Сбор данных",
      "revisions": {
        "rev1": { "tech": "", "period": "empty", "desc": "" },
        "rev2": { "tech": "", "period": "empty", "desc": "" }
        // ... rev3, rev4, rev5
      }
    }
  ]
}
```

#### `GET /api/evolution-data/integrated`

Returns evolution data integrated with technology database.

#### `GET /api/evolution-data/dynamic`

Returns dynamic matrix representation with technology details.

### Tree Data

#### `GET /api/tree-data`

Returns hierarchical tree structure for D3.js visualization.

**Response:** Tree node object

```json
{
  "name": "ML",
  "description": "Машинное обучение - основа современных торговых систем",
  "children": [
    {
      "name": "Traditional ML",
      "description": "Классические алгоритмы машинного обучения",
      "children": [...]
    }
  ]
}
```

### Trading Machines

#### `GET /api/trading-machines`

Returns trading machine case studies.

**Response:** Array of trading case objects

```json
[
  {
    "id": "random-forest-scalper",
    "name": "Random Forest Scalper",
    "period": "2015-2017",
    "author": "Chan et al.",
    "description": "Простая торговая машина для скальпинга на основе Random Forest",
    "strategy": "Скальпинг с предсказанием направления движения цены",
    "timeframe": "1 минута",
    "marketType": "Криптовалюты (BTC/USDT)",
    "technologies": [...],
    "modules": {...},
    "performance": {...}
  }
]
```

### Modules

#### `GET /api/modules`

Returns trading system modules.

**Response:** Array of module objects

**Count:** 8 modules

## Data Sources

All API endpoints serve data from:

- `backend/data/technologies.ts` - Technology database
- `backend/data/evolution-data.ts` - Evolution matrix and tree
- `backend/data/trading-machines.ts` - Trading case studies
- `backend/data/modules/` - Module definitions

## Validation

Use the data validation script to ensure consistency:

```bash
npm run lint-data
```

This validates:

- File structure integrity
- API endpoint functionality
- Data consistency across sources
- Required technologies presence

## Schema

Type definitions are available in `backend/knowledge-base/schema.ts` and can be imported as `@shared/schema`.
