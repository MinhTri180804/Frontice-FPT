import React, { useEffect } from 'react';
import './app.scss';
import { QueryProvider, Router, ToastHandler } from './components/wrapper';
import './configs/i18n';
import { paths } from './constant';
import { useAuthStore } from './store/authStore';
import { checkAuthentication } from './utils/helper';
import { getInfo } from './utils/localstorage';

const App: React.FC = () => {
  const { login, logout } = useAuthStore();
  useEffect(() => {
    const checkAuth = checkAuthentication();
    if (checkAuth) {
      const info = getInfo();
      if (info) {
        login(info);
      }
    } else {
      logout();
    }
  }, []);
  return (
    <div className="app-container">
      <QueryProvider>
        <ToastHandler>
          <Router defaultRoute={paths.home} />
        </ToastHandler>
      </QueryProvider>
    </div>
  );
};

export default App;
