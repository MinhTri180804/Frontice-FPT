import { useNavigate } from 'react-router-dom';
import { Button } from '../../../../components/common';
import { AboutProfileOverview, AccountProfileOverview } from './Partials';
import './profileOverview.scss';
import { FC } from 'react';
import { paths } from '../../../../constant';
import { IProfileEntity } from '../../../../types/entity';
import { ConditionWrapper } from '../../../../components/wrapper';
import { useTranslation } from 'react-i18next';

interface IProfileOverviewProps {
  profile: IProfileEntity;
}

const ProfileOverview: FC<IProfileOverviewProps> = ({ profile }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleButtonViewDetails = () => {
    navigate(`${paths.profile}`);
  };
  const avatarDefault =
    'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg';
  const handleButtonChallenges = () => {
    navigate(`${paths.challenges}`);
  };
  return (
    <div className="profile_overview-component">
      <AccountProfileOverview
        className="account__profile-overview"
        avatarUrl={profile.image || avatarDefault}
        name={`${profile.firstname} ${profile.lastname}`}
        email={profile.email}
      />

      <div className="about__list">
        <AboutProfileOverview
          title={t('AccountText')}
          value={profile.gold_account ? 'Premium' : 'Normal'}
        />
        <AboutProfileOverview title="Score" value={profile.point} />
        <AboutProfileOverview
          title={t('ChallengeSubmitted')}
          value={`${profile.submittedChallenges} ${t('Solution')}`}
        />
        <ConditionWrapper condition={profile.gold_account}>
          <AboutProfileOverview
            title={t('PremiumExpired')}
            value={`${profile.goldExpires} `}
          />
        </ConditionWrapper>
      </div>

      <div className="actions">
        <Button
          className="button__view-details"
          styleType="secondary"
          buttonSize="medium"
          label={t('ViewDetails.Text')}
          onClick={handleButtonViewDetails}
        />

        <Button
          className="button__challenges"
          styleType="primary"
          buttonSize="medium"
          label={t('Challenge')}
          onClick={handleButtonChallenges}
        />
      </div>
    </div>
  );
};

export default ProfileOverview;
