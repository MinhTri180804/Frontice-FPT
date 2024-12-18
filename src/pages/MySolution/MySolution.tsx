import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { emptySolution } from '../../assets/images';
import { Button, Pagination } from '../../components/common';
import EmptyComponent from '../../components/common/Empty/Empty';
import Solution from '../../components/common/Solution';
import { SolutionSkeleton } from '../../components/skeleton';
import { ConditionWrapper } from '../../components/wrapper';
import { paths } from '../../constant';
import solutionService from '../../services/solutionService';
import { useAuthStore } from '../../store/authStore';
import { ISolutionSubmittedResponse } from '../../types/response/solution';
import './MySolution.scss';

const MySolutionPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { profile } = useAuthStore();
  const { data: dataOfMySolutions, isLoading } = useQuery({
    queryKey: [paths.QUERY_KEY.mySolution, profile?.email, 12],
    queryFn: async () => {
      const response = await solutionService.getSolutionSubmitted({ page: 1 });
      const responseData = response.data;
      return responseData;
    },
  });

  const {
    solutions,
    perPage = 0,
    total = 0,
    currentPage = 1,
  } = (dataOfMySolutions || {}) as ISolutionSubmittedResponse;

  const totalPage = Math.ceil((total || 0) / (perPage || 1));

  const mySolutionListClass = classNames('my__solution-list', {
    'empty-my-solution': !isLoading && solutions?.length === 0,
  });

  return (
    <>
      <div className="container-solution-list-page">
        <div className="header">
          <div className="title">{t('Page.MySolution.Title')}</div>
        </div>

        <div className={mySolutionListClass}>
          <ConditionWrapper
            condition={!isLoading}
            fallback={() => {
              // State loading my solution data
              return Array.from({ length: 4 }).map((_, index) => (
                <SolutionSkeleton key={index} />
              ));
            }}
          >
            <ConditionWrapper
              condition={solutions?.length !== 0}
              fallback={() => {
                // State empty my solution data
                return (
                  <EmptyComponent
                    text={t('Empty.DontJoinedChallenge')}
                    pathImg={emptySolution}
                    className="empty-my-solutions"
                  >
                    <Button
                      label={t('Button.ViewMore.Challenges')}
                      styleType="secondary"
                      buttonSize="normal"
                      onClick={() => navigate(paths.challenges)}
                      style={{
                        width: '50% ',
                      }}
                    />
                  </EmptyComponent>
                );
              }}
            >
              {solutions?.map((solution, index) => (
                <Solution key={`${index}`} solution={solution} />
              ))}

              <Pagination
                className="pagination__my-solutions"
                totalPages={totalPage}
                currentPage={currentPage}
                onPageChange={() => {
                  console.log(1);
                }}
              />
            </ConditionWrapper>
          </ConditionWrapper>
        </div>
      </div>
    </>
  );
};
export default MySolutionPage;
