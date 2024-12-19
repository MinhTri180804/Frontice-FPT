import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChallengeOverview } from '../../components/common';
import { SolutionDetailsSectionSkeleton } from '../../components/skeleton/SolutionDetailsSection';
import { ConditionWrapper } from '../../components/wrapper';
import { paths } from '../../constant';
import solutionService from '../../services/solutionService';
import { SolutionDetailsSection } from './Partials';
import Feedback from './Partials/Feedback/Feedback';
import './SolutionDetailsPage.scss';
import { useAuthStore } from '../../store/authStore';
import { useTranslation } from 'react-i18next';

type IUseNavigate = {
  solutionId: string;
};

const SolutionDetails: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const profile = useAuthStore((state) => state.profile);
  const { solutionId } = useParams<IUseNavigate>();

  useEffect(() => {
    if (!solutionId) {
      navigate(paths.notfound);
      return;
    }
  }, [solutionId, navigate]);

  const { data: solutionDetailsData, isPending: pendingOfSolutionDetailsData } =
    useQuery({
      queryKey: [paths.QUERY_KEY.solutionDetails, solutionId],
      queryFn: async () => {
        const response = await solutionService.getDetails({
          solutionId: solutionId as string,
        });

        const responseData = response.data;
        return responseData;
      },
    });

  return (
    <>
      <div className="container-solution-details-page">
        <div className="title">
          <h1>{t('SolutionDetailsPage')}</h1>
        </div>
        {solutionDetailsData?.challenge.id && (
          <ChallengeOverview challengeId={solutionDetailsData?.challenge.id} />
        )}

        <ConditionWrapper
          condition={
            !pendingOfSolutionDetailsData && Boolean(solutionDetailsData)
          }
          fallback={() => {
            return <SolutionDetailsSectionSkeleton />;
          }}
        >
          {solutionDetailsData && (
            <SolutionDetailsSection solutionDetailsData={solutionDetailsData} />
          )}
        </ConditionWrapper>
        <ConditionWrapper
          condition={
            Boolean(profile?.gold_account) &&
            Boolean(solutionDetailsData?.mentor_feedback)
          }
        >
          <section className="section__feedback-mentor">
            <div className="title">{t('FeedbackOfMentor')}</div>
            <div className="feedback_component">
              <div className="author">
                <div className="image">
                  <img
                    src={
                      solutionDetailsData?.mentor_feedback?.admin_feedback
                        .image ||
                      'https://img.freepik.com/premium-vector/man-empty-avatar-casual-business-style-vector-photo-placeholder-social-networks-resumes_885953-434.jpg'
                    }
                    alt=""
                  />
                </div>
                <div className="name">
                  {
                    solutionDetailsData?.mentor_feedback?.admin_feedback
                      .fullname
                  }
                </div>
              </div>
              <div className="value">
                {solutionDetailsData?.mentor_feedback?.feedback}
              </div>
            </div>
          </section>
        </ConditionWrapper>
        {solutionId && <Feedback solutionId={solutionId} />}
      </div>
    </>
  );
};
export default SolutionDetails;
