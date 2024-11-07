import { axiosClient } from '../axios';
import { paths } from '../constant';
import {
  IGetMySolutionsSubmittedParams,
  IGetSolutionsOfChallengeParams,
} from '../types/request/solution';
import { ISolutionService } from '../types/services/solution';

const URL_API = `${paths.API.root}`;

const solutionService: ISolutionService = {
  getIncompleteChallenge: () => {
    return axiosClient.get(
      `${URL_API}${paths.API.SOLUTION.getIncompleteChallenge}`,
    );
  },

  getSolutionSubmitted: (params?: IGetMySolutionsSubmittedParams) => {
    const { page = 1, per_page = 12 } =
      params as IGetMySolutionsSubmittedParams;
    return axiosClient.get(
      `${URL_API}${paths.API.SOLUTION.submitted}?page=${page}&per_page=${per_page}`,
    );
  },

  submitSolution: (data) => {
    return axiosClient.post(
      `${URL_API}${paths.API.SOLUTION.submitSolution}`,
      data,
    );
  },

  getAll: (params) => {
    const { page = 1, per_page = 12 } = params;
    return axiosClient.get(
      `${URL_API}${paths.API.SOLUTION.getAll}?page=${page}&per_page=${per_page}`,
    );
  },

  getDetails: (params) => {
    const { solutionId } = params;
    return axiosClient.get(
      `${URL_API}${paths.API.SOLUTION.getDetails}/${solutionId}`,
    );
  },

  getSolutionsOfChallenge: (params: IGetSolutionsOfChallengeParams) => {
    const { challengeId, page = 1, per_page = 100 } = params;
    return axiosClient.get(
      `${URL_API}${paths.API.SOLUTION.getSolutionsOfChallenge}/${challengeId}?page=${page}&per_page=${per_page}`,
    );
  },
};

export default solutionService;
