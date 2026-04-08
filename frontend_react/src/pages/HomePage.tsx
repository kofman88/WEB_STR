import { BannerCard } from '../components/BannerCard';
import { HeroWheel } from '../components/HeroWheel';
import { useI18n } from '../context/I18nContext';
import { useGsapReveal } from '../hooks/useGsapReveal';

export function HomePage() {
  const { t } = useI18n();
  useGsapReveal();
  return (
    <main className="container stack">
      <HeroWheel />
      <section className="reveal">
        <h2>{t.home.aboutTitle}</h2>
        <p>{t.home.aboutText}</p>
      </section>
      <section className="grid3">
        <BannerCard title={t.home.traders} text="Ручной и полуавтоматический трейдинг" />
        <BannerCard title={t.home.investors} text="Портфельный подход и контроль риска" />
        <BannerCard title={t.home.algos} text="Эксперименты с ботами и фильтрами рынка" />
      </section>
      <section className="grid4 reveal">
        <div className="glass p">{t.home.p1}</div>
        <div className="glass p">{t.home.p2}</div>
        <div className="glass p">{t.home.p3}</div>
        <div className="glass p">{t.home.p4}</div>
      </section>
    </main>
  );
}
