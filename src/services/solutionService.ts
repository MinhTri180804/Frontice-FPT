import { axiosClient } from '../axios';
import { paths } from '../constant';
import {
  IActionDislikeParams,
  IActionLikeParams,
  IActionRequest,
  IActionUnInteractionParams,
  IGetAllActionCommentParams,
  IGetMySolutionsSubmittedParams,
  IGetSolutionsOfChallengeParams,
  IUploadActionComment,
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

  like: (params: IActionLikeParams) => {
    const { solutionId } = params;
    const url = `${URL_API}/solutions${paths.API.SOLUTION.interaction}/${solutionId}`;
    return axiosClient.post(url, {
      type: 'like',
    } as IActionRequest);
  },

  dislike: (params: IActionDislikeParams) => {
    const { solutionId } = params;
    const url = `${URL_API}/solutions${paths.API.SOLUTION.interaction}/${solutionId}`;
    return axiosClient.post(url, {
      type: 'dislike',
    } as IActionRequest);
  },

  unInteraction: (params: IActionUnInteractionParams) => {
    const { solutionId } = params;
    const url = `${URL_API}/solutions${paths.API.SOLUTION.interaction}/${solutionId}`;
    return axiosClient.delete(url);
  },

  getAllComment: (params: IGetAllActionCommentParams) => {
    const { solutionId } = params;
    return axiosClient.get(
      `${URL_API}/solutions${paths.API.SOLUTION.comment}/${solutionId}?per_page=100`,
    );
  },

  uploadComment: (data: IUploadActionComment) => {
    return axiosClient.post(
      `${URL_API}/solutions${paths.API.SOLUTION.comment}`,
      data,
    );
  },

  getAllCommentReply: (params) => {
    const { commentParentId, page } = params;
    return axiosClient.get(
      `${URL_API}/solutions${paths.API.SOLUTION.comment}/reply/${commentParentId}?page=${page}`,
    );
  },

  removeComment: (params) => {
    const { commentId } = params;
    return axiosClient.delete(
      `${URL_API}/solutions${paths.API.SOLUTION.comment}/${commentId}`,
    );
  },
};

export default solutionService;
