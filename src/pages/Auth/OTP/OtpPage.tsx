import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate, useLocation } from 'react-router-dom';
import { paths } from '../../../constant';
import './otpPage.scss';
import { OTPForm } from './Partials/OTPForm';

const OtpPage: FC = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const emailSignUp = location.state?.emailSignUp as string;
  const emailForgotPassword = location.state?.emailForgotPassword as string;

  if (!emailSignUp && !emailForgotPassword) {
    return <Navigate to={`${paths.auth}/${paths.login}`} />;
  }

  //   TODO: Implement logic resend code
  // const handleResendCode: () => void = async () => {
  //   await toast.promise(
  //     authService
  //       .resendOtp({ email: emailSignUp || emailForgotPassword })
  //       .then(() => {
  //         const MESSAGE_SUCCESS = t('ToastMessage.Auth.ResendOtp.Success');
  //         return MESSAGE_SUCCESS;
  //       })
  //       .catch(() => {
  //         const MESSAGE_ERROR = t('ToastMessage.Auth.ResendOtp.Error');
  //         throw MESSAGE_ERROR;
  //       }),
  //     {
  //       pending: t('ToastMessage.Auth.ResendOtp.Pending'),
  //       success: {
  //         render: (responseOfSuccess) => responseOfSuccess.data,
  //       },
  //       error: {
  //         render: (responseOfError: ToastContentProps<string>) =>
  //           responseOfError.data,
  //       },
  //     },
  //   );
  // };

  return (
    <div className="otp__page-container">
      <div className="heading">
        <div className="title">{t('OTPCodeVerify')}</div>

        <div className="sub-title">
          {t('PleaseVerifyTheCodeSentToYourGmail')}
        </div>
      </div>

      <div className="content">
        <div className="main__content">
          <OTPForm lengthOTP={6} />

          {/* <div className="other">
            <span>
              You did not receive the OTP code ?
              <div onClick={handleResendCode} className="resend-code">
                Resend code
              </div>
            </span>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default OtpPage;
