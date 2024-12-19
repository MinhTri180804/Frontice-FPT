import { EnvelopeIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Button } from '../../../../components/common';
import { ConditionWrapper } from '../../../../components/wrapper';
import { IProfileEntity } from '../../../../types/entity';
import './BannerWithInfo.scss';
import { handleClickNewTab } from '../../../../utils/helper';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface BannerWithInfoProps {
  profileData: IProfileEntity;
}

const BannerWithInfo: React.FC<BannerWithInfoProps> = ({ profileData }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
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
                label={`${t('ViewCv')}`}
                iconPosition="left"
                buttonSize="small"
                disabled={!profileData.cv}
                Icon={() => <PlusIcon />}
                onClick={() => handleClickNewTab(profileData.cv as string)}
              />
              <Button
                styleType="primary"
                label={t('Setting')}
                onClick={() => navigate('/setting')}
                buttonSize="small"
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
              <div className="title">{t('Join')}</div>
              <div className="value">
                {profileData.challengeJoined} {t('Challenge')}
              </div>
            </div>
            <div className="statistic">
              <div className="title">{t('NonSubmitted')}</div>
              <div className="value">
                {profileData.pendingChallenges} {t('Challenge')}
              </div>
            </div>
            <div className="statistic">
              <div className="title">{t('Submitted')}</div>
              <div className="value">
                {profileData.submittedChallenges} {t('Challenge')}
              </div>
            </div>
          </div>
          <p>{profileData.bio ? profileData.bio : t('NonBio')}</p>
        </figcaption>
      </figure>
    </div>
  );
};

export default BannerWithInfo;
