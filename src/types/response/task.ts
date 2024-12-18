import { ITaskeeEntity } from '../entity';
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

export interface IDownloadSourceResponse {
  sourceLink: string;
}

export interface IDownloadFigmaResponse {
  figmaLink: string;
}

export interface IGetAllSolutionTaskOfMe {
  tasks: ISolutionTask[];
  total: number;
  current_page: number;
  per_page: number;
  last_page: number;
}

export interface ISolutionTask {
  id: string;
  taskee: ITaskeeEntity;
  task: ITaskEntity;
  title: string | null;
  github: string | null;
  liveGithub: string | null;
  submitedAt: string | null;
  status: string;
}
