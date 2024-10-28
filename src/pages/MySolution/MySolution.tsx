import { PlusIcon } from '@heroicons/react/24/outline';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { emptyAuthentication } from '../../assets/images';
import { Button } from '../../components/common';
import EmptyComponent from '../../components/common/Empty/Empty';
import Solution from '../../components/common/Solution';
import { SolutionSkeleton } from '../../components/skeleton';
import { paths } from '../../constant';
import solutionService from '../../services/solutionService';
import { useAuthStore } from '../../store/authStore';
import { ISolutionResponse } from '../../types/response/solution';
import './MySolution.scss';

const MySolutionPage: React.FC = () => {
  const { isAuthentication } = useAuthStore();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPathname = location.pathname;
  const { data: solutionsData, isPending } = useQuery({
    queryKey: [paths.QUERY_KEY.mySolution],
    queryFn: async () => {
      if (!isAuthentication) {
        return [];
      }
      const response = await solutionService.getSolutionSubmitted();
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

  return (
    <>
      <div className="container-solution-list-page">
        <div className="header">
          <div className="title">{t('Page.MySolution.Title')}</div>
          <Button
            style={{ width: 'fit-content' }}
            label="Filter"
            buttonSize="small"
            iconPosition="left"
            styleType="secondary"
            Icon={() => <PlusIcon />}
          />
        </div>
        {!isAuthentication && (
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
        )}

        <div className="solution-list">
          {isPending &&
            Array.from({ length: 4 }).map((_, colIndex) => (
              <div key={colIndex} className="cols">
                {Array.from({ length: 4 }).map((_, index) => (
                  <SolutionSkeleton key={index} />
                ))}
              </div>
            ))}

          {!isPending &&
            groupedSolutions.map((column, colIndex) => (
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
        </div>
      </div>
    </>
  );
};
export default MySolutionPage;
