import { NavLink } from 'react-router-dom';
import { useI18n } from '../context/I18nContext';
import { LangToggle } from './LangToggle';

export function NavBar() {
  const { t } = useI18n();
  return (
    <header className="topbar">
      <div className="container row between">
        <NavLink to="/" className="logo">CHM</NavLink>
        <nav className="row gap">
          <NavLink to="/">{t.nav.home}</NavLink>
          <NavLink to="/platform">{t.nav.platform}</NavLink>
          <NavLink to="/pricing">{t.nav.pricing}</NavLink>
          <NavLink to="/safety">{t.nav.safety}</NavLink>
          <NavLink to="/contact">{t.nav.contact}</NavLink>
        </nav>
        <div className="row gap">
          <LangToggle />
        </div>
      </div>
    </header>
  );
}
