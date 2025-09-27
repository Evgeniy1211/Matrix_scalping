# Установка и запуск (Windows/Linux)

Требования:

- Node.js 18+ (проверьте: `node -v`)
- npm 9+ (проверьте: `npm -v`)

## Windows (PowerShell)

```powershell
# Клонирование
git clone https://github.com/Evgeniy1211/Matrix_scalping.git
cd Matrix_scalping

# Установка зависимостей
npm install

# Запуск разработки
npm run dev
# Откройте <http://127.0.0.1:5000>
```

Примечания Windows:

- Переменная NODE_ENV ставится автоматически в скриптах через `set NODE_ENV=...`
- Сервер слушает 127.0.0.1 (см. `index.ts`)

## Linux/macOS (bash)

```bash
# Клонирование
git clone https://github.com/Evgeniy1211/Matrix_scalping.git
cd Matrix_scalping

# Установка зависимостей
npm install

# Запуск разработки
NODE_ENV=development npm run dev
# Откройте <http://127.0.0.1:5000>
```

## Сборка и продакшен

```bash
npm run build
npm start
# Сервер на <http://127.0.0.1:5000>
```

## Частые проблемы

- Порт занят: освободите 5000 или задайте `PORT=5001`
- Ошибки типов: запустите `npm run check`
- Пустой экран в dev: проверьте логи сервера и консоль браузера

## Переменные окружения (.env)

Проект читает переменные окружения из файла `.env` (загружается автоматически через `dotenv/config` в `index.ts` и `drizzle.config.ts`). Шаблон — `.env.example` в корне репозитория.

Скопируйте шаблон и настройте значения:

```powershell
# Windows PowerShell
Copy-Item .env.example .env
```

```bash
# Linux/macOS
cp .env.example .env
```

Ключевые переменные:

- PORT — порт HTTP-сервера Express (по умолчанию 5000)
- NODE_ENV — среда выполнения (development/production), в скриптах npm задаётся автоматически
- DATABASE_URL — строка подключения Postgres (обязательно для `drizzle-kit`), см. примеры в `.env.example`
- REPL_ID — опционально, включает Replit Cartographer плагин в Vite при наличии

Примечания:

- Файлы `.env`, `.env.local` игнорируются Git
- На Windows скрипты уже выставляют `NODE_ENV`, менять вручную не требуется
