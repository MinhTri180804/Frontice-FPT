import { FC } from 'react';
import './socialAuthButton.scss';
import { GithubLogo, GoogleLogo } from '../../../../assets/images';

interface ISocialAuthButtonProps {
  social: 'github' | 'google';
  eventClick: () => void;
}

const SocialAuthButton: FC<ISocialAuthButtonProps> = ({
  social,
  eventClick,
}) => {
  const handleClick: () => void = () => {
    eventClick();
  };

  return (
    <button className="social__auth-button" onClick={handleClick}>
      <div className="logo">
        {social === 'github' && <img src={GithubLogo} />}
        {social === 'google' && <img src={GoogleLogo} />}
      </div>
      <div className="name">{social}</div>
    </button>
  );
};

export default SocialAuthButton;
