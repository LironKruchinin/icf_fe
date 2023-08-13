import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './assets/styles/main.scss';
import AnimatedRoutes from './cmps/AnimatedRoutes';
import AppHeader from './cmps/AppHeader';
import { Provider } from 'react-redux';
import { store, persistor } from './store/store';
import AppFooter from './cmps/AppFooter';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <AppHeader />
        <AnimatedRoutes />
        <AppFooter />
      </Router>
    </PersistGate>
  </Provider>
)
