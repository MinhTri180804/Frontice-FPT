import { CommandLineIcon } from '@heroicons/react/24/outline';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button, Section } from '../../components/common';
import SolutionList from '../../components/common/SolutionList/SolutionList';
import { SolutionSkeleton } from '../../components/skeleton';
import { ConditionWrapper } from '../../components/wrapper';
import { paths } from '../../constant';
import authService from '../../services/authServices';
import solutionService from '../../services/solutionService';
import { ISolutionSubmittedResponse } from '../../types/response/solution';
import BannerWithInfo from './Partials/BannerWithInfo';
import './ProfilePage.scss';
import { useAuthStore } from '../../store/authStore';
const Profile: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const updateProfile = useAuthStore((state) => state.updateProfile);
  const { isPending: pendingProfile, data: dataProfile } = useQuery({
    queryKey: [paths.QUERY_KEY.meInfo],
    queryFn: async () => {
      const response = await authService.info();
      const responseData = response.data;
      updateProfile(responseData);
      return responseData;
    },
  });

  const {
    data: responseSolutionSubmit,
    isPending: isPendingOfSolutionSubmitted,
  } = useQuery({
    queryKey: [paths.QUERY_KEY.solutionSubmitted, dataProfile?.email, 100],
    queryFn: async () => {
      const response = await solutionService.getSolutionSubmitted({
        per_page: 100,
      });
      const responseData = response?.data.solutions;
      return responseData || [];
    },
  });

  return (
    <div className="profile-container">
      <h4>{t('Profile')}</h4>
      <ConditionWrapper
        condition={!pendingProfile}
        fallback={() => {
          return <div className="skeleton-profile"></div>;
        }}
      >
        {dataProfile && <BannerWithInfo profileData={dataProfile} />}
      </ConditionWrapper>
      <Section
        title={t('Solutions')}
        titlePosition="left"
        Icon={() => <CommandLineIcon width={24} height={24} />}
        iconPosition="left"
        className={`solution__list-section ${responseSolutionSubmit?.length === 0 && 'empty'}`}
      >
        <div className="list-solution">
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
        </div>
      </Section>
    </div>
  );
};

export default Profile;
