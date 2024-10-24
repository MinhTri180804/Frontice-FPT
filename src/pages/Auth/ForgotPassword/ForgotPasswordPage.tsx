import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { FC } from 'react';
import { usePreviousPage } from '../../../hooks';
import './forgotPassword.scss';
import { ForgotPasswordForm } from './Partials/ForgotPasswordForm';

const ForgotPasswordPage: FC = () => {
  const previousPage = usePreviousPage();
  const handlePrevPage = () => {
    previousPage();
  };
  return (
    <div className="forgot__password__page-container">
      <div className="heading">
        <div className="title">forgot password</div>

        <div className="sub-title">Enter your email to find account</div>
      </div>

      <div className="content">
        <div className="main__content">
          <ForgotPasswordForm />

          <div className="other">
            <div onClick={handlePrevPage} className="prev-page">
              <div className="icon">
                <ChevronLeftIcon />
              </div>
              <span>Return to previous page</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
