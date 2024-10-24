import './challengeOverview.scss';
import { FC } from 'react';
import Button from '../Button';
import ChallengeLevelDifficulty from '../ChallengeLevelDifficulty';
import ChallengeTechnical from '../ChallengeTechnical';
import TagChallenge from '../TagChallenge';
import ImagePreview from './Partials/ImagePreview/ImagePreview';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface IChallengeOverviewProps {
  name: string;
  technicalList: string[];
  level: string;
  difficulty: string;
  description: string;
  score: string | number;
  peopleParticipated: string | number;
  peopleSubmit: string | number;
  optionsImagePreview: {
    id: string;
    label: string;
    imageUrl: string;
  }[];
  error?: {
    message: string;
    isError: boolean;
  };
}

const ChallengeOverview: FC<IChallengeOverviewProps> = ({
  name,
  technicalList,
  level,
  difficulty,
  description,
  score,
  peopleParticipated,
  peopleSubmit,
  optionsImagePreview,
  error,
}) => {
  return (
    <div className="challenge__overview-component">
      <div className="challenge__about">
        <div className="heading">
          <div className="challenge__tag-list">
            <TagChallenge type="free" />
          </div>
          <div className="challenge__technical-properties">
            <div className="challenge__technical-list">
              {technicalList.map((technical, index) => (
                <ChallengeTechnical
                  key={`${technical}-${index}`}
                  technicalValue={technical}
                />
              ))}
            </div>
            <div className="challenge__properties">
              <ChallengeLevelDifficulty level={level} difficulty={difficulty} />
            </div>
          </div>
        </div>

        <div className="content">
          <div className="challenge__name">{name}</div>
          <div className="challenge__description">{description}</div>
          <div className="challenge__statistic">
            <div className="score">
              <div className="label">Score</div>
              <div className="value">{score}</div>
            </div>
            <div className="people__participated">
              <div className="label">People Participated</div>
              <div className="value">{peopleParticipated}</div>
            </div>
            <div className="people__submit">
              <div className="label">People submit</div>
              <div className="value">{peopleSubmit}</div>
            </div>
          </div>
        </div>
        {Boolean(error) && error?.isError && (
          <div className="error">
            <div className="icon">
              <ExclamationTriangleIcon width={24} height={24} color="white" />
            </div>

            <div className="message">{error?.message}</div>
          </div>
        )}
        <div className="action">
          <Button
            styleType="primary"
            label="Join Challenge"
            buttonSize="normal"
            disabled={Boolean(error) && error?.isError}
          />
        </div>
      </div>
      <div className="challenge__preview">
        <ImagePreview optionsImagePreview={optionsImagePreview} />
      </div>
    </div>
  );
};

export default ChallengeOverview;
