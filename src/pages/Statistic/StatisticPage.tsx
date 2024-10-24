import {
  AcademicCapIcon,
  CommandLineIcon,
  LightBulbIcon,
} from '@heroicons/react/24/outline';
import React from 'react';
import { InformationAuthor } from '../../components/common';
import Solution from '../../components/common/Solution';
import { useAuthStore } from '../../store/authStore';
import './StatisticPage.scss';
import {
  ChallengeIncompleteList,
  ProfileOverview,
  SectionStatistic,
} from './partitals';

const StatisticPage: React.FC = () => {
  const { profile } = useAuthStore();
  return (
    <div className="statistic__page-container">
      <h1 className="title-page">Statistic Page</h1>

      <div className="content">
        <SectionStatistic
          title="Overview"
          Icon={() => <LightBulbIcon width={32} height={32} />}
        >
          <div className="line"></div>
          {profile && <ProfileOverview profile={profile} />}
        </SectionStatistic>
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
          <div className="solution__list">
            {Array.from({
              length: 8,
            }).map(() => (
              <Solution
                image="https://res.cloudinary.com/dz209s6jk/image/upload/f_auto,q_auto,w_700/Challenges/dmfvghaamqjt9lrx43ql.jpg"
                time="About 5 hours ago"
                name="Contact form"
                tech={['Html', 'css', 'javascript']}
              />
            ))}
          </div>
        </SectionStatistic>
      </div>
    </div>
  );
};

export default StatisticPage;
