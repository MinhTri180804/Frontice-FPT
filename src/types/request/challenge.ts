interface IPaginationParams {
  page?: number;
  per_page?: number;
}
export type IGetAllChallengeRequestParams = IPaginationParams;

export type IGetAllIncompleteChallengesParams = IPaginationParams;
