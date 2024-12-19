import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { FC } from 'react';
import { usePreviousPage } from '../../../hooks';
import './forgotPassword.scss';
import { ForgotPasswordForm } from './Partials/ForgotPasswordForm';
import { useTranslation } from 'react-i18next';

const ForgotPasswordPage: FC = () => {
  const { t } = useTranslation();
  const previousPage = usePreviousPage();
  const handlePrevPage = () => {
    previousPage();
  };
  return (
    <div className="forgot__password__page-container">
      <div className="heading">
        <div className="title">{t('ForgotPasswordText')}</div>

        <div className="sub-title">{t('EnterYourEmailToFindAccount')}</div>
      </div>

      <div className="content">
        <div className="main__content">
          <ForgotPasswordForm />

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

export default ForgotPasswordPage;
