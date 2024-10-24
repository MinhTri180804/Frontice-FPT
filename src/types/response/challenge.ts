import { IChallengeEntity } from '../entity';

export interface IGetAllChallengeResponse {
  challenges: Omit<IChallengeEntity, 'updated_at' | 'longDes'>[];
  total: number;
  currentPage: number;
  lastPage: number;
  perPage: 10;
}
