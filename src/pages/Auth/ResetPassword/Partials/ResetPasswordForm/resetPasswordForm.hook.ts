import { RegisterOptions } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { IAboutOfField } from '../../../../../types/base';
import { IResetPasswordRequest } from '../../../../../types/request';

const useResetPasswordForm = () => {
  const { t } = useTranslation();

  const aboutOfNewPassword: IAboutOfField<
    RegisterOptions<IResetPasswordRequest, 'password'>
  > = {
    name: `${t('Field.NewPassword')}`,
    rule: {
      required: {
        value: true,
        message: `${t('Validation.Field.Password.Require')}`,
      },

      minLength: {
        value: 8,
        message: `${t('Validation.Field.Password.MinLength', {
          length: 8,
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

  const aboutOfConfirmPassword: IAboutOfField<
    RegisterOptions<IResetPasswordRequest, 'password_confirmation'>
  > = {
    name: `${t('Field.ConfirmPassword')}`,
    rule: {
      ...aboutOfNewPassword.rule,
    },
  };

  return {
    aboutOfConfirmPassword,
    aboutOfNewPassword,
  };
};

export default useResetPasswordForm;
