import { useI18n } from '../context/I18nContext';

export function SafetyPage() {
  const { t } = useI18n();
  return (
    <main className="container stack">
      <h1>{t.safety.title}</h1>
      <article className="glass p reveal">
        <p>{t.safety.disclaimer}</p>
        <p>CHM использует прозрачную статистику и контроль рисков, включая лимиты потерь и журнал действий ботов.</p>
      </article>
    </main>
  );
}
