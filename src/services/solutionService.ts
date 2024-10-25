import { axiosClient } from '../axios';
import { paths } from '../constant';
import { IBaseResponse } from '../types/base';
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
};

export default solutionService;
