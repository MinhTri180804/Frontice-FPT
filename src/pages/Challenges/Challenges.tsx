import { useEffect, useState } from 'react';
import { Button, Challenge, Pagination } from '../../components/common';
import './Challenges.scss';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useQuery } from '@tanstack/react-query';
import { paths } from '../../constant';
import challengeService from '../../services/challengeService';
import { ChallengeSkeleton } from '../../components/skeleton';
const QUERY_KEY = paths.QUERY_KEY.challenges;
const Challenges: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

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
          <div className="title">Challenges List</div>
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
            ? Array.from({ length: 10 }).map((_, index) => (
                <ChallengeSkeleton key={`${index}`} />
              ))
            : data?.challenges.map((challenge, index) => (
                <Challenge
                  key={`${index}`}
                  name={challenge.title}
                  bannerUrl={
                    challenge.image ||
                    'https://res.cloudinary.com/dz209s6jk/image/upload/f_auto,q_auto,w_700/Challenges/wcxhsnz3foidwbzshiia.jpg'
                  }
                  description={challenge.shortDes}
                  level={challenge.level}
                  difficulty={challenge.requiredPoint}
                  technicalList={challenge.technical}
                  score={challenge.point}
                  tags={[
                    {
                      value: challenge.premium ? 'premium' : 'free',
                    },
                    { value: 'new' },
                  ]}
                />
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
