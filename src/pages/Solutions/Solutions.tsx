import { PlusIcon } from '@heroicons/react/24/outline';
import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { emptySolution } from '../../assets/images';
import { Button } from '../../components/common';
import EmptyComponent from '../../components/common/Empty/Empty';
import Solution from '../../components/common/Solution';
import { SolutionSkeleton } from '../../components/skeleton';
import { ConditionWrapper } from '../../components/wrapper';
import { paths } from '../../constant';
import solutionService from '../../services/solutionService';
import { ISolutionResponse } from '../../types/response/solution';
import './Solution.scss';

const Solutions: React.FC = () => {
  const [page] = useState<number>(1);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { data: solutionsData, isLoading } = useQuery({
    queryKey: [paths.QUERY_KEY.solutionList],
    queryFn: async () => {
      const response = await solutionService.getAll({ page });
      const responseData = response?.data?.solutions;
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
    'empty-solutions': groupedSolutions.length === 0 && !isLoading,
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
        <div className={solutionListClass}>
          <ConditionWrapper
            condition={!isLoading}
            fallback={() => {
              // State loading get data solution
              return Array.from({
                length: 4,
              }).map((_, colIndex) => (
                <div key={colIndex} className="cols">
                  {Array.from({
                    length: 4,
                  }).map((_, index) => (
                    <SolutionSkeleton key={index} />
                  ))}
                </div>
              ));
            }}
          >
            <ConditionWrapper
              condition={groupedSolutions.length !== 0}
              fallback={() => {
                // State empty solutions
                return (
                  <EmptyComponent
                    text={t('Empty.Solution')}
                    pathImg={emptySolution}
                    className="empty-solutions"
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
          </ConditionWrapper>
        </div>
      </div>
    </>
  );
};
export default Solutions;
