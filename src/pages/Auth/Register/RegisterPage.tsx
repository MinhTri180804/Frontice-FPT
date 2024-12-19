import { Link } from 'react-router-dom';
import { Line } from '../../../components/common/Line';
import { paths } from '../../../constant';
import { SocialAuthButton } from '../Partials/SocialAuthButton';
import { FormRegister } from './Partials/FormRegister';
import './registerPage.scss';
import { useTranslation } from 'react-i18next';

const Register: React.FC = () => {
  const { t } = useTranslation();
  const handleRegisterGithub = () => {
    console.log('Register github');
  };

  return (
    <div className="register__page-container">
      <div className="heading">
        <div className="title">{t('SignUpAccount')}</div>

        <div className="sub-title">
          {t('EnterYourPersonalDataToCreateYourAccount')}
        </div>
      </div>

      <div className="content">
        <div className="method__social">
          <SocialAuthButton social="github" eventClick={handleRegisterGithub} />
        </div>

        <div className="or">
          <Line />
          <div className="or-text">{t('OR')}</div>
          <Line />
        </div>

        {/*TODO: Create then implement form component in here */}
        <div className="main__content">
          <FormRegister />

          <div className="other">
            <span>
              {t('AlreadyHaveAnAccount')}
              <Link to={`${paths.auth}/${paths.login}`}>{t('LoginText')}</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
