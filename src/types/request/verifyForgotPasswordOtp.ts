export interface IVerifyForgotPasswordOTPRequest {
  otp: string;
}

export interface IVerifyForgotPasswordOTPParams {
  email: string;
  token: string;
}
