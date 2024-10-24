import { FC, useState } from 'react';
import { Form, FormSubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContentProps } from 'react-toastify';
import { Button } from '../../../../../components/common';
import { paths } from '../../../../../constant';
import authService from '../../../../../services/authServices';
import { IBaseResponse } from '../../../../../types/base';
import { IVerifyEmailRequest } from '../../../../../types/request/verifyEmail';
import { IVerifyForgotPassword } from '../../../../../types/request/verifyForgotPasswordOtp';
import { OtpInput } from '../../../Partials/OtpInput';
import './otpForm.scss';

interface IOTPFormProps {
  lengthOTP: number;
}

const OTPForm: FC<IOTPFormProps> = ({ lengthOTP }) => {
  const location = useLocation();
  const emailSignUp = location.state?.emailSignUp;
  const emailForgotPassword = location.state?.emailForgotPassword;
  const tokenForgotPassword = location.state?.tokenForgotPassword;

  const { t } = useTranslation();
  const [OTPValues, setOTPValues] = useState<number[]>(
    Array(lengthOTP).fill(null),
  );
  const [stateOTP, setStateOTP] = useState<boolean[]>([]);

  const navigate = useNavigate();

  const { control } = useForm<IVerifyEmailRequest | IVerifyForgotPassword>();

  const handleVerifyOtp: FormSubmitHandler<
    IVerifyEmailRequest | IVerifyForgotPassword
  > = () => {
    const stateOTPReport = OTPValues.map((otpValue) => {
      if (otpValue === null) {
        return true;
      }

      return false;
    });

    if (stateOTPReport.includes(true)) {
      setStateOTP(stateOTPReport);
      toast.error(`${t('Validation.Field.Otp.Require')}`);
      return;
    }

    const OTPString = [...OTPValues].join('');
    // TODO: Refactor login in here
    if (emailSignUp) {
      toast.promise(
        authService
          .verifyEmailSignup({
            email: emailSignUp,
            otp: OTPString,
          })
          .then((response) => {
            navigate(`${paths.auth}/${paths.login}`);
            const MESSAGE_SUCCESS = `${t('ToastMessage.Auth.OTP.success')}`;
            return response.data.message || MESSAGE_SUCCESS;
          })
          .catch((error: IBaseResponse<null>) => {
            const MESSAGE_ERROR = `${t('ToastMessage.Auth.OTP.error')}`;
            throw error.message || MESSAGE_ERROR;
          }),
        {
          pending: `${t('ToastMessage.Auth.OTP.pending')}`,
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
    }

    if (emailForgotPassword) {
      toast.promise(
        authService
          .verifyForgotPasswordOTP({
            email: emailForgotPassword,
            otp: OTPString,
            token: tokenForgotPassword,
          })
          .then((response) => {
            const params = new URLSearchParams(
              response.data.data.url.split('?')[1],
            );

            const email = params.get('email');
            const token = params.get('token');
            navigate(`${paths.auth}/${paths.resetPassword}`, {
              state: {
                resetToken: token,
                emailResetPassword: email,
              },
            });

            const MESSAGE_SUCCESS = `${t('ToastMessage.Auth.OTP.success')}`;
            return response.data.message || MESSAGE_SUCCESS;
          })
          .catch((error: IBaseResponse<null>) => {
            const MESSAGE_ERROR = `${t('ToastMessage.Auth.OTP.error')}`;
            return error.message || MESSAGE_ERROR;
          }),
        {
          pending: `${t('ToastMessage.Auth.OTP.pending')}`,
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
    }
  };

  const handleChangeValueOtp: (
    index: number,
    value: string | number,
  ) => void = (index, value) => {
    const newOTPValues = OTPValues.map((otpValue, indexOrigin) => {
      if (indexOrigin !== index) return otpValue;

      return value as number;
    });

    setOTPValues(newOTPValues);
  };

  return (
    <Form className="otp__form" control={control} onSubmit={handleVerifyOtp}>
      <div className="otp__list-component">
        {Array(lengthOTP)
          .fill('')
          .map((_, index) => (
            <OtpInput
              index={index}
              onChangeValue={handleChangeValueOtp}
              key={`otp-input-${index}`}
              isError={stateOTP[index]}
            />
          ))}
      </div>
      <Button
        styleType="primary"
        label={`${t('Button.VerifyOtp')}`}
        buttonSize="medium"
      />
    </Form>
  );
};

export default OTPForm;
