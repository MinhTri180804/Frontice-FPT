import { FC } from 'react';
import { Form, FormSubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContentProps } from 'react-toastify';
import { Button, Input } from '../../../../../components/common';
import { paths } from '../../../../../constant';
import authService from '../../../../../services/authServices';
import { IBaseResponse } from '../../../../../types/base';
import { IForgotPasswordRequest } from '../../../../../types/request/forgotPassword';
import useForgotPasswordForm from './forgotPasswordForm.hook';
import './forgotPasswordForm.scss';

const ForgotPasswordForm: FC = () => {
  const { t } = useTranslation();
  const { aboutOfEmail } = useForgotPasswordForm();
  const {
    register,
    formState: { errors },
    control,
  } = useForm<IForgotPasswordRequest>();
  const navigate = useNavigate();
  const handleForgotPassword: FormSubmitHandler<IForgotPasswordRequest> = (
    data,
  ) => {
    const { email } = data.data;
    toast.promise(
      authService
        .forgotPassword({ email: email })
        .then((response) => {
          const params = new URLSearchParams(
            response.data.data.url.split('?')[1],
          );

          const email = params.get('email');
          const token = params.get('token');

          navigate(`${paths.auth}/${paths.otp}`, {
            state: {
              emailForgotPassword: email,
              tokenForgotPassword: token,
            },
          });

          const MESSAGE_SUCCESS = `${t('ToastMessage.Auth.ForgotPassword.success')}`;
          return response.data.message || MESSAGE_SUCCESS;
        })
        .catch((error: IBaseResponse<null>) => {
          const MESSAGE_ERROR = `${t('ToastMessage.Auth.ForgotPassword.error')}`;
          throw error.message || MESSAGE_ERROR;
        }),
      {
        pending: `${t('ToastMessage.Auth.ForgotPassword.pending')}`,
        success: {
          render: (response) => {
            return response.data as string;
          },
        },
        error: {
          render: (response: ToastContentProps<string>) => {
            return response.data as string;
          },
        },
      },
    );
  };

  return (
    <Form
      className="forgot__password-form"
      control={control}
      onSubmit={handleForgotPassword}
    >
      <Input
        {...register('email', aboutOfEmail.rule)}
        status={errors.email && 'error'}
        message={errors.email?.message}
        label={aboutOfEmail.name}
        type="email"
      />
      <Button
        styleType="primary"
        label={t('Button.ForgotPassword')}
        buttonSize="medium"
      />
    </Form>
  );
};

export default ForgotPasswordForm;
