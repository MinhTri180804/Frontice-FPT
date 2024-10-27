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
import { useQuery } from '@tanstack/react-query';
import { paths } from '../../../../../../constant';
import solutionService from '../../../../../../services/solutionService';

interface ISolutionOverview extends HTMLProps<HTMLDivElement> {
  solutionId: string;
}

const SolutionOverview: FC<ISolutionOverview> = ({ className, solutionId }) => {
  const { data: solutionData, isPending: pendingSolutionData } = useQuery({
    queryKey: [paths.QUERY_KEY.solution, solutionId],
    queryFn: async () => {
      const response = await solutionService.getDetails({ solutionId });
      const responseData = response.data.data;
      return responseData;
    },
  });

  const solutionOverviewComponentClass = classNames(
    'solution__overview-component',
    className,
  );

  if (pendingSolutionData) {
    return <div className="solution__overview-skeleton"></div>;
  }

  return (
    solutionData && (
      <div className={solutionOverviewComponentClass}>
        <div className="information__solution">
          <div className="image__solution">
            <img src={solutionData?.challenge.image} alt="" />
          </div>

          <div className="about_-solution">
            <div className="time-submit">
              Submitted about {solutionData?.submitedAt}
            </div>

            <div className="technical__list">
              {solutionData?.challenge.technical.map((technical, index) => (
                <ChallengeTechnical
                  key={`${index}`}
                  technicalValue={technical}
                />
              ))}
            </div>

            <div className="name">{solutionData?.title}</div>

            <div className="score-levelDifficulty">
              <div className="score">
                <div className="value">{solutionData?.challenge.point}</div>
                <div className="label">Score</div>
              </div>
              <ChallengeLevelDifficulty
                level={solutionData?.challenge.level}
                difficulty={solutionData?.challenge.requiredPoint}
              />
            </div>

            <div className="statistic__action-solution">
              <div className="action like">
                <IconWrapper>
                  <HandThumbUpIcon width={24} height={24} />
                </IconWrapper>
                <div className="value">{solutionData?.liked}</div>
              </div>
              <div className="action dislike">
                <IconWrapper>
                  <HandThumbDownIcon width={24} height={24} />
                </IconWrapper>
                <div className="value">{solutionData?.disliked}</div>
              </div>
              <div className="action comment">
                <IconWrapper>
                  <ChatBubbleLeftEllipsisIcon width={24} height={24} />
                </IconWrapper>
                <div className="value">{solutionData?.comment}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="content__description-list">
          {solutionData?.description.map((content, index) => (
            <div className="content__description" key={`${index}`}>
              <div className="title">{content.title}</div>
              <div className="description">{content.answer}</div>
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default SolutionOverview;
