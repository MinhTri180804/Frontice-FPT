import { Input } from '../../../../components/common';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import './ContactAndSocial.scss';
import { useTranslation } from 'react-i18next';
interface ContactAndSocialProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}
const ContactAndSocial: React.FC<ContactAndSocialProps> = ({
  register,
  errors,
}) => {
  const { t } = useTranslation();
  return (
    <div className="container-contact-social">
      <div className="title-component" id="contact-social-section">
        {t('Contact')} & {t('Social')}
      </div>
      <div className="container-input">
        <div className="codepen" id="codepen">
          <Input
            label="Codepen"
            type="text"
            placeholder={`${t('Enter your link Codepen')}...`}
            {...register('codepen', { required: 'Codepen name is required' })}
          />
          {errors.gitlab && (
            <span className="error">{errors.codepen?.message}</span>
          )}
        </div>
        <div className="gitlab" id="gitlab">
          <Input
            label="Gitlab"
            type="text"
            placeholder={`${t('Enter your link Gitlab account')}...`}
            {...register('gitlab', { required: 'Gitlab is required' })}
          />
          {errors.gitlab && (
            <span className="error">{errors.gitlab.message}</span>
          )}
        </div>
        <div className="linkedin" id="linkedin">
          <Input
            label="Linkedin"
            type="text"
            placeholder="Enter your link Linkedin..."
            {...register('linkedin', { required: 'Linkedin is required' })}
          />
          {errors.linkedin && (
            <span className="error">{errors.linkedin.message}</span>
          )}
        </div>
        <div className="stack-overflow" id="stackoverflow">
          <Input
            label="Stack Overflow"
            type="text"
            id="stackoverflow"
            placeholder={`${t('Enter your link Stack Overflow account')}...`}
            {...register('stackOverflow', {
              required: 'Stack Overflow name is required',
            })}
          />
          {errors.stackOverflow && (
            <span className="error">{errors.stackOverflow.message}</span>
          )}
        </div>
      </div>
    </div>
  );
};
export default ContactAndSocial;
