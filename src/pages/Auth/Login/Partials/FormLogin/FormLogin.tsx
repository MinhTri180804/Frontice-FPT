import { FC } from 'react';
import { Form, FormSubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContentProps } from 'react-toastify';
import { Button, Input } from '../../../../../components/common';
import { Checkbox } from '../../../../../components/common/Checkbox';
import { paths } from '../../../../../constant';
import authService from '../../../../../services/authServices';
import { useAuthStore } from '../../../../../store/authStore';
import { IBaseResponse } from '../../../../../types/base';
import { ILoginRequest } from '../../../../../types/request/login';
import {
  saveAccessToken,
  saveInfo,
  saveRefreshToken,
} from '../../../../../utils/localstorage';
import useFormLogin from './formLogin.hook';
import './formLogin.scss';

const DEFAULT_PAGE_LOGIN_SUCCESS = paths.home;

const FormLogin: FC = () => {
  const navigate = useNavigate();
  const {
    control,
    register,
    formState: { errors },
    setError,
  } = useForm<ILoginRequest>();

  const { login } = useAuthStore();
  const { aboutOfEmail, aboutOfPassword } = useFormLogin();
  const { t } = useTranslation();
  const handleRememberAccount: () => void = () => {
    // TODO: Implement logic remember account
    console.log('Remember account');
  };

  const handleLogin: FormSubmitHandler<ILoginRequest> = (data) => {
    toast.promise(
      authService
        .login(data.data)
        .then(async (response) => {
          const { access_token, refresh_token } = response.data.data;
          console.log('access_token: ', access_token);
          saveAccessToken(access_token);
          saveRefreshToken(refresh_token);
          try {
            const responseInfo = await authService.info();
            const dataProfile = responseInfo.data.data;
            saveInfo(dataProfile);
            login(dataProfile);
            navigate(DEFAULT_PAGE_LOGIN_SUCCESS);
            const MESSAGE_SUCCESS = `${t('ToastMessage.Auth.Login.success')}`;
            return MESSAGE_SUCCESS;
          } catch (error) {
            throw error || t('ToastMessage.Challenger.profile.error');
          }
        })
        .catch((error: IBaseResponse<null>) => {
          const MESSAGE_ERROR = `${t('ToastMessage.Auth.Login.error')}`;

          // Set error for password field based on response
          if (
            error.message &&
            typeof error.message === 'object' &&
            error.message.error
          ) {
            // Set errors for each field based on the response
            Object.keys(error.message.error).forEach((key) => {
              if (typeof error.message === 'object') {
                setError(key as keyof ILoginRequest, {
                  type: 'manual',
                  message: error.message.error[key][0], // Get the first error message
                });
              }
            });
          }

          throw MESSAGE_ERROR;
        }),

      {
        pending: `${t('ToastMessage.Auth.Login.pending')}`,
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
    <Form className="login__form" control={control} onSubmit={handleLogin}>
      <Input
        {...register('email', aboutOfEmail.rule)}
        label={aboutOfEmail.name}
        placeholder="Enter your email..."
        status={errors.email && 'error'}
        message={errors.email?.message}
      />

      <Input
        {...register('password', aboutOfPassword.rule)}
        message={errors.email?.message}
        status={errors.email && 'error'}
        label={aboutOfPassword.name}
        placeholder="Enter your password..."
        type="password"
      />
      <div className="options">
        <Checkbox
          label={`${t('Checkbox.RememberAccount')}`}
          eventChecked={handleRememberAccount}
        />

        <Link
          to={`${paths.auth}/${paths.forgotPassword}`}
          className="forgot-password"
        >
          forgot password ?
        </Link>
      </div>
      {/* TODO: update status disabled and event click of button component */}
      <Button
        styleType="primary"
        label={`${t('Button.Login')}`}
        buttonSize="medium"
      />
    </Form>
  );
};

export default FormLogin;
