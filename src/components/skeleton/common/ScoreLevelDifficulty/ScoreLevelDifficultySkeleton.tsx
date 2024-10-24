import './scoreLevelDifficultySkeleton.scss';
import { FC } from 'react';

const ScoreLevelDifficultySkeleton: FC = () => {
  return (
    <div className="score-levelDifficulty__skeleton">
      <div className="score"></div>

      <div className="level-difficulty"></div>
    </div>
  );
};

export default ScoreLevelDifficultySkeleton;
