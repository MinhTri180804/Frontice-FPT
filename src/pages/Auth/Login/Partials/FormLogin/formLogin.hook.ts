import { RegisterOptions } from 'react-hook-form';
import { ILoginRequest } from '../../../../../types/request';
import { useTranslation } from 'react-i18next';
import { IAboutOfField } from '../../../../../types/base';

const useFormLogin = () => {
  const { t } = useTranslation();

  const aboutOfEmail: IAboutOfField<RegisterOptions<ILoginRequest, 'email'>> = {
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

  const aboutOfPassword: IAboutOfField<
    RegisterOptions<ILoginRequest, 'password'>
  > = {
    name: `${t('Field.Password')}`,
    rule: {
      required: {
        value: true,
        message: `${t('Validation.Field.Password.Require')}`,
      },

      minLength: {
        value: 6,
        message: `${t('Validation.Field.Password.MinLength', {
          length: 6,
        })}`,
      },

      maxLength: {
        value: 16,
        message: `${t('Validation.Field.Password.MaxLength', {
          length: 16,
        })}`,
      },
    },
  };

  return {
    aboutOfEmail,
    aboutOfPassword,
  };
};

export default useFormLogin;
