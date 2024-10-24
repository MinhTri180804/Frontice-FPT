import { axiosClient } from '../axios';
import { paths } from '../constant';
import { IBaseResponse } from '../types/base';
import { IGetAllChallengeRequestParams } from '../types/request';
import { IGetAllChallengeResponse } from '../types/response/challenge';

const BASE_URL = `${paths.API.root}`;

const challengeService = {
  getAll(params: IGetAllChallengeRequestParams) {
    const { page = 1, per_page = 10 } = params;
    return axiosClient.get<IBaseResponse<IGetAllChallengeResponse>>(
      `${BASE_URL}${paths.API.CHALLENGE.getAll}?page=${page}&per_page=${per_page}`,
    );
  },
};

export default challengeService;
