import './challenge.scss';
import { FC } from 'react';
import Button from '../Button';
// import TagChallenge from '../TagChallenge';
import ChallengeTechnical from '../ChallengeTechnical';
import ChallengeLevelDifficulty from '../ChallengeLevelDifficulty';
import { useNavigate } from 'react-router-dom';
import { paths } from '../../../constant';
import { IChallengeEntity } from '../../../types/entity';

interface IChallengeProps {
  challengeData: IChallengeEntity;
}

const Challenge: FC<IChallengeProps> = ({ challengeData }) => {
  const navigate = useNavigate();

  const handleClickViewDetails = () => {
    navigate(`${paths.challengeDetails}/${challengeData.id}`);
  };

  return (
    <div className="challenge__component-container">
      <div className="banner">
        <img src={challengeData.image} alt="" />
        <div className="tag__challenge-list">
          {/* {tags.map((tag, index) => (
            <TagChallenge key={`${tag.value}-${index}`} type={tag.value} />
          ))} */}
        </div>
      </div>

      <div className="content">
        <div className="heading">
          <div className="heading-name">{challengeData.title}</div>
          <div className="heading-technical">
            {challengeData.technical.map((technical, index) => (
              <ChallengeTechnical
                technicalValue={technical}
                key={`${technical}-${index}`}
              />
            ))}
          </div>
        </div>

        <div className="overview">
          <div className="score">
            <span className="value">{challengeData.point}</span>
            <span className="label">Score</span>
          </div>
          <ChallengeLevelDifficulty
            level={challengeData.level}
            difficulty={challengeData.requiredPoint}
          />
        </div>

        <div className="description">
          <span>{challengeData.shortDes}</span>
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
