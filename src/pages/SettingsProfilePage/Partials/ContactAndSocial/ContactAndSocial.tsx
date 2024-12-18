import { useTranslation } from 'react-i18next';
import './ContactAndSocial.scss';
const ContactAndSocial: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="container-contact-social">
      <div className="title-component" id="contact-social-section">
        {t('Contact')} & {t('Social')}
      </div>
      <div className="container-input">
        <div className="github" id="github"></div>
      </div>
    </div>
  );
};
export default ContactAndSocial;
