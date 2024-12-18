import { RegisterOptions } from 'react-hook-form';
import { IAboutOfField } from '../../../types/base';
import { ISendOtpRequest } from '../../../types/request';
import { useTranslation } from 'react-i18next';

const useEmailRegisterForm = () => {
  const { t } = useTranslation();
  const aboutOfEmail: IAboutOfField<RegisterOptions<ISendOtpRequest, 'email'>> =
    {
      name: `${t('Field.Email')}`,
      rule: {
        required: {
          value: true,
          message: `${t('Validation.Field.Email.Require')}`,
        },

        pattern: {
          // eslint-disable-next-line no-useless-escape
          value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          message: `${t('Validation.Field.Email.Pattern')}`,
        },
      },
    };

  return {
    aboutOfEmail,
  };
};

export default useEmailRegisterForm;
