import './challengeIncomplete.scss';
import { FC, HTMLProps } from 'react';
import {
  ChallengeLevelDifficulty,
  ChallengeTechnical,
} from '../../../../components/common';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { paths } from '../../../../constant';

interface IChallengeIncompleteProps extends HTMLProps<HTMLDivElement> {
  technicalList: string[];
  name: string;
  level: string;
  difficulty: string | number;
  score: string | number;
  imageURL: string;
}

const ChallengeIncomplete: FC<IChallengeIncompleteProps> = ({
  technicalList,
  name,
  level,
  difficulty,
  score,
  imageURL,
  className,
}) => {
  const challengeIncompleteClass = classNames(
    'challenge__incomplete-component',
    className,
  );
  // TODO: Implement redirect challenge details based id challenge
  return (
    <Link to={paths.challengeDetails} className={challengeIncompleteClass}>
      <div className="image">
        <img src={imageURL} alt="" />
      </div>

      <div className="about">
        <div className="technical__list">
          {technicalList.map((technical, index) => (
            <ChallengeTechnical technicalValue={technical} key={`${index}`} />
          ))}
        </div>
        <div className="name">{name}</div>
        <ChallengeLevelDifficulty level={level} difficulty={difficulty} />
        <div className="score">
          <div className="value">{score}</div>
          <div className="label">Score</div>
        </div>
      </div>
    </Link>
  );
};

export default ChallengeIncomplete;
