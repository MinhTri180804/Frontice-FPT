import { FC } from 'react';
import { Form, FormSubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button, Input } from '../../../../../components/common';
import { Checkbox } from '../../../../../components/common/Checkbox';
import { paths } from '../../../../../constant';
import { ILoginRequest } from '../../../../../types/request/login';
import useFormLogin from './formLogin.hook';
import useLoginFormLogic from './formLogin.logic';
import './formLogin.scss';

const FormLogin: FC = () => {
  const {
    control,
    register,
    formState: { errors },
    setError,
  } = useForm<ILoginRequest>();
  const { handleLoginForm } = useLoginFormLogic();
  const { aboutOfEmail, aboutOfPassword } = useFormLogin();
  const { t } = useTranslation();
  const handleRememberAccount: () => void = () => {
    // TODO: Implement logic remember account
    console.log('Remember account');
  };

  const handleLogin: FormSubmitHandler<ILoginRequest> = async (data) => {
    await handleLoginForm(data.data, setError);
  };

  return (
    <Form className="login__form" control={control} onSubmit={handleLogin}>
      <Input
        {...register('email', aboutOfEmail.rule)}
        label={aboutOfEmail.name}
        placeholder={`${t('Placeholder.Email')}...`}
        status={errors.email && 'error'}
        message={errors.email?.message}
      />

      <Input
        {...register('password', aboutOfPassword.rule)}
        message={errors.email?.message}
        status={errors.email && 'error'}
        label={aboutOfPassword.name}
        placeholder={`${t('Placeholder.Password')}...`}
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
          {t('ForgotPassword')} ?
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
