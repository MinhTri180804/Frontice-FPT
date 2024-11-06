import { useNavigate } from 'react-router-dom';
import { IForgotPasswordRequest } from '../../../../../types/request';
import { useTranslation } from 'react-i18next';
import { toast, ToastContentProps } from 'react-toastify';
import authService from '../../../../../services/authServices';
import { paths } from '../../../../../constant';
import { IBaseResponse } from '../../../../../types/base';

interface IHandleForgotPasswordFormMethod {
  dataBody: IForgotPasswordRequest;
}

const useForgotPasswordFormLogic = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleForgotPasswordForm = async (
    dataBody: IHandleForgotPasswordFormMethod['dataBody'],
  ) => {
    return toast.promise(
      authService
        .forgotPassword(dataBody)
        .then((response) => {
          const params = new URLSearchParams(response.data.url.split('?')[1]);

          const email = params.get('email');
          const token = params.get('token');

          navigate(`${paths.auth}/${paths.otp}`, {
            state: {
              emailForgotPassword: email,
              tokenForgotPassword: token,
            },
          });

          const MESSAGE_SUCCESS = `${t('ToastMessage.Auth.ForgotPassword.success')}`;
          return response.message || MESSAGE_SUCCESS;
        })
        .catch((error: IBaseResponse<null>) => {
          const MESSAGE_ERROR = `${t('ToastMessage.Auth.ForgotPassword.error')}`;
          throw error.message || MESSAGE_ERROR;
        }),
      {
        pending: `${t('ToastMessage.Auth.ForgotPassword.pending')}`,
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

  return { handleForgotPasswordForm };
};

export default useForgotPasswordFormLogic;
