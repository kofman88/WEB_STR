import { useI18n } from '../context/I18nContext';
import { Button } from '../components/Button';

export function ContactPage() {
  const { t } = useI18n();
  return (
    <main className="container stack">
      <h1>{t.contact.title}</h1>
      <form className="glass form reveal">
        <input placeholder="Имя" aria-label="Имя" />
        <input placeholder="Email" aria-label="Email" />
        <textarea placeholder="Сообщение" aria-label="Сообщение" rows={4} />
        <Button>{t.contact.send}</Button>
      </form>
      <div className="row gap">
        <a href="#">{t.contact.tg}: @chm_support</a>
        <a href="mailto:hello@chm.finance">{t.contact.email}: hello@chm.finance</a>
      </div>
    </main>
  );
}
