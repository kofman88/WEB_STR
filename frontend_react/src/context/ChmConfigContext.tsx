import { createContext, useContext } from 'react';
import { strategies } from '../data/strategies';
import type { Plan } from '../data/plans';

const Ctx = createContext({ currentPlan: 'pro' as Plan, strategies, stats: { pnl: '+18.4%', winrate: '63%', trades: 1240 } });

export function ChmConfigProvider({ children }: { children: React.ReactNode }) {
  return <Ctx.Provider value={{ currentPlan: 'pro', strategies, stats: { pnl: '+18.4%', winrate: '63%', trades: 1240 } }}>{children}</Ctx.Provider>;
}

export const useChmConfig = () => useContext(Ctx);
