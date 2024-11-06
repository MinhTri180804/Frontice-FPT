import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { axiosClient } from '../axios';
import { paths } from '../constant';
import authService from '../services/authServices';
import { IBaseResponse } from '../types/base';
import { logOnDev } from '../utils/helper';
import {
  getAccessToken,
  getRefreshToken,
  removeAccessToken,
  removeInfo,
  removeRefreshToken,
  saveAccessToken,
  saveRefreshToken,
} from '../utils/localstorage';

const TIMEOUT_REQUEST = 15000;

interface IConditionCallBack {
  _retry: boolean;
}

const conditionCallback: IConditionCallBack = {
  _retry: false,
};

const onRequest = (
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
  const { method, url, headers } = config;
  logOnDev(`[API] ${method?.toUpperCase()} ${url} | Request`);

  const accessToken = getAccessToken();
  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  if (method === 'get') {
    config.timeout = TIMEOUT_REQUEST;
  }

  return config;
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  const { method, url } = response.config;
  const { status, data } = response;

  logOnDev(`[API] ${method?.toUpperCase()} ${url} | Response ${status}`);
  logOnDev(`[API] [DATA] ${data}`);

  return response.data;
};

const onErrorResponse = async (
  error: AxiosError<IBaseResponse<null>> | Error,
): Promise<AxiosError> => {
  if (axios.isAxiosError(error)) {
    console.log('[INTERCEPTOR ERROR RESPONSE]: ', error);
    const { message } = error;
    const { method, url } = error.config as InternalAxiosRequestConfig;
    const { statusText, status } = error.response as AxiosResponse;

    logOnDev(
      `[API] ${method?.toUpperCase()} ${url} | Error ${status} ${message} | Status Text ${statusText}`,
    );

    switch (status) {
      case 401:
        console.log('[RETRY IN AXIOS]', conditionCallback._retry);
        console.log('[TESTING REFRESH TOKEN]: ', error);
        if (
          !conditionCallback._retry
          //  error.response?.data?.isExpired === false
        ) {
          conditionCallback._retry = true;
          try {
            const refreshToken = getRefreshToken();
            if (refreshToken) {
              const response = await authService.refreshToken({
                refreshToken: refreshToken,
              });

              const {
                access_token: accessTokenNew,
                refresh_token: refreshTokenNew,
              } = response.data;

              saveAccessToken(accessTokenNew);
              saveRefreshToken(refreshTokenNew);

              axiosClient.defaults.headers.common['Authorization'] =
                `Bearer ${accessTokenNew}`;

              const requestOrigin = error.config as InternalAxiosRequestConfig;
              requestOrigin.headers.Authorization = `Bearer ${accessTokenNew}`;

              return axiosClient(requestOrigin);
            }
          } catch (refreshTokenError) {
            removeAccessToken();
            removeRefreshToken();
            removeInfo();
            window.location.href = `${paths.auth}/${paths.login}`;
            throw refreshTokenError;
          } finally {
            conditionCallback._retry = false;
          }
        }
        break;

      case 404:
        logOnDev('[!] [ERROR]: 404 from response status backend');
        window.location.href = `${paths.notfound}`;
        break;

      default:
        break;
    }
  } else {
    logOnDev(`[API] || Error ${error.message}`);
  }

  return Promise.reject(error);
};

export const setupInterceptorAxios = (instance: AxiosInstance) => {
  instance.interceptors.request.use(onRequest, onErrorResponse);
  instance.interceptors.response.use(onResponse, onErrorResponse);

  return instance;
};
