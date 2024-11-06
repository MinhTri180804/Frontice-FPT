import { FC } from 'react';
import { Form, FormSubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button, Input } from '../../../../../components/common';
import { IForgotPasswordRequest } from '../../../../../types/request/forgotPassword';
import useForgotPasswordForm from './forgotPasswordForm.hook';
import useForgotPasswordFormLogic from './forgotPasswordForm.logic';
import './forgotPasswordForm.scss';

const ForgotPasswordForm: FC = () => {
  const { t } = useTranslation();
  const { aboutOfEmail } = useForgotPasswordForm();
  const {
    register,
    formState: { errors },
    control,
  } = useForm<IForgotPasswordRequest>();
  const { handleForgotPasswordForm } = useForgotPasswordFormLogic();
  const handleForgotPassword: FormSubmitHandler<
    IForgotPasswordRequest
  > = async (data) => {
    await handleForgotPasswordForm(data.data);
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
        placeholder={`${t('Placeholder.Email')}...`}
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
