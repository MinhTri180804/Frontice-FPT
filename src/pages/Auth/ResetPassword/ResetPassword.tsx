import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { FC } from 'react';
import { usePreviousPage } from '../../../hooks';
import './resetPassword.scss';
import { ResetPasswordForm } from './Partials/ResetPasswordForm';
import { Navigate, useLocation } from 'react-router-dom';
import { paths } from '../../../constant';
import { useTranslation } from 'react-i18next';

const ResetPasswordPage: FC = () => {
  const previousPage = usePreviousPage();
  const location = useLocation();
  const resetToken = location.state?.resetToken ?? null;
  const emailResetPassword = location.state?.emailResetPassword ?? null;
  const { t } = useTranslation();

  if (!resetToken) {
    return <Navigate to={`${paths.auth}/${paths.login}`} />;
  }

  const handlePrevPage = () => {
    // TODO: Implement handle open popup warning if checkout reset password page
    previousPage();
  };
  return (
    <div className="reset__password__page-container">
      <div className="heading">
        <div className="title">{t('ResetPassword')}</div>

        <div className="sub-title">
          {t('EnterYourNewPasswordToResetPasswordToAccount')}
        </div>
      </div>

      <div className="content">
        {/*TODO: Create then implement form component in here */}
        <div className="main__content">
          <ResetPasswordForm
            emailResetPassword={emailResetPassword}
            tokenResetPassword={resetToken}
          />

          <div className="other">
            <div onClick={handlePrevPage} className="prev-page">
              <div className="icon">
                <ChevronLeftIcon />
              </div>
              <span>{t('ReturnToPreviousPage')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
