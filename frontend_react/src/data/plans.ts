export type Plan = 'beginner' | 'pro' | 'elite';

export const plans = [
  { key: 'beginner' as const, price: '$19', features: ['2 стратегии', 'Автоторговля', 'Алерты'] },
  { key: 'pro' as const, price: '$49', features: ['Все стратегии', 'Бэктесты', 'Фильтр режимов рынка', 'Daily loss limit'] },
  { key: 'elite' as const, price: '$99', features: ['Polymarket-модуль', 'Кастомные правила', 'Приоритетная поддержка'] }
];
