import { UseFormSetError } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContentProps } from 'react-toastify';
import { paths } from '../../../../../constant';
import authService from '../../../../../services/authServices';
import { IBaseResponse } from '../../../../../types/base';
import { IRegisterRequest } from '../../../../../types/request';

interface IHandleRegisterFormMethod {
  dataBody: IRegisterRequest;
  setError: UseFormSetError<IRegisterRequest>;
}

const useRegisterFormLogic = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleRegisterForm = async (
    dataBody: IHandleRegisterFormMethod['dataBody'],
    setError: IHandleRegisterFormMethod['setError'],
  ) => {
    return toast.promise(
      authService
        .signUp(dataBody)
        .then((response) => {
          const URL_REDIRECT = `${paths.auth}/${paths.otp}`;
          navigate(URL_REDIRECT, {
            state: {
              emailSignUp: response.data.email,
            },
          });

          const MESSAGE_SUCCESS = `${t('ToastMessage.Auth.Register.success')}`;
          return MESSAGE_SUCCESS;
        })
        .catch((error: IBaseResponse<null>) => {
          const MESSAGE_ERROR = `${t('ToastMessage.Auth.Register.error')}`;
          if (
            error.message &&
            typeof error.message === 'object' &&
            error.message.error
          ) {
            // Set errors for each field based on the response
            Object.keys(error.message.error).forEach((key) => {
              if (typeof error.message === 'object') {
                setError(key as keyof IRegisterRequest, {
                  type: 'manual',
                  message: error.message.error[key][0], // Get the first error message
                });
              }
            });
            throw MESSAGE_ERROR;
          }
          throw MESSAGE_ERROR;
        }),
      {
        pending: `${t('ToastMessage.Auth.Register.pending')}`,
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

  return { handleRegisterForm };
};

export default useRegisterFormLogic;
