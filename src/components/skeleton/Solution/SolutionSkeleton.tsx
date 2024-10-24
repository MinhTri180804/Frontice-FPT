import { DescriptionSkeleton, ScoreLevelDifficultySkeleton } from '../common';
import './solutionSkeleton.scss';
import { FC } from 'react';

const SolutionSkeleton: FC = () => {
  return (
    <div className="solution__skeleton">
      <div className="image"></div>
      <div className="content">
        <section className="about">
          <div className="time__submit"></div>
          <div className="name"></div>
          <div className="technical__list">
            <div className="value"></div>
            <div className="value"></div>
          </div>
          <ScoreLevelDifficultySkeleton />
        </section>

        <section className="author__information"></section>

        <section className="content__description">
          <div className="title"></div>
          <DescriptionSkeleton />
        </section>

        <section className="content__description">
          <div className="title"></div>
          <DescriptionSkeleton />
        </section>

        <section className="actions">
          <div className="action"></div>
          <div className="action"></div>
          <div className="action"></div>
        </section>
      </div>
    </div>
  );
};

export default SolutionSkeleton;
