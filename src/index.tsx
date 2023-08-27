import ReactDOM from 'react-dom/client';
import { initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import './assets/styles/main.scss';
import AnimatedRoutes from './cmps/AnimatedRoutes';
import AppFooter from './cmps/AppFooter';
import AppHeader from './cmps/AppHeader';
import en from './i18n/locales/en/translation.json';
import he from './i18n/locales/he/translation.json';
import { persistor, store } from './store/store';
import i18n from 'i18next'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en
      },
      he: {
        translation: he
      }
    },
    lng: 'en',
    fallbackLng: 'eng',
    interpolation: {
      escapeValue: false
    }
  })

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <div className="main-container">
          <AppHeader />
          <AnimatedRoutes />
          <AppFooter />
        </div>
      </Router>
    </PersistGate>
  </Provider>
)
