import { axiosClient } from '../axios';
import { paths } from '../constant';
import { IBaseResponse } from '../types/base';
import { IGetAllChallengeRequestParams } from '../types/request';
import {
  IChallengeDownloadFileParams,
  IGetChallengeDetailsParams,
  IJoinChallengeParams,
} from '../types/request/challenge';
import {
  IDownloadChallengeAssets,
  IDownloadChallengeFigma,
  IGetAllChallengeResponse,
  IGetChallengeDetailsResponse,
} from '../types/response/challenge';

const BASE_URL = `${paths.API.root}${paths.API.CHALLENGE.root}`;

const challengeService = {
  getAll(params: IGetAllChallengeRequestParams) {
    const { page = 1, per_page = 12 } = params;
    return axiosClient.get<IBaseResponse<IGetAllChallengeResponse>>(
      `${BASE_URL}?page=${page}&per_page=${per_page}`,
    );
  },

  getDetails(params: IGetChallengeDetailsParams) {
    return axiosClient.get<IBaseResponse<IGetChallengeDetailsResponse>>(
      `${BASE_URL}/${params.challengeId}`,
    );
  },

  join(params: IJoinChallengeParams) {
    return axiosClient.post<IBaseResponse<null>>(
      `${BASE_URL}/${params.challengeId}/join`,
    );
  },

  downloadAssets(params: IChallengeDownloadFileParams) {
    return axiosClient.get<IBaseResponse<IDownloadChallengeAssets>>(
      `${BASE_URL}/${params.challengeId}/download`,
    );
  },

  downloadFigma(params: IChallengeDownloadFileParams) {
    return axiosClient.get<IBaseResponse<IDownloadChallengeFigma>>(
      `${BASE_URL}/${params.challengeId}/figma`,
    );
  },
};

export default challengeService;
