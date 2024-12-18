import { ICommentEntity } from '../entity/comment';

export interface ISubmitSolutionRequest {
  challenge_id: string;
  title: string;
  github: string;
  live_github: string;
  pride_of: string;
  challenge_overcome: string;
  help_with: string;
}

interface IPaginationParams {
  page?: number;
  per_page?: number;
}

export type IGetAllSolutionParams = IPaginationParams;
export type IGetSolutionsOfChallengeParams = IPaginationParams & {
  challengeId: string;
};

export type IGetMySolutionsSubmittedParams = IPaginationParams;

export type IActionLikeParams = {
  solutionId: string;
};

export type IActionDislikeParams = {
  solutionId: string;
};

export type IActionRequest = {
  type: 'like' | 'dislike';
};

export type IActionUnInteractionParams = {
  solutionId: string;
};

export type IUploadActionComment = {
  content: string;
  challenge_solution_id: string;
  parent_id?: string | null;
};

export type IGetAllActionCommentResponse = {
  comments: ICommentEntity[];
  total: number;
  current_page: number;
  per_page: number;
  last_page: number;
};

export type IGetAllActionCommentParams = {
  solutionId: string;
};

export type IGetAllActionReplyCommentParams = {
  commentParentId: string;
  page: number | string;
};

export type IGetAllActionReplyCommentResponse = {
  comments: ICommentEntity[];
  total: number;
  current_page: number;
  per_page: number;
  last_page: number;
};

export type IRemoveCommentParams = {
  commentId: string;
};
