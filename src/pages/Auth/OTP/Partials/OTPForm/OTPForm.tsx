import { FC, useState } from 'react';
import { Form, FormSubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from '../../../../../components/common';
import { IVerifyEmailRequest } from '../../../../../types/request/verifyEmail';
import {
  IVerifyForgotPasswordOTPParams,
  IVerifyForgotPasswordOTPRequest,
} from '../../../../../types/request/verifyForgotPasswordOtp';
import { OtpInput } from '../../../Partials/OtpInput';
import useOtpFormLogic from './otpForm.logic';
import './otpForm.scss';

interface IOTPFormProps {
  lengthOTP: number;
}

const OTPForm: FC<IOTPFormProps> = ({ lengthOTP }) => {
  const location = useLocation();
  const emailSignUp = location.state?.emailSignUp;
  const emailForgotPassword = location.state?.emailForgotPassword;
  const tokenForgotPassword = location.state?.tokenForgotPassword;
  const { verifyEmailForgotPassword, verifyEmailSignUp } = useOtpFormLogic();

  const { t } = useTranslation();
  const [OTPValues, setOTPValues] = useState<number[]>(
    Array(lengthOTP).fill(null),
  );
  const [stateOTP, setStateOTP] = useState<boolean[]>([]);

  const { control } = useForm<
    IVerifyEmailRequest | IVerifyForgotPasswordOTPRequest
  >();

  const handleVerifyOtp: FormSubmitHandler<
    IVerifyEmailRequest | IVerifyForgotPasswordOTPRequest
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
    if (emailSignUp) {
      const dataBody: IVerifyEmailRequest = {
        email: emailSignUp,
        otp: OTPString,
      };

      verifyEmailSignUp(dataBody);
    }

    if (emailForgotPassword) {
      const dataBody: IVerifyForgotPasswordOTPRequest = {
        otp: OTPString,
      };
      const params: IVerifyForgotPasswordOTPParams = {
        email: emailForgotPassword,
        token: tokenForgotPassword,
      };

      verifyEmailForgotPassword(dataBody, params);
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
