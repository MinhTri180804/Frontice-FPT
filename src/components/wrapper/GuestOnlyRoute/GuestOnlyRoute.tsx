import { FC, ReactNode } from 'react';
import { useAuthStore } from '../../../store/authStore';
import { Navigate, useLocation } from 'react-router-dom';
import { paths } from '../../../constant';

interface IGuestOnlyRouteProps {
  children: ReactNode;
}

const GuestOnlyRoute: FC<IGuestOnlyRouteProps> = ({ children }) => {
  const { isAuthentication, profile } = useAuthStore();
  const location = useLocation();
  const REDIRECT_TO = location.state?.previousPage
    ? location.state?.previousPage
    : paths.notfound;

  if (profile && isAuthentication) {
    return <Navigate to={REDIRECT_TO} />;
  }

  return children;
};

export default GuestOnlyRoute;
