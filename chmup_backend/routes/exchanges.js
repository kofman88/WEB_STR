const express = require('express');
const authService = require('../services/authService');
const exchangeService = require('../services/exchangeService');

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

// Получить список поддерживаемых бирж
router.get('/exchanges', (req, res) => {
  try {
    const exchanges = exchangeService.getSupportedExchanges();
    res.json({ exchanges });
  } catch (error) {
    console.error('Ошибка получения бирж:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Получить торговые пары для биржи
router.get('/exchanges/:name/pairs', async (req, res) => {
  try {
    const pairs = await exchangeService.getTradingPairs(req.params.name);
    res.json({ pairs });
  } catch (error) {
    console.error('Ошибка получения торговых пар:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Получить цену для символа
router.get('/exchanges/:name/price', async (req, res) => {
  try {
    const { symbol } = req.query;
    if (!symbol) {
      return res.status(400).json({ error: 'Параметр symbol обязателен' });
    }
    const priceData = await exchangeService.getPrice(req.params.name, symbol);
    res.json({ priceData });
  } catch (error) {
    console.error('Ошибка получения цены:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Получить баланс на бирже (требуется авторизация)
router.get('/balance/:exchangeName', authMiddleware, async (req, res) => {
  try {
    const balance = await exchangeService.getBalance(req.userId, req.params.exchangeName);
    res.json({ balance });
  } catch (error) {
    console.error('Ошибка получения баланса:', error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
