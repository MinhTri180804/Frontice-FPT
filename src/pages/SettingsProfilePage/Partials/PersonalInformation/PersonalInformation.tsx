import { Input } from '../../../../components/common';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import './PersonalInformation.scss';
import { useTranslation } from 'react-i18next';

interface PersonalInformationProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

const PersonalInformation: React.FC<PersonalInformationProps> = ({
  register,
  errors,
}) => {
  const { t } = useTranslation();
  return (
    <div className="container-personal-informations" id="personal-info-section">
      <div className="title-component">{t('Personal Information')}</div>

      <div className="container-input">
        <div className="row">
          <div className="first" id="name">
            <Input
              label={t('First Name')}
              type="text"
              placeholder={t('Enter your first name')}
              {...register('firstName', { required: 'First name is required' })}
            />
            {errors.firstName && (
              <span className="error">{errors.firstName.message}</span>
            )}
          </div>
          <div className="last">
            <Input
              label={t('Last Name')}
              placeholder={t('Enter your last name')}
              {...register('lastName', { required: 'Last name is required' })}
            />
            {errors.lastName && (
              <span className="error">{errors.lastName.message}</span>
            )}
          </div>
        </div>

        {/* Row for Date of Birth and Gennder */}
        <div className="row">
          <div className="first" id="dob-gender">
            <Input
              label={t('Date of Birth')}
              type="date"
              placeholder="01/01/2002"
              {...register('dob', { required: 'Date of birth is required' })}
            />
            {errors.dob && <span className="error">{errors.dob.message}</span>}
          </div>
          <div className="last">
            <div className="title-select">
              <label>{t('Gender')}</label>
            </div>
            <select {...register('gender', { required: 'Gender is required' })}>
              <option value="">{t('Select your gender')}</option>
              <option value="male">{t('Male')}</option>
              <option value="female">{t('Female')}</option>
              <option value="other">{t('Other')}</option>
            </select>
            {errors.gender && (
              <span className="error">{errors.gender.message}</span>
            )}
          </div>
        </div>

        {/* Email Field */}
        <div className="mail" id="email">
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: 'Invalid email address',
              },
            })}
          />
          {errors.email && (
            <span className="error">{errors.email.message}</span>
          )}
        </div>

        {/* Bio Field */}
        <div className="bio">
          <div className="title">Bio</div>
          <textarea
            id="bio"
            placeholder="Enter your Bio"
            {...register('bio')}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;
