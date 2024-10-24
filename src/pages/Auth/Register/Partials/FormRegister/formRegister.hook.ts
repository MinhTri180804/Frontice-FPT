import { RegisterOptions } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { IAboutOfField } from '../../../../../types/base';
import { IRegisterRequest } from '../../../../../types/request';

const useFormRegister = () => {
  const { t } = useTranslation();

  const aboutOfUsername: IAboutOfField<
    RegisterOptions<IRegisterRequest, 'username'>
  > = {
    name: `${t('Field.Nickname')}`,
    rule: {
      required: {
        value: true,
        message: `${t('Validation.Field.Nickname.Require')}`,
      },
    },
  };

  const aboutOfPhone: IAboutOfField<
    RegisterOptions<IRegisterRequest, 'phone'>
  > = {
    name: `${t('Field.Phone')}`,
    rule: {
      required: {
        value: true,
        message: `${t('Validation.Field.Phone.Require')}`,
      },
      pattern: {
        value: /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0-4|6-9])\d{7}$/,
        message: `${t('Validation.Field.Phone.Pattern')}`,
      },
    },
  };

  const aboutOfFirstName: IAboutOfField<
    RegisterOptions<IRegisterRequest, 'firstname'>
  > = {
    name: `${t('Field.FirstName')}`,
    rule: {
      required: {
        value: true,
        message: `${t('Validation.Field.FirstName.Require')}`,
      },
    },
  };

  const aboutOfLastName: IAboutOfField<
    RegisterOptions<IRegisterRequest, 'lastname'>
  > = {
    name: `${t('Field.LastName')}`,
    rule: {
      required: {
        value: true,
        message: `${t('Validation.Field.LastName.Require')}`,
      },
    },
  };

  const aboutOfEmail: IAboutOfField<
    RegisterOptions<IRegisterRequest, 'email'>
  > = {
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
    RegisterOptions<IRegisterRequest, 'password'>
  > = {
    name: `${t('Field.Password')}`,
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

  console.log('password-value: ');

  const aboutOfConfirmPassword: IAboutOfField<
    RegisterOptions<IRegisterRequest, 'password_confirmation'>
  > = {
    name: `${t('Field.ConfirmPassword')}`,
    rule: {
      ...aboutOfPassword.rule,
    },
  };

  return {
    aboutOfConfirmPassword,
    aboutOfEmail,
    aboutOfFirstName,
    aboutOfLastName,
    aboutOfPassword,
    aboutOfPhone,
    aboutOfUsername,
  };
};

export default useFormRegister;
