export type Lang = 'ru' | 'en';

export const translations = {
  ru: {
    nav: { home: 'Главная', platform: 'Платформа', pricing: 'Тарифы', safety: 'Безопасность', contact: 'Контакты', connect: 'Подключить биржу' },
    hero: {
      title: 'CHM — автоматизация крипто-торговли и аналитики',
      subtitle: 'Price Action, SMC, скальпинг, байесовский оптимизатор и управление рисками в одном интерфейсе.',
      ctaStart: 'Начать бесплатно',
      ctaExchange: 'Подключить биржу',
      items: ['Автоторговля', 'Аналитика рынка', 'Бэктесты и оптимизация', 'Управление рисками']
    },
    home: {
      aboutTitle: 'О платформе CHM',
      aboutText: 'CHM помогает трейдерам запускать стратегии LEVELS, SMC, GERCHIK и SCALPING на Binance, Bybit и BingX.',
      forWhom: 'Для кого',
      traders: 'Трейдеры', investors: 'Инвесторы', algos: 'Алго-энтузиасты',
      pillars: 'Ключевые принципы', p1: 'Безопасность', p2: 'Прозрачность', p3: 'Статистика', p4: 'Автоматика'
    },
    platform: {
      title: 'Как работает платформа',
      slides: [
        'Автоторговля: Bybit, BingX, Binance',
        'Байесовский оптимизатор и фильтр режимов рынка',
        'Кастомные стратегии и daily loss limit (circuit breaker)'
      ]
    },
    pricing: { title: 'Тарифы CHM', beginner: 'Beginner', pro: 'Pro', elite: 'Elite', cta: 'Выбрать тариф' },
    safety: { title: 'Риски и прозрачность', disclaimer: 'Не является инвестиционной рекомендацией. Торговля сопряжена с рисками.' },
    contact: { title: 'Связаться с нами', send: 'Отправить', tg: 'Telegram', email: 'Email' },
    common: { language: 'Язык', theme: 'Тема', faq: 'FAQ', subscribe: 'Подписаться', added: 'Добавлено в кабинет' }
  },
  en: {
    nav: { home: 'Home', platform: 'Platform', pricing: 'Pricing', safety: 'Safety', contact: 'Contact', connect: 'Connect exchange' },
    hero: {
      title: 'CHM — crypto automation and analytics platform',
      subtitle: 'Price Action, SMC, scalping, Bayesian optimizer and risk management in one UI.',
      ctaStart: 'Start free',
      ctaExchange: 'Connect exchange',
      items: ['Auto-trading', 'Market analytics', 'Backtests & optimization', 'Risk management']
    },
    home: {
      aboutTitle: 'About CHM',
      aboutText: 'CHM helps traders run LEVELS, SMC, GERCHIK and SCALPING strategies on Binance, Bybit and BingX.',
      forWhom: 'For whom',
      traders: 'Traders', investors: 'Investors', algos: 'Algo enthusiasts',
      pillars: 'Core pillars', p1: 'Security', p2: 'Transparency', p3: 'Statistics', p4: 'Automation'
    },
    platform: {
      title: 'How the platform works',
      slides: [
        'Auto-trading: Bybit, BingX, Binance',
        'Bayesian optimizer and market-regime filter',
        'Custom strategies and daily loss limit (circuit breaker)'
      ]
    },
    pricing: { title: 'CHM plans', beginner: 'Beginner', pro: 'Pro', elite: 'Elite', cta: 'Choose plan' },
    safety: { title: 'Risk and transparency', disclaimer: 'Not financial advice. Trading involves risk.' },
    contact: { title: 'Contact us', send: 'Send', tg: 'Telegram', email: 'Email' },
    common: { language: 'Language', theme: 'Theme', faq: 'FAQ', subscribe: 'Subscribe', added: 'Added to dashboard' }
  }
} as const;

export type Dict = (typeof translations)['ru'];
