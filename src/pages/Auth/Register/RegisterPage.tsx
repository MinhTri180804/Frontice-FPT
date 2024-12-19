import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { paths } from '../../../constant';
import { FormRegister } from './Partials/FormRegister';
import './registerPage.scss';

const Register: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="register__page-container">
      <div className="heading">
        <div className="title">{t('SignUpAccount')}</div>

        <div className="sub-title">
          {t('EnterYourPersonalDataToCreateYourAccount')}
        </div>
      </div>

      <div className="content">
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
