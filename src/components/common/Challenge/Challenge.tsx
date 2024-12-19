import './challenge.scss';
import { FC } from 'react';
import Button from '../Button';
// import TagChallenge from '../TagChallenge';
import ChallengeTechnical from '../ChallengeTechnical';
import ChallengeLevelDifficulty from '../ChallengeLevelDifficulty';
import { useNavigate } from 'react-router-dom';
import { paths } from '../../../constant';
import { IChallengeEntity } from '../../../types/entity';
import TagChallenge from '../TagChallenge';
import { useTranslation } from 'react-i18next';

interface IChallengeProps {
  challengeData: IChallengeEntity;
}

const Challenge: FC<IChallengeProps> = ({ challengeData }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleClickViewDetails = () => {
    navigate(`${paths.challengeDetails}/${challengeData.id}`);
  };

  return (
    <div className="challenge__component-container">
      <div className="banner">
        <img src={challengeData.image} alt="" />
        <div className="tag__challenge-list">
          {challengeData.premium && <TagChallenge type={'premium'} />}
          {!challengeData.premium && <TagChallenge type={'free'} />}
          <TagChallenge type={'new'} />
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
            <span className="label">{t('Score')}</span>
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
        label={t('ViewDetails.Text')}
        buttonSize="small"
        styleType="secondary"
      />
    </div>
  );
};

export default Challenge;
