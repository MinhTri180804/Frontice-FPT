import { axiosClient } from '../axios';
import { paths } from '../constant';
import { IGetAllChallengeRequestParams } from '../types/request';
import {
  IChallengeDownloadFileParams,
  IGetChallengeDetailsParams,
  IJoinChallengeParams,
} from '../types/request/challenge';
import { IChallengeService } from '../types/services/challenge';

const BASE_URL = `${paths.API.root}${paths.API.CHALLENGE.root}`;

const challengeService: IChallengeService = {
  async getAll(params: IGetAllChallengeRequestParams) {
    const { page = 1, per_page = 12 } = params;
    return axiosClient.get(`${BASE_URL}?page=${page}&per_page=${per_page}`);
  },

  getDetails(params: IGetChallengeDetailsParams) {
    return axiosClient.get(`${BASE_URL}/${params.challengeId}`);
  },

  join(params: IJoinChallengeParams) {
    return axiosClient.post(`${BASE_URL}/${params.challengeId}/join`);
  },

  downloadAssets(params: IChallengeDownloadFileParams) {
    return axiosClient.get(`${BASE_URL}/${params.challengeId}/download`);
  },

  downloadFigma(params: IChallengeDownloadFileParams) {
    return axiosClient.get(`${BASE_URL}/${params.challengeId}/figma`);
  },
};

export default challengeService;
