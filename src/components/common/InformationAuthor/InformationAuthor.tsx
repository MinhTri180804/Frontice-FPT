import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { IProfileEntity } from '../../../types/entity';
import Button from '../Button';
import './informationAuthor.scss';

interface IInformationAuthorProps {
  authorProfile: IProfileEntity;
}

const InformationAuthor: FC<IInformationAuthorProps> = ({ authorProfile }) => {
  const avatarDefault =
    'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg';
  const { t } = useTranslation();

  return (
    <div className="information__author-component">
      <div className="author">
        <div className="image-solution">
          <img src={authorProfile.image || avatarDefault} alt="" />
        </div>
        <div className="name-rank-author">
          <div className="name">
            {authorProfile.firstname} {authorProfile.lastname}
          </div>
          <div className="rank">
            {authorProfile.point} {t('Point')}
          </div>
        </div>
      </div>
      <div className="challenge-summary">
        <div className="join-challenge">
          <div className="title">Tham Gia</div>
          <div className="total">{authorProfile.challengeJoined || 0}</div>
          <p>Challenges</p>
        </div>
        <div className="submit-challenge">
          <div className="title">Hoàn thành</div>
          <div className="total">{authorProfile.submittedChallenges || 0}</div>
          <p>Challenges</p>
        </div>
      </div>
      <div className="progress-bar"></div>
      <div className="action-view-profile">
        <Button
          label="View Profile"
          buttonSize="medium"
          styleType="secondary"
        />
      </div>
    </div>
  );
};

export default InformationAuthor;
