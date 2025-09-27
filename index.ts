import 'dotenv/config';

import express, { type NextFunction, type Request, type Response } from 'express';

import { registerRoutes } from './backend/routes';
import { log, serveStatic, setupVite } from './backend/vite';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: unknown | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  } as typeof res.json;

  res.on('finish', () => {
    const duration = Date.now() - start;
    if (path.startsWith('/api')) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse !== undefined) {
        try {
          logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
        } catch {
          // JSON.stringify may throw on circular structures; ignore
          void 0;
        }
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + '…';
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    let status = 500;
    let message = 'Internal Server Error';

    if (typeof err === 'object' && err !== null) {
      const maybe = err as { status?: unknown; statusCode?: unknown; message?: unknown };
      if (typeof maybe.status === 'number') status = maybe.status;
      else if (typeof maybe.statusCode === 'number') status = maybe.statusCode;
      if (typeof maybe.message === 'string') message = maybe.message;
    } else if (typeof err === 'string') {
      message = err;
    }

    res.status(status).json({ message });
    throw err;
  });

  // Choose mode based on NODE_ENV instead of Express env for reliability on Windows
  const nodeEnv = process.env.NODE_ENV ?? 'development';
  const isDev = nodeEnv !== 'production';
  log(`NODE_ENV=${nodeEnv}`, 'env');

  // Only setup Vite in development and after other routes
  if (isDev) {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || '5000', 10);
  server.listen(
    {
      port,
      host: '127.0.0.1', // Изменено с 0.0.0.0 на localhost для Windows
      reusePort: false, // Отключаем reusePort для Windows
    },
    () => {
      log(`serving on port ${port}`);
    }
  );
})();
