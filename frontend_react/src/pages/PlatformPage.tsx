import { useI18n } from '../context/I18nContext';
import { useGsapReveal } from '../hooks/useGsapReveal';

export function PlatformPage() {
  const { t } = useI18n();
  useGsapReveal();
  return (
    <main className="container stack">
      <h1 className="reveal">{t.platform.title}</h1>
      <section className="horizontal reveal">
        {t.platform.slides.map((s) => <article key={s} className="panel glass banner-press">{s}</article>)}
      </section>
      <section className="reveal">
        <p>DAILY_MAX_LOSS_R circuit breaker отключает автоторговлю при превышении лимита убытка за день.</p>
      </section>
    </main>
  );
}
