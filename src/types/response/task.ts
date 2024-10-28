import { ITaskEntity } from '../entity/task';

export interface IGetAllTaskResponse {
  tasks: Omit<
    ITaskEntity,
    'isJoin' | 'isSubmit' | 'solutionSubmitId' | 'submittedTotal' | 'joinTotal'
  >[];

  total: number;
  currentPage: number;
  lastPage: number;
  perPage: number;
}
