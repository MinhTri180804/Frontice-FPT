import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Section } from '../../../../components/common';
import { paths } from '../../../../constant';
import './challengeDetailsSolution.scss';
import { SolutionOverview } from './Partials';
import { useQuery } from '@tanstack/react-query';
import solutionService from '../../../../services/solutionService';
import Solution from '../../../../components/common/Solution';
import { SolutionSkeleton } from '../../../../components/skeleton';

interface IChallengeDetailsSolutionProps {
  solutionId: string;
}
const ChallengeDetailsSolution: FC<IChallengeDetailsSolutionProps> = ({
  solutionId,
}) => {
  const { challengeId } = useParams();
  const navigate = useNavigate();

  const { data: solutionOfChallengeData, isPending: pendingOfSolution } =
    useQuery({
      queryKey: [paths.QUERY_KEY.solutionOfChallenge, challengeId, solutionId],
      queryFn: async () => {
        if (!challengeId) {
          return;
        }
        const response = await solutionService.getSolutionsOfChallenge({
          challengeId,
        });

        const responseData = response?.data?.data?.solutions;
        return responseData || [];
      },
    });

  return (
    <div className="challenge__details-solution-tab">
      <Section className="overview__solution">
        <SolutionOverview
          className="solution__overview"
          solutionId={solutionId}
        />

        <div className="actions">
          <Button
            className="view__details-solution"
            label="View details"
            iconPosition="right"
            Icon={() => <ArrowRightIcon width={24} height={24} color="white" />}
            buttonSize="large"
            styleType="primary"
            onClick={() =>
              navigate(`${paths.solutionDetails}/${solutionId}`, {
                state: {
                  challengeId,
                },
              })
            }
          />

          <Button
            className="update-solution"
            label="Update Solution"
            iconPosition="right"
            Icon={() => <ArrowRightIcon width={24} height={24} />}
            buttonSize="large"
            styleType="secondary"
          />
        </div>
      </Section>
      <Section title="Community solution" className="community__solution">
        <div className="solution__list">
          {pendingOfSolution &&
            Array.from({ length: 8 }).map((_, index) => (
              <SolutionSkeleton key={`${index}`} />
            ))}

          {!pendingOfSolution &&
            solutionOfChallengeData &&
            solutionOfChallengeData.map((solution, index) => (
              <Solution
                solution={solution}
                key={`${index}`}
                isShowDescription
              />
            ))}
        </div>
      </Section>
    </div>
  );
};

export default ChallengeDetailsSolution;
