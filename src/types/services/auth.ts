import { IBaseResponse } from '../base';
import {
  IForgotPasswordRequest,
  ILoginRequest,
  IRefreshTokenRequest,
  IRegisterRequest,
  IResendOtpRequest,
  IResetPasswordRequest,
  ISendOtpRequest,
  IVerifyEmailRequest,
} from '../request';
import { IResetPasswordParams } from '../request/resetPassword';
import {
  IVerifyForgotPasswordOTPParams,
  IVerifyForgotPasswordOTPRequest,
} from '../request/verifyForgotPasswordOtp';
import { ILoginResponse, IRefreshTokenResponse } from '../response';
import { IForgotPasswordResponse } from '../response/forgotPassword';
import { IInfoResponse } from '../response/info';
import { ISignUpResponse } from '../response/signUp';
import { IVerifyForgotPasswordOTPResponse } from '../response/verifyForgotPasswordOTP';

export interface IAuthService {
  login: (data: ILoginRequest) => Promise<IBaseResponse<ILoginResponse>>;

  signUp: (data: IRegisterRequest) => Promise<IBaseResponse<ISignUpResponse>>;

  forgotPassword: (
    data: IForgotPasswordRequest,
  ) => Promise<IBaseResponse<IForgotPasswordResponse>>;

  resetPassword: (
    data: IResetPasswordRequest,
    params: IResetPasswordParams,
  ) => Promise<IBaseResponse<string>>;

  sendOTP: (data: ISendOtpRequest) => Promise<IBaseResponse<string>>;

  verifyEmailSignup: (
    data: IVerifyEmailRequest,
  ) => Promise<IBaseResponse<string>>;

  verifyForgotPasswordOTP: (
    data: IVerifyForgotPasswordOTPRequest,
    params: IVerifyForgotPasswordOTPParams,
  ) => Promise<IBaseResponse<IVerifyForgotPasswordOTPResponse>>;

  refreshToken: (
    data: IRefreshTokenRequest,
  ) => Promise<IBaseResponse<IRefreshTokenResponse>>;

  logout: () => Promise<IBaseResponse<null>>;
  info: () => Promise<IBaseResponse<IInfoResponse>>;
  resendOtp: (data: IResendOtpRequest) => Promise<IBaseResponse<[]>>;
}
