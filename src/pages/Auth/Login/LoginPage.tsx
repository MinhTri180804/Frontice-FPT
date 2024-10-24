import { Link } from 'react-router-dom';
import { Line } from '../../../components/common/Line';
import { paths } from '../../../constant';
import { SocialAuthButton } from '../Partials/SocialAuthButton';
import './login.scss';
import { FormLogin } from './Partials/FormLogin';

const Login: React.FC = () => {
  const handleLoginGoogle = () => {
    console.log('login google');
  };

  const handleLoginGithub = () => {
    console.log('login github');
  };

  return (
    <div className="login__page-container">
      <div className="heading">
        <div className="title">Sign In Account</div>

        <div className="sub-title">
          Enter your email and password to login application
        </div>
      </div>

      <div className="content">
        <div className="method__social">
          <SocialAuthButton social="google" eventClick={handleLoginGoogle} />
          <SocialAuthButton social="github" eventClick={handleLoginGithub} />
        </div>

        <div className="or">
          <Line />
          <div className="or-text">or</div>
          <Line />
        </div>

        <div className="main__content">
          <FormLogin />

          <div className="other">
            <span>
              You don't have an account yet?
              <Link to={`${paths.auth}/${paths.register}`}>Register</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
