import { AcademicCapIcon } from '@heroicons/react/24/outline';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { emptyAuthentication } from '../../assets/images';
import { Button, Challenge, Section, Task } from '../../components/common';
import EmptyComponent from '../../components/common/Empty/Empty';
import { ChallengeSkeleton } from '../../components/skeleton';
import { paths } from '../../constant';
import challengeService from '../../services/challengeService';
import taskService from '../../services/taskService';
import { useAuthStore } from '../../store/authStore';
import './homePage.scss';
import { HeroChallenge, HeroPremium, HeroSolution } from './Partials';

const Home: React.FC = () => {
  const location = useLocation();
  const currentPathname = location.pathname;
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isAuthentication } = useAuthStore();

  const { isPending: pendingOfChallenges, data: challengesData } = useQuery({
    queryKey: [paths.QUERY_KEY.challenges],
    queryFn: async () => {
      const response = await challengeService.getAll({ page: 1 });
      const responseData = response.data.challenges;
      return responseData;
    },
  });

  const { isPending: pendingOfTasks, data: tasksData } = useQuery({
    queryKey: [paths.QUERY_KEY.tasks],
    queryFn: async () => {
      const response = await taskService.getAll({});
      const responseData = response.data.data.tasks;
      return responseData || [];
    },
  });

  const handleButtonViewMoreChallenge = () => {
    navigate(paths.challenges);
  };

  const handleButtonViewMoreTask = () => {
    navigate(`${paths.tasks}`);
  };

  return (
    <div className="home__page-container">
      <h1 className="title__page">{t('Page.Home.Title')}</h1>

      <div className="content">
        <div className="heros">
          <div className="hero__premium">
            <HeroPremium />
          </div>
          <div className="hero__challenge">
            <HeroChallenge />
          </div>
          <div className="hero__solution">
            <HeroSolution />
          </div>
        </div>

        <Section
          className="challenge__system"
          title={t('Section.MissionOfSystem')}
          iconPosition="left"
          Icon={() => <AcademicCapIcon width={32} height={32} />}
        >
          {pendingOfChallenges &&
            Array.from({ length: 10 }).map((_, index) => (
              <ChallengeSkeleton key={`${index}`} />
            ))}
          {!pendingOfChallenges &&
            challengesData &&
            challengesData?.map((challenge, index) => (
              <Challenge challengeData={challenge} key={`${index}`} />
            ))}
          <Button
            styleType="secondary"
            buttonSize="medium"
            label="View More"
            className="button__view-more"
            onClick={handleButtonViewMoreChallenge}
          />
        </Section>

        <Section
          className={`challenge__recruiter ${!isAuthentication && 'error-authentication'}`}
          title={t('Section.MissionOfTasker')}
          iconPosition="left"
          Icon={() => <AcademicCapIcon width={32} height={32} />}
        >
          {!isAuthentication && (
            <EmptyComponent
              pathImg={emptyAuthentication}
              text={t('Authentication.Login')}
              className="empty__authentication"
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
          {pendingOfTasks &&
            isAuthentication &&
            Array.from({ length: 10 }).map((_, index) => (
              <ChallengeSkeleton key={`${index}`} />
            ))}

          {!pendingOfTasks &&
            tasksData &&
            isAuthentication &&
            tasksData?.map((task, index) => (
              <Task taskData={task} key={`${index}`} />
            ))}

          {!pendingOfTasks && tasksData && isAuthentication && (
            <Button
              styleType="secondary"
              buttonSize="medium"
              label="View More"
              className="button__view-more"
              onClick={handleButtonViewMoreTask}
            />
          )}
        </Section>
      </div>
    </div>
  );
};

export default Home;
