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
