import React from 'react';
import { Outlet, RouteObject } from 'react-router-dom';
import { AppLayout } from '../components/layout/app';
import { AuthLayout } from '../components/layout/auth';
import { paths } from '../constant';
import {
  ChallengeDetailsPage,
  HomePage,
  NotFoundPage,
  SubmitSolutionPage,
} from '../pages';
import {
  ForgotPasswordPage,
  LoginPage,
  RegisterPage,
  ResetPasswordPage,
} from '../pages/Auth';
import OtpPage from '../pages/Auth/OTP/OtpPage';

const ProfilePage = React.lazy(() => import('../pages/Profile'));
const SolutionDetailsPage = React.lazy(
  () => import('../pages/SolutionDetails'),
);
const ChallengesPage = React.lazy(() => import('../pages/Challenges'));
const SolutionsPage = React.lazy(() => import('../pages/Solutions'));
const StatisticPage = React.lazy(() => import('../pages/Statistic'));
const RecruiterCompanyPage = React.lazy(
  () => import('../pages/RecruiterCompany'),
);
const SettingsProfilePage = React.lazy(
  () => import('../pages/SettingsProfilePage'),
);

const extendedRoutes: RouteObject[] = [
  {
    index: true,
    path: paths.home,
    element: <HomePage />,
  },
  {
    path: paths.profile,
    element: <ProfilePage />,
  },
  {
    path: paths.setting,
    element: <SettingsProfilePage />,
  },
  {
    path: paths.solutionDetails,
    element: <SolutionDetailsPage />,
  },
  {
    path: paths.challenges,
    element: <ChallengesPage />,
  },
  {
    path: paths.solutions,
    element: <SolutionsPage />,
  },
  {
    path: paths.statistic,
    element: <StatisticPage />,
  },
  {
    path: paths.recruiterCompany,
    element: <RecruiterCompanyPage />,
  },

  {
    path: paths.submitSolution,
    element: <SubmitSolutionPage />,
  },

  {
    path: `${paths.challengeDetails}/:challengeId`,
    element: <ChallengeDetailsPage />,
  },
];

const extendedRoutesAuth: RouteObject[] = [
  {
    index: true,
    path: paths.login,
    element: <LoginPage />,
  },
  {
    path: paths.register,
    element: <RegisterPage />,
  },
  {
    path: paths.otp,
    element: <OtpPage />,
  },
  {
    path: paths.forgotPassword,
    element: <ForgotPasswordPage />,
  },
  {
    path: paths.resetPassword,
    element: <ResetPasswordPage />,
  },
];

const routes: RouteObject[] = [
  {
    path: paths.default,
    element: (
      <AppLayout>
        <Outlet />
      </AppLayout>
    ),
    children: [
      ...extendedRoutes,
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
  {
    path: paths.auth,
    element: <AuthLayout />,
    children: [
      ...extendedRoutesAuth,
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
];

export default routes;
