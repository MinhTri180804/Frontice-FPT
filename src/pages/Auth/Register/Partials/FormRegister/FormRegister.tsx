import { FC } from 'react';
import { Form, FormSubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContentProps } from 'react-toastify';
import { Button, Input } from '../../../../../components/common';
import { paths } from '../../../../../constant';
import authService from '../../../../../services/authServices';
import { IBaseResponse } from '../../../../../types/base';
import { IOptionLanguage } from '../../../../../types/entity';
import { IRegisterRequest } from '../../../../../types/request/register';
import useFormRegister from './formRegister.hook';
import './formRegister.scss';

const FormRegister: FC = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const i18nLanguage = i18n.language as IOptionLanguage;
  const {
    aboutOfConfirmPassword,
    aboutOfEmail,
    aboutOfFirstName,
    aboutOfLastName,
    aboutOfPassword,
    aboutOfUsername,
    aboutOfPhone,
  } = useFormRegister();

  const {
    register,
    control,
    formState: { errors },
    getValues,
    setError,
  } = useForm<IRegisterRequest>({
    defaultValues: {
      role: 'taskee',
    },
  });

  const { t } = useTranslation();

  const handleRegister: FormSubmitHandler<IRegisterRequest> = async (data) => {
    const formData: IRegisterRequest = {
      ...data.data,
    };

    toast.promise(
      authService
        .signUp(formData)
        .then((response) => {
          const URL_REDIRECT = `${paths.auth}/${paths.otp}`;
          navigate(URL_REDIRECT, {
            state: {
              emailSignUp: response.data.data.email,
            },
          });

          const MESSAGE_SUCCESS = `${t('ToastMessage.Auth.Register.success')}`;
          return MESSAGE_SUCCESS;
        })
        .catch((error: IBaseResponse<null>) => {
          const MESSAGE_ERROR = `${t('ToastMessage.Auth.Register.error')}`;
          if (
            error.message &&
            typeof error.message === 'object' &&
            error.message.error
          ) {
            // Set errors for each field based on the response
            Object.keys(error.message.error).forEach((key) => {
              if (typeof error.message === 'object') {
                setError(key as keyof IRegisterRequest, {
                  type: 'manual',
                  message: error.message.error[key][0], // Get the first error message
                });
              }
            });
          } else {
            if (i18nLanguage === paths.LANGUAGE.vietnamese) throw MESSAGE_ERROR;
            if (i18nLanguage === paths.LANGUAGE.english) throw MESSAGE_ERROR;
          }
        }),
      {
        pending: `${t('ToastMessage.Auth.Register.pending')}`,
        success: {
          render: (response) => {
            return response.data as string;
          },
        },
        error: {
          render: (response: ToastContentProps<string>) => {
            return response.data;
          },
        },
      },
    );
  };

  return (
    <Form
      className="form__register"
      control={control}
      onSubmit={handleRegister}
    >
      <div className="input-group">
        <Input
          {...register('firstname', aboutOfFirstName.rule)}
          status={errors.firstname && 'error'}
          message={errors.firstname?.message}
          label={aboutOfFirstName.name}
          placeholder="Enter your first name..."
        />
        {/* TODO: implement input password component in here */}
        <Input
          {...register('lastname', aboutOfLastName.rule)}
          status={errors.lastname && 'error'}
          message={errors.lastname?.message}
          label={aboutOfLastName.name}
          placeholder="Enter your last name..."
        />
      </div>
      <Input
        {...register('username', aboutOfUsername.rule)}
        status={errors.username && 'error'}
        message={errors.username?.message}
        label={aboutOfUsername.name}
        placeholder="Enter your nickname..."
      />

      <Input
        {...register('phone', aboutOfPhone.rule)}
        status={errors.phone && 'error'}
        message={errors.phone?.message}
        label={aboutOfPhone.name}
        placeholder="Enter your phone..."
        type="number"
      />

      <Input
        {...register('email', aboutOfEmail.rule)}
        status={errors.email && 'error'}
        message={errors.email?.message}
        label={aboutOfEmail.name}
        placeholder="Enter your email..."
      />
      <Input
        {...register('password', aboutOfPassword.rule)}
        status={errors.password && 'error'}
        message={errors.password?.message}
        label={`${aboutOfPassword.name}`}
        placeholder="Enter your password..."
        type="password"
      />

      <Input
        {...register('password_confirmation', {
          ...aboutOfConfirmPassword.rule,
          validate: (value) => {
            return (
              value === getValues('password') ||
              `${t('Validation.Field.PasswordConfirm.Match')}`
            );
          },
        })}
        status={errors.password_confirmation && 'error'}
        message={errors.password_confirmation?.message}
        label={`${aboutOfConfirmPassword.name}`}
        placeholder="Enter your password confirm..."
        type="password"
      />

      <Button
        styleType="primary"
        label={`${t('Button.Register')}`}
        buttonSize="medium"
      />
    </Form>
  );
};

export default FormRegister;
