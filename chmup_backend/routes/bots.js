const express = require('express');
const authService = require('../services/authService');
const botService = require('../services/botService');

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

// Получить всех ботов пользователя
router.get('/', authMiddleware, (req, res) => {
  try {
    const bots = botService.getUserBots(req.userId);
    res.json({ bots });
  } catch (error) {
    console.error('Ошибка получения ботов:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Получить статистику по ботам
router.get('/stats', authMiddleware, (req, res) => {
  try {
    const stats = botService.getUserBotsStats(req.userId);
    res.json({ stats });
  } catch (error) {
    console.error('Ошибка получения статистики:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Создать нового бота
router.post('/', authMiddleware, (req, res) => {
  try {
    const botData = req.body;

    if (!botData.name || !botData.exchangeName || !botData.symbol || !botData.strategyType || !botData.positionSizeUsd) {
      return res.status(400).json({ error: 'name, exchangeName, symbol, strategyType и positionSizeUsd обязательны' });
    }

    const bot = botService.createBot(req.userId, botData);
    res.status(201).json({ message: 'Бот успешно создан', bot });
  } catch (error) {
    console.error('Ошибка создания бота:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Получить конкретного бота
router.get('/:id', authMiddleware, (req, res) => {
  try {
    const bot = botService.getBotById(parseInt(req.params.id), req.userId);
    if (!bot) {
      return res.status(404).json({ error: 'Бот не найден' });
    }
    res.json({ bot });
  } catch (error) {
    console.error('Ошибка получения бота:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Обновить бота
router.put('/:id', authMiddleware, (req, res) => {
  try {
    const updates = req.body;
    const bot = botService.updateBot(parseInt(req.params.id), req.userId, updates);
    res.json({ message: 'Бот успешно обновлен', bot });
  } catch (error) {
    console.error('Ошибка обновления бота:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Активировать/деактивировать бота
router.patch('/:id/toggle', authMiddleware, (req, res) => {
  try {
    const { isActive } = req.body;
    if (typeof isActive !== 'boolean') {
      return res.status(400).json({ error: 'isActive должен быть boolean' });
    }
    const bot = botService.toggleBot(parseInt(req.params.id), req.userId, isActive);
    res.json({ message: `Бот ${isActive ? 'активирован' : 'деактивирован'}`, bot });
  } catch (error) {
    console.error('Ошибка переключения бота:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Получить историю сделок бота
router.get('/:id/trades', authMiddleware, (req, res) => {
  try {
    const trades = botService.getBotTrades(parseInt(req.params.id), req.userId);
    res.json({ trades });
  } catch (error) {
    console.error('Ошибка получения сделок:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Удалить бота
router.delete('/:id', authMiddleware, (req, res) => {
  try {
    const success = botService.deleteBot(parseInt(req.params.id), req.userId);
    if (!success) {
      return res.status(404).json({ error: 'Бот не найден' });
    }
    res.json({ message: 'Бот успешно удален' });
  } catch (error) {
    console.error('Ошибка удаления бота:', error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
