import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Challenge, Pagination } from '../../components/common';
import { ChallengeSkeleton } from '../../components/skeleton';
import { ConditionWrapper } from '../../components/wrapper';
import { paths } from '../../constant';
import challengeService from '../../services/challengeService';
import './Challenges.scss';
const QUERY_KEY = paths.QUERY_KEY.challenges;
const Challenges: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { t } = useTranslation();
  useEffect(() => {
    document.querySelector('main')?.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [currentPage]);

  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY, currentPage],
    queryFn: async () => {
      const response = await challengeService.getAll({
        page: currentPage,
      });
      const data = response;
      return data.data;
    },
  });

  const handleChangePage: (currentPage: number) => void = (currentPage) => {
    setCurrentPage(currentPage);
  };

  const totalPage = Math.ceil((data?.total || 0) / (data?.perPage || 1));
  return (
    <>
      <div className="container-challenges-page">
        <div className="header">
          <div className="title">{t('Page.Challenges.Title')}</div>
        </div>
        <div className="challenges-list">
          <ConditionWrapper
            condition={!isLoading}
            fallback={() =>
              Array.from({ length: 12 }).map((_, index) => (
                <ChallengeSkeleton key={`${index}`} />
              ))
            }
          >
            {data?.challenges.map((challenge, index) => (
              <Challenge key={`${index}`} challengeData={challenge} />
            ))}
          </ConditionWrapper>
        </div>

        <Pagination
          className="pagination"
          totalPages={totalPage}
          currentPage={currentPage}
          onPageChange={handleChangePage}
        />
      </div>
    </>
  );
};
export default Challenges;
