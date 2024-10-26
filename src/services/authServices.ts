import { axiosClient } from '../axios';
import { paths } from '../constant';
import { IBaseResponse } from '../types/base';
import { IRefreshTokenRequest, IResendOtpRequest } from '../types/request';
import { IForgotPasswordRequest } from '../types/request/forgotPassword';
import { ILoginRequest } from '../types/request/login';
import { IRegisterRequest } from '../types/request/register';
import { IResetPasswordRequest } from '../types/request/resetPassword';
import { ISendOtpRequest } from '../types/request/sendOtp';
import { IVerifyEmailRequest } from '../types/request/verifyEmail';
import { IVerifyForgotPassword } from '../types/request/verifyForgotPasswordOtp';
import { ILoginResponse, IRefreshTokenResponse } from '../types/response';
import { IForgotPasswordResponse } from '../types/response/forgotPassword';
import { IInfoResponse } from '../types/response/info';
import { ISignUpResponse } from '../types/response/signUp';
import { IVerifyForgotPasswordOTPResponse } from '../types/response/verifyForgotPasswordOTP';

const BASE_URL = `${paths.API.root}${paths.API.AUTH.root}`;

const authService = {
  login: (data: ILoginRequest) => {
    return axiosClient.post<IBaseResponse<ILoginResponse>>(
      `${BASE_URL}${paths.API.AUTH.login}`,
      data,
    );
  },

  signUp: (data: IRegisterRequest) => {
    return axiosClient.post<IBaseResponse<ISignUpResponse>>(
      `${BASE_URL}${paths.API.AUTH.register}`,
      data,
    );
  },

  forgotPassword: (data: IForgotPasswordRequest) => {
    return axiosClient.post<IBaseResponse<IForgotPasswordResponse>>(
      `${BASE_URL}${paths.API.AUTH.forgot_password}`,
      data,
    );
  },

  resetPassword: (
    data: IResetPasswordRequest,
    token: string,
    email: string,
  ) => {
    return axiosClient.post<IBaseResponse<string>>(
      `${BASE_URL}${paths.API.AUTH.reset_password}?token=${token}&email=${email}`,
      data,
    );
  },

  sendOTP: (data: ISendOtpRequest) => {
    return axiosClient.post<IBaseResponse<string>>(
      `${BASE_URL}${paths.API.AUTH.send_otp}?gmail=${data.gmail}`,
    );
  },

  verifyEmailSignup: (data: IVerifyEmailRequest) => {
    return axiosClient.post<IBaseResponse<string>>(
      `${BASE_URL}${paths.API.AUTH.verify_email}?email=${data.email}`,
      {
        otp: data.otp,
      },
    );
  },

  verifyForgotPasswordOTP: (data: IVerifyForgotPassword) => {
    return axiosClient.post<IBaseResponse<IVerifyForgotPasswordOTPResponse>>(
      `${BASE_URL}${paths.API.AUTH.verify_forgot_password_otp}?token=${data.token}&email=${data.email}`,
      {
        otp: data.otp,
      },
    );
  },

  refreshToken: (data: IRefreshTokenRequest) => {
    return axiosClient.post<IBaseResponse<IRefreshTokenResponse>>(
      `${BASE_URL}${paths.API.AUTH.refreshToken}`,
      data,
    );
  },

  logout: () => {
    return axiosClient.post<IBaseResponse<null>>(
      `${BASE_URL}${paths.API.AUTH.logout}`,
    );
  },

  info: () => {
    return axiosClient.get<IBaseResponse<IInfoResponse>>(
      `${BASE_URL}${paths.API.AUTH.info}`,
    );
  },

  resendOtp: (data: IResendOtpRequest) => {
    return axiosClient.post<IBaseResponse<[]>>(
      `${BASE_URL}/${paths.API.AUTH.resendOtp}`,
      {
        data,
      },
    );
  },
};

export default authService;
