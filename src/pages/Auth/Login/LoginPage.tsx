import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Line } from '../../../components/common/Line';
import { paths } from '../../../constant';
import authService from '../../../services/authServices';
import { SocialAuthButton } from '../Partials/SocialAuthButton';
import './login.scss';
import { FormLogin } from './Partials/FormLogin';

const Login: React.FC = () => {
  const { t } = useTranslation();

  const handleLoginGithub = async () => {
    return await authService.loginGithub();
  };

  return (
    <div className="login__page-container">
      <div className="heading">
        <div className="title">{t('Login')}</div>

        <div className="sub-title">{t('LoginDescription')}</div>
      </div>

      <div className="content">
        <div className="method__social">
          <SocialAuthButton social="github" eventClick={handleLoginGithub} />
        </div>

        <div className="or">
          <Line />
          <div className="or-text">{t('OR')}</div>
          <Line />
        </div>

        <div className="main__content">
          <FormLogin />

          <div className="other">
            <span>
              {t('YouDontHaveAccount')}
              <Link to={`${paths.auth}/${paths.emailRegister}`}>
                {t('Register')}
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
