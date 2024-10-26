import { axiosClient } from '../axios';
import { paths } from '../constant';
import { IBaseResponse } from '../types/base';
import { ISubmitSolutionRequest } from '../types/request';
import {
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
};

export default solutionService;
