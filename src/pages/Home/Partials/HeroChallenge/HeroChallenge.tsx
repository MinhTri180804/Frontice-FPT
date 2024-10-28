import { useNavigate } from 'react-router-dom';
import { challengeSVG } from '../../../../assets/images';
import { Button } from '../../../../components/common';
import './HeroChallenge.scss';
import { FC } from 'react';
import { paths } from '../../../../constant';
import { useTranslation } from 'react-i18next';

const HeroChallenge: FC = () => {
  const navigate = useNavigate();
  const handleButtonChallenges = () => {
    navigate(`${paths.challenges}`);
  };
  const { t } = useTranslation();
  return (
    <div className="hero__challenge-component">
      <div className="image">
        <img src={challengeSVG} alt="" />
      </div>

      <div className="actions">
        <Button
          onClick={handleButtonChallenges}
          styleType="secondary"
          label={t('Button.Challenges')}
          buttonSize="normal"
        />
      </div>
    </div>
  );
};

export default HeroChallenge;
