import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { IProfileEntity } from '../../../types/entity';
import Button from '../Button';
import './informationAuthor.scss';
import { useNavigate } from 'react-router-dom';

interface IInformationAuthorProps {
  authorProfile: IProfileEntity;
}

const InformationAuthor: FC<IInformationAuthorProps> = ({ authorProfile }) => {
  const navigate = useNavigate();
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
          <div className="title">{t('Join')}</div>
          <div className="total">{authorProfile.challengeJoined || 0}</div>
          <p>{t('Challenge')}</p>
        </div>
        <div className="submit-challenge">
          <div className="title">{t('Submitted')}</div>
          <div className="total">{authorProfile.submittedChallenges || 0}</div>
          <p>{t('Challenge')}</p>
        </div>
      </div>
      <div className="progress-bar"></div>
      <div className="action-view-profile">
        <Button
          label={t('ViewDetails.Text')}
          buttonSize="medium"
          styleType="secondary"
          onClick={() => navigate('/profile')}
        />
      </div>
    </div>
  );
};

export default InformationAuthor;
