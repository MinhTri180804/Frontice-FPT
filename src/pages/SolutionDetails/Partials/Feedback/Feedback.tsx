import { useQuery } from '@tanstack/react-query';
import { emptyComment } from '../../../../assets/images';
import IComment from '../../../../components/common/Comment';
import EmptyComponent from '../../../../components/common/Empty/Empty';
import { CommentSkeleton } from '../../../../components/skeleton/Comment';
import { ConditionWrapper } from '../../../../components/wrapper';
import { paths } from '../../../../constant';
import solutionService from '../../../../services/solutionService';
import useSelfCommentsStore from '../../../../store/seftCommentsStore';
import Comment from '../Comments';
import { SelfComments } from '../SeftComments';
import './Feedback.scss';
import { useTranslation } from 'react-i18next';

interface IFeedbackProps {
  solutionId: string;
}

const Feedback: React.FC<IFeedbackProps> = ({ solutionId }) => {
  const { t } = useTranslation();
  const selfComments = useSelfCommentsStore((state) => state.comments);
  const { data: commentsData, isPending: pendingOfComments } = useQuery({
    queryKey: [paths.QUERY_KEY.commentsOfSolution, solutionId],
    queryFn: async () => {
      const response = await solutionService.getAllComment({
        solutionId,
      });

      const responseData = response.data;
      return responseData;
    },
  });

  return (
    <>
      <div className="container-feedback" id="feedback-solution">
        <div className="header">
          <h1>Feedback </h1>
          <div className="action">
            <div className="mentor">Mentor</div>
            <div className="other">Other</div>
          </div>
        </div>
        <div className="list-feedback">
          <div className="input-feedback">
            <div>Comment</div>
            <IComment solutionId={solutionId} />
          </div>
          <div className="list">
            <ConditionWrapper
              condition={!pendingOfComments}
              fallback={() => {
                return (
                  <>
                    {Array.from({ length: 4 }).map((_, index) => (
                      <CommentSkeleton key={`${index}`} />
                    ))}
                  </>
                );
              }}
            >
              <ConditionWrapper
                condition={
                  Boolean(selfComments.length) ||
                  Boolean(commentsData?.comments?.length)
                }
                fallback={() => (
                  <EmptyComponent
                    pathImg={emptyComment}
                    text={t('Empty.Comment')}
                  />
                )}
              >
                <SelfComments />
                {commentsData?.comments.map((comment, index) => (
                  <Comment key={`${index}`} commentData={comment} />
                ))}
              </ConditionWrapper>
            </ConditionWrapper>
          </div>
        </div>
      </div>
    </>
  );
};
export default Feedback;
