import { FC } from 'react';
import { Form, FormSubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Input } from '../../../../../components/common';
import { paths } from '../../../../../constant';
import authService from '../../../../../services/authServices';
import { IBaseResponse } from '../../../../../types/base';
import { IResetPasswordRequest } from '../../../../../types/request/resetPassword';
import useResetPasswordForm from './resetPasswordForm.hook';
import './resetPasswordForm.scss';

interface IResetPasswordFromProps {
  resetToken: string;
  emailResetPassword: string;
}

const ResetPasswordForm: FC<IResetPasswordFromProps> = ({
  resetToken,
  emailResetPassword,
}) => {
  const { t } = useTranslation();

  const {
    register,
    formState: { errors },
    control,
    getValues,
  } = useForm<IResetPasswordRequest>();

  const { aboutOfConfirmPassword, aboutOfNewPassword } = useResetPasswordForm();

  const navigate = useNavigate();

  const handleResetPassword: FormSubmitHandler<IResetPasswordRequest> = (
    data,
  ) => {
    const formData: IResetPasswordRequest = {
      ...data.data,
    };

    toast.promise(
      authService
        .resetPassword(formData, resetToken, emailResetPassword)
        .then((response) => {
          const URL_NAVIGATE = `${paths.auth}/${paths.login}`;
          navigate(URL_NAVIGATE);

          const MESSAGE_SUCCESS = `${t('ToastMessage.Auth.ResetPassword.success')}`;
          return response.data.message || MESSAGE_SUCCESS;
        })
        .catch((error: IBaseResponse<null>) => {
          const MESSAGE_ERROR = `${t('ToastMessage.Auth.ResetPassword.error')}`;
          return error.message || MESSAGE_ERROR;
        }),
      {
        pending: `${t('ToastMessage.Auth.ResetPassword.pending')}`,
        success: {
          render: (response) => {
            return response.data as string;
          },
        },
        error: {
          render: (response) => {
            return response.data as string;
          },
        },
      },
    );
  };

  return (
    <Form
      className="reset__password-form"
      control={control}
      onSubmit={handleResetPassword}
    >
      <Input
        {...register('password', aboutOfNewPassword.rule)}
        status={errors.password && 'error'}
        message={errors.password?.message}
        label={aboutOfNewPassword.name}
        type="password"
      />
      <Input
        {...register('password_confirmation', {
          ...aboutOfConfirmPassword.rule,
          validate: (value) =>
            value === getValues('password_confirmation') ||
            `${t('Validation.Field.PasswordConfirm.Match')}`,
        })}
        status={errors.password_confirmation && 'error'}
        message={errors.password_confirmation?.message}
        label={aboutOfConfirmPassword.name}
        type="password"
      />

      {/* TODO: update status disabled and event click of button component */}
      <Button
        styleType="primary"
        label={t('Button.ResetPassword')}
        buttonSize="medium"
      />
    </Form>
  );
};

export default ResetPasswordForm;
