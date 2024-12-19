import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { paths } from '../../../constant';
import './login.scss';
import { FormLogin } from './Partials/FormLogin';

const Login: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="login__page-container">
      <div className="heading">
        <div className="title">{t('Login')}</div>

        <div className="sub-title">{t('LoginDescription')}</div>
      </div>

      <div className="content">
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
