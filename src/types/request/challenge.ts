interface IPaginationParams {
  page?: number;
  per_page?: number;
}
export type IGetAllChallengeRequestParams = IPaginationParams;

export type IGetAllIncompleteChallengesParams = IPaginationParams;

export type IGetChallengeDetailsParams = {
  challengeId: string;
};

export type IJoinChallengeParams = {
  challengeId: string;
};

export type IChallengeDownloadFileParams = {
  challengeId: string;
};
