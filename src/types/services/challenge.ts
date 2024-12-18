import { IBaseResponse } from '../base';
import { IGetAllChallengeRequestParams } from '../request';
import {
  IChallengeDownloadFileParams,
  IGetChallengeDetailsParams,
  IJoinChallengeParams,
} from '../request/challenge';
import {
  IDownloadChallengeAssets,
  IDownloadChallengeFigma,
  IGetAllChallengeResponse,
  IGetChallengeDetailsResponse,
} from '../response/challenge';

export interface IChallengeService {
  getAll: (
    params: IGetAllChallengeRequestParams,
  ) => Promise<IBaseResponse<IGetAllChallengeResponse>>;

  getDetails: (
    params: IGetChallengeDetailsParams,
  ) => Promise<IBaseResponse<IGetChallengeDetailsResponse>>;

  join: (params: IJoinChallengeParams) => Promise<IBaseResponse<null>>;

  downloadAssets: (
    params: IChallengeDownloadFileParams,
  ) => Promise<IBaseResponse<IDownloadChallengeAssets>>;

  downloadFigma: (
    params: IChallengeDownloadFileParams,
  ) => Promise<IBaseResponse<IDownloadChallengeFigma>>;
}
