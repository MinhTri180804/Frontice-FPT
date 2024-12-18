import { IChallengeEntity, ISolutionEntity, ITaskeeEntity } from '../entity';

export type ISolutionResponse = ISolutionEntity & {
  taskee: ITaskeeEntity;
  challenge: Omit<IChallengeEntity, 'longDes' | 'updated_at'>;
};

export type ISolutionDetailsResponse = ISolutionEntity & {
  taskee: ITaskeeEntity;
  challenge: Omit<IChallengeEntity, 'longDes' | 'updated_at'>;
};

export type IGetSolutionDetailsParams = {
  solutionId: string;
};

export type ISolutionIncompleteChallengeResponse = {
  solutions: ISolutionResponse[];
  total: number;
  currentPage: number;
  lastPage: number;
  perPage: number;
};

export type ISolutionSubmittedResponse = {
  solutions: ISolutionResponse[];

  total: number;
  currentPage: number;
  lastPage: number;
  perPage: number;
};

export type IGetAllSolutionResponse = {
  solutions: ISolutionResponse[];
  total: number;
  currentPage: number;
  lastPage: number;
  perPage: number;
};

export type IGetAllSolutionOfChallengeResponse = {
  solutions: ISolutionResponse[];
  total: number;
  currentPage: number;
  lastPage: number;
  perPage: number;
};
