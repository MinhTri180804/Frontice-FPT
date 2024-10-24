import { IBaseJWTToken } from '../base';

export type IRefreshTokenRequest = Pick<IBaseJWTToken, 'refreshToken'>;
