import { FC } from 'react';
import { Form, FormSubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button, Input } from '../../../../../components/common';
import { IResetPasswordRequest } from '../../../../../types/request/resetPassword';
import useResetPasswordForm from './resetPasswordForm.hook';
import useResetPasswordFormLogic from './resetPasswordForm.logic';
import './resetPasswordForm.scss';

interface IResetPasswordFromProps {
  tokenResetPassword: string;
  emailResetPassword: string;
}

const ResetPasswordForm: FC<IResetPasswordFromProps> = ({
  tokenResetPassword,
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
  const { handleResetPasswordForm } = useResetPasswordFormLogic();

  const handleResetPassword: FormSubmitHandler<IResetPasswordRequest> = async (
    data,
  ) => {
    await handleResetPasswordForm(data.data, {
      token: tokenResetPassword,
      email: emailResetPassword,
    });
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
        placeholder={`${t('Placeholder.Password')}...`}
        type="password"
      />
      <Input
        {...register('password_confirmation', {
          ...aboutOfConfirmPassword.rule,
          validate: (value) =>
            value === getValues('password') ||
            `${t('Validation.Field.PasswordConfirm.Match')}`,
        })}
        status={errors.password_confirmation && 'error'}
        message={errors.password_confirmation?.message}
        label={aboutOfConfirmPassword.name}
        placeholder={`${t('Placeholder.PasswordConfirmation')}...`}
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
