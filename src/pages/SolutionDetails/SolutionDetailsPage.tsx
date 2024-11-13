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

type IUseNavigate = {
  solutionId: string;
};

const SolutionDetails: React.FC = () => {
  const navigate = useNavigate();
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
          <h1>Solution Details</h1>
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

        {solutionId && <Feedback solutionId={solutionId} />}
      </div>
    </>
  );
};
export default SolutionDetails;
