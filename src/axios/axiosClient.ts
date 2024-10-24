import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { useNavigate } from 'react-router-dom';
import { paths } from '../constant';
import authService from '../services/authServices';
import { IBaseResponse } from '../types/base';
import {
  getAccessToken,
  getRefreshToken,
  removeAccessToken,
  removeRefreshToken,
  saveAccessToken,
  saveRefreshToken,
} from '../utils/localstorage';

interface ICustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_URL_API,
  httpAgent: true,
  // timeout: 5000,

  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  (request) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      request.headers.Authorization = `Bearer ${accessToken}`;
    }
    return request;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },

  async function (error: AxiosError<IBaseResponse<null>>) {
    const originalRequest = error.config as ICustomAxiosRequestConfig;

    if (error.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // call api get new refreshToken and accessToken
        const refreshToken = getRefreshToken();
        if (refreshToken) {
          const response = await authService.refreshToken({
            refreshToken,
          });
          const {
            access_token: accessTokenNew,
            refresh_token: refreshTokenNew,
          } = response.data.data;

          saveAccessToken(accessTokenNew);
          saveRefreshToken(refreshTokenNew);

          // Set new accessToken in header request
          axiosClient.defaults.headers.common['Authorization'] =
            `Bearer ${accessTokenNew}`;
          return axiosClient(originalRequest); // retry the original request with the new accessToken
        }

        throw new Error('No RefreshToken');
      } catch (refreshTokenError) {
        removeAccessToken();
        removeRefreshToken();
        const navigate = useNavigate();
        navigate(`${paths.auth}/${paths.login}`);
        return Promise.reject(refreshTokenError);
      }
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(
      error.response ? error.response.data : 'Unknown error',
    );
  },
);

export default axiosClient;
