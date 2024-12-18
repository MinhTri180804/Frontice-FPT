import { Link } from 'react-router-dom';
import { Line } from '../../../components/common/Line';
import { paths } from '../../../constant';
import { SocialAuthButton } from '../Partials/SocialAuthButton';
import { FormRegister } from './Partials/FormRegister';
import './registerPage.scss';

const Register: React.FC = () => {
  const handleRegisterGithub = () => {
    console.log('Register github');
  };

  return (
    <div className="register__page-container">
      <div className="heading">
        <div className="title">Sign Up Account</div>

        <div className="sub-title">
          Enter your personal data to create your account
        </div>
      </div>

      <div className="content">
        <div className="method__social">
          <SocialAuthButton social="github" eventClick={handleRegisterGithub} />
        </div>

        <div className="or">
          <Line />
          <div className="or-text">or</div>
          <Line />
        </div>

        {/*TODO: Create then implement form component in here */}
        <div className="main__content">
          <FormRegister />

          <div className="other">
            <span>
              Already have an account?
              <Link to={`${paths.auth}/${paths.login}`}>Login</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
