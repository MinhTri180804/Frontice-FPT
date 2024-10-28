import { useEffect, useState } from 'react';
import { Button, Challenge, Pagination } from '../../components/common';
import './Challenges.scss';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useQuery } from '@tanstack/react-query';
import { paths } from '../../constant';
import challengeService from '../../services/challengeService';
import { ChallengeSkeleton } from '../../components/skeleton';
import { useTranslation } from 'react-i18next';
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

  const { data, isPending } = useQuery({
    queryKey: [QUERY_KEY, currentPage],
    queryFn: async () => {
      const response = await challengeService.getAll({
        page: currentPage,
      });
      const data = response.data.data;
      return data;
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
          <Button
            style={{ width: 'fit-content' }}
            label="Filter"
            buttonSize="small"
            iconPosition="left"
            styleType="secondary"
            Icon={() => <PlusIcon />}
          />
        </div>
        <div className="challenges-list">
          {isPending
            ? Array.from({ length: 12 }).map((_, index) => (
                <ChallengeSkeleton key={`${index}`} />
              ))
            : data?.challenges.map((challenge, index) => (
                <Challenge key={`${index}`} challengeData={challenge} />
              ))}
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
