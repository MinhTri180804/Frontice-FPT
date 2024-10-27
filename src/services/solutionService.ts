import { axiosClient } from '../axios';
import { paths } from '../constant';
import { IBaseResponse } from '../types/base';
import { ISubmitSolutionRequest } from '../types/request';
import {
  IGetAllSolutionParams,
  IGetSolutionsOfChallengeParams,
} from '../types/request/solution';
import {
  IGetAllSolutionOfChallengeResponse,
  IGetAllSolutionResponse,
  IGetSolutionDetailsParams,
  ISolutionDetailsResponse,
  ISolutionIncompleteChallengeResponse,
  ISolutionSubmittedResponse,
} from '../types/response/solution';

const URL_API = `${paths.API.root}`;

const solutionService = {
  getIncompleteChallenge: () => {
    return axiosClient.get<IBaseResponse<ISolutionIncompleteChallengeResponse>>(
      `${URL_API}${paths.API.SOLUTION.getIncompleteChallenge}`,
    );
  },
  getSolutionSubmitted: () => {
    return axiosClient.get<IBaseResponse<ISolutionSubmittedResponse>>(
      `${URL_API}${paths.API.SOLUTION.submitted}`,
    );
  },

  submitSolution: (data: ISubmitSolutionRequest) => {
    console.log('data in service: ', data);
    return axiosClient.post(
      `${URL_API}${paths.API.SOLUTION.submitSolution}`,
      data,
    );
  },

  getAll: (params: IGetAllSolutionParams) => {
    const { page = 1, per_page = 12 } = params;
    return axiosClient.get<IBaseResponse<IGetAllSolutionResponse>>(
      `${URL_API}${paths.API.SOLUTION.getAll}?page=${page}&per_page=${per_page}`,
    );
  },

  getDetails: (params: IGetSolutionDetailsParams) => {
    return axiosClient.get<IBaseResponse<ISolutionDetailsResponse>>(
      `${URL_API}${paths.API.SOLUTION.getDetails}/${params.solutionId}`,
    );
  },

  getSolutionsOfChallenge: (params: IGetSolutionsOfChallengeParams) => {
    const { challengeId, page = 1, per_page = 100 } = params;
    return axiosClient.get<IBaseResponse<IGetAllSolutionOfChallengeResponse>>(
      `${URL_API}${paths.API.SOLUTION.getSolutionsOfChallenge}/${challengeId}?page=${page}&per_page=${per_page}`,
    );
  },
};

export default solutionService;
