import { EnvelopeIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Button } from '../../../../components/common';
import { ConditionWrapper } from '../../../../components/wrapper';
import { IProfileEntity } from '../../../../types/entity';
import './BannerWithInfo.scss';

interface BannerWithInfoProps {
  profileData: IProfileEntity;
}

const BannerWithInfo: React.FC<BannerWithInfoProps> = ({ profileData }) => {
  return (
    <div className="banner-with-info">
      <figure className="user">
        <div className="avatar">
          <img
            src={
              profileData?.image ||
              'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'
            }
            alt="avatar"
          />
        </div>

        <figcaption>
          <div className="user-header">
            <div className="user-name">
              <div className="about">
                <h1>
                  {profileData.firstname} {profileData.lastname}
                </h1>
                <ConditionWrapper condition={profileData.gold_account}>
                  -<div className="premium">Premium</div>
                </ConditionWrapper>
              </div>
              <h2>@{profileData.username}</h2>
            </div>
            <div className="action">
              <Button
                styleType="secondary"
                label="View CV"
                iconPosition="left"
                buttonSize="small"
                Icon={() => <PlusIcon />}
              />
              <Button
                styleType="primary"
                label="Follow"
                iconPosition="right"
                buttonSize="small"
                Icon={() => <PlusIcon />}
              />
            </div>
          </div>
          <div className="user-info">
            <div className="container-contact">
              <div className="contact">
                <div className="icon">
                  <EnvelopeIcon />
                </div>
                <p className="mail">{profileData.email}</p>
              </div>
            </div>
          </div>
          <div className="user-info-icon">
            <div className="statistic">
              <div className="title">Tham gia</div>
              <div className="value">
                {profileData.challengeJoined} challenge
              </div>
            </div>
            <div className="statistic">
              <div className="title">Chưa hoàn thành</div>
              <div className="value">
                {profileData.pendingChallenges} challenge
              </div>
            </div>
            <div className="statistic">
              <div className="title">Hoàn thành</div>
              <div className="value">
                {profileData.submittedChallenges} challenge
              </div>
            </div>
        </div>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque
            odit, veniam quas sit blanditiis illo veritatis adipisci odio
            recusandae perferendis modi dolor sint commodi in cupiditate at
            nostrum error quae?
          </p>
        </figcaption>
      </figure>
    </div>
  );
};

export default BannerWithInfo;
