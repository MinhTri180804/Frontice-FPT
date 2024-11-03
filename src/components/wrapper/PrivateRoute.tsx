import React from 'react';
import { useAuthStore } from '../../store/authStore';
import UnauthorizedPage from '../../pages/ErrorPage/Unauthorized';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthentication, profile } = useAuthStore();

  if (!profile || !isAuthentication) {
    return <UnauthorizedPage />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
