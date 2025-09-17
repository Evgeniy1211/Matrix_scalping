
# Backend Documentation

## 🖥️ Обзор бэкенда

Минimalистичный Express.js сервер, который обслуживает статические файлы фронтенда и предоставляет API endpoints для будущих функций.

## 🏗️ Архитектура бэкенда

### Технологический стек
- **Express.js** - веб-сервер
- **TypeScript** - типизация
- **Drizzle ORM** - работа с базой данных
- **Neon Database** - PostgreSQL сервер
- **Zod** - валидация данных

### Структура файлов
```
server/
├── index.ts        # Главный файл сервера
├── routes.ts       # API маршруты
├── storage.ts      # Работа с базой данных
└── vite.ts         # Интеграция с Vite

shared/
└── schema.ts       # Общие типы и схемы
```

## 🚀 Запуск сервера

### Главный файл - `server/index.ts`
```typescript
const app = express();
const port = parseInt(process.env.PORT || '5000', 10);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
await registerRoutes(app);

// Development/Production setup
if (app.get("env") === "development") {
  await setupVite(app, server);
} else {
  serveStatic(app);
}

server.listen({ port, host: "0.0.0.0" });
```

## 🛣️ API Маршруты

### Текущие endpoints
```typescript
// В server/routes.ts
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Placeholder для будущих API
app.get("/api/technologies", async (req, res) => {
  // TODO: Возвращать технологии из БД
});

app.get("/api/cases", async (req, res) => {
  // TODO: Возвращать кейсы из БД
});
```

### Планируемые endpoints
- `GET /api/technologies` - получить список технологий
- `POST /api/technologies` - добавить новую технологию
- `GET /api/cases` - получить кейсы торговых машин
- `POST /api/cases` - добавить новый кейс
- `GET /api/evolution-data` - получить данные матрицы

## 🗄️ База данных

### Настройка Drizzle ORM
```typescript
// drizzle.config.ts
export default {
  schema: "./shared/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
};
```

### Схема данных
```typescript
// shared/schema.ts
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").unique().notNull(),
  password: text("password").notNull(),
});

// Планируемые таблицы
export const technologies = pgTable("technologies", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  category: text("category"),
  period: text("period"),
});

export const tradingCases = pgTable("trading_cases", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  period: text("period"),
  technologies: json("technologies"),
});
```

## 🔧 Middleware

### Логирование запросов
```typescript
app.use((req, res, next) => {
  const start = Date.now();
  
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (req.path.startsWith("/api")) {
      log(`${req.method} ${req.path} ${res.statusCode} in ${duration}ms`);
    }
  });
  
  next();
});
```

### Обработка ошибок
```typescript
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  
  res.status(status).json({ message });
  throw err;
});
```

## 🔄 Development vs Production

### Development режим
- **Vite интеграция** - hot reload для фронтенда
- **Proxy API** - проксирование запросов к серверу
- **Source maps** - для отладки

### Production режим
- **Статические файлы** - обслуживание собранного фронтенда
- **Gzip сжатие** - оптимизация передачи данных
- **Безопасность** - настройки для продакшена

## 🌐 Интеграция с Vite

### Development setup
```typescript
// server/vite.ts
if (app.get("env") === "development") {
  const vite = await createViteDevServer({
    server: { middlewareMode: true },
    appType: "spa",
  });
  
  app.use(vite.ssrFixStacktrace);
  app.use("*", vite.middlewares);
}
```

### Production serving
```typescript
// Обслуживание статических файлов
app.use(express.static(path.join(__dirname, "client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/dist/index.html"));
});
```

## 🔐 Безопасность

### Конфигурация портов
- **Порт 5000** - основной порт приложения
- **Host 0.0.0.0** - доступ извне (Replit требование)
- **Запрещенные порты** - 22, 443 (зарезервированы)

### Переменные окружения
```bash
# .env файл
DATABASE_URL=postgresql://...
NODE_ENV=development
PORT=5000
```

## 📈 Мониторинг и логи

### Логирование
- **API запросы** - автоматическое логирование с timing
- **Ошибки** - детальная информация об ошибках
- **Производительность** - время ответа для каждого запроса

### Health check
```typescript
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});
```

## 🚀 Deployment

### Replit конфигурация
- **Автоматический запуск** через npm run dev
- **Проброс портов** на порт 5000
- **Переменные окружения** через Replit Secrets

### Build процесс
```bash
# Сборка фронтенда
npm run build

# Запуск продакшен сервера
NODE_ENV=production node server/index.js
```

## 🔮 Планы развития

### Ближайшие задачи
- [ ] Миграция данных из статических файлов в БД
- [ ] API для управления технологиями
- [ ] Аутентификация и авторизация
- [ ] Валидация входящих данных

### Долгосрочные цели
- [ ] GraphQL API для сложных запросов
- [ ] Real-time обновления через WebSocket
- [ ] Кэширование с Redis
- [ ] Аналитика и метрики использования
