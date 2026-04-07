const express = require('express');
const authService = require('../services/authService');
const backtestService = require('../services/backtestService');

const router = express.Router();

// Middleware для проверки авторизации
const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Токен не предоставлен' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = authService.verifyToken(token);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

// Получить все бэктесты пользователя
router.get('/', authMiddleware, (req, res) => {
  try {
    const backtests = backtestService.getUserBacktests(req.userId);
    res.json({ backtests });
  } catch (error) {
    console.error('Ошибка получения бэктестов:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Получить статистику по бэктестам
router.get('/stats', authMiddleware, (req, res) => {
  try {
    const stats = backtestService.getUserBacktestsStats(req.userId);
    res.json({ stats });
  } catch (error) {
    console.error('Ошибка получения статистики:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Создать новый бэктест
router.post('/', authMiddleware, (req, res) => {
  try {
    const backtestData = req.body;

    if (!backtestData.name || !backtestData.symbol || !backtestData.exchangeName || 
        !backtestData.timeframe || !backtestData.startDate || !backtestData.endDate || !backtestData.initialCapital) {
      return res.status(400).json({ 
        error: 'name, symbol, exchangeName, timeframe, startDate, endDate и initialCapital обязательны' 
      });
    }

    const backtest = backtestService.createBacktest(req.userId, backtestData);
    res.status(201).json({ message: 'Бэктест успешно создан', backtest });
  } catch (error) {
    console.error('Ошибка создания бэктеста:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Получить конкретный бэктест
router.get('/:id', authMiddleware, (req, res) => {
  try {
    const backtest = backtestService.getBacktestById(parseInt(req.params.id), req.userId);
    if (!backtest) {
      return res.status(404).json({ error: 'Бэктест не найден' });
    }
    res.json({ backtest });
  } catch (error) {
    console.error('Ошибка получения бэктеста:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Удалить бэктест
router.delete('/:id', authMiddleware, (req, res) => {
  try {
    const success = backtestService.deleteBacktest(parseInt(req.params.id), req.userId);
    if (!success) {
      return res.status(404).json({ error: 'Бэктест не найден' });
    }
    res.json({ message: 'Бэктест успешно удален' });
  } catch (error) {
    console.error('Ошибка удаления бэктеста:', error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
