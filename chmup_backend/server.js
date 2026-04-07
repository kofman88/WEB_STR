const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const config = require('./config');

// Импорт роутов
const authRoutes = require('./routes/auth');
const botsRoutes = require('./routes/bots');
const backtestsRoutes = require('./routes/backtests');
const exchangesRoutes = require('./routes/exchanges');

const app = express();

// Безопасность
app.use(helmet());

// CORS
app.use(cors({
  origin: '*', // В продакшене заменить на конкретный домен
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Сжатие ответов
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100, // максимум 100 запросов с одного IP
  message: { error: 'Слишком много запросов, попробуйте позже' },
});
app.use('/api/', limiter);

// Парсинг JSON
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Логгирование запросов (для dev)
if (config.nodeEnv === 'development') {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  });
}

// Роуты API
app.use('/api/auth', authRoutes);
app.use('/api/bots', botsRoutes);
app.use('/api/backtests', backtestsRoutes);
app.use('/api/exchanges', exchangesRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
});

// Обработка 404
app.use((req, res) => {
  res.status(404).json({ error: 'Маршрут не найден' });
});

// Глобальная обработка ошибок
app.use((err, req, res, next) => {
  console.error('Ошибка сервера:', err.stack);
  
  if (config.nodeEnv === 'development') {
    res.status(500).json({ 
      error: err.message,
      stack: err.stack,
    });
  } else {
    res.status(500).json({ 
      error: 'Внутренняя ошибка сервера',
    });
  }
});

// Запуск сервера
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════╗
║     🚀 CHMUP Backend запущен!                     ║
║     Порт: ${PORT}                                  ║
║     Режим: ${config.nodeEnv.padEnd(12)}                      ║
║                                                   ║
║     API Endpoints:                                ║
║     GET  /api/health       - Проверка статуса     ║
║     POST /api/auth/register - Регистрация        ║
║     POST /api/auth/login    - Вход               ║
║     GET  /api/bots          - Список ботов        ║
║     POST /api/bots          - Создать бота        ║
║     GET  /api/backtests     - Список бэктестов    ║
║     POST /api/backtests     - Создать бэктест     ║
║     GET  /api/exchanges     - Список бирж         ║
╚═══════════════════════════════════════════════════╝
  `);
});

module.exports = app;
