const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const db = require('../models/database');
const config = require('../config');

class AuthService {
  // Регистрация пользователя
  register(email, password) {
    const existingUser = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
    if (existingUser) {
      throw new Error('Пользователь с таким email уже существует');
    }

    const passwordHash = bcrypt.hashSync(password, 10);
    
    const stmt = db.prepare(`
      INSERT INTO users (email, password_hash) VALUES (?, ?)
    `);
    
    const result = stmt.run(email, passwordHash);
    
    return {
      userId: result.lastInsertRowid,
      email,
    };
  }

  // Вход пользователя
  login(email, password) {
    const user = db.prepare('SELECT * FROM users WHERE email = ? AND is_active = 1').get(email);
    if (!user) {
      throw new Error('Неверный email или пароль');
    }

    const isValid = bcrypt.compareSync(password, user.password_hash);
    if (!isValid) {
      throw new Error('Неверный email или пароль');
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      config.jwtSecret,
      { expiresIn: '7d' }
    );

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        telegramId: user.telegram_id,
      },
    };
  }

  // Проверка токена
  verifyToken(token) {
    try {
      return jwt.verify(token, config.jwtSecret);
    } catch (err) {
      throw new Error('Неверный или истекший токен');
    }
  }

  // Получение пользователя по ID
  getUserById(userId) {
    const user = db.prepare('SELECT id, email, telegram_id, created_at FROM users WHERE id = ?').get(userId);
    if (!user) {
      throw new Error('Пользователь не найден');
    }
    return user;
  }
}

module.exports = new AuthService();
