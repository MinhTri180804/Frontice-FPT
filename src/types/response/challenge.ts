import { IChallengeEntity } from '../entity';

export interface IGetAllChallengeResponse {
  challenges: IChallengeEntity[];
  total: number;
  currentPage: number;
  lastPage: number;
  perPage: 10;
}

export interface IDownloadChallengeAssets {
  source: {
    sourceLink: string;
  };
}

export interface IDownloadChallengeFigma {
  figma: {
    figmaLink: string;
  };
}

export type IGetChallengeDetailsResponse = IChallengeEntity;
