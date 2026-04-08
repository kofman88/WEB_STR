import { createContext, useContext, useMemo, useState } from 'react';
import { translations, type Dict, type Lang } from '../data/translations';

type I18nCtx = { lang: Lang; t: Dict; toggleLang: () => void; setLang: (l: Lang) => void };
const Ctx = createContext<I18nCtx | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>((localStorage.getItem('chm_lang') as Lang) || 'ru');
  const setLang = (l: Lang) => { setLangState(l); localStorage.setItem('chm_lang', l); document.documentElement.lang = l; };
  const toggleLang = () => setLang(lang === 'ru' ? 'en' : 'ru');
  const value = useMemo(() => ({ lang, t: translations[lang], toggleLang, setLang }), [lang]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useI18n() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('I18nContext missing');
  return ctx;
}
