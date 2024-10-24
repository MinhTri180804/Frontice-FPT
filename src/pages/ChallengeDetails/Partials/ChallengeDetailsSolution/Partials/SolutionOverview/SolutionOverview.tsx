import {
  ChatBubbleLeftEllipsisIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
} from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { FC, HTMLProps } from 'react';
import {
  ChallengeLevelDifficulty,
  ChallengeTechnical,
} from '../../../../../../components/common';
import { IconWrapper } from '../../../../../../components/wrapper';
import './solutionOverview.scss';

interface IDescriptionOfSolution {
  title: string;
  description: string;
}

interface ISolutionData {
  timeSubmit: string;
  imageUrl: string;
  name: string;
  score: string | number;
  level: string;
  difficulty: string;
  technicalList: string[];
  like: string | number;
  dislike: string | number;
  comment: string | number;
  contentDescription: IDescriptionOfSolution[];
}

interface ISolutionOverview extends HTMLProps<HTMLDivElement> {
  solutionData: ISolutionData;
}

const SolutionOverview: FC<ISolutionOverview> = ({
  solutionData,
  className,
}) => {
  const {
    timeSubmit,
    imageUrl,
    name,
    score,
    level,
    difficulty,
    technicalList,
    like,
    dislike,
    comment,
    contentDescription,
  } = solutionData;

  const solutionOverviewComponentClass = classNames(
    'solution__overview-component',
    className,
  );
  return (
    <div className={solutionOverviewComponentClass}>
      <div className="information__solution">
        <div className="image__solution">
          <img src={imageUrl} alt="" />
        </div>

        <div className="about_-solution">
          <div className="time-submit">Submitted about {timeSubmit}</div>

          <div className="technical__list">
            {technicalList.map((technical, index) => (
              <ChallengeTechnical key={`${index}`} technicalValue={technical} />
            ))}
          </div>

          <div className="name">{name}</div>

          <div className="score-levelDifficulty">
            <div className="score">
              <div className="value">{score}</div>
              <div className="label">Score</div>
            </div>
            <ChallengeLevelDifficulty level={level} difficulty={difficulty} />
          </div>

          <div className="statistic__action-solution">
            <div className="action like">
              <IconWrapper>
                <HandThumbUpIcon width={24} height={24} />
              </IconWrapper>
              <div className="value">{like}</div>
            </div>
            <div className="action dislike">
              <IconWrapper>
                <HandThumbDownIcon width={24} height={24} />
              </IconWrapper>
              <div className="value">{dislike}</div>
            </div>
            <div className="action comment">
              <IconWrapper>
                <ChatBubbleLeftEllipsisIcon width={24} height={24} />
              </IconWrapper>
              <div className="value">{comment}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="content__description-list">
        {contentDescription.map((content, index) => (
          <div className="content__description" key={`${index}`}>
            <div className="title">{content.title}</div>
            <div className="description">{content.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SolutionOverview;
