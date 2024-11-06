import { AcademicCapIcon } from '@heroicons/react/24/outline';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { emptyAuthentication, emptyChallenge } from '../../assets/images';
import { Button, Challenge, Section, Task } from '../../components/common';
import EmptyComponent from '../../components/common/Empty/Empty';
import { ChallengeSkeleton } from '../../components/skeleton';
import { paths } from '../../constant';
import challengeService from '../../services/challengeService';
import taskService from '../../services/taskService';
import { useAuthStore } from '../../store/authStore';
import './homePage.scss';
import { HeroChallenge, HeroPremium, HeroSolution } from './Partials';
import { ConditionWrapper } from '../../components/wrapper';
import useTimeCountDown from '../../hooks/useTimeCountDown';

const PER_PAGE_CHALLENGES_SYSTEM = 8;
const PER_PAGE_TASK = 8;

const Home: React.FC = () => {
  const location = useLocation();
  const currentPathname = location.pathname;
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isAuthentication } = useAuthStore();
  const time = useTimeCountDown(1730924360);

  const { isPending: pendingOfChallenges, data: challengesData } = useQuery({
    queryKey: [paths.QUERY_KEY.challenges],
    queryFn: async () => {
      const response = await challengeService.getAll({
        page: 1,
        per_page: PER_PAGE_CHALLENGES_SYSTEM,
      });
      const responseDataChallenges = response.data.challenges;
      return responseDataChallenges;
    },
  });

  const { isPending: pendingOfTasks, data: tasksData } = useQuery({
    queryKey: [paths.QUERY_KEY.tasks],
    queryFn: async () => {
      const response = await taskService.getAll({
        page: 1,
        per_page: PER_PAGE_TASK,
      });
      const responseData = response.data.tasks;
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
    <>
      <div className="testing">
        {time?.hours} : {time?.minutes} : {time?.seconds}
      </div>
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
            {/* Condition of state challenges system */}
            <ConditionWrapper
              condition={!pendingOfChallenges}
              fallback={() => {
                return Array.from({ length: 10 }).map((_, index) => (
                  <ChallengeSkeleton key={`${index}`} />
                ));
              }}
            >
              {/* Condition of data challenges */}
              <ConditionWrapper
                condition={Boolean(
                  challengesData && challengesData.length !== 0,
                )}
                // Shown for the empty challenges case
                fallback={() => {
                  return (
                    <EmptyComponent
                      pathImg={emptyChallenge}
                      title={t('Empty.ChallengeSystem')}
                    />
                  );
                }}
              >
                {challengesData?.map((challenge, index) => (
                  <Challenge challengeData={challenge} key={`${index}`} />
                ))}
              </ConditionWrapper>
            </ConditionWrapper>

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
            {/* Condition for authentication */}
            <ConditionWrapper
              condition={isAuthentication}
              // Shown for not authentication case
              fallback={() => {
                return (
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
                );
              }}
            >
              {/* Condition for state of tasks data */}
              <ConditionWrapper
                condition={!pendingOfTasks}
                // Shown for state loading of task data
                fallback={() => {
                  return Array.from({ length: 10 }).map((_, index) => (
                    <ChallengeSkeleton key={`${index}`} />
                  ));
                }}
              >
                {tasksData?.map((task, index) => (
                  <Task taskData={task} key={`${index}`} />
                ))}

                <Button
                  styleType="secondary"
                  buttonSize="medium"
                  label="View More"
                  className="button__view-more"
                  onClick={handleButtonViewMoreTask}
                />
              </ConditionWrapper>
            </ConditionWrapper>
          </Section>
        </div>
      </div>
    </>
  );
};

export default Home;
