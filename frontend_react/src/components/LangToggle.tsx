import { useState } from 'react';
import { useI18n } from '../context/I18nContext';

export function LangToggle() {
  const { lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);

  return (
    <div className="lang-wrap">
      <button aria-expanded={open} aria-haspopup="true" onClick={() => setOpen((v) => !v)} className="btn-press">
        🌐 {lang.toUpperCase()}
      </button>
      {open && (
        <div className="lang-menu" onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}>
          <button onClick={() => { setLang('ru'); setOpen(false); }}>Русский (RU)</button>
          <button onClick={() => { setLang('en'); setOpen(false); }}>English (EN)</button>
        </div>
      )}
    </div>
  );
}
