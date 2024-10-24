import { IBaseJWTToken } from '../base';

export interface ILoginResponse extends IBaseJWTToken {
  expiresIn: number;
}
