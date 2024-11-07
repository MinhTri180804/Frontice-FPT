export interface IResetPasswordRequest {
  password: string;
  password_confirmation: string;
}

export interface IResetPasswordParams {
  token: string;
  email: string;
}
