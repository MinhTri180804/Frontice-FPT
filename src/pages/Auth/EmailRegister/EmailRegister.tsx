import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { Form, FormSubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Input } from '../../../components/common';
import { paths } from '../../../constant';
import authService from '../../../services/authServices';
import { ISendOtpRequest } from '../../../types/request';
import useEmailRegisterForm from './emailRegister.logic';

const EmailRegisterPage = () => {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    control,
  } = useForm<ISendOtpRequest>();

  const { aboutOfEmail } = useEmailRegisterForm();
  const { t } = useTranslation();

  const handleEmailRegister: FormSubmitHandler<ISendOtpRequest> = async (
    data,
  ) => {
    return await toast.promise(
      authService.sendOTP(data.data).then(() => {
        navigate(`${paths.auth}/${paths.otp}`, {
          state: {
            emailSignUp: data.data.email,
          },
        });
      }),
      {
        pending: 'Đang thực hiện gửi mã xác thực OTP',
        success: 'Gửi mã xác thực OTP thành công',
        error: 'Gửi mã xác thực OTP thất bại',
      },
    );
  };
  return (
    <div className="forgot__password__page-container">
      <div className="heading">
        <div className="title">{t('Register')}</div>

        <div className="sub-title">{t('EnterEmailRegister')}</div>
      </div>

      <div className="content">
        <div className="main__content">
          <Form
            className="forgot__password-form"
            control={control}
            onSubmit={handleEmailRegister}
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
              label={t('Button.Register')}
              buttonSize="medium"
            />
          </Form>
          <div className="other">
            <div onClick={() => navigate(-1)} className="prev-page">
              <div className="icon">
                <ChevronLeftIcon />
              </div>
              <span>{t('PreviousPage')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailRegisterPage;
