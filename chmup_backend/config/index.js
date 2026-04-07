require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'default-secret-change-in-production',
  databasePath: process.env.DATABASE_PATH || './data/chmup.db',
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // Настройки бирж
  exchanges: {
    bybit: {
      apiKey: process.env.BYBIT_API_KEY || '',
      apiSecret: process.env.BYBIT_API_SECRET || '',
    },
    bingx: {
      apiKey: process.env.BINGX_API_KEY || '',
      apiSecret: process.env.BINGX_API_SECRET || '',
    },
    binance: {
      apiKey: process.env.BINANCE_API_KEY || '',
      apiSecret: process.env.BINANCE_API_SECRET || '',
    },
  },
};
