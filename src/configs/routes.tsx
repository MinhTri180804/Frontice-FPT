import React from 'react';
import { Outlet, RouteObject } from 'react-router-dom';
import { AppLayout } from '../components/layout/app';
import { AuthLayout } from '../components/layout/auth';
import GuestOnlyRoute from '../components/wrapper/GuestOnlyRoute';
import { paths } from '../constant';
import {
  ChallengeDetailsPage,
  HomePage,
  MySolutionPage,
  SubmitSolutionPage,
  TasksPage,
} from '../pages';
import {
  ForgotPasswordPage,
  LoginPage,
  RegisterPage,
  ResetPasswordPage,
} from '../pages/Auth';
import OtpPage from '../pages/Auth/OTP/OtpPage';
import { NotFoundPage } from '../pages/ErrorPage/NotFound';
import PrivateRoute from '../components/wrapper/PrivateRoute';

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

const extendRoutesPrivate: RouteObject[] = [
  {
    path: paths.profile,
    element: (
      <PrivateRoute>
        <ProfilePage />
      </PrivateRoute>
    ),
  },
  {
    path: paths.setting,
    element: (
      <PrivateRoute>
        <SettingsProfilePage />
      </PrivateRoute>
    ),
  },
  {
    path: `${paths.solutionDetails}/:solutionId`,
    element: (
      <PrivateRoute>
        <SolutionDetailsPage />
      </PrivateRoute>
    ),
  },
  {
    path: paths.solutions,
    element: (
      <PrivateRoute>
        <SolutionsPage />
      </PrivateRoute>
    ),
  },
  {
    path: paths.statistic,
    element: (
      <PrivateRoute>
        <StatisticPage />
      </PrivateRoute>
    ),
  },
  {
    path: paths.submitSolution,
    element: (
      <PrivateRoute>
        <SubmitSolutionPage />
      </PrivateRoute>
    ),
  },
  {
    path: paths.mySolutions,
    element: (
      <PrivateRoute>
        <MySolutionPage />
      </PrivateRoute>
    ),
  },
  {
    path: paths.tasks,
    element: (
      <PrivateRoute>
        <TasksPage />
      </PrivateRoute>
    ),
  },
];

const extendedRoutesPublic: RouteObject[] = [
  {
    index: true,
    path: paths.home,
    element: <HomePage />,
  },
  {
    path: paths.challenges,
    element: <ChallengesPage />,
  },
  {
    path: paths.recruiterCompany,
    element: <RecruiterCompanyPage />,
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
      ...extendedRoutesPublic,
      ...extendRoutesPrivate,
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
  {
    path: paths.auth,
    element: (
      <GuestOnlyRoute>
        <AuthLayout />
      </GuestOnlyRoute>
    ),
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
