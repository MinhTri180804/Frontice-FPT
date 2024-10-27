import { PlusIcon } from '@heroicons/react/24/outline';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Button } from '../../components/common';
import Solution from '../../components/common/Solution';
import { SolutionSkeleton } from '../../components/skeleton';
import solutionService from '../../services/solutionService';
import { ISolutionResponse } from '../../types/response/solution';
import './MySolution.scss';
import { paths } from '../../constant';

const MySolutionPage: React.FC = () => {
  const { data: solutionsData, isPending } = useQuery({
    queryKey: [paths.QUERY_KEY.mySolution],
    queryFn: async () => {
      const response = await solutionService.getSolutionSubmitted();
      const responseData = response?.data?.data?.solutions;
      return responseData || [];
    },
  });

  const COLUMN = 4;
  let groupedSolutions: ISolutionResponse[][] = [];

  if (solutionsData) {
    groupedSolutions = Array.from({ length: COLUMN }, (_, i) =>
      solutionsData.filter((_, index) => index % COLUMN === i),
    );
  }

  return (
    <>
      <div className="container-solution-list-page">
        <div className="header">
          <div className="title">Solution List</div>
          <Button
            style={{ width: 'fit-content' }}
            label="Filter"
            buttonSize="small"
            iconPosition="left"
            styleType="secondary"
            Icon={() => <PlusIcon />}
          />
        </div>
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
            groupedSolutions.length !== 0 &&
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
