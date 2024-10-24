import './BannerAndAvatar.scss';
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import BannerPathImage from '../../../../asset/images/banner.png';
import AvatarPathImage from '../../../../asset/images/avatar.png';
import { Input } from '../../../../components/common';
import { useTranslation } from 'react-i18next';

const BannerAndAvatar: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="container-banner-avatar" id="banner-avatar-section">
      <div className="title-component">
        {t('Banner')} &amp; {t('Avatar')}
      </div>
      <div className="title-banner" id="banner">
        {t('Banner')}
      </div>
      <div className="container-banner">
        <div className="image">
          <img src={BannerPathImage} alt="" />
        </div>
        <div className="action">
          <input
            type="file"
            id="uploadFileBanner"
            name="myfile"
            title="Please upload your file"
          />
          <label htmlFor="uploadFileBanner">
            <ArrowUpTrayIcon />
            <p>{t('Upload file')}</p>
          </label>
        </div>
      </div>
      <div className="title-avatar" id="avatar">
        {t('Avatar')}
      </div>
      <div className="container-avatar">
        <div className="image-action">
          <div className="image">
            <img src={AvatarPathImage} alt="" />
          </div>
          <div className="action">
            <input
              type="file"
              id="uploadFileAvatar"
              name="myfile"
              title="Please upload your file"
            />
            <label htmlFor="uploadFileAvatar">
              <ArrowUpTrayIcon />
              <p>{t('Upload file')}</p>
            </label>
          </div>
        </div>
        <div className="container-input">
          <div className="input-child">
            <Input
              label="GitHub"
              status="default"
              placeholder={`${t('Enter your link Github account')}...`}
            />
            <Input
              label="Google"
              status="default"
              placeholder={`${t('Enter your link Google account')}...`}
            />
            <Input
              label="Portfolio"
              status="default"
              placeholder={`${t('Enter your link Portfolio account')}...`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default BannerAndAvatar;
