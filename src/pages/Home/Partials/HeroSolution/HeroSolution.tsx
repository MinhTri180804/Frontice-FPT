import { useNavigate } from 'react-router-dom';
import { solutionSVG } from '../../../../assets/images';
import { Button } from '../../../../components/common';
import './heroSolution.scss';
import { FC } from 'react';
import { paths } from '../../../../constant';

const HeroSolution: FC = () => {
  const navigate = useNavigate();
  const handleButtonSolution = () => {
    navigate(`${paths.solutions}`);
  };
  return (
    <div className="hero__solution-component">
      <div className="image">
        <img src={solutionSVG} alt="" />
      </div>

      <div className="actions">
        <Button
          onClick={handleButtonSolution}
          styleType="secondary"
          label="Solutions"
          buttonSize="normal"
        />
      </div>
    </div>
  );
};

export default HeroSolution;
