import { ArrowLeftEndOnRectangleIcon } from '@heroicons/react/24/outline';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { BrandWhiteLogo } from '../../../../../assets/logos/locals';
import { Button } from '../../../../common';
import './authWelcome.scss';

const AuthWelcome: FC = () => {
  // TODO: add feature render title, message, and step based on route url
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handlePreviousPage = () => {
    navigate(-1);
  };

  return (
    <div className="auth__welcome-container">
      <div className="content">
        <div className="heading">
          <div className="logo">
            <img src={BrandWhiteLogo} alt="frontice logo" />
          </div>

          <div className="content">
            <div className="title">Get Started with Us</div>
            <div className="message">
              complete these easy steps to login your account
            </div>
          </div>
        </div>
        {/* <div className="steps">
          <StepProcess
            stepNumber={1}
            stepContent="Enter your account email"
            isActive={true}
          />
          <StepProcess
            stepNumber={2}
            stepContent="Go to application"
            isActive={false}
          />
        </div> */}
      </div>

      <div className="actions">
        <div className="back__previous-page">
          <Button
            className="btn__previous-page--custom"
            label={t('Button.Authentication.BackPrevious')}
            iconPosition="left"
            Icon={() => (
              <ArrowLeftEndOnRectangleIcon
                width={16}
                height={16}
                color="#5250F7"
              />
            )}
            styleType="primary"
            buttonSize="medium"
            onClick={handlePreviousPage}
          />
        </div>
      </div>
    </div>
  );
};

export default AuthWelcome;
