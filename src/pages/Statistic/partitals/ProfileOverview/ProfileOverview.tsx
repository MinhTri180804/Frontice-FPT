import { useNavigate } from 'react-router-dom';
import { Button } from '../../../../components/common';
import { AboutProfileOverview, AccountProfileOverview } from './Partials';
import './profileOverview.scss';
import { FC } from 'react';
import { paths } from '../../../../constant';
import { IProfileEntity } from '../../../../types/entity';
import { ConditionWrapper } from '../../../../components/wrapper';

interface IProfileOverviewProps {
  profile: IProfileEntity;
}

const ProfileOverview: FC<IProfileOverviewProps> = ({ profile }) => {
  const navigate = useNavigate();
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
          title="Account"
          value={profile.gold_account ? 'Premium' : 'Normal'}
        />
        <AboutProfileOverview title="Score" value={profile.point} />
        <AboutProfileOverview
          title="Challenge Submit"
          value={`${profile.submittedChallenges} Solution`}
        />
        <ConditionWrapper condition={profile.gold_account}>
          <AboutProfileOverview
            title="Premium Expired"
            value={`${profile.goldExpires} `}
          />
        </ConditionWrapper>
      </div>

      <div className="actions">
        <Button
          className="button__view-details"
          styleType="secondary"
          buttonSize="medium"
          label="View Details"
          onClick={handleButtonViewDetails}
        />

        <Button
          className="button__challenges"
          styleType="primary"
          buttonSize="medium"
          label="Challenges"
          onClick={handleButtonChallenges}
        />
      </div>
    </div>
  );
};

export default ProfileOverview;
