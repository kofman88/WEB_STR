const express = require('express');
const authService = require('../services/authService');

const router = express.Router();

// Регистрация
router.post('/register', (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email и пароль обязательны' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Пароль должен быть не менее 6 символов' });
    }

    const result = authService.register(email, password);
    
    res.status(201).json({
      message: 'Пользователь успешно зарегистрирован',
      userId: result.userId,
      email: result.email,
    });
  } catch (error) {
    console.error('Ошибка регистрации:', error.message);
    res.status(400).json({ error: error.message });
  }
});

// Вход
router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email и пароль обязательны' });
    }

    const result = authService.login(email, password);
    
    res.json({
      message: 'Успешный вход',
      ...result,
    });
  } catch (error) {
    console.error('Ошибка входа:', error.message);
    res.status(401).json({ error: error.message });
  }
});

// Получение текущего пользователя (защищенный маршрут)
router.get('/me', (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Токен не предоставлен' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = authService.verifyToken(token);
    const user = authService.getUserById(decoded.userId);

    res.json({ user });
  } catch (error) {
    console.error('Ошибка получения пользователя:', error.message);
    res.status(401).json({ error: error.message });
  }
});

module.exports = router;
