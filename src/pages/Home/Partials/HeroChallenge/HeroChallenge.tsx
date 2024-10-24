import { useNavigate } from 'react-router-dom';
import { challengeSVG } from '../../../../assets/images';
import { Button } from '../../../../components/common';
import './HeroChallenge.scss';
import { FC } from 'react';
import { paths } from '../../../../constant';

const HeroChallenge: FC = () => {
  const navigate = useNavigate();
  const handleButtonChallenges = () => {
    navigate(`${paths.challenges}`);
  };
  return (
    <div className="hero__challenge-component">
      <div className="image">
        <img src={challengeSVG} alt="" />
      </div>

      <div className="actions">
        <Button
          onClick={handleButtonChallenges}
          styleType="secondary"
          label="Challenges"
          buttonSize="normal"
        />
      </div>
    </div>
  );
};

export default HeroChallenge;
