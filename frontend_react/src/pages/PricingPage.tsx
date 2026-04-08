import { plans } from '../data/plans';
import { useI18n } from '../context/I18nContext';
import { Button } from '../components/Button';

export function PricingPage() {
  const { t } = useI18n();
  return (
    <main className="container stack">
      <h1>{t.pricing.title}</h1>
      <section className="grid3">
        {plans.map((p) => (
          <article key={p.key} className="glass plan-card reveal">
            <h3>{t.pricing[p.key]}</h3>
            <p className="price">{p.price}/mo</p>
            <ul>{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
            <Button>{t.pricing.cta}</Button>
          </article>
        ))}
      </section>
    </main>
  );
}
