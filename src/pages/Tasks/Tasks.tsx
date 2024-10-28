import { PlusIcon } from '@heroicons/react/24/outline';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Button, Pagination, Task } from '../../components/common';
import { ChallengeSkeleton } from '../../components/skeleton';
import { paths } from '../../constant';
import taskService from '../../services/taskService';
import './tasks.scss';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../store/authStore';
import EmptyComponent from '../../components/common/Empty/Empty';
import { emptyAuthentication } from '../../assets/images';
import { useLocation, useNavigate } from 'react-router-dom';
const QUERY_KEY = paths.QUERY_KEY.tasks;
const TasksPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { t } = useTranslation();
  const { isAuthentication } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();
  const currentPathname = location.pathname;
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
      const response = await taskService.getAll({
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
          <div className="title">{t('Page.Tasks.Title')}</div>
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
              onClick={() =>
                navigate(`${paths.auth}/${paths.login}`, {
                  state: {
                    previousPage: currentPathname,
                  },
                })
              }
              label={t('Button.LoginNow')}
              buttonSize="medium"
              styleType="secondary"
              style={{ width: '50%' }}
            />
          </EmptyComponent>
        )}
        {isAuthentication && (
          <>
            <div className="challenges-list">
              {isPending
                ? Array.from({ length: 12 }).map((_, index) => (
                    <ChallengeSkeleton key={`${index}`} />
                  ))
                : data?.tasks.map((task, index) => (
                    <Task key={`${index}`} taskData={task} />
                  ))}
            </div>

            <Pagination
              className="pagination"
              totalPages={totalPage}
              currentPage={currentPage}
              onPageChange={handleChangePage}
            />
          </>
        )}
      </div>
    </>
  );
};
export default TasksPage;
