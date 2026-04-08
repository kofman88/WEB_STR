import { Navigate, Route, Routes } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { HomePage } from './pages/HomePage';
import { PlatformPage } from './pages/PlatformPage';
import { PricingPage } from './pages/PricingPage';
import { SafetyPage } from './pages/SafetyPage';
import { ContactPage } from './pages/ContactPage';

export default function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/platform" element={<PlatformPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/safety" element={<SafetyPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
