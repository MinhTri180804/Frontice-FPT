import './SolutionDifficulty.scss';
import { FC } from 'react';

interface ISolutionDifficultyProps {
  difficulty: string;
  level: string;
}

const SolutionLevelDifficulty: FC<ISolutionDifficultyProps> = ({
  difficulty,
  level,
}) => {
  return (
    <div className="solution__levelDifficulty-component">
      <div className="difficulty">{difficulty}</div>
      <div className="level">{level}</div>
    </div>
  );
};

export default SolutionLevelDifficulty;
