import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { I18nProvider } from './context/I18nContext';
import { ChmConfigProvider } from './context/ChmConfigContext';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <I18nProvider>
        <ChmConfigProvider>
          <App />
        </ChmConfigProvider>
      </I18nProvider>
    </BrowserRouter>
  </React.StrictMode>
);
