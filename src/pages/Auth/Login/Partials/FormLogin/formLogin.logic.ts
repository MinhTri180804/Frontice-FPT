import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContentProps } from 'react-toastify';
import authService from '../../../../../services/authServices';
import {
  saveAccessToken,
  saveInfo,
  saveRefreshToken,
} from '../../../../../utils/localstorage';
import { useAuthStore } from '../../../../../store/authStore';
import { paths } from '../../../../../constant';
import { IBaseResponse } from '../../../../../types/base';
import { ILoginRequest } from '../../../../../types/request';
import { UseFormSetError } from 'react-hook-form';
import { logOnDev } from '../../../../../utils/helper';

interface IHandleLoginFormMethod {
  dataBody: ILoginRequest;
  setError: UseFormSetError<ILoginRequest>;
}

const useLoginFormLogic = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { login } = useAuthStore();
  const handleLoginForm = async (
    dataBody: IHandleLoginFormMethod['dataBody'],
    setError: IHandleLoginFormMethod['setError'],
  ) => {
    return toast.promise(
      authService
        .login(dataBody)
        .then(async (response) => {
          const { access_token, refresh_token } = response.data;
          console.log('access_token: ', access_token);
          logOnDev(`[LOG] [LOGIN FORM] accessToken: ${access_token}`);
          saveAccessToken(access_token);
          saveRefreshToken(refresh_token);
          try {
            const responseInfo = await authService.info();
            const dataProfile = responseInfo.data;
            saveInfo(dataProfile);
            login(dataProfile);
            const MESSAGE_SUCCESS = `${t('ToastMessage.Auth.Login.success')}`;
            navigate(paths.home);
            return MESSAGE_SUCCESS;
          } catch (error) {
            throw error || t('ToastMessage.Challenger.profile.error');
          }
        })
        .catch((error: IBaseResponse<null>) => {
          const MESSAGE_ERROR = `${t('ToastMessage.Auth.Login.error')}`;

          // Set error for password field based on response
          if (
            error.message &&
            typeof error.message === 'object' &&
            error.message.error
          ) {
            // Set errors for each field based on the response
            Object.keys(error.message.error).forEach((key) => {
              if (typeof error.message === 'object') {
                setError(key as keyof ILoginRequest, {
                  type: 'manual',
                  message: error.message.error[key][0],
                });
              }
            });
          }

          throw MESSAGE_ERROR;
        }),

      {
        pending: `${t('ToastMessage.Auth.Login.pending')}`,
        success: {
          render: (response) => {
            return response.data as string;
          },
        },
        error: {
          render: (response: ToastContentProps<string>) => {
            return response.data;
          },
        },
      },
    );
  };

  return { handleLoginForm };
};

export default useLoginFormLogic;
