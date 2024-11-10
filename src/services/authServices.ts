import { axiosClient } from '../axios';
import { paths } from '../constant';
import { IRefreshTokenRequest, IResendOtpRequest } from '../types/request';
import { IForgotPasswordRequest } from '../types/request/forgotPassword';
import { ILoginRequest } from '../types/request/login';
import { IRegisterRequest } from '../types/request/register';
import {
  IResetPasswordParams,
  IResetPasswordRequest,
} from '../types/request/resetPassword';
import { ISendOtpRequest } from '../types/request/sendOtp';
import { IVerifyEmailRequest } from '../types/request/verifyEmail';
import {
  IVerifyForgotPasswordOTPParams,
  IVerifyForgotPasswordOTPRequest,
} from '../types/request/verifyForgotPasswordOtp';
import { IAuthService } from '../types/services/auth';

const BASE_URL = `${paths.API.root}${paths.API.AUTH.root}`;

const authService: IAuthService = {
  login: (data: ILoginRequest) => {
    return axiosClient.post(`${BASE_URL}${paths.API.AUTH.login}`, data);
  },

  signUp: (data: IRegisterRequest) => {
    return axiosClient.post(`${BASE_URL}${paths.API.AUTH.register}`, data);
  },

  forgotPassword: (data: IForgotPasswordRequest) => {
    return axiosClient.post(
      `${BASE_URL}${paths.API.AUTH.forgot_password}`,
      data,
    );
  },

  resetPassword: (
    data: IResetPasswordRequest,
    params: IResetPasswordParams,
  ) => {
    return axiosClient.post(
      `${BASE_URL}${paths.API.AUTH.reset_password}?token=${params.token}&email=${params.email}`,
      data,
    );
  },

  sendOTP: (data: ISendOtpRequest) => {
    return axiosClient.post(
      `${BASE_URL}${paths.API.AUTH.send_otp}?gmail=${data.gmail}`,
    );
  },

  verifyEmailSignup: (data: IVerifyEmailRequest) => {
    return axiosClient.post(
      `${BASE_URL}${paths.API.AUTH.verify_email}?email=${data.email}`,
      {
        otp: data.otp,
      },
    );
  },

  verifyForgotPasswordOTP: (
    data: IVerifyForgotPasswordOTPRequest,
    params: IVerifyForgotPasswordOTPParams,
  ) => {
    const { otp } = data;
    const { email, token } = params;

    return axiosClient.post(
      `${BASE_URL}${paths.API.AUTH.verify_forgot_password_otp}?token=${token}&email=${email}`,
      {
        otp,
      },
    );
  },

  refreshToken: (data: IRefreshTokenRequest) => {
    const { refreshToken } = data;
    return axiosClient.post(`${BASE_URL}${paths.API.AUTH.refreshToken}`, {
      refreshToken,
    });
  },

  logout: () => {
    return axiosClient.post(`${BASE_URL}${paths.API.AUTH.logout}`);
  },

  info: () => {
    return axiosClient.get(`${BASE_URL}${paths.API.AUTH.info}`);
  },

  resendOtp: (data: IResendOtpRequest) => {
    const { email } = data;
    return axiosClient.post(`${BASE_URL}/${paths.API.AUTH.resendOtp}`, {
      email,
    });
  },

  loginGithub: () => {
    return axiosClient.get(`api/auth/github`);
  },
};

export default authService;
