import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './assets/styles/main.scss';
import AnimatedRoutes from './cmps/AnimatedRoutes';
import AppHeader from './cmps/AppHeader';
import { Provider } from 'react-redux';
import store from './store/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <Provider store={store}>
    <Router>
      <AppHeader />
      <AnimatedRoutes />
    </Router>
  </Provider>
)
