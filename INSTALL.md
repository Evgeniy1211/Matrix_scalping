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
