import {
  BuildingOfficeIcon,
  CommandLineIcon,
} from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';
import userAvatar from '../../asset/images/avatar.png';
import {
  default as image,
  default as imageCompany,
} from '../../asset/images/solution.png';
import BannerWithInfo from './Partials/BannerWithInfo';
import CompanyFollow from './Partials/CompanyFollow/CompanyFollow';
import Solution from '../../components/common/Solution';
import './ProfilePage.scss';
import { Section } from '../../components/common';
interface DataItemSolution {
  time: string;
  name: string;
  tech: string[];
  id: string;
} // TODO: implement
interface DataItemCompany {
  image: string;
  name: string;
  quantity: string;
  id: string;
}
const Profile: React.FC = () => {
  return (
    <div className="profile-container">
      <h4>Profile Page</h4>
      <BannerWithInfo />

      <Section
        title="Solution"
        titlePosition="left"
        Icon={() => <CommandLineIcon width={24} height={24} />}
        iconPosition="left"
        className="solution__list-section"
      >
        <div className="list-solution">
          {/* ham map looop qua tung solution */}
          {/* {dataSolution.map((solutionItem) => (
            <Solution
              key={solutionItem.id}
              image={image} // Hình ảnh mặc định
              name={solutionItem.name}
              time={solutionItem.time}
              tech={solutionItem.tech}
              userAvatar={userAvatar}
            />
          ))} */}
        </div>
      </Section>

      <Section
        className="company__following-section"
        titlePosition="left"
        iconPosition="left"
        Icon={() => <BuildingOfficeIcon width={24} height={24} />}
        title="Company Following"
      >
        <div className="list-company">
          {/* {dataCompany.map((companyItem) => (
            <CompanyFollow
              image={imageCompany}
              name={companyItem.name}
              quantity={companyItem.quantity}
            />
          ))} non*/}
        </div>
      </Section>
    </div>
  );
};

export default Profile;
