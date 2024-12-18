import { toast, ToastContentProps } from 'react-toastify';
import authService from '../../../../../services/authServices';
import { useNavigate } from 'react-router-dom';
import { paths } from '../../../../../constant';
import { useTranslation } from 'react-i18next';
import { IBaseResponse } from '../../../../../types/base';
import {
  IVerifyForgotPasswordOTPParams,
  IVerifyForgotPasswordOTPRequest,
} from '../../../../../types/request/verifyForgotPasswordOtp';
import { IVerifyEmailRequest } from '../../../../../types/request';

interface IVerifyEmailSignUpMethod {
  dataBody: IVerifyEmailRequest;
}

interface IVerifyEmailForgotPasswordMethod {
  dataBody: IVerifyForgotPasswordOTPRequest;
  params: IVerifyForgotPasswordOTPParams;
}

const useOtpFormLogic = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const verifyEmailSignUp = async (
    dataBody: IVerifyEmailSignUpMethod['dataBody'],
  ) => {
    return toast.promise(
      authService
        .verifyEmailSignup(dataBody)
        .then((response) => {
          navigate(`${paths.auth}/${paths.register}`, {
            state: {
              emailRegister: dataBody.email,
            },
          });
          const MESSAGE_SUCCESS = `${t('ToastMessage.Auth.OTP.success')}`;
          return response.message || MESSAGE_SUCCESS;
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
  };

  const verifyEmailForgotPassword = async (
    dataBody: IVerifyEmailForgotPasswordMethod['dataBody'],
    params: IVerifyEmailForgotPasswordMethod['params'],
  ) => {
    return toast.promise(
      authService
        .verifyForgotPasswordOTP(dataBody, params)
        .then((response) => {
          const params = new URLSearchParams(response.data.url.split('?')[1]);
          const email = params.get('email');
          const token = params.get('token');
          navigate(`${paths.auth}/${paths.resetPassword}`, {
            state: {
              resetToken: token,
              emailResetPassword: email,
            },
          });

          const MESSAGE_SUCCESS = `${t('ToastMessage.Auth.OTP.success')}`;
          return response.message || MESSAGE_SUCCESS;
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
  };

  return { verifyEmailSignUp, verifyEmailForgotPassword };
};

export default useOtpFormLogic;
