import {
  AcademicCapIcon,
  CommandLineIcon,
  LightBulbIcon,
} from '@heroicons/react/24/outline';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { emptySolution } from '../../assets/images';
import { Button, InformationAuthor } from '../../components/common';
import EmptyComponent from '../../components/common/Empty/Empty';
import SolutionList from '../../components/common/SolutionList/SolutionList';
import { SolutionSkeleton } from '../../components/skeleton';
import { ConditionWrapper } from '../../components/wrapper';
import { paths } from '../../constant';
import authService from '../../services/authServices';
import solutionService from '../../services/solutionService';
import { useAuthStore } from '../../store/authStore';
import { IProfileResponse } from '../../types/response';
import { ISolutionSubmittedResponse } from '../../types/response/solution';
import './StatisticPage.scss';
import {
  ChallengeIncompleteList,
  ProfileOverview,
  SectionStatistic,
} from './partitals';
import taskService from '../../services/taskService';
import { SolutionTask } from '../../components/common/SolutionTask';

const PER_PAGE_SOLUTIONS_SUBMITTED = 8;

const StatisticPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { profile, updateProfile } = useAuthStore();

  const { isPending: isPendingOfProfile } = useQuery({
    queryKey: [paths.QUERY_KEY.meInfo],
    queryFn: async () => {
      const response = await authService.info();
      const dataProfile = response.data;
      updateProfile(dataProfile);
      return dataProfile;
    },
  });

  const {
    data: responseSolutionSubmit,
    isPending: isPendingOfSolutionSubmitted,
  } = useQuery({
    queryKey: [
      paths.QUERY_KEY.solutionSubmitted,
      profile?.email,
      PER_PAGE_SOLUTIONS_SUBMITTED,
    ],
    queryFn: async () => {
      const response = await solutionService.getSolutionSubmitted({
        per_page: PER_PAGE_SOLUTIONS_SUBMITTED,
      });
      const responseData = response?.data.solutions;
      return responseData || [];
    },
  });

  const { data: dataMySolutionTask, isFetching: pendingOfMySolutionTask } =
    useQuery({
      queryKey: [paths.QUERY_KEY.getAllSolutionTaskOfMe],
      queryFn: async () => {
        const response = await taskService.getAllSolutionTaskOfMe();
        const responseData = response.data;
        return responseData;
      },
    });

  return (
    <div className="statistic__page-container">
      <h1 className="title-page">{t('StatisticPage')}</h1>

      <div className="content">
        {/* Condition of state of section overview */}
        <ConditionWrapper
          condition={!isPendingOfProfile}
          // Shown for status loading overview component
          fallback={() => {
            return <div className="skeleton__statistic-section"></div>;
          }}
        >
          <SectionStatistic
            title={t('Section.Overview')}
            Icon={() => <LightBulbIcon width={32} height={32} />}
          >
            <div className="line"></div>
            <ProfileOverview profile={profile as IProfileResponse} />
          </SectionStatistic>
        </ConditionWrapper>

        <div className="section-with-account">
          <SectionStatistic
            options
            className="incomplete__challenge"
            Icon={() => <AcademicCapIcon width={32} height={32} />}
            title={t('Section.IncompleteChallenge')}
          >
            <div className="line"></div>
            <ChallengeIncompleteList />
          </SectionStatistic>
          <div className="account">
            <InformationAuthor authorProfile={profile as IProfileResponse} />
          </div>
        </div>

        <SectionStatistic
          title={t('Section.MySolutionChallengesSystem')}
          Icon={() => <CommandLineIcon width={24} height={24} />}
          className="my__solution solutions__system"
        >
          <div className="line"></div>
          <ConditionWrapper
            condition={!isPendingOfSolutionSubmitted}
            fallback={() => {
              return (
                <div className="solution__list-skeleton">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <SolutionSkeleton key={index} />
                  ))}
                </div>
              );
            }}
          >
            <SolutionList
              solutionsData={
                responseSolutionSubmit as ISolutionSubmittedResponse['solutions']
              }
            />
            <Button
              styleType="secondary"
              buttonSize="medium"
              label={t('Button.ViewMore.Default')}
              onClick={() => navigate(paths.mySolutions)}
            />
          </ConditionWrapper>
        </SectionStatistic>

        <SectionStatistic
          title={t('Section.MySolutionTask')}
          Icon={() => <CommandLineIcon width={24} height={24} />}
          className="my__solution solutions__task"
        >
          {/* Condition of my tasks */}
          <ConditionWrapper
            condition={!pendingOfMySolutionTask}
            fallback={() => {
              return Array.from({ length: 12 }).map((_, index) => {
                return <SolutionSkeleton key={index} />;
              });
            }}
          >
            <ConditionWrapper
              condition={dataMySolutionTask?.tasks.length !== 0}
              fallback={() => {
                return (
                  <EmptyComponent
                    pathImg={emptySolution}
                    title={t('Empty.SolutionTask.Title')}
                    text={t('Empty.SolutionTask.Text')}
                  >
                    <Button
                      buttonSize="medium"
                      label={t('Button.GoToTasks')}
                      style={{ width: '50%' }}
                      styleType="secondary"
                    />
                  </EmptyComponent>
                );
              }}
            >
              <div className="solution__task-list">
                {dataMySolutionTask &&
                  dataMySolutionTask.tasks?.map((solution, index) => (
                    <SolutionTask solutionTaskData={solution} key={index} />
                  ))}
              </div>
            </ConditionWrapper>
          </ConditionWrapper>
        </SectionStatistic>
      </div>
    </div>
  );
};

export default StatisticPage;
