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

const SolutionDetails: React.FC = () => {
  const { profile } = useAuthStore();
  const navigate = useNavigate();
  const { solutionId } = useParams();

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
      return responseData;
    },
  });

  const handleLikeAction = () => {
    console.log('like action');
  };

  const handleDislikeAction = () => {
    console.log('dislike action');
  };

  return (
    <>
      {!isPending && solutionDetailsData ? (
        <Action
          urlGithub={solutionDetailsData.github}
          urlLiveGithub={solutionDetailsData.liveGithub}
        />
      ) : (
        <div className="actions__skeleton">
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}

      <div className="container-solution-details">
        {!isPending && solutionDetailsData ? (
          <>
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
                  <div className="action-like" onClick={handleLikeAction}>
                    <div className="like">
                      <HandThumbUpIcon />
                      like
                    </div>
                    <div className="quantity">
                      {solutionDetailsData?.liked || 0}
                    </div>
                  </div>
                  <div className="action-dislike" onClick={handleDislikeAction}>
                    <div className="dislike">
                      <HandThumbDownIcon />
                      dislike
                    </div>
                    <div className="quantity">
                      {solutionDetailsData?.disliked || 0}
                    </div>
                  </div>
                  <div className="action-comment">
                    <div className="comment">
                      <ChatBubbleLeftEllipsisIcon />
                      comment
                    </div>
                    <div className="quantity">
                      {solutionDetailsData?.comment}
                    </div>
                  </div>
                </div>
              </div>

              <section className="questions__list">
                {solutionDetailsData?.description.map(
                  (questionAnswer, index) => (
                    <QuestionAnswer
                      key={`${index}`}
                      questionAnswerData={questionAnswer}
                    />
                  ),
                )}
              </section>
            </div>
          </>
        ) : (
          <div className="solution__details-skeleton"></div>
        )}
        <SectionAuthorInformation
          className="author__information-section"
          username={solutionDetailsData?.taskee.username.split('/')[0] || ''}
        />
      </div>
    </>
  );
};
export default SolutionDetails;
