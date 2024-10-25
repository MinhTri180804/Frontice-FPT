import {
  AcademicCapIcon,
  CommandLineIcon,
  LightBulbIcon,
} from '@heroicons/react/24/outline';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import {
  emptyAuthentication,
  emptyChallenge,
  emptySolution,
} from '../../assets/images';
import { Button, InformationAuthor } from '../../components/common';
import EmptyComponent from '../../components/common/Empty/Empty';
import SolutionList from '../../components/common/SolutionList/SolutionList';
import { SolutionSkeleton } from '../../components/skeleton';
import { ConditionWrapper } from '../../components/wrapper';
import { paths } from '../../constant';
import authService from '../../services/authServices';
import solutionService from '../../services/solutionService';
import { useAuthStore } from '../../store/authStore';
import './StatisticPage.scss';
import {
  ChallengeIncompleteList,
  ProfileOverview,
  SectionStatistic,
} from './partitals';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

const StatisticPage: React.FC = () => {
  const { t } = useTranslation();
  const { profile, updateProfile, isAuthentication } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPathname = location.pathname;
  const { isPending: isPendingOfProfile } = useQuery({
    queryKey: [paths.QUERY_KEY.meInfo],
    queryFn: async () => {
      if (!isAuthentication) {
        return;
      }
      const response = await authService.info();
      const dataProfile = response.data.data;
      updateProfile(dataProfile);
      return dataProfile;
    },
  });

  const {
    data: responseSolutionSubmit,
    isPending: isPendingOfSolutionSubmitted,
  } = useQuery({
    queryKey: [paths.QUERY_KEY.solutionSubmitted, profile?.email],
    queryFn: async () => {
      if (!isAuthentication) {
        return null;
      }
      const response = await solutionService.getSolutionSubmitted();
      const responseData = response?.data.data.solutions;
      return responseData || [];
    },
  });

  return (
    <div className="statistic__page-container">
      <h1 className="title-page">Statistic Page</h1>

      <div className="content">
        {isPendingOfProfile ? (
          <div className="skeleton__statistic-section"></div>
        ) : (
          <SectionStatistic
            title={t('Section.Overview')}
            Icon={() => <LightBulbIcon width={32} height={32} />}
          >
            <div className="line"></div>
            <ConditionWrapper
              fallback={() => (
                <EmptyComponent
                  pathImg={emptyAuthentication}
                  text={t('Authentication.Login')}
                >
                  <Button
                    style={{ width: '50%' }}
                    label={t('Button.LoginNow')}
                    buttonSize="medium"
                    styleType="secondary"
                    onClick={() =>
                      navigate(`${paths.auth}/${paths.login}`, {
                        state: {
                          previousPage: currentPathname,
                        },
                      })
                    }
                  />
                </EmptyComponent>
              )}
              condition={isAuthentication}
            >
              {profile && <ProfileOverview profile={profile} />}
            </ConditionWrapper>
          </SectionStatistic>
        )}
        <div className="section-with-account">
          <SectionStatistic
            options
            className="incomplete__challenge"
            Icon={() => <AcademicCapIcon width={32} height={32} />}
            title={t('Section.IncompleteChallenge')}
          >
            <div className="line"></div>
            <ConditionWrapper
              condition={isAuthentication}
              fallback={() => (
                <EmptyComponent
                  pathImg={emptyChallenge}
                  text={t('Empty.DontJoinedChallenge')}
                  style={{ padding: '25px' }}
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
            >
              <ChallengeIncompleteList />
            </ConditionWrapper>
          </SectionStatistic>
          <div className="account">
            <ConditionWrapper
              condition={isAuthentication}
              fallback={() => (
                <EmptyComponent
                  pathImg={emptyAuthentication}
                  text={t('Authentication.Login')}
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
                  />
                </EmptyComponent>
              )}
            >
              {profile && <InformationAuthor authorProfile={profile} />}
            </ConditionWrapper>
          </div>
        </div>
        <SectionStatistic
          title={t('Section.MySolution')}
          Icon={() => <CommandLineIcon width={24} height={24} />}
          className="my__solution"
        >
          <div className="line"></div>
          <ConditionWrapper
            condition={isAuthentication}
            fallback={() => (
              <EmptyComponent
                pathImg={emptySolution}
                text={t('Empty.DontSubmittedChallenge')}
              >
                <Button
                  label={t('Button.LoginNow')}
                  onClick={() =>
                    navigate(`${paths.auth}/${paths.login}`, {
                      state: {
                        previousPage: currentPathname,
                      },
                    })
                  }
                  buttonSize="medium"
                  styleType="secondary"
                  style={{ width: '50%' }}
                />
              </EmptyComponent>
            )}
          >
            {isPendingOfSolutionSubmitted && (
              <div className="solution__list-skeleton">
                {Array.from({ length: 6 }).map((_, index) => (
                  <SolutionSkeleton key={index} />
                ))}
              </div>
            )}
            {responseSolutionSubmit && (
              <SolutionList solutionsData={responseSolutionSubmit} />
            )}
          </ConditionWrapper>
        </SectionStatistic>
      </div>
    </div>
  );
};

export default StatisticPage;
