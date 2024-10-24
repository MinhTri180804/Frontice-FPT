import './challenge.scss';
import { FC } from 'react';
import Button from '../Button';
import TagChallenge from '../TagChallenge';
import ChallengeTechnical from '../ChallengeTechnical';
import ChallengeLevelDifficulty from '../ChallengeLevelDifficulty';
import { useNavigate } from 'react-router-dom';
import { paths } from '../../../constant';

interface IChallengeProps {
  bannerUrl: string;
  name: string;
  technicalList: string[];
  score: string | number;
  level: string;
  difficulty: string;
  description: string;
  tags: {
    value: 'premium' | 'free' | 'free++' | 'new';
  }[];
}

const Challenge: FC<IChallengeProps> = ({
  bannerUrl,
  name,
  technicalList,
  score,
  level,
  difficulty,
  description,
  tags,
}) => {
  const navigate = useNavigate();

  const handleClickViewDetails = () => {
    navigate(paths.challengeDetails);
  };
  return (
    <div className="challenge__component-container">
      <div className="banner">
        <img src={bannerUrl} alt="" />
        <div className="tag__challenge-list">
          {tags.map((tag, index) => (
            <TagChallenge key={`${tag.value}-${index}`} type={tag.value} />
          ))}
        </div>
      </div>

      <div className="content">
        <div className="heading">
          <div className="heading-name">{name}</div>
          <div className="heading-technical">
            {technicalList.map((technical, index) => (
              <ChallengeTechnical
                technicalValue={technical}
                key={`${technical}-${index}`}
              />
            ))}
          </div>
        </div>

        <div className="overview">
          <div className="score">
            <span className="value">{score}</span>
            <span className="label">Score</span>
          </div>
          <ChallengeLevelDifficulty level={level} difficulty={difficulty} />
        </div>

        <div className="description">
          <span>{description}</span>
        </div>
      </div>

      <Button
        onClick={handleClickViewDetails}
        label="View Details"
        buttonSize="small"
        styleType="secondary"
      />
    </div>
  );
};

export default Challenge;
