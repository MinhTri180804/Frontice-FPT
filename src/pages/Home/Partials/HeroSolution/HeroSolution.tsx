import { useNavigate } from 'react-router-dom';
import { solutionSVG } from '../../../../assets/images';
import { Button } from '../../../../components/common';
import './heroSolution.scss';
import { FC } from 'react';
import { paths } from '../../../../constant';
import { useTranslation } from 'react-i18next';

const HeroSolution: FC = () => {
  const navigate = useNavigate();
  const handleButtonSolution = () => {
    navigate(`${paths.solutions}`);
  };
  const {t} = useTranslation();
  return (
    <div className="hero__solution-component">
      <div className="image">
        <img src={solutionSVG} alt="" />
      </div>

      <div className="actions">
        <Button
          onClick={handleButtonSolution}
          styleType="secondary"
          label={t('Button.Solutions')}
          buttonSize="normal"
        />
      </div>
    </div>
  );
};

export default HeroSolution;
