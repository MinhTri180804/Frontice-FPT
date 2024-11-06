import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import authService from '../../../../../services/authServices';
import { IResetPasswordRequest } from '../../../../../types/request';
import { IResetPasswordParams } from '../../../../../types/request/resetPassword';
import { paths } from '../../../../../constant';
import { IBaseResponse } from '../../../../../types/base';

interface IHandleResetPasswordFormMethod {
  dataBody: IResetPasswordRequest;
  params: IResetPasswordParams;
}

const useResetPasswordFormLogic = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleResetPasswordForm = async (
    dataBody: IHandleResetPasswordFormMethod['dataBody'],
    params: IHandleResetPasswordFormMethod['params'],
  ) => {
    return toast.promise(
      authService
        .resetPassword(dataBody, params)
        .then((response) => {
          const URL_NAVIGATE = `${paths.auth}/${paths.login}`;
          navigate(URL_NAVIGATE);

          const MESSAGE_SUCCESS = `${t('ToastMessage.Auth.ResetPassword.success')}`;
          return response.message || MESSAGE_SUCCESS;
        })
        .catch((error: IBaseResponse<null>) => {
          const MESSAGE_ERROR = `${t('ToastMessage.Auth.ResetPassword.error')}`;
          return error.message || MESSAGE_ERROR;
        }),
      {
        pending: `${t('ToastMessage.Auth.ResetPassword.pending')}`,
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

  return { handleResetPasswordForm };
};

export default useResetPasswordFormLogic;
