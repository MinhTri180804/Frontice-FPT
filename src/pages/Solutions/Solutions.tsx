import { PlusIcon } from '@heroicons/react/24/outline';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { emptyAuthentication, emptySolution } from '../../assets/images';
import { Button } from '../../components/common';
import EmptyComponent from '../../components/common/Empty/Empty';
import Solution from '../../components/common/Solution';
import { SolutionSkeleton } from '../../components/skeleton';
import { paths } from '../../constant';
import solutionService from '../../services/solutionService';
import { useAuthStore } from '../../store/authStore';
import { ISolutionResponse } from '../../types/response/solution';
import './Solution.scss';
import { ConditionWrapper } from '../../components/wrapper';
import classNames from 'classnames';
const Solutions: React.FC = () => {
  const [page] = useState<number>(1);
  const { isAuthentication } = useAuthStore();
  const { t } = useTranslation();
  const location = useLocation();
  const currentPathname = location.pathname;
  const navigate = useNavigate();
  const { data: solutionsData, isPending } = useQuery({
    queryKey: [paths.QUERY_KEY.solutionList],
    queryFn: async () => {
      if (!isAuthentication) return [];
      const response = await solutionService.getAll({ page });
      const responseData = response?.data?.data?.solutions;
      return responseData || [];
    },
  });

  const COLUMN = 4;
  let groupedSolutions: ISolutionResponse[][] = [];

  if (solutionsData && solutionsData.length !== 0) {
    groupedSolutions = Array.from({ length: COLUMN }, (_, i) =>
      solutionsData.filter((_, index) => index % COLUMN === i),
    );
  }

  const solutionListClass = classNames('solution-list', {
    empty: solutionsData && solutionsData.length === 0 && !isPending,
  });

  return (
    <>
      <div className="container-solution-list-page">
        <div className="header">
          <div className="title">{t('Page.Solutions.Title')}</div>
          <Button
            style={{ width: 'fit-content' }}
            label="Filter"
            buttonSize="small"
            iconPosition="left"
            styleType="secondary"
            Icon={() => <PlusIcon />}
          />
        </div>

        {/* Condition authentication */}
        <ConditionWrapper
          condition={isAuthentication}
          fallback={() => {
            return (
              <EmptyComponent
                text={t('Authentication.Login')}
                pathImg={emptyAuthentication}
              >
                <Button
                  styleType="secondary"
                  label={t('Button.LoginNow')}
                  buttonSize="medium"
                  style={{ width: '50%' }}
                  onClick={() => {
                    navigate(`${paths.auth}/${paths.login}`, {
                      state: {
                        previousPage: currentPathname,
                      },
                    });
                  }}
                />
              </EmptyComponent>
            );
          }}
        >
          <div className={solutionListClass}>
            {/* Loading state*/}
            <ConditionWrapper condition={isPending}>
              {Array.from({ length: 4 }).map((_, colIndex) => (
                <div key={colIndex} className="cols">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <SolutionSkeleton key={index} />
                  ))}
                </div>
              ))}
            </ConditionWrapper>

            {/* Condition empty */}
            <ConditionWrapper
              condition={!isPending && groupedSolutions.length !== 0}
              fallback={() => {
                return (
                  <EmptyComponent
                    text={t('Empty.Solution')}
                    pathImg={emptySolution}
                  >
                    <Button
                      label={t('Button.Challenges.Join')}
                      styleType="secondary"
                      buttonSize="normal"
                      onClick={() => navigate(paths.challenges)}
                      style={{
                        width: '50% !important',
                      }}
                    />
                  </EmptyComponent>
                );
              }}
            >
              {groupedSolutions.map((column, colIndex) => (
                <div key={colIndex} className="cols">
                  {column.map((solutionItem, index) => (
                    <Solution
                      key={index}
                      isShowDescription
                      solution={solutionItem}
                    />
                  ))}
                </div>
              ))}
            </ConditionWrapper>
          </div>
        </ConditionWrapper>
      </div>
    </>
  );
};
export default Solutions;
