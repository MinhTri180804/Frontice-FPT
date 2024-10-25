import {
  AcademicCapIcon,
  CommandLineIcon,
  LightBulbIcon,
} from '@heroicons/react/24/outline';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { InformationAuthor } from '../../components/common';
import SolutionList from '../../components/common/SolutionList/SolutionList';
import { SolutionSkeleton } from '../../components/skeleton';
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

const StatisticPage: React.FC = () => {
  const { profile, updateProfile } = useAuthStore();
  const { isPending: isPendingOfProfile } = useQuery({
    queryKey: [paths.QUERY_KEY.meInfo],
    queryFn: async () => {
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
            title="Overview"
            Icon={() => <LightBulbIcon width={32} height={32} />}
          >
            <div className="line"></div>
            {profile && <ProfileOverview profile={profile} />}
          </SectionStatistic>
        )}
        <div className="section-with-account">
          <SectionStatistic
            options
            className="incomplete__challenge"
            Icon={() => <AcademicCapIcon width={32} height={32} />}
            title="Incomplete Challenges"
          >
            <div className="line"></div>
            <ChallengeIncompleteList />
          </SectionStatistic>
          <div className="account">
            {profile && <InformationAuthor authorProfile={profile} />}
          </div>
        </div>
        <SectionStatistic
          title="My Solution"
          Icon={() => <CommandLineIcon width={24} height={24} />}
          className="my__solution"
        >
          <div className="line"></div>
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
        </SectionStatistic>
      </div>
    </div>
  );
};

export default StatisticPage;
