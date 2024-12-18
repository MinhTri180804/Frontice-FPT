import { useTranslation } from 'react-i18next';
import TableContents from '../../components/common/TableContents';
import BannerAndAvatar from './Partials/BannerAndAvatar';
import PersonalInformation from './Partials/PersonalInformation';
import { UploadPDF } from './Partials/PersonalInformation/Partials/UploadPDF';
import './SettingsProfilePage.scss';

const sectionsData = [
  {
    title: 'Avatar',
    href: '#banner-avatar-section',
    subsections: [{ title: 'Avatar', href: '#avatar' }],
  },
  {
    title: 'CV',
    href: '#cv',
    subsections: [{ title: 'Upload CV', href: '#upload-cv' }],
  },
  {
    title: 'Personal Information',
    href: '#personal-info-section',
    subsections: [
      { title: 'First name & Last name', href: '#name' },
      { title: 'github', href: '#github' },
      { title: 'Bio', href: '#bio' },
    ],
  },
];

const SettingsProfilePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="container-settings-profile-page">
      <div className="settings-profile-page-title">{t('Settings Profile')}</div>
      <div className="form-filter">
        <div>
          <div className="main-settings-profile-page">
            <BannerAndAvatar />
            <UploadPDF />
            <PersonalInformation />
          </div>
        </div>
        <div className="filter">
          <TableContents sections={sectionsData} />
        </div>
      </div>
    </div>
  );
};
export default SettingsProfilePage;
