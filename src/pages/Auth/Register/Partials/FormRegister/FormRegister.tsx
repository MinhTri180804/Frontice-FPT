import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button, Input } from '../../../../../components/common';
import { IRegisterRequest } from '../../../../../types/request/register';
import useFormRegister from './formRegister.hook';
import useRegisterFormLogic from './formRegister.logic';
import './formRegister.scss';

const FormRegister: FC = () => {
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
    formState: { errors },
    getValues,
    handleSubmit,
    setError,
  } = useForm<IRegisterRequest>({
    defaultValues: {
      role: 'taskee',
    },
  });
  const { handleRegisterForm } = useRegisterFormLogic();
  const { t } = useTranslation();

  const handleRegister: SubmitHandler<IRegisterRequest> = async (data) => {
    await handleRegisterForm(data, setError);
  };

  return (
    <form className="form__register" onSubmit={handleSubmit(handleRegister)}>
      <div className="input-group">
        <Input
          {...register('firstname', aboutOfFirstName.rule)}
          status={errors.firstname && 'error'}
          message={errors.firstname?.message}
          label={aboutOfFirstName.name}
          placeholder="Enter your first name..."
        />

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
        type="submit"
        styleType="primary"
        label={`${t('Button.Register')}`}
        buttonSize="medium"
      />
    </form>
  );
};

export default FormRegister;
