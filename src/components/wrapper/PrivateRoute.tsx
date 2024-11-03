import React from 'react';
import { NotFoundPage } from '../../pages/ErrorPage/NotFound';
import { useAuthStore } from '../../store/authStore';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthentication, profile } = useAuthStore();
  // const location = useLocation();
  // const REDIRECT_TO = location.state?.previousPage
  //   ? location.state?.previousPage
  //   : paths.notfound;

  if (!profile || !isAuthentication) {
    return <NotFoundPage />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
