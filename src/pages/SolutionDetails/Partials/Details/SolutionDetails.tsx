import {
  ChatBubbleLeftEllipsisIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
} from '@heroicons/react/24/outline';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { ChallengeTechnical } from '../../../../components/common';
import { paths } from '../../../../constant';
import solutionService from '../../../../services/solutionService';
import { useAuthStore } from '../../../../store/authStore';
import { QuestionAnswer } from './Partials';
import SectionAuthorInformation from './Partials/SectionAuthorInformation/SectionAuthorInformation';
import './SolutionDetails.scss';
import Action from '../Action';
import { useState } from 'react';
import classNames from 'classnames';
import { ConditionWrapper } from '../../../../components/wrapper';

const SolutionDetails: React.FC = () => {
  const { profile } = useAuthStore();
  const navigate = useNavigate();
  const { solutionId } = useParams();
  const [isLike, setIsLike] = useState<boolean>(false);
  const [isDislike, setIsDislike] = useState<boolean>(false);

  if (!solutionId) {
    // TODO: Implement page 404 for customer
    navigate(paths.home);
  }

  if (!profile) {
    // TODO: Implement redirect to page alert message authentication for customer
    navigate(paths.home);
  }

  const { data: solutionDetailsData, isPending } = useQuery({
    queryKey: [solutionId],
    queryFn: async () => {
      const response = await solutionService.getDetails({
        solutionId: solutionId as string,
      });

      const responseData = response.data.data;
      setIsLike(responseData.isLike);
      setIsDislike(responseData.isDislike);
      return responseData;
    },
  });

  const likeActionClass = classNames('action-like', {
    active: !isDislike && isLike,
  });
  const dislikeActionClass = classNames('action-dislike', {
    active: isDislike && !isLike,
  });

  const handleLikeAction = () => {
    if (isDislike) {
      setIsDislike(false);
    }
    setIsLike(!isLike);
  };

  const handleDislikeAction = () => {
    if (isLike) {
      setIsLike(false);
    }
    setIsDislike(!isDislike);
  };

  const handleClickComments = () => {
    const element = document.getElementById('feedback-solution');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <ConditionWrapper
        condition={!isPending && Boolean(solutionDetailsData)}
        fallback={() => {
          return (
            <div className="actions__skeleton">
              <div></div>
              <div></div>
            </div>
          );
        }}
      >
        <Action
          urlGithub={solutionDetailsData?.github as string}
          urlLiveGithub={solutionDetailsData?.liveGithub as string}
        />
      </ConditionWrapper>

      <div className="container-solution-details">
        <ConditionWrapper
          condition={!isPending && Boolean(solutionDetailsData)}
          fallback={() => {
            return <div className="solution__details-skeleton"></div>;
          }}
        >
          <div className="summary-component">
            <div className="header">
              <p>Submitted about {solutionDetailsData?.submitedAt}</p>
              <h1>{solutionDetailsData?.title}</h1>
              <div className="tech">
                {solutionDetailsData?.challenge.technical.map(
                  (technical, index) => (
                    <ChallengeTechnical
                      technicalValue={technical}
                      key={`${index}`}
                    />
                  ),
                )}
              </div>
            </div>

            <div className="interaction-buttons">
              <div className="action">
                <div className={likeActionClass} onClick={handleLikeAction}>
                  <div className="like">
                    <HandThumbUpIcon />
                    like
                  </div>
                  <div className="quantity">
                    {solutionDetailsData?.liked || 0}
                  </div>
                </div>
                <div
                  className={dislikeActionClass}
                  onClick={handleDislikeAction}
                >
                  <div className="dislike">
                    <HandThumbDownIcon />
                    dislike
                  </div>
                  <div className="quantity">
                    {solutionDetailsData?.disliked || 0}
                  </div>
                </div>
                <div className="action-comment" onClick={handleClickComments}>
                  <div className="comment">
                    <ChatBubbleLeftEllipsisIcon />
                    comment
                  </div>
                  <div className="quantity">{solutionDetailsData?.comment}</div>
                </div>
              </div>
            </div>

            <section className="questions__list">
              {solutionDetailsData?.description.map((questionAnswer, index) => (
                <QuestionAnswer
                  key={`${index}`}
                  questionAnswerData={questionAnswer}
                />
              ))}
            </section>
          </div>
        </ConditionWrapper>
        <SectionAuthorInformation
          className="author__information-section"
          username={solutionDetailsData?.taskee.username.split('/')[0] || ''}
        />
      </div>
    </>
  );
};
export default SolutionDetails;
