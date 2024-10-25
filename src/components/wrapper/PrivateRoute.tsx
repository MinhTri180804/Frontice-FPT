import React from 'react';
import { paths } from '../../constant';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthentication, profile } = useAuthStore();
  const location = useLocation();
  const REDIRECT_TO = location.state?.previousPage
    ? location.state?.previousPage
    : paths.home;
  if (profile && isAuthentication) {
    return <Navigate to={REDIRECT_TO} />;
    return;
  }

  return <>{children}</>;
};

export default PrivateRoute;
