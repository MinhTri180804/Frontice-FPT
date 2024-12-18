import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Section } from '../../../../components/common';
import Solution from '../../../../components/common/Solution';
import { SolutionSkeleton } from '../../../../components/skeleton';
import { paths } from '../../../../constant';
import solutionService from '../../../../services/solutionService';
import './challengeDetailsSolution.scss';
import { SolutionOverview } from './Partials';
import { ConditionWrapper } from '../../../../components/wrapper';
import EmptyComponent from '../../../../components/common/Empty/Empty';
import { emptySolution } from '../../../../assets/images';
import { useTranslation } from 'react-i18next';

interface IChallengeDetailsSolutionProps {
  solutionId: string;
  challengeId: string;
}
const ChallengeDetailsSolution: FC<IChallengeDetailsSolutionProps> = ({
  solutionId,
  challengeId,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  console.log('[CHALLENGE ID]: ', challengeId);

  const { data: solutionsOfChallengeData, isPending: pendingOfSolutions } =
    useQuery({
      queryKey: [paths.QUERY_KEY.solutionOfChallenge, challengeId, solutionId],
      queryFn: async () => {
        const response = await solutionService.getSolutionsOfChallenge({
          challengeId,
        });

        const responseData = response?.data?.solutions;
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
          {/* condition status request and response from frontend to backend */}
          <ConditionWrapper
            condition={Boolean(!pendingOfSolutions && solutionsOfChallengeData)}
            // Shown for loading solutions case
            fallback={() => {
              return Array.from({ length: 8 }).map((_, index) => (
                <SolutionSkeleton key={`${index}`} />
              ));
            }}
          >
            {/* Condition for solutions data */}
            <ConditionWrapper
              condition={Boolean(
                solutionsOfChallengeData &&
                  solutionsOfChallengeData.length !== 0,
              )}
              // Shown for the empty solutions case
              fallback={() => {
                return (
                  <EmptyComponent
                    pathImg={emptySolution}
                    title={t('Empty.SolutionsOfChallenge')}
                  />
                );
              }}
            >
              {solutionsOfChallengeData?.map((solution, index) => (
                <Solution
                  solution={solution}
                  key={`${index}`}
                  isShowDescription
                />
              ))}
            </ConditionWrapper>
          </ConditionWrapper>
        </div>
      </Section>
    </div>
  );
};

export default ChallengeDetailsSolution;
