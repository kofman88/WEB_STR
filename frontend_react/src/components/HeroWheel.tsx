import { useI18n } from '../context/I18nContext';
import { useHeroWheel } from '../hooks/useHeroWheel';
import { Button } from './Button';

export function HeroWheel() {
  const { t } = useI18n();
  const { active, setActive, rotate, wheel } = useHeroWheel(t.hero.items);

  return (
    <section className="hero reveal">
      <div>
        <h1>{t.hero.title}</h1>
        <p>{t.hero.subtitle}</p>
        <div className="row gap">
          <Button>{t.hero.ctaExchange}</Button>
          <Button className="ghost">{t.hero.ctaStart}</Button>
        </div>
      </div>
      <div className="wheel-wrap glass">
        <div className="wheel">
          {wheel.map((item, idx) => (
            <button key={item.name} className={`wheel-item ${item.active ? 'active' : ''}`} onClick={() => setActive(idx)}>
              {item.name}
            </button>
          ))}
        </div>
        <div className="row gap mt">
          <Button onClick={() => rotate(-1)}>←</Button>
          <Button onClick={() => rotate(1)}>→</Button>
        </div>
        <p className="muted">{wheel[active].name}</p>
      </div>
    </section>
  );
}
