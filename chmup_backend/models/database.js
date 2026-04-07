const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');
const config = require('../config');

// Создаем директорию для БД если не существует
const dbDir = path.dirname(config.databasePath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new Database(config.databasePath);

// Включаем внешний ключ
db.pragma('foreign_keys = ON');

// Инициализация таблиц
db.exec(`
  -- Пользователи
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    telegram_id TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT 1
  );

  -- API ключи пользователей для бирж
  CREATE TABLE IF NOT EXISTS exchange_keys (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    exchange_name TEXT NOT NULL,
    api_key TEXT NOT NULL,
    api_secret_encrypted TEXT NOT NULL,
    is_testnet BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE(user_id, exchange_name)
  );

  -- Торговые боты пользователей
  CREATE TABLE IF NOT EXISTS trading_bots (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    exchange_name TEXT NOT NULL,
    symbol TEXT NOT NULL,
    strategy_type TEXT NOT NULL,
    leverage INTEGER DEFAULT 1,
    position_size_usd REAL NOT NULL,
    stop_loss_pct REAL,
    take_profit_pct REAL,
    trailing_stop BOOLEAN DEFAULT 0,
    is_active BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  -- Бэктесты
  CREATE TABLE IF NOT EXISTS backtests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    symbol TEXT NOT NULL,
    exchange_name TEXT NOT NULL,
    timeframe TEXT NOT NULL,
    start_date TEXT NOT NULL,
    end_date TEXT NOT NULL,
    initial_capital REAL NOT NULL,
    strategy_config TEXT,
    status TEXT DEFAULT 'pending',
    results TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    completed_at DATETIME,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  -- История сделок ботов
  CREATE TABLE IF NOT EXISTS bot_trades (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    bot_id INTEGER NOT NULL,
    trade_type TEXT NOT NULL,
    entry_price REAL,
    exit_price REAL,
    quantity REAL,
    pnl REAL,
    pnl_pct REAL,
    opened_at DATETIME,
    closed_at DATETIME,
    status TEXT DEFAULT 'open',
    FOREIGN KEY (bot_id) REFERENCES trading_bots(id) ON DELETE CASCADE
  );

  -- Сигналы от сканеров
  CREATE TABLE IF NOT EXISTS signals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    symbol TEXT NOT NULL,
    exchange_name TEXT NOT NULL,
    signal_type TEXT NOT NULL,
    direction TEXT NOT NULL,
    entry_price REAL,
    target_price REAL,
    stop_loss REAL,
    confidence REAL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    expires_at DATETIME
  );

  -- Индексы для производительности
  CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
  CREATE INDEX IF NOT EXISTS idx_exchange_keys_user ON exchange_keys(user_id);
  CREATE INDEX IF NOT EXISTS idx_trading_bots_user ON trading_bots(user_id);
  CREATE INDEX IF NOT EXISTS idx_backtests_user ON backtests(user_id);
  CREATE INDEX IF NOT EXISTS idx_bot_trades_bot ON bot_trades(bot_id);
  CREATE INDEX IF NOT EXISTS idx_signals_symbol ON signals(symbol);
`);

console.log('✅ База данных инициализирована:', config.databasePath);

module.exports = db;
