import { IBaseResponse } from '../base';
import { ICommentEntity } from '../entity/comment';
import { ISubmitSolutionRequest } from '../request';
import {
  IActionDislikeParams,
  IActionLikeParams,
  IActionUnInteractionParams,
  IGetAllActionCommentParams,
  IGetAllActionCommentResponse,
  IGetAllActionReplyCommentParams,
  IGetAllActionReplyCommentResponse,
  IGetAllSolutionParams,
  IGetMySolutionsSubmittedParams,
  IGetSolutionsOfChallengeParams,
  IRemoveCommentParams,
  IUploadActionComment,
} from '../request/solution';
import {
  IGetAllSolutionOfChallengeResponse,
  IGetAllSolutionResponse,
  IGetSolutionDetailsParams,
  ISolutionDetailsResponse,
  ISolutionIncompleteChallengeResponse,
  ISolutionSubmittedResponse,
} from '../response/solution';

export interface ISolutionService {
  getIncompleteChallenge: () => Promise<
    IBaseResponse<ISolutionIncompleteChallengeResponse>
  >;

  getSolutionSubmitted: (
    params?: IGetMySolutionsSubmittedParams,
  ) => Promise<IBaseResponse<ISolutionSubmittedResponse>>;

  submitSolution: (
    data: ISubmitSolutionRequest,
  ) => Promise<IBaseResponse<null>>;

  getAll: (
    params: IGetAllSolutionParams,
  ) => Promise<IBaseResponse<IGetAllSolutionResponse>>;

  getDetails: (
    params: IGetSolutionDetailsParams,
  ) => Promise<IBaseResponse<ISolutionDetailsResponse>>;

  getSolutionsOfChallenge: (
    params: IGetSolutionsOfChallengeParams,
  ) => Promise<IBaseResponse<IGetAllSolutionOfChallengeResponse>>;

  like: (params: IActionLikeParams) => Promise<IBaseResponse<null>>;
  dislike: (params: IActionDislikeParams) => Promise<IBaseResponse<null>>;
  unInteraction: (
    params: IActionUnInteractionParams,
  ) => Promise<IBaseResponse<null>>;

  uploadComment: (
    data: IUploadActionComment,
  ) => Promise<IBaseResponse<ICommentEntity>>;

  getAllComment: (
    params: IGetAllActionCommentParams,
  ) => Promise<IBaseResponse<IGetAllActionCommentResponse>>;

  getAllCommentReply: (
    params: IGetAllActionReplyCommentParams,
  ) => Promise<IBaseResponse<IGetAllActionReplyCommentResponse>>;

  removeComment: (params: IRemoveCommentParams) => Promise<IBaseResponse<null>>;
}
