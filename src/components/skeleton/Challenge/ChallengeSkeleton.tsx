import {
  ButtonSkeleton,
  DescriptionSkeleton,
  ScoreLevelDifficultySkeleton,
} from '../common';
import './challengeSkeleton.scss';
import { FC } from 'react';

const ChallengeSkeleton: FC = () => {
  return (
    <div className="challenge-skeleton">
      <div className="image"></div>

      <div className="content">
        <div className="name"></div>
        <div className="technical_list">
          <div className="item"></div>
          <div className="item"></div>
        </div>

        <ScoreLevelDifficultySkeleton />
        <DescriptionSkeleton />
        <ButtonSkeleton />
      </div>
    </div>
  );
};

export default ChallengeSkeleton;
