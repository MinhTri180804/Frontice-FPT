import { IBaseResponse } from '../base';
import { ISubmitSolutionRequest } from '../request';
import {
  IGetAllSolutionParams,
  IGetMySolutionsSubmittedParams,
  IGetSolutionsOfChallengeParams,
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
}
