import './challengeLevelDifficulty.scss';
import { FC } from 'react';

interface IChallengeLevelDifficultyProps {
  difficulty: string | number;
  level: string;
}

const ChallengeLevelDifficulty: FC<IChallengeLevelDifficultyProps> = ({
  difficulty,
  level,
}) => {
  return (
    <div className="challenge__levelDifficulty-component">
      <div className="difficulty">{difficulty}</div>
      <div className="level">{level}</div>
    </div>
  );
};

export default ChallengeLevelDifficulty;
